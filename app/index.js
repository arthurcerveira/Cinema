const express = require("express");
var cors = require("cors");

const app = express();
const port = 5000;

const router = require("./routers");

app.use(cors());

app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
