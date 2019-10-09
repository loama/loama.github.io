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
    margin: 32px 24px 32px 292px

    >div
      background: #FFF
      border: 2px solid #000
      margin-bottom: 32px
      max-width: 688px
      min-height: 500px
      padding: 8px
      width: calc(100vw - 320px)

  @media screen and (max-width: 1024px)
    #content
      margin: 32px 16px 32px 276px

      >div
        max-width: 712px
        width: calc(100vw - 312px)

  @media screen and (max-width: 768px)
    #content

</style>
