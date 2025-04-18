import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import { useParams } from 'react-router-dom'

function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = ("")
    const { token } = useParams()
    
    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const data = {
            password,
            confirmPassword
        }
    }

  return (
    <>
        <PageTitle title="Reset Password" />
        <div className="container form-container">
            <form className="form" onSubmit={resetPasswordSubmit}>
                <h2>Reset Password</h2>
                <div className="input-group">
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        placeholder='Enter your new password' 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="input-group">
                    <input 
                        type="password" 
                        name="vonfirmPassword" 
                        value={confirmPassword} 
                        placeholder='Enter your confirm new password' 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>

                <button className="authBtn">Reset Password</button>
            </form>
        </div>
    </>
  )
}

export default ResetPassword