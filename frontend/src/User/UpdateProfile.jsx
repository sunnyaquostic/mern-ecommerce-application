import React, { useEffect, useState } from 'react'
import '../userStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess, updateProfile } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

function UpdateProfile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('./images/profile.png')
  const {user, error, success, message, loading} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const profileImageUpdate = (e) => {
    const reader = new FileReader()
    reader.onload = () => {
      if(reader.readyState === 2) {
        setAvatarPreview(reader.result)
        setAvatar(reader.result)
      }
    }

    reader.onerror=(error)=> {
      toast.error('Error reading file', {position: 'top-center', autoClose:3000})
      console.log(error)
    }

    reader.readAsDataURL(e.target.files[0])
  }

  const updateSubmit = (e) => {
    e.preventDefault()
    const myForm = new FormData();
    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("avatar", avatar)
    dispatch(updateProfile(myForm))
  }

  useEffect(() => {
    if (error) {
      toast.error(error, {position:'top-center', autoClose:3000})
      dispatch(removeErrors())
    }
  },[dispatch, error])

  useEffect(() => {
    if (success) {
      toast.success(message, {position:'top-center', autoClose:3000})
      dispatch(removeSuccess())
      navigate('/profile')
    }
  },[dispatch, success])

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url || './images/profile.png')
    }
  }, [user])

  return (
    <>
      {loading 
      ? (
        <Loader />    
        ) 
      : (<>
        <Navbar />
        <div className="container update-container">
          <div className="form-content">
            <form className="form" encType='multipart/form-data' onSubmit={updateSubmit}>
              <h2>Update Profile</h2>
              <div className="input-group avatar-group">
                <input type="file" className="file-input" accept='image/' onChange={profileImageUpdate} name='avatar' />
                <img src={avatarPreview} alt="user profile" className="avatar" />
              </div>

              <div className="input-group">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' />
              </div>

              <div className="input-group">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
              </div>

              <button className="authBtn">Update Profile</button>
            </form>
          </div>
        </div>

        <Footer />
      </>)}
    </>
  )
}

export default UpdateProfile