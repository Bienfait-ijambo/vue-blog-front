import { APP } from "@/shared/App";
import { verifyToken } from "@/helper/verifyToken";


type DeleteResponseType={
    message:string
}

export async function deletePostHttp(postId:number){

    const {headers}=verifyToken()
    return new Promise<DeleteResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/posts/${postId}`,{
            method: "DELETE",
            headers:headers,
        })
        const data = await res.json()

        if(!res.ok){
            reject(data)
        }
        resolve(data)
    })
}