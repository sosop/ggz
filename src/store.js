import Vue from 'vue'

const store = {
    debug: true,
    state: {
        user: {}
    },
    setUserAction (userValue) {
        if (this.debug) console.log('setUserAction triggered with', userValue)
        this.state.user = userValue
    },
    clearUserAction () {
        if (this.debug) console.log('clearUserAction triggered')
        this.state.user = {}
    }
}

export default store

Vue.use(store)