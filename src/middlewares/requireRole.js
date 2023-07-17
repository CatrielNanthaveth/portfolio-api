const jwt = require('jsonwebtoken');

function requireRole(role) {
    return (req, res, next) => {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
  
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token inválido' });
        }
  
        if (decoded.role !== role) {
          return res.status(403).json({ message: 'Acceso prohibido' });
        }
  
        next();
      });
    };
  }

module.exports = {
    requireRole
};