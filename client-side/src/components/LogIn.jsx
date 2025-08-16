import react, { useState, useDeferredValue } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/LogIn.css'
import NavDonate from './NavDonate'

function LogIn() {
    let navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({ email: "", password: "" });
    const [twoOpshion, settwoOpshion] = useState(false);

    function insertEmail(e) {
        const value = e.target.value;
        setUser({
            ...user,
            email: value
        })
    }

    function insertPassword(e) {
        const value = e.target.value;
        setUser({
            ...user,
            password: value
        });
    }

    function toSignUp() {
        debugger
        if (location.state) {
            navigate('/signUp', { state: { item: location.state.item, amount: location.state.amount } })
        }
        else {
            navigate('/signUp')
        }
    }

    async function logInClicked() {
        try {
            debugger
            if (user.email == '' || user.password == '')
                alert("פרטים לא מלאים");
            else {
                const url = `http://localhost:6200/api/user/logIn`;
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                const content = await response.json();
                console.log(content)
                let email = user.email;
                if (content == "גבאי") {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('type', 1);
                    navigate('/Gabay');
                }
                if (content == "תורם") {
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('type', 2);
                    if (location.state != null) {
                        navigate('/Donates/Shul/ItemsOfShul/Confirmation', { state: { item: location.state.item, amount: location.state.amount } })
                    }
                    else {
                        navigate('/Donates')
                    }

                }
                if (content == "לא קיים") {
                    alert("משתמש לא קים נא להרשם")
                    navigate('/SignUp')
                }
                if (content == "שתי אפשרויות") {
                    settwoOpshion(true)
                    sessionStorage.setItem('email', email);
                }
            }
        }
        catch (error) {
            alert("ארעה תקלה בהתחברות משתמש קיים")
        }
    }

    function enterOfGabay() {
        sessionStorage.setItem('type', 1);
        navigate('/Gabay');
    }

    function enterOfDonate() {
        sessionStorage.setItem('type', 2);
        if (location.state != null) {
            navigate('/Donates/Shul/ItemsOfShul/Confirmation', { state: { item: location.state.item, amount: location.state.amount, price: location.state.price } })
        }
        else {
            navigate('/Donates')
        }
    }

    return (
        <div>
            {(!twoOpshion) && <div>
                <NavDonate />

                {(location.state) && <h1>התחבר למערכת על מנת לתרום</h1>}
                <div>
                    <div className="background">
                        <div className="shape"></div>
                        <div className="shape"></div>
                    </div>
                    <form>
                        <h1 className='h1Donate'>התחבר כמשתמש קיים</h1>
                        <label className='h1Donate' htmlFor="username">שם משתמש</label>
                        <input className="input" type="email" placeholder="email" onBlur={insertEmail}></input>
                        <label className='h1Donate' htmlFor="password">הכנס סיסמה</label>

                        <input className="input" type="password" placeholder="password" onBlur={insertPassword}></input>
                        <button type="button" onClick={logInClicked}>המשך</button>
                        <button type="button" onClick={toSignUp}>משתמש חדש</button></form>
                </div>
            </div>}
            {(twoOpshion) && <div>
                <button type="button" className="btnLogIn" onClick={enterOfGabay}>הכנס כגבאי</button>
                <button type="button" className="btnLogIn" onClick={enterOfDonate}>הכנס כתורם</button>
            </div>}
        </div>);

}
export default LogIn;



// import react, { useState, useDeferredValue } from 'react';
// import React, { Component, useEffect } from 'react'; // ⭐ useEffect הוספה
// import { useNavigate, Navigate, useLocation } from 'react-router-dom';
// import { Link } from 'react-router-dom'
// import '../css/LogIn.css'
// import NavDonate from './NavDonate'

// function LogIn() {
//     let navigate = useNavigate();
//     const location = useLocation();
//     const [user, setUser] = useState({ email: "", password: "" });
//     const [twoOpshion, settwoOpshion] = useState(false);

//     // ⭐ useEffect: בדיקת התחברות דרך GitHub
//     useEffect(() => {
//         debugger
//         const urlParams = new URLSearchParams(window.location.search);
//         const email = urlParams.get('email');
//         if (email) {
//           sessionStorage.setItem('email', email);
//           sessionStorage.setItem('type', 2); // נניח תורם
      
