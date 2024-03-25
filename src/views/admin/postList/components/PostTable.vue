
<script setup lang="ts">
import { GetPostResponseType } from "../actions/GetPostList"
import type { IEditPostDataInput } from "../types/postList-types";

defineProps<{
    posts:GetPostResponseType| undefined
}>()

const emit=defineEmits<{
    (e:'deletePost',postId:number):void
    (e:'showModal',postId:number):void
    (e:'editPost',post:IEditPostDataInput):void

}>()
</script>

<template>
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
            <td>{{ post.id }}</td>
            <td>
              <img style="height: 75px;" :src="post.image"/>
            </td>
            <td>{{ post.title }}</td>
            <td>{{post.post_content}}</td>
            <td><button @click="emit('showModal',post.id)" class="btn btn-info">Upload</button></td>
            <td><button @click="emit('editPost',post)" class="btn btn-outline-primary">Edit</button></td>
            <td>
              <button @click="emit('deletePost',post.id)" class="btn btn-outline-danger">Delete</button>
            </td>
          </tr>
        </thead>
      </table>
</template>