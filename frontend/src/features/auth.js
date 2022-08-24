import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth');
    return isAuth && JSON.parse(isAuth);
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage()
    },
    reducers: {
        authorize: (state) => {
            state.isAuth = true;
        },
        deauthorize: (state) => {
            localStorage.removeItem('isAuth')
            state.isAuth = false;
        }
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const { authorize, deauthorize } = authSlice.actions;
export default authSlice.reducer;