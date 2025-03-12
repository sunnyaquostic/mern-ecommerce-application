import React from 'react'
import '../componentStyles/Footer.css';
import {Phone, Mail, GitHub, LinkedIn, YouTube} from '@mui/icons-material';

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p><Phone fontSize='small'/> Phone : +2348051498982</p>
                <p><Mail fontSize='small'/> Email : sundayige.infotech@gmail.com</p>
            </div>

            <div className="footer-section social">
                <h3>Follow me</h3>
                <div className="social-links">
                    <a href="#http://" target="_blank" rel="noopener noreferrer">
                        <GitHub className='social-icon'/>
                    </a>
                    <a href="#http://" target="_blank" rel="noopener noreferrer">
                        <LinkedIn className='social-icon'/>
                    </a>
                    <a href="#http://" target="_blank" rel="noopener noreferrer">
                        <YouTube className='social-icon'/>
                    </a>
                </div>
            </div>

            <div className="footer-section about">
                <h3>About Us</h3>
                <p>Providing web development tutorials and courses to help you grow your skill.</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 sunnyempire. All rights reserved!</p>
        </div>
    </footer>
  )
}

export default Footer