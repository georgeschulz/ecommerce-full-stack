const db = require('../db');
const queries = require('../queries');

const getTargetsForHomePage = async (req, res) => {
    const targetQuery = await db.query(queries.getTargetsForHomePage);
    const result = targetQuery.rows;

    res.status(200).send(result)
}

const getTargetsForWizardPage = async (req, res) => {
    const targetQuery = await db.query(queries.getTargetsForWizardPage);
    const result = targetQuery.rows;

    res.status(200).send(result)
}

module.exports = {
    getTargetsForHomePage,
    getTargetsForWizardPage
}