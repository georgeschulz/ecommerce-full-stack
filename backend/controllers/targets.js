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

const getPestList = async (req, res) => {
    try {
        const pestListQuery = await db.query(queries.getPestList);
        const pestList = pestListQuery.rows.map(pest => {
            return {"text": pest.pest_name, "value": pest.pest_name}
        });
        res.status(200).send(pestList)
    } catch (e) {
        res.status(404).send({msg: 'Error loading pest list', data: [{text: "", value: null}]})
    }
}

module.exports = {
    getTargetsForHomePage,
    getTargetsForWizardPage,
    getPestList
}