const { Router } = require('express');

const router = Router();

router.get('/technologies', getAllTechnologies);

router.get('/technology/:id', getSingleTechnology);

router.post('/technology', createTechnology);

router.delete('/technology/:id', deleteTechnology);

router.put('/technology/:id', updateTechnology);

module.exports = router;