<template>
  <div id="extract">
    <div class="section">
      <img class="tech-image" src="../assets/img/tech/js.png">
      <img class="tech-image" src="../assets/img/tech/vue.png">
      <img class="tech-image node" src="../assets/img/tech/node.png">
      <img class="tech-image" src="../assets/img/tech/html5.png">
      <img class="tech-image hide-xs-down" src="../assets/img/tech/sass.png">
      <img class="tech-image hide-sm-down" src="../assets/img/tech/python.png">
    </div>

    <div class="section">
      <img class="tech-image hide-sm-up" src="../assets/img/tech/sass.png">
      <img class="tech-image hide-xs-up" src="../assets/img/tech/python.png">
      <img class="tech-image" src="../assets/img/tech/heroku.png">
      <img class="tech-image" src="../assets/img/tech/sketch.png">
      <img class="tech-image hide-xs-down elixir" src="../assets/img/tech/elixir.png">
      <img class="tech-image hide-sm-down firebase" src="../assets/img/tech/firebase.png">
      <img class="tech-image hide-sm-down postgres" src="../assets/img/tech/postgres.png">
      <img class="tech-image hide-sm-down git" src="../assets/img/tech/git.png">
      <img class="tech-image hide-sm-down gmaps" src="../assets/img/tech/gmaps.png">
    </div>

    <div class="section">
      <p> <span class="black">Hello, I am Jaime,</span> a self made (after bootcamp) <span class="black">Software Creator,</span>
          I was <span class="black">born in Mexico</span> and have been a <span class="black">digital nomad</span> for the last two years.
      </p>

      <br>

      <p> Most of my experience consists of <span class="black">building products (and teams) from
          the ground</span> and that is my favorite setup. That has led me to learn to do
          <span class="black"> multiple things besides coding like design, setup servers in the cloud,
          CI/CD, prioritize team tasks and manage people.</span> </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  },
  methods: {
  },
  name: 'extract'
}
</script>

<style scoped lang="sass">
  #extract
    .section

    .section:first-child, .section:nth-child(2)
      display: flex
      justify-content: space-between
      margin-bottom: 16px

    .tech-image
      justify-content: center
      max-height: 56px

      &.node
        margin-top: 8px
        max-height: 40px

      &.elixir, &.firebase, &.postgres, &.git, &.gmaps
        margin: 0 16px

  p
    margin: 0
    text-align: justify
    width: 100%

  span.black
    color: #000
</style>
