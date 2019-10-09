<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
  html, body
    margin: 0

  @font-face
    font-family: 'GoogleSans-Regular'
    src: url('./assets/fonts/Google-Sans/GoogleSans-Regular.ttf')

  @font-face
    font-family: 'GoogleSans-Medium'
    src: url('./assets/fonts/Google-Sans/GoogleSans-Medium.ttf')

  #app
    min-height: 300vh
    font-family: 'GoogleSans-Regular', arial, sans-serif
    font-size: 16px
    font-weight: 400
    width: 100vw

    .title
      font-family: 'GoogleSans-Medium'
</style>
