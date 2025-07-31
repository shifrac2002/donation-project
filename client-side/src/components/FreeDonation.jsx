import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import NavDonate from './NavDonate'
import validator from 'validator'

function FreeDonation() {
    const [shuls, setShuls] = useState([]);
    const [flag, setFlag] = useState(true);
    const [freeDonation, setFreeDonation] = useState({ Shul: 2, Sum: '', Dedication: '', Customer: sessionStorage.getItem('email') });
    const [number, setNumber] = useState(false);
    const [date, setDate] = useState({ month: '', year: '' });
    const [validity, setValidity] = useState(false);
    const [threeDigitsBackOfTheCard, setThreeDigitsBackOfTheCard] = useState(false);
    const [errorMessageCVC, setErrorMessageCVC] = useState('');
    const [errorMessageCreditCardNumber, setErrorMessageCreditCardNumber] = useState('');
    const [errorMessageValidity, setErrorMessageValidity] = useState('');

    function NameOfShul(e) {
        let id = e.childNodes[e.target.selectedIndex].id;
        setFreeDonation({ ...freeDonation, Shul: id });
    }

    function dediction(e) { const value = e.target.value; setFreeDonation({ ...freeDonation, Dedication: value }); }
    function sum(e) {
        const value = e.target.value;
        setFreeDonation({
            ...freeDonation,
            Sum: value
        });
    }

    useEffect(() => {
        async function fetchShuls() {
            if (sessionStorage.getItem('email')) {
                let resultShuls = await fetch(`https://donation-project-server.onrender.com/api/shul/all`);
                let shuls = await resultShuls.json();
                console.log(shuls);
                setShuls(shuls);
            }
            else {
                setFlag(false);
            }
        }
        fetchShuls();
    }, []);

    async function saveDonation() {
        console.log(freeDonation)
        const url = `https://donation-project-server.onrender.com/api/donation/save`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(freeDonation)
        });
    }

    const validateCreditCard = (value) => {
        debugger
        if (validator.isCreditCard(value)) {
            setNumber(true);
            setErrorMessageCreditCardNumber('');
        } else {
            setNumber(false);
            setErrorMessageCreditCardNumber('Enter valid CreditCard Number!');
        }
    }

    function CreditCardValidityYear(value) {
        debugger;
        setDate({
            ...date,
            year: value
        });
        if (date.month != '') {
            checkValidity(value, date.month);
        }
    }

    function checkValidity(year, month) {
        let exMonth = month;
        let exYear = year;
        let today = new Date();
        if (today.getFullYear() > exYear || (today.getFullYear() == exYear && today.getMonth() + 1 > exMonth) || exMonth < 0 || exMonth > 12) {
            setValidity(false);
            setErrorMessageValidity("The expiry date is before today's date. Please select a valid expiry date");
        }
        else {
            setValidity(true);
            setErrorMessageValidity('');
        }
    }

    function CreditCardValidityMonth(value) {
        debugger
        setDate({
            ...date,
            month: value
        });
        if (date.year != '') {
            checkValidity(date.year, value);
        }
    }

    function cvc(e) {
        debugger
        if (e < 1000 && e > 99) {
            setThreeDigitsBackOfTheCard(true);
            setErrorMessageCVC('');
        }
        else {
            setThreeDigitsBackOfTheCard(false);
            setErrorMessageCVC("The cvc is not valid!!");
        }
    }
    return (
        <div>
            <NavDonate />
            <div className="confirmation">
                {(!flag) && <h2 className='h2login'>כדי לבצע תרומה חפשית יש לבצע התחברות</h2>}
                {flag && <div>
                    <h1 className='h1Donate'>תרומה חופשית</h1>
                    <h2 className='tDonate'>בחר בית כנסת</h2>
                    <select className='confirmationInp' onChange={NameOfShul}>{shuls.map((shul) => { return (<option className='optionShuls' key={shul.ShulId} id={shul.ShulId} value={shul.NameShul}>{shul.NameShul}</option>) })}</select>
                    <h2 className='tDonate'>הכנס הקדשה</h2>
                    <input className='confirmationInp' type="text" onBlur={dediction} />
                    <h2 className='tDonate'>הכנס סכום לתרומה</h2>
                    <input className='confirmationInp' type="text" onBlur={sum} />
                    <h1 className='h1Donate'>הכנס פרטי אשראי</h1>
                    <h2 className='tDonate'>הכנס מספר אשראי</h2>
                    <input className='confirmationInp' maxLength={16} onBlur={(e) => validateCreditCard(e.target.value)} />
                    <h2 className='tDonate'>הכנס תוקף</h2>
                    <div className='confirmationDiv'>
                        <input className='confirmationInp' onBlur={(e) => CreditCardValidityYear(e.target.value)} />
                        <h1>/</h1>
                        <input className='confirmationInp' onBlur={(e) => CreditCardValidityMonth(e.target.value)} />
                    </div>
                    <h2 className='tDonate'>הכנס שלוש ספרות בגב הכרטיס</h2>
                    <input className='confirmationInp' maxLength={3} onBlur={(e) => cvc(e.target.value)} />
                    <br />
                    <span className='spanError'>{errorMessageCreditCardNumber}</span>
                    <br />
                    <span className='spanError'>{errorMessageValidity}</span>
                    <br />
                    <span className='spanError'>{errorMessageCVC}</span>
                    <br />
                    <button className='btnOkConfirmation' hidden={!(number && validity && threeDigitsBackOfTheCard)} onClick={saveDonation}>אישור</button>
                </div>}
            </div>
        </div>
    );
}
export default FreeDonation;