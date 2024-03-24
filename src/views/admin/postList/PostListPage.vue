<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getPostHttp } from './actions/GetPostList'
import { deletePostHttp } from './actions/DeletePost'

import type { GetPostResponseType } from './actions/GetPostList'
import { closeModal, myDebounce, openModal } from '@/helper/util'
import { Bootstrap4Pagination } from 'laravel-vue-pagination'
import { confirmDelation } from '@/helper/SweetAlert'
import { successMsg } from '@/helper/Toastnotifcation'
import PostTable from './components/PostTable.vue'
import UploadImageModal from './components/UploadImageModal.vue'
const posts = ref<GetPostResponseType>()

const query = ref<string>('')

async function showPost(page = 1, query = '') {
  const data = await getPostHttp(page, query)
  posts.value = data
}

const searchPost = myDebounce(async function () {
  await showPost(1, query.value)
}, 300)

async function deletePost(postId: number) {
  confirmDelation()
    .then(async () => {
      const data = await deletePostHttp(postId)
      await showPost()
      successMsg(data.message)
    })
    .catch((error) => console.log(error))
}



const currentPostId=ref<number>(0)
async function showModal(postId:number){
  // console.log(postId)
  openModal('postModal',postId).then(postId=>{
    // console.log(postId)
    currentPostId.value=postId
  })
  
}



onMounted(async () => {
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
            <input
              type="text"
              placeholder="search..."
              @keydown="searchPost"
              v-model="query"
              class="form-control"
            />
          </div>
        </div>
      </div>
      <UploadImageModal 
      :post-id="currentPostId"
      @refreshTable="showPost"
      @closeModal="closeModal('postModal')"/>
      
     <PostTable 
     :posts="posts" 
     @deletePost="deletePost"
     @showModal="showModal"
     />

      <div v-if="posts">
        <Bootstrap4Pagination :data="posts" @pagination-change-page="showPost" />
      </div>
    </div>
  </div>
</template>
