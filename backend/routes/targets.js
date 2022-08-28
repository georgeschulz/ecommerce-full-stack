const express = require('express');
const targetRouter = express.Router();
const controllers = require('../controllers/targets');

//get pests for home page
targetRouter.get('/home', controllers.getTargetsForHomePage);
targetRouter.get('/wizard', controllers.getTargetsForWizardPage)

module.exports = targetRouter;