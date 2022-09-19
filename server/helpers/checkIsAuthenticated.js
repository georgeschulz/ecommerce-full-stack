//protect routes where the user is not authorized
const checkIsAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.status(401).send({msg: 'User is an authorized to access this resource', link: '/login'});
}

module.exports = checkIsAuthenticated;