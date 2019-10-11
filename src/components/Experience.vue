<template>
  <div id="experience">
    <div class="section-name"> Experience</div>

    <div class="section">
      <ul class="experience-list">

        <li>
          <div class="logo"></div>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://zeel.com" target="_blank">Zeel.com</a> - Project Lead - (Vue/Node/Python) - Remote
              </span>

              <span class="dates">Apr 18 - May 19</span>
            </div>

            <div class="details">Led the development of the internal tools that allowed our team to run the business.</div>
          </div>

        </li>

        <li>
          <div class="logo"></div>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://cervezasiempre.com" target="_blank">CervezaSiempre.com</a> - Project Manager - (Vue/Node/Python)
              </span>

              <span class="dates">Jan 18 - Apr 18</span>
            </div>
            <div class="details">Built -in 2 months- the first version of a beer subscription service for the biggest beer company in the world.</div>
          </div>
        </li>

      </ul>
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
  name: 'experience'
}
</script>

<style scoped lang="sass">
  @import "@/variables.sass"

  #experience
    ul.experience-list
      margin: 0
      padding: 0

      li
        border-bottom: 1px solid $light-gray

        &:last-child
          border-bottom: none

        .logo
          display: inline-block
          height: 56px
          vertical-align: top
          width: 88px

        .info
          display: inline-block
          line-height: 20px
          padding: 12px 0
          width: calc(100% - 88px)

          .head
            margin-bottom: 8px

            .title
              font-family: 'GoogleSans-Regular'

              a
                color: #000
                font-weight: 500
                text-decoration: none

            .dates
              float: right
</style>
