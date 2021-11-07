import React, { useEffect } from 'react';
import './App.css';
import Header from './component/header/header';
import Sidebar from './component/sidebar/sidebar';
import Feed from './component/feed/feed';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import Login from './component/login/login'

const App = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  console.log(user)

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.photoURL
        }))
      }
      else { dispatch(logout()) };
    })
  }, [])

  return (
    <div className="App">

      <Header user={user} />

      <div className="App__body">

        {!user ?
          <Login />
          :
          <>
            <Sidebar user={user}/>
            <Feed user={user} />
          </>
        }
      </div>
    </div>

  );
}

export default App;
