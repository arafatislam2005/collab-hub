import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Image files
  if (file.fieldname === 'previewImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
  // Model files
  else if (file.fieldname === 'modelFile') {
    const allowedMimes = [
      'application/octet-stream',
      'model/stl',
      'model/obj',
      'model/gltf+json'
    ];
    const ext = path.extname(file.originalname).toLowerCase();

    if (['.stl', '.obj', '.gltf', '.glb'].includes(ext) || allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .stl, .obj, or .gltf files are allowed'), false);
    }
  } else {
    cb(null, true);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});
