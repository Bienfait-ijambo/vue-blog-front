<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { getUserData } from '@/helper/getUserData'
import { logoutUserHttp } from './actions/LogoutUser'
import { successMsg } from '@/helper/Toastnotifcation'
import { onMounted } from 'vue'
import { userIsLoggedInPostHttp } from './actions/UserIsLoggedIn'

const userData = getUserData()

async function logoutUser() {
  const userId = userData?.user?.id
  if (typeof userId !== 'undefined') {
    const data = await logoutUserHttp(userId)
    localStorage.clear()
    successMsg(data.message)
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }
}

async function userIsLoggedIn() {
  try {
    await userIsLoggedInPostHttp()
  } catch (error:any) {
      if (error.message === 'Unauthenticated.') {
        window.location.href = '/'
      }
  }
}

onMounted(async () => {
  await userIsLoggedIn()
})
</script>

<template>
  <div class="container">
    <div>
      <span>Name : {{ userData?.user?.name }}</span
      ><br />
      <span
        >Email : <a href="">{{ userData?.user?.email }}</a></span
      ><br />
      <span style="color: red; cursor: pointer" @click="logoutUser"><b>Logout</b></span
      ><br />
    </div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: #e3f2fd">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/admin">Dashbaord</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/create-post">Create-post</RouterLink>
            </li>
            <li class="nav-item" style="font-weight: bold">
              <RouterLink class="nav-link" to="/post-lists">Post-lists</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br />
    <br />

    <div class="row">
      <RouterView />
    </div>
  </div>
</template>
