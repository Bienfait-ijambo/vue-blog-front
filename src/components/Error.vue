<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
const props = defineProps<{
    inputLabel:string
  formErrors: ErrorObject[]
}>()
</script>
<template>
  <div class="form-group" :class="{ error: props.formErrors.length }">
    <label for="">{{ props.inputLabel }}</label>
    <slot></slot>
    <div class="input-errors" v-for="error of props.formErrors" :key="error.$uid">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>

<style scoped>
.input-errors {
  color: red;
  font-weight: bold;
}
</style>
