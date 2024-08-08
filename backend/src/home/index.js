import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mainRoutes from '../routes/main.routes.js';
import loginRoutes from '../routes/login.routes.js';
import categoriesRoutes from '../routes/categories.routes.js';
import dbConeccion from '../class/dbConnetion.js';
import {fileURLToPath} from 'node:url';
import fs  from 'node:fs';
import path from 'node:path';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT;
const logStream = fs.createWriteStream(path.join(__dirname, 'logSystem.log'));
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev",{stream:logStream}));

app.use(mainRoutes);
app.use(loginRoutes);
app.use(categoriesRoutes);

app.listen(PORT,  () => {
    console.log("Hola Mundo");
});


export const conn = new dbConeccion();
conn.connect();