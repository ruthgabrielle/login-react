import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storeUser = localStorage.getItem('isLoggedIn')

    if (storeUser === '1') {
      setIsLogged(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLogged', '1')
    setIsLogged(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLogged')
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{
      isLogged: isLogged
    }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLogged && <Login onLogin={loginHandler} />}
        {isLogged && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
