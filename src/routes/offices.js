
import express from 'express'
import { Office } from '../database/models'
const officeRoute = express.Router()

officeRoute.post('/offices/new', async (req, res) => {

    const { country, state, address, office_name, office_type } = req.body 
    try {
        const office = await Office.create({ country, state, address, office_name, office_type })
        return res.json(office)        
    } catch (error) {
        console.log({Error: error})
        return res.status(500).json(error)
    }
})

export default officeRoute
