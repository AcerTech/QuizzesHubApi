
module.exports = function (req, res, next) { 
  // 401 Unauthorized
  // 403 Forbidden 
  
  if (req.user.role != 'admin' && req.user.role != 'editor') return res.status(403).send('Access denied, you are not authorized. Call admin or editor.');

  next();
}