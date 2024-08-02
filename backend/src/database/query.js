import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import {conn} from '../home/index.js'



class QueryDatabase{
    async createDatabase(){
        try {
            const connection = await conn.getConnection();
            await connection.query('CREATE DATABASE IF NOT EXISTS gestiongastos');
            // Use the database
            await connection.query('USE gestiongastos');

            await connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                  uuid VARCHAR(36) PRIMARY KEY,
                  email VARCHAR(255) NOT NULL unique,
                  password VARCHAR(255) NOT NULL
                );
            `);
            const userUuid = uuidv4();
            const myPlaintextPassword = '1508';
            const saltRounds = 10
            const passwordHash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
            const queryUser = "INSERT INTO Users(uuid, email, password) VALUES(?, ?, ?);"
            const valuesUser = [
                userUuid,
                'jhonatanpereanez@gmail.com',
                passwordHash,
            ];
            await connection.query(queryUser, valuesUser);

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default QueryDatabase;