
import express from 'express';
import { Office } from '../database/models';
const officeRoute = express.Router();

officeRoute.post('/offices/new', async (req, res) => {
    const { country, state, address, officeName, officeType } = req.body
    try {
        const office = await Office.create({ country, state, address, officeName, officeType });
        console.log(office);
        return res.json(office);
    } catch (error) {
        console.log({Error: error});
        return res.status(500).json(error);
    }
});

officeRoute.get('/offices', async (req, res) => {
    try {
        const offices = await Office.findAll();
        console.log(offices);
        return res.json(offices);
    } catch (error) {
        console.log({Error: error});
        return res.status(500).json(error);
    }
});

export default officeRoute;
