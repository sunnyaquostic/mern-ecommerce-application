import React, { useState } from 'react'
import '../UserStyles/Form.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const ForgotPasswordEmail = (e) => {
        e.preventDefault()
        const myForm = new FormData()
        myForm.set('email', email)
    }

  return (
    <>
        <PageTitle title="Forgot Password" />
        <Navbar />
        <div className="container forgot-container">
            <div className="form-content email-group">
                <form className="form" onSubmit={ForgotPasswordEmail}>
                    <h2>Forgot Password</h2>
                    <div className="input-group">
                        <input type="email" name="email" placeholder='Enter your registered email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <button className="authBtn">Send</button>
                </form>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default ForgotPassword