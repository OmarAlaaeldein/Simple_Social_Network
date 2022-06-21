const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.login);
router.get('/login', userController.login);
router.get('/~', userController.getPage);
router.get('/hello', userController.hello);
router.get('/logout',userController.logout)
router.post('/auth', userController.auth);

module.exports = router
