import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;
process.env.port;

import initViewEngine from "./config/viewEngine";
import apiRoute from "./routes/apiRoute";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

initViewEngine(app);
apiRoute(app);

app.listen(port, () => {
  console.log("listening on port " + port);
});
