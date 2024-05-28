<template>
  <div class="night-switch">
    <div class="night-switch-item" @click="Toggle()" v-if="theme == 'light'">
      <nuxtIcon name="theme" class="mt-1" width="30px" height="30px" />
    </div>
    <div class="night-switch-item" @click="Toggle()" v-if="theme != 'light'">
      <nuxtIcon name="nigth-swit" class="mt-1" width="30px" height="30px" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['theme']),
  },
  data() {
    return {
      nigth: false
    }
  },
  methods: {
    Toggle() {
      this.nigth = !this.nigth
      if (this.nigth) {
        this.ThemeChange('night');
        localStorage.setItem('THEME', 'night');
      } else {
        this.ThemeChange('light');
        localStorage.setItem('THEME', 'light');
      }
    },
    ThemeChange(theme) {
      if (theme == 'night') {
        this.$store.commit('setTheme', 'night')
        document.documentElement.style.setProperty('--bg-ligth-white', 'rgba(71, 147, 255, 0.2)');//#1C1C27  or used
        document.documentElement.style.setProperty('--bg-white', '#28293D');
        document.documentElement.style.setProperty('--color-black', '#aeb2cd');
        document.documentElement.style.setProperty('--color-gray', '#fff');

        this.nigth = true
      } else {
        this.$store.commit('setTheme', 'light')
        document.documentElement.style.setProperty('--bg-ligth-white', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--bg-white', '#fff');
        document.documentElement.style.setProperty('--color-black', '#000');
        document.documentElement.style.setProperty('--color-gray', '#AEB2CD');

        this.nigth = false
      }

    }
  },
  mounted() {
    let theme = localStorage.getItem("THEME");
    if (theme) {
      this.$store.commit('setTheme', theme);
      this.ThemeChange(theme)
    }
  }
}
</script>

<style lang="scss"></style>