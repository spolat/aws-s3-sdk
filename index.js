const S3SDK = require("aws-sdk/clients/s3");
const config = require("config");

// Initialize s3
const s3 = new S3SDK({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.SecretAccessKey,
    params: {
        Bucket: "bucketName"
    }
});

// Get params for getting from s3
const getParams = {
    Bucket: bucketName,
    Key: "fileName",
};

function getFromS3(getParams, callback) {
    s3.getObject(getParams, function (err, result) {
        if (err) return callback(err);
        if (result) {
            if (result.Body) {
                // Veriyi çektik gerisi size kalmıs (:
            }
            else return callback("result.Body yok");
        }
        else return callback(new Error("result yok"));
    });
};

// Put params for put data to s3
const putParams = {
    Bucket: bucketName,
    Key: "fileName",
    Body: data.replace(/\r?\n?/g, '').replace(/ /g, ''), // boşlukları, yeni satırları, satır sonlarını silmek için.
    ContentType: 'application/json',
    ACL: 'public-read', // optional
};

function writeToS3(putParams) {
    s3.putObject(putParams, function (err, result) {
        if (err) throw err;
        // Veriyi yazdık.
    });
}

// Listing all bucket name, creationDate, owner info
function getListBuckets(params, callback) {
    s3.listBuckets(params, function (err, data) {
        if (err) return callback(err);
        else return callback(null, data);
        /*
        data = {
         Buckets: [
            {
           CreationDate: <Date Representation>, 
           Name: "examplebucket"
          }, 
            {
           CreationDate: <Date Representation>, 
           Name: "examplebucket2"
          }, 
            {
           CreationDate: <Date Representation>, 
           Name: "examplebucket3"
          }
         ], 
         Owner: {
          DisplayName: "own-display-name", 
          ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
         }
        }
        */
    });
}