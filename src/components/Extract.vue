<template>
  <div id="extract">
    <div class="section">
      <img class="tech-image js" src="/img/tech/js.png" />
      <img class="tech-image" src="/img/tech/vue.png" />
      <img class="tech-image node" src="/img/tech/node.png" />
      <img class="tech-image" src="/img/tech/html5.png" />
      <img class="tech-image hide-xs-down" src="/img/tech/sass.png" />
      <img class="tech-image hide-sm-down python" src="/img/tech/python.png" />
    </div>

    <div class="section">
      <img class="tech-image hide-sm-up" src="/img/tech/sass.png" />
      <img class="tech-image hide-xs-up python" src="/img/tech/python.png" />
      <img class="tech-image" src="/img/tech/heroku.png" />
      <img class="tech-image" style="height: 40px; margin-top: 6px" src="/img/tech/figma.svg" />
      <img class="tech-image hide-xs-down elixir" src="/img/tech/elixir.png" />
      <img
        class="tech-image hide-sm-down firebase"
        src="/img/tech/firebase.png"
      />
      <img
        class="tech-image hide-sm-down postgres"
        src="/img/tech/postgres.png"
      />
      <img class="tech-image hide-sm-down git" src="/img/tech/git.png" />
      <img class="tech-image hide-sm-down gmaps" src="/img/tech/gmaps.png" />
    </div>

    <div class="section">
      <p>
        <span class="black">Hello, I am Jaime,</span> a self made (after
        bootcamp) <span class="black">Fullstack Software Developer,</span> I was
        <span class="black">born in Mexico</span> and have been a
        <span class="black">digital nomad</span> for the last 3 years.
      </p>

      <br />

      <p>
        Most of my experience consists of
        <span class="black">building products (and teams) from the ground</span>
        and that is my favorite setup. That has led me to learn to do
        <span class="black">
          multiple things besides coding, like mobile apps, design, setup servers in the
          cloud, CI/CD, prioritize team tasks and manage people.</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ''
    }
  },
  methods: {},
  name: 'extract'
}
</script>

<style scoped lang="sass">
#extract
  .section:first-child, .section:nth-child(2)
    display: flex
    justify-content: space-between
    margin-bottom: 16px

  .tech-image
    justify-content: center
    max-height: 56px

    &.node
      margin-top: 6px
      max-height: 40px

    &.elixir, &.firebase, &.postgres, &.git, &.gmaps, &.js, &.python
      margin: 0 16px

  p
    margin: 0
    text-align: justify
    width: 100%

  span.black
    color: #000</style>
