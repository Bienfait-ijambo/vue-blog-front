export interface ICreatePostInput{
    title:string
    post_content:string
    image?:string
}

export interface IPostList extends ICreatePostInput{
    id:number

}