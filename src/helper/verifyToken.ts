import { getUserData } from "./getUserData";



export function verifyToken(){

    const userData=getUserData()

    const config={
        headers:{
            Accept:"application/json",
            'Content-Type':'application/json',
            Authorization: 'Bearer ' + userData?.token
        }
    }

    return config
}