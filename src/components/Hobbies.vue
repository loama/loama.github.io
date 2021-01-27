<template>
  <div id="hobbies">
    <div class="section-name">Hobbies</div>

    <div class="section">
      <img class="visited_countries" src="/img/visited_countries.jpg" />

      <span>
        I love traveling, been to 50 countries so far. I also enjoy riding
        bikes, my monocycle, going to hackathons and petting doggos.
      </span>
      <img src="/img/doggo.png" class="doggo" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  name: 'hobbies'
}
</script>

<style scoped lang="sass">
#hobbies
  display: inline-block
  width: calc(50% - 16px)

  .section
    font-size: 14px
    max-width: calc(100% - 16px)
    position: relative

    img.visited_countries
      margin: 0 10%
      width: 80%

    img.doggo
      float: right
      height: 48px
      margin-top: -24px

  @media screen and (max-width: 576px)
    #hobbies
      margin-right: 0
      width: calc(100% - 4px)

      .section
        width: 100%
</style>
