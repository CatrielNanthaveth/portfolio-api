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
    const { email, username, password } = req.body;

    try {

        const user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);

        if (user.rows[0]) return res.status(400).json({ message: "Account already created" });

        const result = await pool.query(`INSERT INTO users (email, username, password) VALUES ('${email}', '${username}', '${password}') RETURNING * ;`);
        const token = jwt.sign({ id: result.rows[0].id }, process.env.SECRET, {
            expiresIn: 7200 //24 horas
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
        const { email, username, password } = req.body;

        const result = await pool.query(`UPDATE users SET email = '${email}', username = '${username}', password = '${password}' WHERE id = ${user_id} RETURNING * ;`);

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