import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: JSON.parse(localStorage.getItem("data")) || null,
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        register: (state, action) => {
            state.data = action.payload
            localStorage.setItem("data", JSON.stringify(action.payload))
        },
        login: (state, action) => {
            state.token = action.payload.access_token;
            localStorage.setItem("token", action.payload.access_token)
            if (state.token) {
                window.location.replace("/admin")
            }
        },
        getUserProfile: (state, action) => {
            const { password, ...user } = action.payload
            state.user = user
            localStorage.setItem("user", JSON.stringify(user))
        }
    }
})

export const { register, login, getUserProfile } = authSlice.actions


export default authSlice.reducer 