<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import Error from '@/components/Error.vue'
import { ref } from 'vue'
import type { ILoginInput } from './auth-types'
import { loginUserHttp } from './actions/LoginUser'
import BaseBtn from '@/components/BaseBtn.vue'
import { showError } from '@/helper/Toastnotifcation'

const loginInput=ref<ILoginInput>({
  email:'',
  password:'',
})

const rules = {
  email: { required, email }, // Matches state.lastName
  password: { required }
}
const loadingStatus=ref(false)

const v$ = useVuelidate(rules, loginInput)

async function loginUser() {
  const result = await v$.value.$validate()

  if (!result) return
 try {
  loadingStatus.value=true
  const data=await loginUserHttp(loginInput.value)
  localStorage.setItem('userData',JSON.stringify(data))
  window.location.href="/admin"
  loadingStatus.value=false
 } catch (error:any) {
  loadingStatus.value=false
  showError(error.message)
  // for(const message of error as string[]){
    
  // }
 }

}
</script>

<template>
  <div class="row">
    <div class="col-md-4"></div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">Login Form</div>
        <div class="card-body">
         
          <form action="" @submit.prevent="loginUser">

            <Error inputLabel="E-mail" :formErrors="v$.email.$errors">
              <input type="text" 
              v-model="loginInput.email" 
               class="form-control" />
            </Error>

            <Error inputLabel="Password" :formErrors="v$.password.$errors">
              <input type="password" 
              v-model="loginInput.password" 
               class="form-control" />
            </Error>
            
                <br />
                <RouterLink to="/register">Create an account</RouterLink>
                <br />
                <div class="form-group">
                  <BaseBtn 
                  label="Login" 
                  :loading="loadingStatus" />
                </div>
            </form>
        </div>
      </div>
    </div>
    <div class="col-md-4"></div>
  </div>
</template>
