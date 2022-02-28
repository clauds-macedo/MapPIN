const router = require("express").Router();
const PIN = require("../models/Pins");

router.post("/", async (req, res) => {
    const NEW_PIN = new PIN(req.body);
    try{
        const SAVED_PIN = await NEW_PIN.save();
        res.status(200).send(req.body);
    } catch (e) { res.status(500).json(e) }
})

router.get("/", async (req, res) => {
    try {
      const pins = await PIN.find();
      res.status(200).send(pins);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = router