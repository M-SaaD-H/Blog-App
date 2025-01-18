import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from "./appwrite/auth.js"
import { login, logout } from './store/authSlice.js';
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login(userData)); // This make changes in the store and tell the store that i user is logged in so that we can ask the store the if a user is logged in or not anywhere
      } else {
        dispatch(logout()); // This tells the user has been logged out. If it is not written then the store will not change its status even after the user has logged out
      }
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='min-h-screen flex justify-center items-center flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
