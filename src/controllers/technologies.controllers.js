const pool = require('../db');

const getAllTechnologies = async (req, res, next) => {
    try {
        const allTechnologies = await pool.query('SELECT * FROM technologies;');
        res.json(allTechnologies.rows);
    } catch(err) {
        next(err);
    }
};

const getSingleTechnology = async (req, res, next) => {
    try {
        const technology_id = req.params.id;
        const technology = await pool.query(`SELECT * FROM technologies WHERE id = ${technology_id};`);

        if (technology.rows.length === 0) return res.status(404).json({
            message: 'technology not found'
        });
        res.json(technology.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createTechnology = async (req, res, next) => {
    const { tags, title, description } = req.body;

    try {

        const technology = await pool.query(`SELECT * FROM technologies WHERE title = '${req.body.title}'`);

        if (technology.rows[0]) return res.status(400).json({ message: "technology already created" });

        const query = 'INSERT INTO technologies (tags, title, description) VALUES ($1::text[], $2, $3) RETURNING *';
        const result = await pool.query(query, [tags, title, description]);

        res.status(200).json({ message: 'successfully created' });
    } catch (error) {
        next(error);
    };
};

const deleteTechnology = async (req, res, next) => {
    const technology_id = req.params.id;

    try {
        const result = await pool.query(`DELETE FROM technologies WHERE id = ${technology_id};`);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'technology not found'
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateTechnology = async (req, res, next) => {
    try {
        const technology_id = req.params.id;
        const { tags, title, description } = req.body;

        const query = "UPDATE technologies SET tags = '$1', title = '$2', description = '$3' WHERE id = $4} RETURNING * ;"
        const result = await pool.query(query, [tags, title, description, technology_id]);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'technology not found'
        });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTechnologies,
    getSingleTechnology,
    createTechnology,
    deleteTechnology,
    updateTechnology
};