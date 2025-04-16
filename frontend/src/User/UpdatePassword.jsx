import React, { useState } from 'react'
import '../UserStyles/Form.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageTitle from '../components/PageTitle'

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const updatePasswordSubmit = () => {

    }

  return (
    <>
        <Navbar />
        <PageTitle title="Password Update" />
        <div className="container update-container">
            <div className="form-content">
                <form className="form" onSubmit={updatePasswordSubmit}>
                <h2>Update Password</h2>

                <div className="input-group">
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} name='oldPassword' placeholder='Old Password' />
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} name='oldPassword' placeholder='New Password'/>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name='oldPassword' placeholder='Confirm Password'/>
                </div>

                <button className="authBtn">Update Password</button>
                </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default UpdatePassword