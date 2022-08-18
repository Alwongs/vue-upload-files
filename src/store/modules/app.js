export default {
    getters: {
        isMenuActive(state) {
            return state.isMenuActive
        }
    },
    state: {
        isMenuActive: false
    },
    mutations: {
        TOGGLE_MENU(state) {
            state.isMenuActive = !state.isMenuActive
        }
    },
    actions: {
    },
}