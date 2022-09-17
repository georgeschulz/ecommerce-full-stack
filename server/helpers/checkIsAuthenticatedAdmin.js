//protect routes where the user is not authorized
const checkIsAuthenticatedAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.user_level === 'admin') {
        next();
    } else {
        res.status(401).send({msg: 'User is an authorized to access this resource', link: '/login'});
    }   
}

module.exports = checkIsAuthenticatedAdmin;