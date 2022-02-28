const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const env = require("dotenv");
const PIN_ROUTE = require("./routes/pins")
const USER_ROUTE = require("./routes/users")


const app = express();
const port = 3000;

env.config();
app.use(cors({
  origin: "*"
}))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("MONGO TESTING")
}).catch((e) => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/v1/users", USER_ROUTE)
app.use("/v1/pins", cors(), PIN_ROUTE)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})