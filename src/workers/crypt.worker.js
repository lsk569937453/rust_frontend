import cryptoJs from 'crypto-js'
import CryptoJS from "crypto-js";
import pako from "pako";

const workerFunctions = new Map([
    ['encrypt', encrypt],
    ['encryptFile', encryptFile],
    ['decrypt', decrypt]
]);

onmessage = function (message) {
    let data = message.data;
    let messageType = data.method;
    let args = data.args;
    postMessage(workerFunctions.get(messageType)(args[0], args[1]));
};

function encryptFile(reader, password) {
    let buffer = Buffer.from(reader);
    buffer = buffer.toString("base64")
    let entrString = encrypt(buffer, password)

    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(entrString));
    var deflateData = pako.deflate(encData, {to: 'string'})

    let arra = str2ab(deflateData);
    var encryptedFile = new File([arra], "file.name", null);
    // console.log("first has done" + new Date())

    return encryptedFile


}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

// 加密函數
function encrypt(word, password) {

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
}

// 解密函數
function decrypt(word, password) {
    let key = cryptoJs.enc.Hex.parse(password)
    let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
        // vi: vi
        mode: cryptoJs.mode.ECB,
        padding: cryptoJs.pad.Pkcs7
    })
    let decData = cryptoJs.enc.Utf8.stringify(dec)
    return decData
}