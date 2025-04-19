import React, { useEffect, useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userSlice'
import { toast } from 'react-toastify'

function ResetPassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = ("")
    const { token } = useParams()
    const {success, loading, error} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const resetPasswordSubmit = (e) => {
        e.preventDefault()
        const data = {
            password,
            confirmPassword
        }
        dispatch(resetPassword({token, userData:data}))
    }

    useEffect(() => {
    if (error) {
        toast.error(error.message, {position:'top-center', autoClose:3000})
        dispatch(removeErrors())
    }
    },[dispatch, error])

    useEffect(() => {
    if (success) {
        toast.success('Password reset successfully', {position:'top-center', autoClose:3000})
        dispatch(removeSuccess())
        navigate('/login')
    }
    },[dispatch, success])

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