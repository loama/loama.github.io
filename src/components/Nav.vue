<template>
  <div id="nav">
    <img class="profile-pic" src="../assets/1.jpeg">

    <div class="title">
      JAIME LOPEZ
    </div>

    <ul class="links">
      <li v-bind:class="{active: active === 'extract'}"
          v-on:click="nav('extract')">
          extract
      </li>

      <li v-bind:class="{active: active === 'experience'}"
          v-on:click="nav('experience')">
          experience
      </li>

      <li v-bind:class="{active: active === 'projects'}"
          v-on:click="nav('projects')">
        projects
      </li>

      <li v-bind:class="{active: active === 'school'}"
          v-on:click="nav('school')">
          school
      </li>

      <li v-bind:class="{active: active === 'hobbies'}"
          v-on:click="nav('hobbies')">
        hobbies
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
  methods: {
    nav (page) {
      this.active = page
    }
  },
  name: 'nav'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  #nav
    border: 1px solid #E5E5E5
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
        height: 48px
        line-height: 48px
        padding: 0 32px

        &.active
          background: #000
          color: #FFF
</style>
