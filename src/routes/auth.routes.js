const { Router } = require('express');
const { signIn } = require('../controllers/auth.controllers');

const router = Router();

router.post('/auth/signin', signIn);

module.exports = router;