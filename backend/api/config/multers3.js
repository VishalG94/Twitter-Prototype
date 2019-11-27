const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()

aws.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
})
const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'twitter-prototype',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            // cb(null, { fieldName: file.fieldname });
            cb(
                null,
                {
                    fieldName: file.fieldname +
                        '_' +
                        Date.now() +
                        path.extname(file.originalname) +
                        '.png'
                }
            )
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'onclick',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage');
/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



module.exports = upload;