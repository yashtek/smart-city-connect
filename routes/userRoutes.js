const { createUser, getUser, updateUser, deleteUser } = require('../Controllers/userController');
const auth = require('../middleware/userAuth');
const router = require('express').Router();

router.post('/create',auth,createUser);
router.get('/get-user',auth,getUser);
router.post('/update-user',auth,updateUser);
router.delete('/delete-user',auth,deleteUser);

module.exports = router;