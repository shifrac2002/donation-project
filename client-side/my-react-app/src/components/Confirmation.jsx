import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import validator from 'validator'
import NavDonate from './NavDonate'

function Confirmation() {
  const location = useLocation();
  let navigate = useNavigate();
  const [dedication, setDedication] = useState('');
  const [check, setCheck] = useState({});
  const [date, setDate] = useState({ month: '', year: '' });
  const [number, setNumber] = useState(false);
  const [validity, setValidity] = useState(false);
  const [threeDigitsBackOfTheCard, setThreeDigitsBackOfTheCard] = useState(false);
  const [errorMessageCVC, setErrorMessageCVC] = useState('');
  const [errorMessageCreditCardNumber, setErrorMessageCreditCardNumber] = useState('');
  const [errorMessageValidity, setErrorMessageValidity] = useState('');

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
  
  function dedictionValue(e) {
    setDedication(e.target.value);
  }
  async function saveDonation() {
    let date = {
      id: location.state.item.Id,
      amount: location.state.amount,
      dedication: dedication,
      email: sessionStorage.getItem('email')
    }
    console.log(date);
    const url = `${process.env.REACT_APP_API_URL}/api/donation`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(date)
    });
    alert("תודה על תרומתך!!")
    navigate('/Donates/')
  }
  return (
    <div>
      <NavDonate />
      <div className="confirmation">
        <h1 className='h1Donate'>סך לתרומה - {location.state.price * location.state.amount}</h1>
        <h2 className='tDonate'>הכנס הקדשה</h2>
        <input className='confirmationInp' type="text" onBlur={dedictionValue} />
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
        <span>{errorMessageCreditCardNumber}</span>
        <br />
        <span>{errorMessageValidity}</span>
        <br />
        <span>{errorMessageCVC}</span>
        <br />
        <button className='btnOkConfirmation' hidden={!(number && validity && threeDigitsBackOfTheCard)} onClick={saveDonation}>אישור</button>
      </div>
    </div>);
}
export default Confirmation;
