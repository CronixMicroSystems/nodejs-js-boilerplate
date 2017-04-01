'use strict'
const Promise = require('promise')
const db = require('../../database/models')
const jimp = require('jimp')
const md5 = require('md5')
const fs = require('fs')

const imageDir = 'uploads/images/'
const dir = 'uploads'

function createDir (type) {
  !fs.existsSync(dir) && fs.mkdirSync(dir)
  if (type === 'image') {
    !fs.existsSync(imageDir) && fs.mkdirSync(imageDir)
  }
}

module.exports = {

  Image: data => {
    createDir('image')
    console.log('data', data)
    return new Promise((resolve, reject) => {
      jimp.read(data.files[0].path)
        .then(image => {
          const hash = image.hash() + '.jpeg'
          image.write(imageDir + hash)
          resolve({ success: true, hash: hash })
        })
        .catch(err => {
          reject({ err: err })
        })
    })
  },
  File: file => {
    createDir()
    console.log('=====>', file)
    return new Promise((resolve, reject) => {
      fs.readFile(file.files[0].path, (err, data) => {
        err && reject(err)
        const link = md5(file.files[0].name)
        fs.writeFile(`${dir}/${link}`, data, (err) => {
          err && reject(err)
          resolve({ success: true, link: link })
        })
      })
    })
  },
  type: data => {
    return new Promise((resolve, reject) => {
      let attachmentId = null
      if (data.attachmentId) {
        attachmentId = data.attachmentId
        resolve({success: true, attachmentId: attachmentId})
      }
      if (data.link) {
        db.Attachment.findOrCreate({
          where: { link: data.link },
          defaults: Object.assign({
            type: 'doc'
          }, data || {}),
          attributes: ['id']
        }).then(ok => {
          attachmentId = ok[0].dataValues.id
          resolve({success: true, attachmentId: attachmentId})
        })
      }
    })
  }
}
