const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const { list, getBySlug, create, update, remove } = require('../controllers/blogController');
const { authenticate } = require('../middleware/auth');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get('/', list);
router.get('/:slug', getBySlug);
router.post('/', authenticate, upload.single('cover'), create);
router.put('/:id', authenticate, upload.single('cover'), update);
router.delete('/:id', authenticate, remove);

module.exports = router;
