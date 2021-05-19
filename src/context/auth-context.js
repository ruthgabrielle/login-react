import React, { useState, useEffect } from 'react'

const AuthContext = React.createContext({
    isLogged: false,
    onLogout: (email, password) => { }
});


export const AuthContextProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        const storeUser = localStorage.getItem('isLoggedIn')
    
        if (storeUser === '1') {
          setIsLogged(true)
        }
      }, [])
    
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLogged(false)
    }
    const loginHandler = () => {
        localStorage.setItem('isLogged', '1')
        setIsLogged(true)
    }

    return <AuthContext.Provider value={{
        isLogged: isLogged,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContext;