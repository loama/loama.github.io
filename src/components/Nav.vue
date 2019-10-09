<template>
  <div id="navigation">
    <div class="topbar"></div>

    <img class="profile-pic" src="../assets/1.webp">

    <div class="title">
      Jaime López
    </div>

    <ul class="links" v-scroll-spy-active v-scroll-spy-link>
      <li>
        <a> extract </a>
      </li>

      <li>
        <a> experience </a>
      </li>

      <li>
        <a> projects </a>
      </li>

      <li>
        <a> school </a>
      </li>

      <li>
        <a> hobbies </a>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
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
      margin-top: 16px
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
          padding: 15px 156px 15px 32px
          width: 100%

  @media screen and (max-width: 1024px)
    #navigation
      left: 16px
</style>
