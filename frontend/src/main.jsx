import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx';
import AdminUser from './screens/AdminUser.jsx';
import AdminUserUpdate from './screens/AdminUpdateUser.jsx'

import store from './store.js'
import { Provider } from 'react-redux'
import './index.css'


const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
       <Route path='/register' element={<RegisterScreen/>}/>
       {/* Private routes */}
       <Route  path='' element={<PrivateRoute/>}>
       <Route path='/profile' element={<ProfileScreen/>}/>
       </Route>

      <Route path='/admin/login' element={<AdminLoginScreen />} />
      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/admin' element={<AdminHomeScreen />} />
        <Route path='/admin/users/update/:id' element={<AdminUserUpdate />} />
       <Route path='/admin/users/add' element={<AdminUser />} />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>
  
)
