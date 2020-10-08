import en from "element-ui/src/locale/lang/en";

const BlockFileSize = 3 * 1024 * 1024

//const BlockFileSize = 1 * 1024
export default class UploadUtils {

    static MaxEncryptSize = 2024 * 1024 * 1024

    static splitFile(uploadFile) {
        let allLength = uploadFile.size;
        let blockNum = parseInt(allLength / BlockFileSize);

        let index = 0;
        let start = 0;
        let end = start + BlockFileSize;
        let blockFileList = [];
        for (index = 0; index < blockNum; index++) {
            const fileBlock = uploadFile.slice(start, end);

            let obj = {
                file: fileBlock,
            }

            blockFileList.push(obj);
            start = (index + 1) * BlockFileSize
            end = start + BlockFileSize
        }
        if (allLength % BlockFileSize != 0) {
            const endBlock = uploadFile.slice(start, uploadFile.size);
            let obj = {
                file: endBlock
            }
            blockFileList.push(obj)
        }
        return blockFileList;
    }
}