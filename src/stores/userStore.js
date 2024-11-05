import { defineStore } from "pinia";
import { ref, reactive  } from "vue";

export const userStore = defineStore('user', () => {
    const users = reactive(new Map());

    function initializeUser(userId) {
        if (!users.has(userId)) {
            users.set(userId, {
                id: userId,
                typeModule: '',
                gamePoints: 0
            });
        }
        return users.get(userId);
    }

    function updateUserData(userId, data) {
        const user = users.get(userId);
        if (user) {
            Object.assign(user, data);
        }
    }

    function getUserData(userId) {
        return users.get(userId);
    }

    return {
        users,
        initializeUser,
        updateUserData,
        getUserData
    }

});
