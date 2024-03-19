import { APP } from "@/shared/App";
import type { ILoginInput,  } from "../auth-types";

 export type LoginResponseType={
    user:{
        id:number
        name:string
        email:string
    },
    token:string
}

export async function loginUserHttp(input:ILoginInput){

    return new Promise<LoginResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/login`,{
            method: "POST",
            headers:{
                'content-Type': "application/json"
            },
            body: JSON.stringify(input)
        })
        const data = await res.json()

        if(!res.ok){
            reject(data)
        }
        resolve(data)
    })
}