<template>
  <div class="container">
    <div>
      <forms />
    </div>
  </div>
</template>

<script>
import forms from '~/components/forms.vue'

export default {
  components: {
    forms
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

</style>
