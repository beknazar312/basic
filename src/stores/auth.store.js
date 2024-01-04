import { defineStore } from 'pinia';

import { fetchWrapper } from '../helpers/fetch-wrapper.js';
import router from '../router.js';
import { useAlertStore } from './alert.store.js';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        userData: JSON.parse(localStorage.getItem('userData')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            try {
                const userData = await fetchWrapper.post(`${baseUrl}/login`, { email, password });

                // update pinia state
                this.userData = userData;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('userData', JSON.stringify(userData));

                // redirect to previous url or default to home page
                router.push(this.returnUrl || '/');
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);
            }
        },
        logout() {
            this.userData = null;
            localStorage.removeItem('userData');
            router.push('/signin');
        }
    }
});