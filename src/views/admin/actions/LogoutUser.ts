import { APP } from "@/shared/App";
import { verifyToken } from "@/helper/verifyToken";

 export type LogoutResponseType={
    message:string
}

export async function logoutUserHttp(userId:number){

    const {headers}=verifyToken()
    return new Promise<LogoutResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/logout`,{
            method: "POST",
            headers:headers,
            body: JSON.stringify({userId:userId})
        })
        const data = await res.json()

        if(!res.ok){
            reject(data)
        }
        resolve(data)
    })
}