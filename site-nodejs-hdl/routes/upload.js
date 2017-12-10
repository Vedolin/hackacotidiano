 var _ = require('underscore'),
 	AWS = require('aws-sdk'),
 	fs = require('fs'),
 	path = require('path'),
	 flow = require('flow');
	 const delay = require('delay');

 configPath = path.join(__dirname, '..', "config.json");

 AWS.config.loadFromPath(configPath);

 exports.s3 = function(req, res) {
	console.log(req.body)
 	var s3 = new AWS.S3(),
 		file = req.files,
 		result = {
 			error: 0,
 			uploaded: []
 		};
	
	teste = (num) => {
 	flow.exec(
 		function() { 
 			fs.readFile(file[num].path, this);
 		},
 		function(err, data) {
 			s3.putObject({
 				Bucket: 'teste-teste-poli', 
 				Key: file[num].originalname, 
 				Body: data
 			}, this);
		 },
 		function(err, data) {
 			if (err) {
 				console.error('Error : ' + err);
 				result.error++;
 			}
 			result.uploaded.push(data.ETag);
 			this();
		 });
		
	}
	for(j = 0; j < file.length; j++){
		teste(j)
	}

exports.coisas = req.body;
	
		res.render("result", {
			title: "Upload Result",
			coisas: req.body
		});
		//return res.redirect('/webhook');
 };

