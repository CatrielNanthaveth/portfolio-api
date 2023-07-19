const pool = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });

const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await pool.query('SELECT * FROM users;');
        res.json(allUsers.rows);
    } catch (error) {
        next(error);
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await pool.query(`SELECT * FROM users WHERE id = ${user_id};`);

        if (user.rows.length === 0) return res.status(404).json({
            message: 'user not found'
        });
        res.json(user.rows[0]);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    const { email, username, password, role } = req.body;

    try {

        const user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);

        if (user.rows[0]) return res.status(400).json({ message: "Account already created" });

        const query = "INSERT INTO users (email, username, password, role) VALUES ('$1', '$2', '$3', '$4::text[]') RETURNING * ;"
        const result = await pool.query(query, [email, username, password, role]);
        const token = jwt.sign({ id: result.rows[0].id, role: result.rows[0].role }, process.env.SECRET, {
            expiresIn: 86400 //24 horas
        })

        res.json({ token });
    } catch (error) {
        next(error);
    };
};

const deleteUser = async (req, res, next) => {
    const user_id = req.params.id;

    try {
        const result = await pool.query(`DELETE FROM users WHERE id = ${user_id};`);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'user not found'
        });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const { email, username, password, role } = req.body;

        const query = "UPDATE users SET email = '$1', username = '$2', password = '$3', role = '$4::text[]' WHERE id = $5 RETURNING * ;"
        const result = await pool.query(query, [email, username, password, role, user_id]);

        if (result.rowCount === 0) return res.status(404).json({
            message: 'user not found'
        });

        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
};