<template>
  <div id="nav">
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
  name: 'nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  #nav
    border: 2px solid #000
    min-height: 320px
    left: 24px
    position: fixed
    top: 32px
    width: 240px

    .profile-pic
      margin: 20px
      width: 200px

    .title
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
          background: #FFC107
          color: #FFF

        a
          padding: 15px 160px 15px 32px
          width: 100%
</style>
