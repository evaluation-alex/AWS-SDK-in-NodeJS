# NodeJS-to-AWS-S3-Bucket

A JavaScript API for sending files to AWS S3 Bucket which are uploaded via a html form and submitted to NodeJS server.

<img src ="https://img.shields.io/badge/Language-JavaSript-blue.svg" />
<img src ="https://img.shields.io/badge/Platform-NodeJS-brightgreen.svg" />
<img src ="https://img.shields.io/badge/AWS-S3-orange.svg" />
<img src ="https://img.shields.io/badge/Status-Complete-green.svg" />

---

## Setting Up Environment

Install `NodeJS` and `npm` before starting.

Our folder setup here is something like this:

```sh
|--server
|   |--package.json
|   |--aws_config.json
|   |--index.js
|
|--index.html
|--script.js
```

Here `index.html` and `script.js` are client files, which our server will server. And all the server related files are saved in `server` folder.

Now got to your terminal and switch to the folder where you have cloned this repository.

```sh
$ cd server
$ npm install
```

Now you need to go change the values in `aws_config.json` file:

```json
{
  "accessKeyId": "YourAccessKeyId",
  "secretAccessKey": "YourSecretAccessKey",
  "region": "YourBucketRegion"
}
```

For `accessKeyId` and `secretAccessKey`, please visit http://console.aws.amazon.com and click the `services` tab on the top and find `Security & Identity`, now click `IAM`. Go to `Users` and click `Create Access Key`, and download the `credentials.csv`. This file contain both the accessKeyId and secretAccessKey.

Now for `region`, specify the region in which your bucket is present, such as `ap-south-1` or `us-east-1`. You can find your region code here: http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region

Now open `index.js` file and change `BucketName` to the name of your S3 Bucket on line number `31` and `40`:

```javascript
31: s3.createBucket({Bucket: 'BucketName'}, function() {

40: var params = {Bucket: 'BucketName', Key: newFileName, Body: req.file.buffer};
```

Now start the server like this:

```sh
$ node index.js
```

And see the output at `http://localhost:8080`.

---

## Explaining Sample

So I've provided a little sample with this, which you can download and run on your localhost. Let me quickly explain how things are working here.

#### [index.html](index.html)

This files is straight forward. You can look into the file and easily understand the html form. Only thing is we are not submitting form through regular process here we are submittin form data using `AJAX` calls.

#### [script.js](script.js)

Please look into the file and you can easily understand what is what. This file is sending form data through AJAX call to `//localhost:8080/upload_file` which is recieved by the NodeJS server.

#### [server/index.js](server/index.js)

This file is the file is the main server file. The things dome by this file are:

- Create an express app
- Create a http server at port 8080
- Get the form data using `multer` and `body-parser` modules.
- Send the file to AWS S3 Bucket using `aws-sdk` module.
- Update the database for file name or other query related stuff.

---

## The End | Thank You
