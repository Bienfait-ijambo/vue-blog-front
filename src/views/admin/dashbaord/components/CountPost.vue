<script setup lang="ts">
defineProps<{
  countPost: number
}>()
</script>
<template>
  <div class="card">
    <div class="card-header">Post List</div>
    <div class="card-body">
      <h1 align="center">{{ countPost }}</h1>
    </div>
  </div>
</template>
