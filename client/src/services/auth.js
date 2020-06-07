import axios from 'axios';

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
    isBrowser() && window.localStorage.getItem("gatsbyUser")
        ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
        : {}

const setUser = user =>
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = ({username, password}) => {
    return axios({
        method: "POST",
        url: "http://localhost:8080/login.php",
        data: {action: "login", username: username, password: password}
    }).then((response) => {
        if (response.data.state === 200) {
            const {name, apid, username} = response.data;
            return setUser({
                username: username,
                name: name,
                email: apid,
            })
        } else {
            return false
        }
    }).catch(() => false)

}

export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
}

export const logout = callback => {
    setUser({})
    callback()
}