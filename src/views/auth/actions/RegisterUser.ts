import { APP } from "@/shared/App";
import type { IRegisterInput } from "../auth-types";

type RegisterResponseType={
    user:IRegisterInput,
    message:string
}

export async function createUserHttp(input:IRegisterInput){

    return new Promise<RegisterResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/register`,{
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