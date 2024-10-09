const express = require('express');
const router = express.Router();
const Suporte = require('../models/Suporte'); 

router.post('/', async (req, res) => {
    const { title, message } = req.body;
    const newSuporte = new Suporte({ title, message });
    await newSuporte.save();
    res.json(newSuporte);
});

router.get('/', async (req, res) => {
    const suportes = await Suporte.find();
    res.json(suportes);
});

router.put('/:id', async (req, res) => {
    const { title, message } = req.body;
    const updatedSuporte = await Suporte.findByIdAndUpdate(req.params.id, { title, message }, { new: true });
    res.json(updatedSuporte);
});

router.delete('/:id', async (req, res) => {
    await Suporte.findByIdAndDelete(req.params.id);
    res.json({ message: 'Suporte deletado com sucesso!' });
});

module.exports = router;
