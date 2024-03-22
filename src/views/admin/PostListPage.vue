<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getPostHttp} from './actions/GetPostList'
import {deletePostHttp} from './actions/DeletePost'

import type {  GetPostResponseType } from './actions/GetPostList';
import  type { IPostList } from './admin-types';
import {myDebounce} from '@/helper/util'
import { Bootstrap4Pagination } from 'laravel-vue-pagination';
import { confirmDelation } from '@/helper/SweetAlert';
import { successMsg } from '@/helper/Toastnotifcation';



const posts=ref<GetPostResponseType>()

const query=ref<string>('')

async function showPost(page=1,query=''){
    const data = await getPostHttp(page,query)
    posts.value=data
}

const searchPost=myDebounce(async function(){
    await showPost(1,query.value)
},300)

async function deletePost(postId:number){
    confirmDelation().then(async()=>{
       const data=await deletePostHttp(postId)
       await showPost()
       successMsg(data.message)
       
    }).catch((error)=>console.log(error))
}

onMounted(async()=>{
   await showPost()
})
</script>
<template>
    <div class="row">
        <div class="col-md-8">
            <!-- {{ posts }} -->
            <div class="row">
                <div class="col-md-4">
                    <div class="form-group">
                        <input type="text" placeholder="search..." @keydown="searchPost" v-model="query" class="form-control">
                    </div>
                </div>
            </div>
            <table class="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                    <td>ID</td>
                    <td>Image</td>
                    <td>Title</td>
                    <td>Content</td>
                    <td>Upload</td>
                    <td>Edit</td>
                    <td>Delete</td>

                    </tr>
                 
                    <tr v-for="post in posts?.data" :key="post.id">
                    <td>{{post.id}}</td>
                    <td>{{post.title}}</td>
                    <td>What is type annotation</td>
                    <td>......</td>
                    <td><button class="btn btn-info">Upload</button></td>
                    <td><button class="btn btn-outline-primary">Edit</button></td>
                    <td><button @click="deletePost(post.id)"  class="btn btn-outline-danger">Delete</button></td>
                    </tr>
                </thead>
            </table>
            <div v-if="posts">
         <Bootstrap4Pagination
         :data="posts"
        @pagination-change-page="showPost"
         />
            </div>
        
        </div>
    </div>
</template>