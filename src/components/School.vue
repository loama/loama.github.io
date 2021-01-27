<template>
  <div id="school">
    <div class="section-name">School</div>

    <div class="section">
      <ul class="schools">
        <li>
          <a target="_blank" href="https://devf.mx"
            ><div class="logo devf"></div
          ></a>
          <div class="content">
            <div class="head">
              <a target="_blank" href="https://devf.mx"> Dev.F </a> - Developer
              Bootcamp
            </div>
            <div class="dates">Apr 15 - Jun 15</div>
          </div>
        </li>

        <li>
          <a target="_blank" href="http://www.ingenieria.unam.mx/index.php"
            ><div class="logo fi"></div
          ></a>
          <div class="content">
            <div class="head">
              <a target="_blank" href="http://www.ingenieria.unam.mx/index.php">
                UNAM
              </a>
              - Industrial Engineering
            </div>
            <div class="dates">Aug 14 - Apr 15</div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://www.escasto.ipn.mx/"
            ><div class="logo ipn"></div
          ></a>
          <div class="content">
            <div class="head">
              <a target="_blank" href="https://www.escasto.ipn.mx/"> IPN </a> -
              Business Admin
            </div>
            <div class="dates">Aug 14 - Apr 15</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  name: 'school'
}
</script>

<style scoped lang="sass">
#school
  display: inline-block
  margin-right: 20px
  vertical-align: top
  width: calc(50% - 8px)

  .section
    background: none
    border: none
    max-width: 100%
    padding: 0

  ul.schools
    list-style: none
    margin: 0
    padding: 0

    li
      background: #FFF
      border: 2px solid #000
      box-sizing: border-box
      height: 71px
      margin-bottom: 8px

      .logo
        background-position: center
        background-repeat: no-repeat
        background-size: contain
        display: inline-block
        height: 48px
        margin: 6px 12px
        width: 64px

        &.devf
          background-image: url('/img/education/devf.png')

        &.fi
          background-image: url('/img/education/fi.png')

        &.ipn
          background-image: url('/img/education/ipn.png')

      .content
        display: inline-block
        height: 32px
        line-height: 18px
        padding: 12px 0
        vertical-align: top

        a
          color: #000
          font-family: 'GoogleSans-Medium'
          text-decoration: none

  @media screen and (max-width: 576px)
    #school
      margin-right: 0
      width: 100%

      .section
        width: 100%
</style>
