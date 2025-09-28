const multer = require("multer");
let path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 },
  fileFilter: (req, file, cb) => {
    const allowedExt = /\.(jpeg|png|gif|jpg)$/;
    const allowedMime = /^image\/(jpeg|png|gif|jpg)$/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;

    if (allowedExt.test(ext) && allowedMime.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only Images Allowed:jpeg,jpg,png,gif"), false);
    }
  },
});

module.exports = upload;
