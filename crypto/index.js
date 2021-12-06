const CryptoJS = require("crypto-js");

const key = 'aweosomepen666@standardEncryption'

exports.encrypt = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}


exports.decrypt = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}