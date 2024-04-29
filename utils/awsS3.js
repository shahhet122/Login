const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { awsRegion, awsAccessKey, awsSecretAccessKey, awsBucketName } = require('../config/keys');
const generateCode = require('./generateCode');

const client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey,
        secretAccessKey: awsSecretAccessKey
    }
});


const uploadFiletoS3 = async ({ file, ext }) => {
    const Key = `${generateCode(12)}_${Date.now()}${ext}`;
    const params = {
        Bucket: awsBucketName,
        Body: file.buffer,
        Key,
        ContentType: file.mimetype
    };
    const command = new PutObjectCommand(params);
    try {
        await client.send(command);
        return Key;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { uploadFiletoS3 };