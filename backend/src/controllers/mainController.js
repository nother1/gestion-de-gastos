import QueryDatabase from '../database/query.js';

export const mainController = async(req,res) =>{
    try {
        const innitDatabase = new QueryDatabase();
        innitDatabase.createDatabase();
        res.status(200).json({message: "Success!"});
        console.log("Welcome to hell");
    } catch (error) {
        console.log(error);
    }
} 