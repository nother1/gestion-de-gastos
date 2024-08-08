import mysql from 'mysql2/promise';
import {createUuid} from '../helpers/createUuid.js'
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

            await connection.query(`
                CREATE TABLE IF NOT EXISTS categories (
                    uuid VARCHAR(36) PRIMARY KEY,
                    tipo_categoria VARCHAR(255),
                    porcentaje DOUBLE(5,2) NOT NULL,
                    descripcion LONGTEXT
                );
            `);
            
            await connection.query(`
                CREATE TABLE IF NOT EXISTS movimientos (
                    uuid VARCHAR(36) PRIMARY KEY,
                    tipo_movimiento VARCHAR(255),
                    monto INT NOT NULL,
                    fecha DATETIME NOT NULL,
                    descripcion LONGTEXT,
                    categoria_id VARCHAR(36),
                    FOREIGN KEY (categoria_id) REFERENCES categories(uuid)
                );
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS deudas (
                    uuid VARCHAR(36) PRIMARY KEY,
                    valor_actual int NOT NULL,
                    valor_con_intereses int ,
                    fecha_inicio Datetime NOT NULL,
                    fecha_fin datetime,
                    descripcion longtext
                );
            `);

            await connection.query(`
                CREATE TABLE IF NOT EXISTS ingresos (
                    uuid VARCHAR(36) PRIMARY KEY,
                    monto int NOT NULL,
                    fecha datetime,
                    descripcion longtext,
                    fuente varchar(50)
                );
            `);

            const userUuid = await createUuid();
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