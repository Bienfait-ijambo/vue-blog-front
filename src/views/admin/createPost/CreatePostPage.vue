<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Error from '@/components/Error.vue'
import { createPostHttp } from './actions/CreatePost'
import { showError, successMsg } from '@/helper/Toastnotifcation'
import BaseBtn from '@/components/BaseBtn.vue'
import type { ICreatePostInput } from './types/createPost.types'


const postInput = ref<ICreatePostInput>({
  title: '',
  post_content: ''
})

const rules = {
  title: { required }, // Matches state.lastName
  post_content: { required }
}

const loadingStatus=ref(false)

const v$ = useVuelidate(rules, postInput)

async function createPost() {
  const result = await v$.value.$validate()

  if (!result) return

 try {
  loadingStatus.value=true
  const data=await createPostHttp(postInput.value)
  //type assertion
  postInput.value={} as ICreatePostInput
  v$.value.$reset()
  successMsg(data.message)
  loadingStatus.value=false

 } catch (error:any) {
  loadingStatus.value=false
  showError(error.message)
 }
}
</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Create post Form</div>
        <!-- {{ registerInput }} -->
        <div class="card-body">
          <form action="" @submit.prevent="createPost">
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
             <BaseBtn label="Create post" :loading="loadingStatus"/>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
