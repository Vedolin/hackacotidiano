var request = require("request");
const ip = "http://35.224.3.188:8080/"
upload = require('./upload');
    
limparStr = (str) =>{
    return str
    .replace(/[\xE0-\xE6]/g, 'a')
    .replace(/[\xE8-\xEB]/g, 'e')
    .replace(/[\xEC-\xEF]/g, 'i')
    .replace(/[\xF2-\xF6]/g, 'o')
    .replace(/[\xF9-\xFC]/g, 'u')
    .replace(/[\xC0-\xC6]/g, 'A')
    .replace(/[\xC8-\xCB]/g, 'E')
    .replace(/[\xCC-\xCF]/g, 'I')
    .replace(/[\xF9-\xFC]/g, 'O')
    .replace(/[\xD9-\xDC]/g, 'U')
    .replace(/\xC7/g, 'C')
    .replace(/\xE7/g, 'c')
    .replace(/\xD1/g, 'N')
    .replace(/\xF1/g, 'n')
}

getFunc = (res2) => {
    console.log(upload.coisas.desc)
    desc = limparStr(upload.coisas.desc)
    desc = desc.replace(/ /g, '%20')
    url = ip + "?desc="+desc+"&qtRet="+upload.coisas.qtRet;
    console.log(url)
    request.get(url, function (err, res, body) {
        if (!err  && body[0] != '<') {
            var resultsObj = JSON.parse(body.replace(/'/g, '"'));
            res2.render("result2", {
                title: "Upload Result",
                entitiyIDs: resultsObj
            });
        } else 
            console.log('Deu erro');
    });
}


//////////////////////////////////////////////////////////////////////////////////

postFunc = (res2) => {
    upload.coisas.desc = limparStr(upload.coisas.desc)
    upload.coisas.desc = upload.coisas.desc.replace(/ /g, '%20')
    request.post({ url: ip, method: "POST", json: true, body: upload.coisas}, function (err, response, body){
        if (!err  && body[0] != '<') {
            body = limparStr(body)
            var resultsObj = JSON.parse(body.replace(/'/g, '"'));
            res2.render("result2", {
                title: "Upload Result",
                entitiyIDs: resultsObj
            });
        } else 
            console.log(body);
    });
}
//////////////////////////////////////////////////////////////////////////////////



exports.index = function(req, res) {
    postFunc(res)
};

