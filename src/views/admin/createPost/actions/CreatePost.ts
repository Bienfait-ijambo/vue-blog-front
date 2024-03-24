import { APP } from "@/shared/App";
import { verifyToken } from "@/helper/verifyToken";
import type { ICreatePostInput } from "../types/createPost.types";

 export type PostResponseType={
   
    message:string
}

export async function createPostHttp(input:ICreatePostInput){

    const {headers}=verifyToken()
    return new Promise<PostResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/posts`,{
            method: "POST",
            headers:headers,
            body: JSON.stringify(input)
        })
        const data = await res.json()

        if(!res.ok){
            reject(data)
        }
        resolve(data)
    })
}