<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import type { IRegisterInput } from './auth-types'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Error from '@/components/Error.vue'
import { createUserHttp } from './actions/RegisterUser'
import { showError, successMsg } from '@/helper/Toastnotifcation'
import BaseBtn from '@/components/BaseBtn.vue'

const registerInput = ref<IRegisterInput>({
  name: '',
  email: '',
  password: ''
})

const rules = {
  name: { required }, // Matches state.firstName
  email: { required, email }, // Matches state.lastName
  password: { required }
}

const v$ = useVuelidate(rules, registerInput)

const loadingStatus=ref(false)
async function registerUser() {
  const result =  await v$.value.$validate()

  if (!result) return

  try {
    loadingStatus.value=true
    const data = await createUserHttp(registerInput.value)
    registerInput.value = {} as IRegisterInput
    successMsg(data.message)
    loadingStatus.value=false
    v$.value.$reset()

  } catch (error) {
    loadingStatus.value=false
    for (const message of error as string[]) {
      showError(message)
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Register Form</div>
        <!-- {{ registerInput }} -->
        <div class="card-body">
          <form action="" @submit.prevent="registerUser">
            <Error inputLabel="Name" :formErrors="v$.name.$errors">
              <input type="text" v-model="registerInput.name" class="form-control" />
            </Error>

            <Error inputLabel="E-mail" :formErrors="v$.email.$errors">
              <input type="text" v-model="registerInput.email" class="form-control" />
            </Error>

            <Error inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" v-model="registerInput.password" class="form-control" />
            </Error>

            <br />
            <RouterLink to="/">login into your account</RouterLink>
            <br />
            <br />
            <div class="form-group">
              <BaseBtn 
              label="Register" 
              :loading="loadingStatus" />
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
