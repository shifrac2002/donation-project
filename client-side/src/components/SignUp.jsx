import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/SignUp.css'
import '../css/LogIn.css'
import NavDonate from './NavDonate'


function SignUp() {
    const location = useLocation();
    let navigate = useNavigate();
    const [shuls, setShuls] = useState([]);
    const [flag, setFlag] = useState(true);
    const [ifFromDonation, setIfFromDonation] = useState(true);
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const [imageName, setImageName] = useState('')
    const [typeUser, setTypeUser] = useState('');
    const [notValidPhone, setNotValidPhone] = useState('');
    const [notValidMail, setNotValidMail] = useState('');
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        type: "תורם",
        password: '',
        idShul: ''
    });
    const [shul, setShul] = useState({
        name: '',
        address: '',
        email: ''
    })
    function handleFileChange(e) {
        debugger
        setImageName(e.target.files[0].name);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }
    ///הכנסת פרטי גבאי/תורם
    function insertName(e) {
        const value = e.target.value;
        setUser({
            ...user,
            name: value
        })
    }
    function insertLastName(e) {
        const value = e.target.value;
        setUser({
            ...user,
            lastName: value
        })
    }
    function insertPhone(e) {
        const value = e.target.value;
        if (!validPhone(value)) {
            // alert("phone is not valid");
            setNotValidPhone(true)
        }
        else {
            setNotValidPhone(false)
            setUser({
                ...user,
                phone: value
            })
        }
    }

    function NameOfShul(e) {
        const value = e.target.value;
        setUser({
            ...user,
            idShul: value
        })
    }

    function validPhone(phone) {
        let check = /^[0-9]{10}$/;
        return check.test(phone)
    }
    function validEmail(email) {
        let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return check.test(email)
    }
    function insertEmail(e) {
        debugger
        const value = e.target.value;
        if (!validEmail(value))
            setNotValidMail(true)
        else {
            setNotValidMail(false)
            setUser({
                ...user,
                email: value
            })
        }
    }
    function insertTypeUser(e) {
        setTypeUser(e.target.value);
        const value = e.target.value;
        setUser({
            ...user,
            type: value
        })
    }
    function insertPassword(e) {
        const value = e.target.value;
        setUser({
            ...user,
            password: value
        });
    }
    ///הכנסת פרטי בית כנסת
    function insertShulName(e) {
        const value = e.target.value;
        setShul({
            ...shul,
            name: value,
            email: user.email
        });
    }
    function insertShulAddress(e) {
        const value = e.target.value;
        setShul({
            ...shul,
            address: value
        });
    }
    useEffect(() => {
        async function fetchAddresses() {
            if (location.state) {
                setIfFromDonation(false)
            }
            let resultShuls = await fetch(`https://donation-project-server.onrender.com/api/shul/all`);
            let shuls = await resultShuls.json();
            console.log(shuls);
            setShuls(shuls);
        }
        fetchAddresses();
    }, []);

    async function signUpClicked() {
        try {
            if (user.name === '' || user.lastName === '' || user.phone === '' || user.email === '' || user.password === '') {
                debugger
                alert("פרטים לא מלאים")
            }
            else {
                console.log(user);
                const url = `https://donation-project-server.onrender.com/api/user/add`;
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const content = await response.json();
                console.log(response);
                console.log(content);
                let email = user.email;
                if (content === "false") {
                    alert("משתמש קיים");
                    navigate('/LogIn');
                }
                else if (user.type == "גבאי") {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('type', 1);
                    setFlag(false);
                }
                else if (user.type == "תורם") {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('type', 2);
                    if (location.state)
                        navigate('/Donates/Shul/ItemsOfShul/Confirmation', { state: { item: location.state.item, amount: location.state.amount } })
                    else
                        navigate('/Donates')
                }
            }
        }
        catch (error) {
            navigate('/SignUp')
        }

    }
    async function handleSubmit(e) {
        debugger
        e.preventDefault()
        let formData = new FormData();
        formData.append('file', image.data);
        formData.append('name', shul.name);
        formData.append('address', shul.address);
        formData.append('email', shul.email);
        formData.append('imageName', imageName);
        const response = await fetch(`https://donation-project-server.onrender.com/api/shul/add`, {
            method: 'POST',
            body: formData,
        })
        const result = await response.json();
        if (result) setStatus(response.statusText)
        navigate('/Gabay')
    }
    function logIn() {
        navigate('/LogIn')
    }

    return (
        <div>
            <NavDonate />

            {flag &&
                <div>
                    <div className="background">
                        <div className="shape1"></div>
                        <div className="shape1"></div>
                    </div>
                    <form id="formSignUp">
                        <h1 className='h1Donate'>משתמש חדש</h1>
                        <label className='h1Donate'> הכנס שם </label>
                        <input className="input" type="text" placeholder="FirstName" onBlur={insertName}></input>
                        <label className='h1Donate'>הכנס שם משפחה</label>
                        <input className="input" type="text" placeholder="LastName" onBlur={insertLastName}></input>
                        <label className='h1Donate'>טלפון </label>
                        <input className="input" type="phone" placeholder="phone" onBlur={insertPhone}></input>
                        {notValidPhone && <span>טלפון לא תקין</span>}
                        <label className='h1Donate'>מייל</label>
                        <input className="input" type="email" placeholder="Name" required="" onBlur={insertEmail}></input>
                        {notValidMail && <span>מייל לא תקין</span>}
                        <label className='h1Donate'>סוג משתמש</label>
                        {ifFromDonation && <select name="TypeUser" className="input" onChange={insertTypeUser}>
                            <option value="">בחר סוג משתמש</option>
                            <option className='h1Donate'>תורם</option>
                            <option className='h1Donate'>גבאי</option>
                        </select>}
                        {typeUser === "תורם" && (
                            <>
                                <h2 className='tDonate'>בחר בית כנסת</h2>
                                <select className='confirmationInp' onChange={NameOfShul}>
                                    <option value=""> בחר ב"כ המשויך אליך</option>
                                    {shuls.map((shul) => (
                                        <option className='optionShuls' key={shul.ShulId} value={shul.ShulId}>
                                            {shul.NameShul}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}
                        <label className='h1Donate'>סיסמה</label>
                        <input className="input" type="password" placeholder="password" onBlur={insertPassword}></input>
                        <button className='btnSignUp' type="button" onClick={signUpClicked}>שמור</button>
                        <button className='btnSignUp' type="button" onClick={logIn}>התחבר כמשתמש קיים</button>
                    </form>
                </div>
            }
            {/* "אם נכנס כגבאי" */}
            {(!flag) && <div>
                <h2>הכנס שם בית כנסת</h2>
                <input type="text" placeholder="שם בית כנסת" onBlur={insertShulName}></input>
                <h2>הכנס כתובת </h2>
                <input type="text" placeholder="כתובת מדויקת,שם עיר" onBlur={insertShulAddress}></input>
                <div className='App'>
                    <h1>הוספת תמונה</h1>
                    {image.preview && <img src={image.preview} width='100' height='100' />}
                    <hr></hr>
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    {/* <button type='button' >Submit</button> */}
                    <button onClick={handleSubmit}>הכנס</button>
                </div>
            </div>}
        </div>);
}
export default SignUp;