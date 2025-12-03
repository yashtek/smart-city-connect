const { createUser, getUser, updateUser, deleteUser } = require('../Controllers/userController');
const auth = require('../middleware/userAuth');
const router = require('express').Router();
const upload = require('../middleware/upload');

router.post('/create',auth,upload.single("profileimage"),createUser);
router.get('/get-user',auth,upload.single("profileimage"),getUser);
router.post('/update-user',auth,updateUser);
router.delete('/delete-user',auth,deleteUser);

module.exports = router;