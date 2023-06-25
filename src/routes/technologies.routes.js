const { Router } = require('express');
const { getAllTechnologies, getSingleTechnology, createTechnology, deleteTechnology, updateTechnology } = require('../controllers/technologies.controllers');

const router = Router();

router.get('/technologies', getAllTechnologies);

router.get('/technologies/:id', getSingleTechnology);

router.post('/technologies', createTechnology);

router.delete('/technologies/:id', deleteTechnology);

router.put('/technologies/:id', updateTechnology);

module.exports = router;