<template>
  <div class="home">
    <Nav />

    <div id="content" v-scroll-spy="{offset: 32}" v-scroll-spy-link="{selector: 'li.menu-link'}">
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
      border-bottom: 1px solid #E5E5E5
      margin-bottom: 32px
      min-height: 500px
</style>
