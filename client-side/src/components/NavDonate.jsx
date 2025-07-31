import react, { useState } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/LogIn.css'
function NavDonate() {
    return (
        <div>
            <nav>
                {(!sessionStorage.getItem("email")) && <Link to="/LogIn">התחברות</Link>}
                {(sessionStorage.getItem("email")) && <Link to="/Donates/UpdateUser">עדכון פרטים אישיים</Link>}
                <Link to="/Donates/"> תרומה לפי בית כנסת </Link>
                <Link to="/Donates/DonationByItem"> תרומה לפי פריט </Link>
                <Link to="/Donates/FreeDonation"> תרומה חופשית </Link>
                <Link to="/Donates/DonationsDonated"> התרומות שלך </Link>
                {(sessionStorage.getItem("email")) && <Link to="/Donates/Exit" onClick={() => { sessionStorage.setItem('email', ''); }}>יציאה מ- {sessionStorage.getItem("email")}</Link>}
            </nav>
        </div>
    )
}
export default NavDonate;