const express = require('express');
const router = express.Router();
const Veiculo = require('../models/Veiculo'); 

router.post('/', async (req, res) => {
    const { marca, modelo } = req.body; 
    const newVeiculo = new Veiculo({ marca, modelo }); 
    await newVeiculo.save();
    res.json(newVeiculo);
});

router.get('/', async (req, res) => {
    const veiculos = await Veiculo.find();
    res.json(veiculos);
});

router.put('/:id', async (req, res) => {
    const { marca, modelo } = req.body; 
    const updatedVeiculo = await Veiculo.findByIdAndUpdate(req.params.id, { marca, modelo }, { new: true });
    res.json(updatedVeiculo);
});


router.delete('/:id', async (req, res) => {
    await Veiculo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Veículo deletado com sucesso!' });
});

module.exports = router;
