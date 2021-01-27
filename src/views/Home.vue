<template>
  <div class="home">
    <Nav />

    <div
      id="content"
      v-scroll-spy="{ offset: scrollSpyOffset }"
      v-scroll-spy-link="{ selector: 'li.menu-link' }"
    >
      <Extract />

      <Experience />

      <!-- <div class="section"> projects </div> -->

      <School />

      <Hobbies />
    </div>

    <footer>
      <a href="https://github.com/loama/loama.github.io" target="_blank">
        <img src="/img/github.svg" />
      </a>
    </footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

import Extract from '@/components/Extract.vue'
import Experience from '@/components/Experience.vue'

import School from '@/components/School.vue'
import Hobbies from '@/components/Hobbies.vue'

export default {
  computed: {
    scrollSpyOffset() {
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
    Extract,
    Experience,
    School,
    Hobbies
  }
}
</script>

<style lang="sass">
#content
  margin: 32px 24px 0 292px

  .section
    background: #FFF
    border: 2px solid #000
    margin-bottom: 32px
    max-width: 688px
    min-height: 56px
    padding: 8px
    width: calc(100vw - 320px)

  .section-name
    background: #FFF
    border: 2px solid #000
    color: #000
    display: inline-block
    margin-bottom: -2px
    padding: 4px 8px
    width: auto

footer
  margin-bottom: 16px
  text-align: center

  img
    height: 40px
    opacity: 0.4

    &:hover
      opacity: 1

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
