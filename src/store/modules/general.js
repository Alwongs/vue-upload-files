export default {
    getters: {
        getProcessing(state) {
            return state.processing
        }, 
        getError(state) {
            return state.error
        } 
    },
    state: {
        processing: false,
        error: null
    },
    mutations: {
        SET_PROCESSING(state, payload) {
            state.processing = payload;
        },
        SET_ERROR(state, payload) {
            state.error = payload;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
    },
}