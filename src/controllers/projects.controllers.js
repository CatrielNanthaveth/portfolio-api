const pool = require('../db');

const getAllProjects = async (req, res, next) => {
    try {
        const allProjects = await pool.query('SELECT * FROM projects;');
        res.json(allProjects.rows);
    } catch(err) {
        next(err);
    }
};

const getSingleProject = async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const project = await pool.query(`SELECT * FROM projects WHERE id = ${project_id};`);

        if (project.rows.length === 0) return res.status(404).json({
            message: 'project not found'
        });
        res.json(project.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createProject = async (req, res, next) => {
    const { tags, title, description, url } = req.body;

    try {

        const project = await pool.query(`SELECT * FROM projects WHERE title = '${req.body.title}'`);

        if (project.rows[0]) return res.status(400).json({ message: "project already created" });

        const result = await pool.query(`INSERT INTO projects (tags, title, description, url) VALUES ('${tags}', '${title}', ${description}, '${url}') RETURNING * ;`);
        res.status(200).json({ message: 'successfully created' });
    } catch (error) {
        next(error);
    };
};

const deleteProject = async (req, res, next) => {
    const project_id = req.params.id;

    try {
        const result = await pool.query(`DELETE FROM projects WHERE id = ${project_id};`);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'project not found'
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const project_id = req.params.id;
        const { tags, title, description, url } = req.body;

        const result = await pool.query(`UPDATE projects SET tags = '${tags}', title = '${title}', description = '${description}' WHERE id = ${project_id}, url = '${url}' RETURNING * ;`);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'project not found'
        });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProjects,
    getSingleProject,
    createProject,
    deleteProject,
    updateProject
};