import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerAnimalConfig = {
    storage: diskStorage({
        destination: './uploads/tmp',
        filename: (req, file, callback) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `temp-${unique}${extname(file.originalname)}`);
        },
    }),
};