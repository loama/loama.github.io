<template>
  <div id="experience">
    <div class="section-name">Experience</div>

    <div class="section">
      <ul class="experience-list">
        <li>
          <a target="_blank" href="https://betterfin.com">
            <div class="logo betterfin"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://betterfin.com" target="_blank"
                  >Betterfin.com</a
                >
                - Full Stack Developer - (Vue/Python) - Remote
              </span>

              <span class="dates">Jun 20 - Jan 21</span>
            </div>

            <div class="details">
              Developed a whole new product for the company customers to connect
              their bank account and be able to analize their bank expenses.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://betterfin.com">
            <div class="logo panl"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://panl.app" target="_blank"
                  >Panl.app</a
                >
                - Founder - (Vue/Node)
              </span>

              <span class="dates">Jun 19 - Jun 20</span>
            </div>

            <div class="details">
              Bootstraped a startup building software for SMB, starting with coworkings.
              I learnt a lot but it wasn't going as fast as I expected.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://zeel.com">
            <div class="logo zeel"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://zeel.com" target="_blank">Zeel.com</a> - Full
                Stack Developer - (Vue/Node/Python) - Remote
              </span>

              <span class="dates">Apr 18 - May 19</span>
            </div>

            <div class="details">
              Led the development of the internal tools that allowed our team to
              run the business.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://cervezasiempre.com">
            <div class="logo grupomodelo"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://cervezasiempre.com" target="_blank"
                  >CervezaSiempre.com</a
                >
                - Project Manager - (Vue/Node/Python)
              </span>

              <span class="dates">Jan 18 - Apr 18</span>
            </div>
            <div class="details">
              Built -in 2 months- the first version of a beer subscription
              service for the biggest beer company in the world.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://eiya.mx">
            <div class="logo eiya"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://eiya.mx" target="_blank">Eiya.mx</a> - Lead
                Developer (Vue/Node/Python)
              </span>

              <span class="dates">Aug 16 - Oct 17</span>
            </div>

            <div class="details">
              Coded the messenger app, internal control panel, restaurant panel
              and customer facing website for tracking.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://rappi.com">
            <div class="logo rappi"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://rappi.com" target="_blank">Rappi.com</a> - Full
                Stack Developer (jQuery/Python)
              </span>

              <span class="dates">Feb 16 - Aug 16</span>
            </div>
            <div class="details">
              Started the engineering team in Mexico and built the first version
              of the internal operations console.
            </div>
          </div>
        </li>

        <li>
          <a target="_blank" href="https://centraal.com">
            <div class="logo centraal"></div>
          </a>

          <div class="info">
            <div class="head">
              <span class="title">
                <a href="https://centraal.com" target="_blank">Centraal.com</a>
                - Junior Full Stack Developer (jQuery/Python)
              </span>

              <span class="dates">Jun 15 - Feb 16</span>
            </div>
            <div class="details">
              Built an internal system to manage the coworking space and gave
              support to all the technology in the space.
            </div>
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
  name: 'experience'
}
</script>

<style scoped lang="sass">
/* stylelint-disable */
#experience
  .section
    padding: 0 8px

    ul.experience-list
      list-style: none
      margin: 0
      padding: 0

      li
        border-bottom: 1px solid light-gray

        &:last-child
          border-bottom: none

        .logo
          background-position: center
          background-repeat: no-repeat
          background-size: contain
          display: inline-block
          height: 56px
          margin: 0 8px
          vertical-align: center
          width: 72px

          &.betterfin
            background-image: url('/img/companies/betterfin.svg')

          &.panl
            background-image: url('/img/companies/Panl.svg')
            background-size: 32px

          &.zeel
            background-image: url('/img/companies/zeel.svg')

          &.grupomodelo
            background-image: url('/img/companies/grupomodelo.png')

          &.eiya
            background-image: url('/img/companies/eiya.png')

          &.rappi
            background-image: url('/img/companies/rappi.png')

          &.centraal
            background-size: 48px
            background-image: url('/img/companies/centraal.png')

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
