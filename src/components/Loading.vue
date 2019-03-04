<template>
  <div class="loading">
    <h1>{{ mensaje }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    mensaje: {
      default: 'Cargandose',
      type: String
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
