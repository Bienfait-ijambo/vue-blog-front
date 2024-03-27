import { APP } from "@/shared/App";
import { verifyToken } from "@/helper/verifyToken";
import type { IUpdatePostInput } from "../types/updatePost.types";

 export type PostResponseType={
   
    message:string
}

export async function updatePostHttp(input:IUpdatePostInput){

    const {headers}=verifyToken()
    return new Promise<PostResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/posts/${input.id}`,{
            method: "PUT",
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