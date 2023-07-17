const { Router } = require('express');
const { getAllProjects, getSingleProject, createProject, updateProject, deleteProject } = require('../controllers/projects.controllers');
const { requireRole } = require('../middlewares/requireRole');

const router = Router();

router.get('/projects', getAllProjects);

router.get('/projects/:id', getSingleProject);

router.post('/projects', requireRole('admin'), createProject);

router.delete('/projects/:id', requireRole('admin'), deleteProject);

router.put('/projects/:id', requireRole('admin'), updateProject);

module.exports = router;