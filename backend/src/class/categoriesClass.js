/*
    Documentacion completa ubicada en ../docs/categories.md
*/
import { conn } from "../home/index.js";

class categoriesClass{
    async createCategories(tipo_categoria, porcentaje, descripcion, userEmail){
        try {
            const connection = await conn.getConnection();
            
          
        } catch (error) {
            console.error(error);
        }
    }
}

export default categoriesClass;