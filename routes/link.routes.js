const { Router } = require('express');
const config = require('config');
const shortid = require('shortid');
const Link = require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if (existing) {
            res.json({ link: existing });
            return;
        }

        const to = `${baseUrl}/t/${code}`;

        const link = new Link({
            code,
            to,
            from,
            owner: res.user.userId
        });

        await link.save();

        res.status(201).json({ link });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Что то пошло не так" });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const link = await Link.find({ owner: res.user.userId });

        res.json(link);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Что то пошло не так" });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);

        res.json(link);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Что то пошло не так" });
    }
});

module.exports = router;