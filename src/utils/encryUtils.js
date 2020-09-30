'use strict'

import cryptoJs from 'crypto-js'


export default {
    // 加密函數
    encrypt(word, password) {
        console.log(word)

        let key = cryptoJs.enc.Hex.parse(password)
        let enc = ''
        if (typeof word === 'string') {
            enc = cryptoJs.AES.encrypt(word, key, {
                // iv: iv
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        } else if (typeof word === 'object') {
            let data = JSON.stringify(word)
            enc = cryptoJs.AES.encrypt(data, key, {
                // iv: iv
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        }
        let encResult = enc.ciphertext.toString()
        return encResult
    },
    // 解密函數
    decrypt(word, password) {
        let key = cryptoJs.enc.Hex.parse(password)
        let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
            // vi: vi
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        })
        let decData = cryptoJs.enc.Utf8.stringify(dec)
        return decData
    }
}