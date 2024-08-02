import loginClass from '../class/loginClass.js'

export const login = async(req,res) =>{
    try {
        const loginValidate = new loginClass();
        const body = req.body;
        const values = [
            body.username,
            body.password,
        ];
        let resulLogin = await loginValidate.loginUser(values);
        if(resulLogin){
            return await res.status(200).json({message: resulLogin})
        }
       
    } catch (error) {
        console.log(error);
    }
} 