const router = require('express').Router();
const Products = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const allRecords = await Products.find();

        res.status(200).json(allRecords);
    } catch (error) {
        res.status(500).json({error: error})
    }
})