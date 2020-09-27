export default class FileUtils {

    static getFileSize(size, fixDigits = 1) {
        let gsize = (size / Math.pow(1024, 3)).toFixed(fixDigits);
        if (gsize > 1)
            return gsize + "GB";
        let msize = (size / Math.pow(1024, 2)).toFixed(fixDigits);
        if (msize > 1)
            return msize + "MB";
        let ksize = (size / Math.pow(1024, 1)).toFixed(fixDigits);
        if (ksize > 1)
            return ksize + "KB";

    }
}