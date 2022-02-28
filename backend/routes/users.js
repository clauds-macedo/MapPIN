const router = require("express").Router();
const USER = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const crypt = await bcrypt.genSalt(10);
    const ENCRYPTED_PASS = await bcrypt.hash(req.body.pass, crypt);

    const NEW_USER = new USER({
      user: req.body.user,
      email: req.body.email,
      pass: ENCRYPTED_PASS,
    });

    const saveUser = await NEW_USER.save();

    res.status(200).json(saveUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await USER.findOne({ user: req.body.user });

    const passwordCompare = await bcrypt.compare(req.body.pass, user.pass);

    !user || !passwordCompare
      ? res.status(400).send("Invalid name or password.")
      : res.send("Valid login.");

  } catch (e) {
    res.status(500);
  }
});

router.patch("/changeEmail", async (req, res) => {
  try {
    let userEmail = await USER.findOne({ email: req.body.email })
    !userEmail 
    ? 
    res.status(400).send("Invalid email")
    :
    userEmail = await USER.updateOne({ email: req.body.email }, { email: req.body.newEmail })
    res.send("Succesfully changed")
    

    } catch (e) {res.status(500)}
});

module.exports = router;
