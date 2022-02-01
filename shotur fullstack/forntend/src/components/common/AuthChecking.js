import React, {useContext} from 'react'
import { Short } from "../../context";
import  { Navigate as Redirect } from 'react-router-dom'


function AuthChecking() {
    const {data } = useContext(Short);
    if(!data.authToken) {
        return <Redirect to='/login'  />
    }
    return ""
}

export default AuthChecking
