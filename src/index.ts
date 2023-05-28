import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(router);

app.listen(port, () => {
  console.log(`️Server is running at http://localhost:${port}`);
});
