<template>
    <div class="w-full flex items-stretch justify-between p-5 max-xl:flex-col">
        <div class="rounded-[20px] bg-ligth-white box-shadow p-4 max-w-[400px] w-full max-xl:max-w-full max-xl:px-6 max-xl:py-4">
            <div class="flex justify-between gap-1 items-center">
                <div>
                    <span class="text-blue-400 text-8xl font-medium max-md:text-6xl">{{ weather?.current?.temp_c }}°</span>
                    <p class="text-black font-normal text-[2.5em] max-md:text-[1.5rem]">Сегодня</p>
                </div>
                <div class="w-28 h-28 max-md:w-20 max-md:h-20">
                   <img class="w-full h-full" :src="icons[weather?.current?.condition?.code]" alt="#">
                </div>
            </div>
            <div class="mt-3">
                <p class="font-normal color-gray text-2xl mb-1 max-md:text-lg">Время: {{
                        weather?.location?.localtime ? getTime(weather.location.localtime) : '-' }}</p>
                <p class="font-normal color-gray text-2xl max-md:text-lg">Город: {{ weather?.location?.name }}</p>
            </div>
        </div>
        <div
            class="rounded-[20px] box-shadow bg-ligth-white p-4 max-w-[750px] w-full relative overflow-hidden max-xl:max-w-full max-xl:px-6 max-xl:py-4 max-xl:mt-5">
            <img src="../assets/icons/cloud.png" alt="cloud" class="absolute top-0 right-0 max-md:z-20 max-md:rounded-lg max-md:relative">
            <div class="flex justify-between gap-1 items-center relative z-10">
                <div class="mt-4 p-1">
                    <div class="flex gap-4 my-1 items-center justify-start p-1 max-md:flex-wrap">
                        <div class="shadow-items w-9 h-9 p-2 flex justify-center items-center rounded-full">
                            <nuxtIcon name="termometr" width="16px" height="25px" />
                        </div>
                        <span class="text-black text-sm max-md:text-md">Температура</span>
                        <p class="text-sm color-gray max-md:text-md">{{ weather?.current?.temp_c }}° - ощущается как {{
                        weather?.current?.feelslike_c }}°</p>
                    </div>
                    <div class="flex gap-4 my-1 items-center justify-start p-1 max-md:flex-wrap">
                        <div class="shadow-items w-9 h-9 p-2 flex justify-center items-center rounded-full">
                            <nuxtIcon name="blow" width="16px" height="20px" />
                        </div>
                        <span class="text-black text-sm max-md:text-md">Давление </span>
                        <p class="text-sm color-gray max-md:text-md">{{ weather?.current?.pressure_mb }} мм ртутного столба - нормальное</p>
                    </div>
                    <div class="flex gap-4 my-1 items-center justify-start p-1 max-md:flex-wrap">
                        <div class="shadow-items w-9 h-9 p-2 flex justify-center items-center rounded-full">
                            <nuxtIcon name="pressure" width="16px" height="20px" />
                        </div>
                        <span class="text-black text-sm max-md:text-md max-md:flex-1">Осадки</span>
                        <p class="text-sm color-gray max-md:text-md max-md:w-full">{{ weather?.current?.precip_mm > 0 ? weather?.current?.precip_mm + ' мм' :
                        'Без осадков' }}</p>
                    </div>
                    <div class="flex gap-4 my-1 items-center justify-start p-1 max-md:flex-wrap">
                        <div class="shadow-items w-9 h-9 p-2 flex justify-center items-center rounded-full">
                            <nuxtIcon name="wind" width="16px" height="20px" />
                        </div>
                        <span class="text-black text-sm max-md:text-md max-md:flex-1">Ветер</span>
                        <p class="text-sm color-gray max-md:text-md">{{ weather?.current?.wind_mph }} м/с юго-запад - легкий ветер</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            url_base: "https://api.weatherapi.com/v1/",
            query: 'Tashkent',
            weather: {},
            coords: {},
            weeknes:[],
            icons:{
                1000: require("../assets/icons/sun.svg"),
                1003: require("../assets/icons/cloudrain.svg"),
                1063: require("../assets/icons/rainsun.svg"),
                1189: require("../assets/icons/rain.svg"),
                1006: require("../assets/icons/twicerain.svg"),
                1183: require("../assets/icons/cloudrain.svg"),
                1198: require("../assets/icons/snow.svg"),
            }
        }
    },
    computed: {
        ...mapState(["api_key"])
    },
    methods: {
        
        getTime(localeTime) {
            let date = new Date(localeTime);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let time = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
            return time;
        },
        getWeather() {
            let q = this.query || "Tashkent";
            this.$axios.get(`${this.url_base}current.json?q=${q}&key=${this.api_key}`)
                .then(response => {
                    this.weather = response.data;
                    // console.log(this.weather);
                    this.getDatafor7days(q);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        getDatafor7days(q) {
            this.$axios.get(`${this.url_base}forecast.json?q=${q}&key=${this.api_key}&days=7`).then((res)=>{
                this.weeknes = res.data.forecast.forecastday;
                this.$store.dispatch("setWeeklyData",this.weeknes);
            })
        }
    },
    watch: {
        "$route"(newVal) {
            let cityName = newVal.query.cityName
            this.query = cityName;
            this.getWeather();
        }
    },
    created() {
        if(this.$route.query.cityName){
            this.query = this.$route.query.cityName;
        }
        this.getWeather();
    }
}
</script>

<style lang="scss"></style>