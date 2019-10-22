<template>
  <div id="hobbies">
      <div class="section-name"> Hobbies </div>

      <div class="section">
        <img class="visited_countries" src="../assets/img/visited_countries.png">

        <span> I love traveling, have been to 42 countries so far. I also enjoy bicycling, riding my monocycle, going to hackathons and petting doggos. </span>
        <img src="../assets/img/doggo.png" class="doggo">
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
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
        bottom: 0
        height: 48px
        position: absolute
        right: 8px

  @media screen and (max-width: 576px)
    #hobbies
      margin-right: 0
      width: calc(100% - 4px)

      .section
        width: 100%

</style>
