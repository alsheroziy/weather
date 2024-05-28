export const state = () =>({
    api_key:"38a3b1d6d4ca4cb4a2d51744243004",
    theme:"light",
    weeklyData:[]
})

export const mutations = {
    setTheme(state, theme){
        state.theme = theme
    },
    setWeeklyData(state, weeklyData){
        state.weeklyData = weeklyData
    }
}

export const actions = {
    setTheme({commit}, theme){
        commit('setTheme', theme)
    },
    setWeeklyData({commit}, weeklyData){
        commit('setWeeklyData', weeklyData)
    }
}

export const getters = {
    get_theme(state){
        return state.theme
    },
    get_api_key(state){
        return state.api_key
    }
}