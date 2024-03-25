import type { ICreatePostInput } from "../../createPost/types/createPost.types";



export interface IPostList extends ICreatePostInput{
    id:number
}


export interface IEditPostDataInput extends ICreatePostInput{
    id:number|null

}

