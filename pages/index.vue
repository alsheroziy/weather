<template>
  <div class="index-page w-full h-full">
    <CurrentBar />
    <Weeknes />
  </div>
</template>

<script>
import Weeknes from '../components/Weeknes.vue';

export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'weather',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'og-description',
          property: 'og:description',
          content: `weatherapp,downloads and launches AWeather,sets an alarm of weather events,gets notification,Snow / Rainy,Thunderstorm`
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: require('@/assets/icons/Headlogo.png')
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/HeadLogo.svg' }
      ]
    }

  }
}
</script>

<style lang="scss"></style>
