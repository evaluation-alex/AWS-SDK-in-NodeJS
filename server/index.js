var express = require('express');
var http = require('http');
var io = require('socket.io');
var aws = require('aws-sdk');
var multer = require('multer');
var bodyParser = require('body-parser');

var app = express();
//Specifying the public folder of the server to make the html accesible using the static middleware
app.use(express.static('../'));
app.use(bodyParser.json());
//Server listens on the port 8124
var server = http.createServer(app).listen(8080);
/*initializing the websockets communication , server instance has to be sent as the argument */
io = io.listen(server);

io.sockets.on("connection", function(socket){

  console.log("Connection Established.");

  app.post('/upload_file', multer().single('fileUploaded'), function(req, res) {

    //got the file finally
    console.log(req.file);

    //uploading it to aws
    aws.config.loadFromPath('./aws_config.json');

    var s3 = new aws.S3();

    s3.createBucket({Bucket: 'test-js-sdk123'}, function() {
      var params = {Bucket: 'test-js-sdk123', Key: req.file.originalname, Body: req.file.buffer};
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully uploaded data to myBucket/myKey");
        }
      });
    });

  });
});
