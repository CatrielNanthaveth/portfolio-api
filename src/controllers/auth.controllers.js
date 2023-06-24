const pool = require('../db');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
    const user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);

    if (!user.rows[0]) return res.status(400).json({ message: "User not found" });

    
    if (!(user.rows[0].password === req.body.password)) return res.status(401).json({ token: null, message: "Invalid password" });
    const token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET, {
        expiresIn: 86400 //24 horas
    })
    res.json({ token });
};

module.exports = {
    signIn
};