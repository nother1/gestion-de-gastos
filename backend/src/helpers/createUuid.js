import { v4 as uuidv4 } from 'uuid';
export const createUuid = async(req,res) => {
    return uuidv4();
}