//           if (location.state) {
//             navigate('/Donates/Shul/ItemsOfShul/Confirmation', {
//               state: { item: location.state.item, amount: location.state.amount }
//             });
//           } else {
//             navigate('/Donates');
//           }
//         }
//       }, []);

//     function insertEmail(e) {
//         const value = e.target.value;
//         setUser({
//             ...user,
//             email: value
//         })
//     }

//     function insertPassword(e) {
//         const value = e.target.value;
//         setUser({
//             ...user,
//             password: value
//         });
//     }

//     function toSignUp() {
//         if (location.state) {
//             navigate('/SignUp', { state: { item: location.state.item, amount: location.state.amount } })
//         }
//         else {
//             navigate('/SignUp')
//         }
//     }

//     async function logInClicked() {
//         try {
//             if (user.email == '' || user.password == '')
//                 alert("פרטים לא מלאים");
//             else {
//                 const url = `https://donation-project-server.onrender.com/api/user/logIn`;
//                 let response = await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(user)
//                 });
//                 const content = await response.json();
//                 console.log(content)
//                 let email = user.email;
//                 if (content == "גבאי") {
//                     sessionStorage.setItem('email', email);
//                     sessionStorage.setItem('type', 1);
//                     navigate('/Gabay');
//                 }
//                 if (content == "תורם") {
//                     sessionStorage.setItem('email', email);
//                     sessionStorage.setItem('type', 2);
//                     if (location.state != null) {
//                         navigate('/Donates/Shul/ItemsOfShul/Confirmation', { state: { item: location.state.item, amount: location.state.amount } })
//                     }
//                     else {
//                         navigate('/Donates')
//                     }

//                 }
//                 if (content == "לא קיים") {
//                     alert("משתמש לא קים נא להרשם")
//                     navigate('/SignUp')
//                 }
//                 if (content == "שתי אפשרויות") {
//                     settwoOpshion(true)
//                     sessionStorage.setItem('email', email);
//                 }
//             }
//         }
//         catch (error) {
//             alert("ארעה תקלה בהתחברות משתמש קיים")
//         }
//     }

//     function enterOfGabay() {
//         sessionStorage.setItem('type', 1);
//         navigate('/Gabay');
//     }

//     function enterOfDonate() {
//         sessionStorage.setItem('type', 2);
//         if (location.state != null) {
//             navigate('/Donates/Shul/ItemsOfShul/Confirmation', { state: { item: location.state.item, amount: location.state.amount, price: location.state.price } })
//         }
//         else {
//             navigate('/Donates')
//         }
//     }

//     return (
//         <div>
//             {(!twoOpshion) && <div>
//                 <NavDonate />

//                 {(location.state) && <h1>התחבר למערכת על מנת לתרום</h1>}
//                 <div>
//                     <div className="background">
//                         <div className="shape"></div>
//                         <div className="shape"></div>
//                     </div>
//                     <form>
//                         <h1 className='h1Donate'>התחבר כמשתמש קיים</h1>
//                         <label className='h1Donate' htmlFor="username">שם משתמש</label>
//                         <input className="input" type="email" placeholder="email" onBlur={insertEmail}></input>
//                         <label className='h1Donate' htmlFor="password">הכנס סיסמה</label>

//                         <input className="input" type="password" placeholder="password" onBlur={insertPassword}></input>
//                         <button type="button" onClick={logInClicked}>המשך</button>
//                         <button type="button" onClick={toSignUp}>משתמש חדש</button>

//                         {/* ⭐ כפתור התחברות דרך GitHub */}
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 window.location.href = `https://donation-project-server.onrender.com/api/auth/github`;
//                             }}
//                         >
//                             התחברות עם GitHub
//                         </button>
//                     </form>
//                 </div>
//             </div>}
//             {(twoOpshion) && <div>
//                 <button type="button" className="btnLogIn" onClick={enterOfGabay}>הכנס כגבאי</button>
//                 <button type="button" className="btnLogIn" onClick={enterOfDonate}>הכנס כתורם</button>
//             </div>}
//         </div>);
// }

// export default LogIn;
