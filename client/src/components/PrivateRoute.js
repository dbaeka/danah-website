import React, {Component} from "react"
import {navigate} from "gatsby"
import {isLoggedIn} from "../services/auth"

const PrivateRoute = ({component: Component, location, ...rest}) => {
    if (!isLoggedIn() && location.pathname !== `/admin/login`) {
        if (typeof window !== `undefined`) {
            navigate("/admin/login")
            return null
        }
    }

    return <Component {...rest} />
}

export default PrivateRoute