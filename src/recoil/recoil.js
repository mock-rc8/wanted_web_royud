import { atom } from "recoil";

export const isLogin = atom({
    key: "isLogin",
    default: false
})
export const getToken = atom({
    key : "token",
    default: ""
})
export const Login_profile = atom({
    key: "Login_profile",
    default : []
})
export const nowPage = atom({
    key : "nowPage",
    default: "/"
})