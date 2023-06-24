const { Router } = require('express');
const { getAllUsers, getSingleUser, createUser, deleteUser, updateUser } = require('../controllers/users.controllers');

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getSingleUser);

router.post('/users', createUser);

router.delete('/users/:id', deleteUser);

router.put('/users/:id', updateUser);

module.exports = router;