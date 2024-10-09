const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.post('/', async (req, res) => {
    const { name, email } = req.body; 
    const newUser = new User({ name, email }); 
    await newUser.save();
    res.json(newUser);
});

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.put('/:id', async (req, res) => {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true }); 
    res.json(updatedUser);
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuário deletado com sucesso!' });
});

module.exports = router;
