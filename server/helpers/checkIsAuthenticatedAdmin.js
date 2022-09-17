//protect routes where the user is not authorized
const checkIsAuthenticatedAdmin = (req, res, next) => {
    console.log(req.user.user_level)
    console.log(req.is)
    if(req.isAuthenticated() && req.user.user_level === 'admin') {
        console.log('hit')
        next();
    } else {
        res.status(401).send({msg: 'User is an authorized to access this resource', link: '/login'});
    }   
}

module.exports = checkIsAuthenticatedAdmin;