import React, { useEffect } from 'react'
import Home from './pages/Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Register from './User/Register'
import Login from './User/Login'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './features/user/userSlice'
import UserDashboard from './User/UserDashboard'
import Profile from './User/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateProfile from './User/UpdateProfile'
import UpdatePassword from './User/UpdatePassword'

function App() {
  const {isAuthenticated, user} = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  },[dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {isAuthenticated && <UserDashboard user={user} />}
    </Router>
  )
}

export default App