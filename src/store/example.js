export default {
    state: {
        message: 'Hello World! I am Vuex!'
    },
    mutations: {},
    actions: {},
    getters: {
        getMessage(state){
            return state.message
        }
    }
}