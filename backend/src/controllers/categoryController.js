/*
    Documentacion completa ubicada en ../docs/category.md
*/
import categoriesClass from '../class/categoriesClass.js'

export const createCategory = async(req,res) =>{
    try {
        const {tipo_categoria, porcentaje, descripcion} = req.body;
        const userEmail = req.userEmail;
        if (porcentaje < 0 || porcentaje > 100) {
            return res.status(400).json({ message: 'El porcentaje debe estar entre 0 y 100.' });
        }
        const categories = new categoriesClass();
        const resultCreate = await categories.createCategories(tipo_categoria, porcentaje, descripcion, userEmail);
        console.log(resultCreate);
    } catch (error) {
        console.error(error);
    }
   
    // try {
    //     const loginValidate = new loginClass();
    //     const body = req.body;
    //     const values = [
    //         body.username,
    //         body.password,
    //     ];
    //     let resulLogin = await loginValidate.loginUser(values);
    //     if(resulLogin){
    //         return await res.status(200).json({message: resulLogin})
    //     }
       
    // } catch (error) {
    //     console.log(error);
    // }
} 