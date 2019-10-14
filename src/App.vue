<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
  @import "@/variables.sass"

  html, body
    margin: 0
    padding: 0

  body
    background: url('assets/img/background.png')

  body, #app
    position: absolute
    top: 0

  @font-face
    font-family: 'GoogleSans-Regular'
    src: url('./assets/fonts/Google-Sans/GoogleSans-Regular.ttf')

  @font-face
    font-family: 'GoogleSans-Medium'
    src: url('./assets/fonts/Google-Sans/GoogleSans-Medium.ttf')

  #app
    color: $gray
    font-family: 'GoogleSans-Regular', arial, sans-serif
    font-size: 16px
    font-weight: 400
    max-width: 1024px
    margin: 0 calc(50vw - 512px)
    width: 100vw

    .title
      font-family: 'GoogleSans-Medium'

  @media screen and (max-width: 1024px)
    #app
      margin: 0
      max-width: 100vw

    .hide-md-down
      display: none

  @media screen and (max-width: 768px)
    #app

  @media screen and (max-width:480px)
    .hide-sm-down
      display: none

  @media screen and (max-width: 420px)
    .hide-xs-down
      display: none

  @media screen and (min-width: 480px)
    .hide-sm-up
      display: none

  @media screen and (min-width: 420px)
    .hide-xs-up
      display: none
</style>
