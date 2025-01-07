export const ROUTERS = {
    USER: {
        DEFAULT:'/',
        HOME: "/trangchu",
        PROFILE: "/profile",
        HOME: "/",
        REGISTER: "/dangki",
        FORGOTPASSWORD: "/quenmatkhau",
        LOGIN: "/dangnhap",
        CHANGEPASSWORD: "/changepassword",
        SETTINGUSER: "/setting_user",
        PROJECT: {
            BASE: "/duan",
            PROJECTDETAILS: "/duan/chitiet",
        },
    },

    ADMIN: {
        REGISTER: "dangki",
        LOGIN: "dangnhap",
        FORGOTPASSWORD: "dangnhap/quenmatkhau",
        DASHBOARD: "admin",
        MANAGEMENT:"admin/users",
        USERDETAILS: "admin/users/details/:id",
        LANDINGPAGE: "landing",
        PROJECT: "admin/projects",
        PROJECTDETAILS: "admin/projects/:project",
        STATISTICS: "admin/statistics",
        SETTINGS: "admin/settings"
    }
}