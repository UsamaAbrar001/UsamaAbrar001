const { Router } = require('express');
const { submit, list, markRead, remove } = require('../controllers/contactController');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.post('/', submit);
router.get('/', authenticate, list);
router.patch('/:id/read', authenticate, markRead);
router.delete('/:id', authenticate, remove);

module.exports = router;
