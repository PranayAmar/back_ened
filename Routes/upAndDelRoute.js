const router = require("express").Router();
const {deleteOrder,updateOrder} = require('../controllers/updAndDelCon');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.delete("/orders/:id",authMiddleware.userVerification,deleteOrder);
router.put("/orders/:id",authMiddleware.userVerification,updateOrder);

module.exports = router;