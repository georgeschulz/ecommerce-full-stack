import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem('isAuth');
    return isAuth && JSON.parse(isAuth);
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: userAuthFromLocalStorage()    },
    reducers: {
        authorize: (state) => {
            state.isAuth = true;
            localStorage.setItem('isAuth', true)
        },
        deauthorize: (state) => {
            localStorage.removeItem('isAuth');
            state.isAuth = false;
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
        }
    }
})

export const selectIsAuth = state => state.auth.isAuth;
export const selectUserId = state => state.auth.userId;
export const { authorize, deauthorize, setUserId } = authSlice.actions;
export default authSlice.reducer;