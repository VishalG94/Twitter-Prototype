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
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})
const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'twitter8',
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
            cb(null, file.fieldname +

                '_' +
                Date.now() +
                path.extname(file.originalname) +
                '.png')
        }
    })
})

module.exports = upload;