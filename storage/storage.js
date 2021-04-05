const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const random = Math.round(Math.random() * 1E9).toString();
        const uniqueSuffix = Date.now() + '-' + random;
        cb(null, file.fieldname + '-' + uniqueSuffix + ".jpg");
    }
})
const deleteFile = (path) => {
    fs.unlinkSync(path);
}

const upload = multer({ storage: storage })

module.exports = { upload, deleteFile };