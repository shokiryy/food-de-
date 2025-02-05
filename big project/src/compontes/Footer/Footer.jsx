import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
         <div className="footer-content">
            <div className="footer-conten-left">
                <img src={assets.logo} alt="" />
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque amet dolores maiores vitae.rgrgrqeefefrlormeefefefefe,forgrogrogrfs</p>
                <div className='footer-social-icons'>
                      <img src={assets.facebook_icon} alt="" />
                      <img src={assets.twitter_icon} alt="" />
                      <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-conten-cener">
                 <h2>Company</h2>
                 <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy pilicy</li>
                 </ul>
            </div>
            <div className="footer-conten-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+998 99-199-30-77</li>
                <li>contact@tomato.com</li>
            </ul>
            </div>
         </div>
         <hr />
         <p className="footer-copyright">Copyriht 2025 Tomato.com -all Right Reserverd</p>
    </div>
  )
}

export default Footer