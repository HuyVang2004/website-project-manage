export const ROUTERS = {
    USER: {
        DEFAULT:'/',
        HOME: "/trangchu",
        PROFILE: "/profile",
        REGISTER: "/dangki",
        FORGOTPASSWORD: "/quenmatkhau",
        LOGIN: "/dangnhap",
        CHANGEPASSWORD: "/changepassword",
        SETTINGUSER: "/setting_user",
        PROJECT: {
            BASE: "/duan",
            PROJECTDETAILS: "/duan/chitiet",
        },
        MYTASK : "/mytask",
        HELP: "/help",
        PEOPLELIST : "/nguoidung"
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
        SETTINGS: "admin/settings",
        CHATBOX: "admin/support",
        HELP: "admin/help"
    }
}