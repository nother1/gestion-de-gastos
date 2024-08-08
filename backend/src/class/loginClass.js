/*
    Documentacion completa ubicada en ../docs/login.md
*/
import { conn } from "../home/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
class loginClass{
    async loginUser(values){
        try {
            const connection = await conn.getConnection();
            const sql = "SELECT * FROM Users WHERE email = ?"
            const [result] = await connection.query(sql, values[0]);
            const compareHash = result[0].password
            let trueOrFalse = await bcrypt.compare(values[1], compareHash);
            if (trueOrFalse) {
                const userEmail = values[0];
                const token = jwt.sign({ userEmail }, process.env.SECRET_KEY, { expiresIn: '24h' });
                return token;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default loginClass;