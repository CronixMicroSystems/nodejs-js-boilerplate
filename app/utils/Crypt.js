const crypto = require('crypto')
const algorithm = 'aes-256-ctr'

const crypt = {}

crypt.encrypt = function encrypt (key, data) {
  const sha256 = crypto.createHash('sha256')
  sha256.update(key)
  const iv = crypto.randomBytes(16)
  const plaintext = new Buffer(data)
  const cipher = crypto.createCipheriv(algorithm, sha256.digest(), iv)
  let ciphertext = cipher.update(plaintext)
  ciphertext = Buffer.concat([iv, ciphertext, cipher.final()])

  return ciphertext.toString('base64')
}

crypt.decrypt = function decrypt (key, data) {
  const sha256 = crypto.createHash('sha256')
  sha256.update(key)
  const input = new Buffer(data, 'base64')
  const iv = input.slice(0, 16)
  const ciphertext = input.slice(16)
  const decipher = crypto.createDecipheriv(algorithm, sha256.digest(), iv)
  let plaintext = decipher.update(ciphertext)
  plaintext += decipher.final()
  return plaintext
}

module.exports = crypt
