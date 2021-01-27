<template>
  <div id="navigation">
    <div class="topbar"></div>

    <img class="profile-pic" src="/img/1.jpeg" />

    <div class="title">Jaime López</div>

    <ul class="links" v-scroll-spy-active v-scroll-spy-link>
      <li>
        <a> extract </a>
      </li>

      <li>
        <a> experience </a>
      </li>

      <!-- <li>
        <a> projects </a>
      </li> -->

      <li>
        <a> school </a>
      </li>

      <li>
        <a> hobbies </a>
      </li>
    </ul>

    <a
      class="download"
      download="JaimeLopez-Resume-Early2021.pdf"
      href="https://github.com/loama/loama.github.io/raw/master/public/JaimeLopez_Resume-Early2021.pdf"
      target="_blank"
      >Download CV</a
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 'extract'
    }
  },
  name: 'navigation'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import "@/variables.sass"

#navigation
  background: #FFF
  border: 2px solid #000
  min-height: 320px
  left: calc(50vw - 512px + 24px)
  position: fixed
  top: 32px
  width: 240px

  .topbar
    background: $yellow
    height: 48px
    left: 0
    position: absolute
    top: 0
    width: 100%

  .profile-pic
    margin: 20px
    position: relative
    width: 200px
    z-index: 1

  .title
    color: #000
    font-size: 28px
    line-height: 48px
    text-align: center

  ul.links
    list-style: none
    padding: 0

    li
      cursor: pointer
      line-height: 48px

      &.active
        background: $yellow
        color: #FFF

      a
        display: block
        padding: 0 16px
        width: calc(100% - 32px)

  a.download
    background: #000
    border: 2px solid #000
    color: #FFF
    cursor: pointer
    height: 48px
    left: calc(50vw - 512px + 24px)
    line-height: 48px
    position: fixed
    text-align: center
    text-decoration: none
    top: 636px
    width: 240px

  @media screen and (max-width: 1024px)
    #navigation
      left: 16px

      a.download
        left: 16px

  @media screen and (max-width: 768px)
    #navigation
      height: 80px
      left: 0
      min-height: 80px
      top: 0
      width: calc(100vw - 5px)

      .topbar
        background: transparent

      .profile-pic
        display: none

      ul.links
        margin: 0
        padding: 0

        li
          display: inline-block
          height: 32px
          line-height: 32px
          min-width: calc(20vw - 20px)
          width: 25%

          a
            display: block
            padding: 0
            text-align: center
            width: 100%

      a.download
        background: #FFF
        border: none
        color: #000
        left: unset
        right: 4px
        top: 2px
</style>
