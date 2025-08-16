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







import react, { useState, useDeferredValue } from 'react';
import React, { Component, useEffect } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import '../css/LogIn.css'
import NavDonate from './NavDonate'

function LogIn() {
    let navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState({ email: "", password: "" });
    const [twoOpshion, settwoOpshion] = useState(false);
    const [isGithubLoading, setIsGithubLoading] = useState(false);

    // בדיקת התחברות דרך GitHub בעת טעינת הקומפוננטה
    useEffect(() => {
        checkGithubLogin();
    }, []);

    // בדיקת התחברות GitHub
    async function checkGithubLogin() {
        try {
            // בדוק אם יש נתונים מ-GitHub ב-localStorage
            const githubLogin = localStorage.getItem('github_login');
            const githubEmail = localStorage.getItem('github_email');
            const githubType = localStorage.getItem('github_type');
            const githubTwoOptions = localStorage.getItem('github_two_options');
            const githubError = localStorage.getItem('github_error');

            if (githubLogin === 'true') {
                // התחברות מוצלחת
                sessionStorage.setItem('email', githubEmail);
                
                if (githubTwoOptions === 'true') {
                    settwoOpshion(true);
                } else {
                    sessionStorage.setItem('type', githubType);
                    
                    if (githubType === '1') {
                        // גבאי
                        navigate('/Gabay');
                    } else if (githubType === '2') {
                        // תורם
                        if (location.state != null) {
                            navigate('/Donates/Shul/ItemsOfShul/Confirmation', { 
                                state: { 
                                    item: location.state.item, 
                                    amount: location.state.amount 
                                } 
                            });
                        } else {
                            navigate('/Donates');
                        }
                    }
                }

                // נקה את הנתונים מ-localStorage אחרי השימוש
                localStorage.removeItem('github_login');
                localStorage.removeItem('github_email');
                localStorage.removeItem('github_type');
                localStorage.removeItem('github_two_options');
            } else if (githubError) {
                // טיפול בשגיאות GitHub
                if (githubError === 'not-registered') {
                    alert(`המשתמש ${githubEmail} לא רשום במערכת. נא להרשם תחילה.`);
                    navigate('/SignUp');
                } else if (githubError === 'database-error') {
                    alert('ארעה שגיאה בבדיקת המשתמש. נסה שוב.');
                }

                // נקה את השגיאה
                localStorage.removeItem('github_error');
                localStorage.removeItem('github_email');
            }
        } catch (error) {
            console.error('Error checking GitHub login:', error);
        }
    }

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
        if (location.state) {
            navigate('/SignUp', { state: { item: location.state.item, amount: location.state.amount } })
        }
        else {
            navigate('/SignUp')
        }
    }

    async function logInClicked() {
        try {
            if (user.email == '' || user.password == '')
                alert("פרטים לא מלאים");
            else {
                const url = `https://donation-project-server.onrender.com/api/user/logIn`;
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

    // התחברות דרך GitHub
    async function loginWithGithub() {
        try {
            setIsGithubLoading(true);
            
            // תחילה בדוק אם כבר מחובר
            const checkResponse = await fetch('https://donation-project-server.onrender.com/api/auth/github-check', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            
            const checkResult = await checkResponse.json();
            
            if (checkResult.success) {
                // כבר מחובר - טפל בתוצאה
                handleGithubLoginResult(checkResult);
            } else if (checkResult.needsAuth) {
                // צריך להתחבר - פתח חלון חדש
                const authWindow = window.open(
                    'https://donation-project-server.onrender.com/api/auth/github',
                    'github-auth',
                    'width=500,height=600'
                );
                
                // המתן לסגירת החלון ואז בדוק שוב
                const interval = setInterval(async () => {
                    if (authWindow.closed) {
                        clearInterval(interval);
                        // בדוק שוב את הסטטוס אחרי זמן קצר
                        setTimeout(() => {
                            recheckGithubAuth();
                        }, 1000);
                    }
                }, 1000);
            } else {
                // שגיאה
                handleGithubError(checkResult.error, checkResult.email);
            }
        } catch (error) {
            console.error('GitHub login error:', error);
            alert('ארעה שגיאה בהתחברות דרך GitHub');
        } finally {
            setIsGithubLoading(false);
        }
    }

    // בדיקה חוזרת אחרי סגירת חלון ההתחברות
    async function recheckGithubAuth() {
        try {
            const checkResponse = await fetch('https://donation-project-server.onrender.com/api/auth/github-check', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            
            const checkResult = await checkResponse.json();
            
            if (checkResult.success) {
                handleGithubLoginResult(checkResult);
            } else {
                handleGithubError(checkResult.error, checkResult.email);
            }
        } catch (error) {
            console.error('GitHub recheck error:', error);
        }
    }

    // טיפול בתוצאת התחברות GitHub מוצלחת
    function handleGithubLoginResult(result) {
        sessionStorage.setItem('email', result.email);
        
        if (result.twoOptions) {
            settwoOpshion(true);
        } else {
            sessionStorage.setItem('type', result.userType);
            
            if (result.userType === '1') {
                // גבאי
                navigate('/Gabay');
            } else if (result.userType === '2') {
                // תורם
                if (location.state != null) {
                    navigate('/Donates/Shul/ItemsOfShul/Confirmation', { 
                        state: { 
                            item: location.state.item, 
                            amount: location.state.amount 
                        } 
                    });
                } else {
                    navigate('/Donates');
                }
            }
        }
    }

    // טיפול בשגיאות GitHub
    function handleGithubError(error, email) {
        if (error === 'not-registered') {
            alert(`המשתמש ${email || ''} לא רשום במערכת. נא להרשם תחילה.`);
            navigate('/SignUp');
        } else if (error === 'database-error') {
            alert('ארעה שגיאה בבדיקת המשתמש. נסה שוב.');
        } else {
            alert('ארעה שגיאה בהתחברות דרך GitHub');
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
                        <button type="button" onClick={toSignUp}>משתמש חדש</button>

                        {/* כפתור התחברות דרך GitHub */}
                        <button
                            type="button"
                            onClick={loginWithGithub}
                            disabled={isGithubLoading}
                        >
                            {isGithubLoading ? 'מתחבר...' : 'התחברות עם GitHub'}
                        </button>
                    </form>
                </div>
            </div>}
            {(twoOpshion) && <div>
                <button type="button" className="btnLogIn" onClick={enterOfGabay}>הכנס כגבאי</button>
                <button type="button" className="btnLogIn" onClick={enterOfDonate}>הכנס כתורם</button>
            </div>}
        </div>);
}

export default LogIn;