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

  app.post('/upload_file', multer().single('fileUploaded'), function(req, res, next) {

    //got the file finally
    console.log(req.file);

    //uploading it to aws
    aws.config.loadFromPath('./aws_config.json');

    var s3 = new aws.S3();

    s3.createBucket({Bucket: 'test-js-sdk123'}, function() {

      var timestamp = new Date().getTime();
      var newFileName = timestamp + req.file.originalname;

      //Delete the below two variables if you don't want to update your database
      var originalFileName = req.file.originalname;
      var userId = req.body.userId; //Set it according to the id you want to search for update on databases

      var params = {Bucket: 'test-js-sdk123', Key: newFileName, Body: req.file.buffer};
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
          res.json({error: 'AWS connection error'});
        } else {
          console.log("File Successfully Uploaded.");
          res.json({success: 'File Successfully Uploaded.'});

          //Upload the file name and other details to database
          //Delete this function if you don't want to update your database.
          updateDatabase(userId, newFileName, originalFileName);
        }
      });
    });

  });
});

function updateDatabase(userId,fileName, originalFileName) {
  //Function for uploading file data to your database
  console.log("Updating Database.");
  console.log("\tUserId: " + userId + "\n\tNewFileName: " + fileName + "\n\tOriginalFileName: " + originalFileName);
  //Do something - upload it to rethinkDB or MySQL -> write your database connection and query functions here.

  console.log("Database Updated.");
  return true;
}
