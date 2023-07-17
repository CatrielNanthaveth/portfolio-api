const { Router } = require('express');
const { getAllUsers, getSingleUser, createUser, deleteUser, updateUser } = require('../controllers/users.controllers');
const { requireRole } = require('../middlewares/requireRole');

const router = Router();

router.get('/users', getAllUsers);

router.get('/users/:id', getSingleUser);

router.post('/users', createUser);

router.delete('/users/:id', requireRole('admin'), deleteUser);

router.put('/users/:id', requireRole('admin'), updateUser);

module.exports = router;