import React from 'react'
import '../UserStyles/Shipping.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'

function Shipping() {
  return (
    <>
        <PageTitle title="Shipping Info" />
        <Navbar />
        <CheckoutPath activePath={0} />
        <div className="shipping-form-container">
            <div className="shipping-form-header">
                Shipping Details
            </div>

            <form className="shipping-form">
                <div className="shipping-section">
                    <div className="shipping-form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id='address' name='address' placeholder='Enter your address' />
                    </div>
                    <div className="shipping-form-group">
                        <label htmlFor="pinCode">Pin Code</label>
                        <input type="number" id='pinCode' name='pinCode' placeholder='Enter your pinCode' />
                    </div>
                    <div className="shipping-form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="tel" id='phoneNumber' name='phoneNumber' placeholder='Enter your Phone Number' />
                    </div>
                </div>

                <div className="shipping-section">
                    <div className="shipping-form-group">
                        <label htmlFor="country">Country</label>
                        <select name="country" id="country">
                            <option value="">select a country</option>
                            <option value="US">United State</option>
                            <option value="NG">Nigeria</option>
                            <option value="IN">India</option>
                        </select>
                    </div>
                    <div className="shipping-form-group">
                        <label htmlFor="city">City</label>
                        <select name="city" id="city">
                            <option value="">select a City</option>
                        </select>
                    </div>
                    <div className="shipping-form-group">
                        <label htmlFor="state">State</label>
                        <select name="state" id="state">
                            <option value="">select a state</option>
                        </select>
                    </div>
                </div>
                <button className="shipping-submit-btn">
                    Continue
                </button>
            </form>
        </div>
        <Footer />
    </>
  )
}

export default Shipping