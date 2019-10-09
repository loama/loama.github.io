<template>
  <div id="extract">
    <p> <span class="black">Hello, I am Jaime,</span> a self made (after bootcamp) <span class="black">Software Creator,</span>
        I was <span class="black">born in Mexico</span> and have been a <span class="black">digital nomad</span> for the last two years.
        Most of my experience consists of <span class="black">building products (and teams) from
        the ground</span> and that is my favorite setup. That has led me to learn to do
        <span class="black"> multiple things besides coding like design, setup servers in the cloud,
        CI/CD, prioritize team tasks and manage people.</span> </p>
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
  p
    margin: 0

  span.black
    color: #000
</style>
