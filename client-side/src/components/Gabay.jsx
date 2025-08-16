import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DonatedItems from './DonatedItems'
import AddItem from './AddItem'
import NotDonations from './NotDonations'
import Dedications from './Dedications'
import UpdateUser from './UpdateUser'
import Donates from './Donates';

function Gabay() {
    const location = useLocation();
    const [email, setEmail] = useState(sessionStorage.getItem('email'))
    let navigate = useNavigate();
    const [shul, setShul] = useState({});
    const [messageGabay, setmessageGabay] = useState(true)
    const [NumberWorshipers, setNumberWorshipers] = useState([])
    const [NumberWorshipersT, setNumberWorshipersT] = useState(false)

    useEffect(() => {
        async function fetchShulId() {
            setmessageGabay(true);
            let data = { email: email };
            console.log(email);
            let url = `https://donation-project-server.onrender.com/api/gabay/getShul`;
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const myShul = (await response.json())[0];
            console.log(myShul);
            setShul(myShul);
            debugger
            url = `https://donation-project-server.onrender.com/api/user/${sessionStorage.getItem('email')}/numWorshipers`;
            let response2 = await fetch(url);
            console.log(response2);
            let content2 = await response2.json();
            if (content2 !== null) {
                setNumberWorshipers(content2[0].total);
                setNumberWorshipersT(true)
            }
        }
        fetchShulId();
    }, []);

    function enterAction() {
        setmessageGabay(false)
    }

    return (
        <div>
            <div>
                <nav>
                    <Link to="./AddItem" onClick={enterAction}>הוסף פריט</Link>
                    <Link to="./NotDonations" onClick={enterAction} >הצג בקשות לתרומה</Link>
                    <Link to="./DonatedItems" onClick={enterAction}>הצג את כל התרומות</Link>
                    <Link to="./Dedications" onClick={enterAction}>הקדשות</Link>
                    <Link to="./UpdateUser" onClick={enterAction}>עדכון פרטים אישיים</Link>
                    {/* {(sessionStorage.getItem("email")) && <Link to="/UpdateUser" onClick={enterAction}>עדכון פרטים אישיים</Link>} */}
                    {NumberWorshipersT && <Link to="/Donates" onClick={enterAction} onClick={() => { sessionStorage.setItem('email', ''); }} >יציאה מ- {sessionStorage.getItem("email")} | מספר מתפללים בבית הכנסת - {NumberWorshipers}|</Link>}
                    {!NumberWorshipersT && <Link to="/Donates" onClick={enterAction} onClick={() => { sessionStorage.setItem('email', ''); }} >יציאה מ- {sessionStorage.getItem("email")} </Link>}
                </nav>
            </div>
            <Routes>
                <Route path="/AddItem" element={<AddItem ShulId={shul.ShulId} />} />
                <Route path="/NotDonations/*" element={<NotDonations ShulId={shul.ShulId} />} />
                <Route path="/DonatedItems" element={<DonatedItems ShulId={shul.ShulId} />} />
                <Route path="/Dedications" element={<Dedications ShulId={shul.ShulId} />} />
                <Route path="/UpdateUser" element={<UpdateUser ShulId={shul.ShulId} />} />
            </Routes>
            {location.pathname === "/Gabay" && <h1 className="gabay">{location.state === null ? "ברוכים הבאים לאתר התרומות הגדול" : location.state.testS}</h1>}
        </div>);
}
export default Gabay;