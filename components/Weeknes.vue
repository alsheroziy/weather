<template>
    <div>
        <div class="flex justify-between items-center px-5 py-6">
            <button class="bg-blue btn-shadow rounded-[5px] text-white px-4 py-2">На неделю </button>
            <button class="bg-ligth-white btn-shadow rounded-[5px] text-black px-4 py-2">Отменить</button> <!--btn-bg-blue-->
        </div>
        <div class="py-4 px-1">
            <div class="box-shadow w-full bg-white top-border card-container px-4 py-4">
                <div class="rounded-[10px] card-bg px-3 py-2 w-full" :class="{ 'box-shadow-card': i == 1 }"
                    v-for="(item, i) in weeklyData">
                    <p class="text-black text-lg font-medium">{{
                        i == 0 ? 'Сегодня' : i == 1 ? 'Завтра' : replaceWeekNames(item.date) }}</p>
                    <p class="color-ligth text-md font-light">{{ returnDate(item.date) }} {{
                        replaceMonthNames(item.date) }}</p>
                    <!-- <nuxtIcon :name="" class="my-2" width="20px" height="20px" /> -->
                    <div class="max-w-[30px] max-h-[30px] mt-1">
                       <img class="w-full h-full" :src="icons[item?.day?.condition?.code]" :alt="item.day.condition.text">
                    </div>
                    <p class="text-lg text-black font-medium">{{ item.day.maxtemp_c}}°</p>
                    <p class="text-[0.8em] color-ligth font-medium">{{ item.day.mintemp_c }}°</p>
                    <p class="text-[0.8em] color-ligth font-medium">{{ item.day.condition.text }}</p>
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
            weekNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
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
        ...mapState(['weeklyData'])
    },
    methods: {
        returnDate(currentDate) {
            if (currentDate) {
                let date = currentDate.split("-");
                return date[date.length - 1];
            }
        },
        replaceWeekNames(currentDate) {
            if (currentDate) {
                const date = new Date(currentDate);
                const dayOfWeek = this.weekNames[date.getDay()];
                return dayOfWeek;
            }
        },
        replaceMonthNames(currentDate) {
            if (currentDate) {
                const date = new Date(currentDate);
                const month = this.monthNames[date.getMonth()];
                return month;
            }
        }
    }
}
</script>

<style lang="scss"></style>