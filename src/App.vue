<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="sass">
  html, body
    margin: 0

  @font-face
    font-family: 'NewYorker'
    src: url('./assets/fonts/newyorker/newyorkr.ttf')

  @font-face
    font-family: 'AdobeCaslon'
    src: url('./assets/fonts/adobe-caslon-pro/ACaslonPro-Regular.otf')

  #app
    min-height: 300vh
    font-family: Adobe Caslon,Georgia,Times New Roman,Times,serif
    width: 100vw

    .title
      font-family: 'NewYorker'
</style>
