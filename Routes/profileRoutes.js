const router = require("express").Router();
const {getProfile,  updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.get('/api/profile',authMiddleware.userVerification,getProfile);
router.put('/api/profile',authMiddleware.userVerification,updateProfile);

module.exports = router;