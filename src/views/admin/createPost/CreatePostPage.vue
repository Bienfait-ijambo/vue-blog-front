<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Error from '@/components/Error.vue'
import { createPostHttp } from './actions/CreatePost'
import {updatePostHttp} from './actions/UpdatePost'
import { showError, successMsg } from '@/helper/Toastnotifcation'
import BaseBtn from '@/components/BaseBtn.vue'
import type { ICreatePostInput } from './types/createPost.types'
import {postStore} from '@/stores/admin/postStore'
import { IUpdatePostInput } from './types/updatePost.types'


const postInput = ref<ICreatePostInput|IUpdatePostInput>({
  id:postStore.editPostData.id,
  title: postStore.editPostData.title,
  post_content: postStore.editPostData.post_content,
})

const rules = {
  title: { required }, // Matches state.lastName
  post_content: { required }
}

const loadingStatus=ref(false)

const v$ = useVuelidate(rules, postInput)
const router=useRouter()

async function createOrUpdatePost() {
  const result = await v$.value.$validate()
  if (!result) return

 try {
  loadingStatus.value=true
  
  postStore.editPost.edit ?
  await updatePost():
  await createPost()

  v$.value.$reset()
  loadingStatus.value=false

 } catch (error:any) {
  loadingStatus.value=false
  showError(error.message)
 }
}


async function createPost(){
  const data=await createPostHttp(postInput.value)
  postInput.value={} as ICreatePostInput
  successMsg(data.message)
}


async function updatePost(){
  const data=await updatePostHttp(postInput.value  as IUpdatePostInput)
  postStore.editPostData={} as IUpdatePostInput
  postInput.value={} as ICreatePostInput
  postStore.editPost.edit=false
  router.push('/post-lists')
  successMsg(data.message)
}






</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Create post Form {{ postStore.editPostData }} </div>
        <!-- {{ registerInput }} -->
        <div class="card-body">
          <form action="" @submit.prevent="createOrUpdatePost">
            <Error inputLabel="Title" :formErrors="v$.title.$errors">
              <input type="text" v-model="postInput.title" class="form-control" />
            </Error>

            <Error inputLabel="Post-content" :formErrors="v$.post_content.$errors">
              <textarea type="text" rows="5" v-model="postInput.post_content" class="form-control" />
            </Error>

            <br />
            <RouterLink to="/post-lists">See list of posts</RouterLink>
            <br />
            <div class="form-group">
              
             <BaseBtn 
             :class="postStore.editPost.edit ? 'btn-warning':'btn-primary'"
             :label="postStore.editPost.edit ? 'Update Post':'Create post'" 
             :loading="loadingStatus"/>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
