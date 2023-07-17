const { Router } = require('express');
const { getAllTechnologies, getSingleTechnology, createTechnology, deleteTechnology, updateTechnology } = require('../controllers/technologies.controllers');
const { requireRole } = require('../middlewares/requireRole');

const router = Router();

router.get('/technologies', getAllTechnologies);

router.get('/technologies/:id', getSingleTechnology);

router.post('/technologies', requireRole('admin'), createTechnology);

router.delete('/technologies/:id', requireRole('admin'), deleteTechnology);

router.put('/technologies/:id', requireRole('admin'), updateTechnology);

module.exports = router;