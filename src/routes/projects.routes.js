const { Router } = require('express');

const router = Router();

router.get('/projects', getAllProjects);

router.get('/project/:id', getSingleProject);

router.post('/project', createProject);

router.delete('/project/:id', deleteProject);

router.put('/project/:id', updateProject);

module.exports = router;