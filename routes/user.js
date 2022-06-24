const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.login);
router.get('/login', userController.login);
router.get('/~', userController.getPage);
router.get('/hello', userController.hello);
router.get('/logout',userController.logout)
router.post('/auth', userController.auth);
router.post('/newpost', userController.newpost);
router.post('/follow', userController.follow);
router.post('/unfollow', userController.unfollow);
router.get('/unfollow', userController.unfollow);
router.get('/friends', userController.friends);
// router.get('/unfollow', userController.unfollow);
router.post('/search', userController.search);
router.post('/visit', userController.visit);
router.get('/myprofile', userController.profile);
module.exports = router
