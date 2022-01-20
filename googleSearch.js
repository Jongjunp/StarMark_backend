const GoogleSearch = require('google-images');
const url = require('url');
const request = require('request');
const fs = require('fs');

const client = new GoogleSearch('dc4f1ca011bbda57e','AIzaSyDq578MkaY3XqSxvYULBaszsg_shordbAA');
const pageStVal = 1;

//Search
const searchFunc = (pageStVal) =>{
    client.search(keyWord,  {page: pageStVal, size: 'large'}).then(images => {
        images.forEach(img => {
            console.log(img);
            let filePath = url.parse(img.url).pathname;
            let newFilePath = filePath.replace(/[^a-zA-Z0-8\.]+/g, '_');
            let localFilePath = saveDir + "/" + newFilePath;
            let pattern = /\.(jpg|png|gif)\b/; 
            
            // 파일길이가 200 미만이고 이미지 파일인지 체크
            if(newFilePath.length<200 && pattern.test(newFilePath)){
                try {
                    request.get(img.url).on('error', function(err) {
                        console.log('request error1:', err);
                    }).pipe(
                        fs.createWriteStream(localFilePath).on('close', function() {})
                    );
                } catch (err) {
                    console.log('request error2:', err);
                }
            };
        });
        compareTwoVal(pageStVal, pageEndVal);
    }).catch(error => {
        console.log(">>>>>>>>>>>>>>>>>>>"+error);
        console.log("모든 이미지를 수집했습니다.");
        makeImgToZip();
        return;
    });
}