<script lang="ts" setup>
import CountPost from './components/CountPost.vue'
import {countPostHttp} from './actions/countPost'
import { onMounted, ref } from 'vue'

const numberOfPost=ref<number>(0)

onMounted(async()=>{
    const data=await countPostHttp()
    numberOfPost.value = data
})
</script>
<template>
    <div class="row">
        <h1>Dashbaord page</h1>
        <div class="row">
            <div class="col-md-4">
            <CountPost :countPost="numberOfPost"/>
        </div>
        </div>
    </div>
</template>