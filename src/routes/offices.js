import express from 'express';
import { Office } from '../database/models';

const officeRoute = express.Router();

officeRoute.post('/offices/new', async (req, res) => {
  const {
    country,
    state,
    address,
    officeName,
    officeType
  } = req.body;
  try {
    const office = await Office.create({
      country, state, address, officeName, officeType
    });
    // eslint-disable-next-line no-console
    console.log(office);
    return res.status(201).json(office);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ Error: error });
    return res.status(500).json(error);
  }
});

officeRoute.get('/offices', async (req, res) => {
  try {
    const offices = await Office.findAll();
    // eslint-disable-next-line no-console
    console.log(offices);
    return res.status(200).json(offices);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ Error: error });
    return res.status(500).json(error);
  }
});

export default officeRoute;
