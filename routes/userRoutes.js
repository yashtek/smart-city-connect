const { createUser, getUser, updateUser, deleteUser } = require('../Controllers/userController');

const router = require('express').Router();

router.post('/create',createUser);
router.get('/get-user',getUser);
router.post('/update-user',updateUser);
router.delete('/delete-user',deleteUser);

module.exports = router;