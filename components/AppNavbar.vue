<template>
    <div class="w-full p-5">
        <div class="app-navbar  flex justify-between items-center max-md:flex-col max-md:justify-center max-md:gap-4">
            <nuxt-link to="/">
                <div class="flex justify-start gap-5 items-center">
                <nuxtIcon name="HeadLogo" />
                <p class="color-ligth-blue uppercase text-2xl font-bold">vue weather</p>
        </div>
        </nuxt-link>
        <div class="flex justify-start gap-5 items-center">
            <div class="flex justify-center items-center cursor-pointer">
                <NigthSwitch />
            </div>
            <el-input size="large" @keyup.enter.native="fetchWeather" @change="fetchWeather" :clearable="true" placeholder="Выбрать город"
                v-model="country_name"></el-input>
        </div>
    </div>
    </div>
</template>

<script>
import NigthSwitch from './NigthSwitch.vue';

export default {
    data() {
        return {
            country_name: null,
            mode: 'light'
        }
    },
    methods: {
        fetchWeather() {
            this.$router.replace({
                query: {
                    cityName: this.country_name
                }
            })
            if (!this.country_name) {
                this.$router.replace({
                    query: {}
                })
            }
        },
        setMode() {
            if (this.mode == 'light') {
                this.$store.commit('setTheme', 'night');
            } else {
                this.$store.commit('setTheme', 'light');
            }
        }
    },
    mounted() {
        if (this.$route.query.cityName) {
            this.country_name = this.$route.query.cityName;
        }
    }
}
</script>

<style lang="scss"></style>