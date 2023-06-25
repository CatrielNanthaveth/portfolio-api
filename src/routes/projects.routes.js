const { Router } = require('express');
const { getAllProjects, getSingleProject, createProject, updateProject, deleteProject } = require('../controllers/projects.controllers');

const router = Router();

router.get('/projects', getAllProjects);

router.get('/projects/:id', getSingleProject);

router.post('/projects', createProject);

router.delete('/projects/:id', deleteProject);

router.put('/projects/:id', updateProject);

module.exports = router;