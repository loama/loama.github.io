<template>
  <div class="home">
    <Nav />

    <div id="content" v-scroll-spy="{offset: scrollSpyOffset}" v-scroll-spy-link="{selector: 'li.menu-link'}">
      <Extract />

      <div class="section"> experience </div>

      <div class="section"> projects </div>

      <div class="section"> school </div>

      <div class="section"> hobbies </div>
    </div>

  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

import Extract from '@/components/Extract.vue'

export default {
  computed: {
    scrollSpyOffset () {
      if (window.innerWidth > 768) {
        return 32
      } else {
        return 112
      }
    }
  },
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

    .section
      background: #FFF
      border: 2px solid #000
      margin-bottom: 32px
      max-width: 688px
      min-height: 56px
      padding: 8px
      width: calc(100vw - 320px)

  @media screen and (max-width: 1024px)
    #content
      margin: 32px 16px 32px 276px

      .section
        max-width: 712px
        margin-bottom: 24px
        width: calc(100vw - 312px)

  @media screen and (max-width: 768px)
    #content
      margin: 32px 16px

      .section
        max-width: calc(100vw - 51px)
        width: calc(100vw - 51px)

  @media screen and (max-width: 768px)
    #content
      margin: 144px 16px 32px 16px

</style>
