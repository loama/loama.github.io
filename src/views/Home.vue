<template>
  <div class="home">
    <Nav />

    <div id="content" v-scroll-spy v-scroll-spy-link="{selector: 'li.menu-link'}">
      <Extract />

      <div> experience </div>

      <div> projects </div>

      <div> school </div>

      <div> hobbies </div>
    </div>

  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

import Extract from '@/components/Extract.vue'

export default {
  name: 'home',
  components: {
    Nav,
    Extract
  }
}
</script>

<style lang="sass">
  #content
    margin: 32px 288px 32px

    >div
      border: 1px solid #E5E5E5
      min-height: 500px
</style>
