import { APP } from "@/shared/App";
import { verifyToken } from "@/helper/verifyToken";
import type { IPostList } from "../../admin-types";


 export type GetPostResponseType={
    data:Array<IPostList>
 } & Record<string,string|number>



export async function getPostHttp(page:number,query:string){

    const {headers}=verifyToken()
    return new Promise<GetPostResponseType>(async(resolve, reject) => {

        const res=await fetch(`${APP.apiURL}/posts?page=${page}&query=${query}`,{
            method: "GET",
            headers:headers,
        })
        const data = await res.json()

        if(!res.ok){
            reject(data)
        }
        resolve(data)
    })
}