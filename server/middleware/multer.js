import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Use 'fileURLToPath' and 'dirname' to get the directory of the current module
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the images directory correctly
const imagesDir = path.join(__dirname, '../client/src/images'); // Ensure this points to your images folder

// Create the images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesDir); // Use the correct path to the images directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage });

export default upload;
