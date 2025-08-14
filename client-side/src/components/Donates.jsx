
// import react, { useState, useEffect } from 'react';
// import React, { Component } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'
// import NavDonate from './NavDonate'

// function Donates() {
//     let navigate = useNavigate();
//     const [shulsBefor, setShulsBefor] = useState([]);
//     const [shuls, setShuls] = useState([]);
//     const [shul, setShul] = useState({});
//     const [text, setText] = useState("");
//     const [exist, setExist] = useState(true);
//     const [moreShul, setMoreShul] = useState(true);
//     const [returnBefor, setReturnBefor] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [emptyData, setEmptyData] = useState(false);
//     const [nameOfShul, setNameOfShul] = useState('');
//     const [currentShulsReturn, setCurrentShulsReturn] = useState([]);
//     const [fromIndex, setFromIndex] = useState(0);

//     useEffect(() => {
//         async function fetchShuls() {
//             debugger
//             const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`
//             let response = await fetch(url);
//             let current = await response.json();
//             if (current == null) {
//                 alert("אין בתי כנסיות");
//                 setLoading(false)
//                 setEmptyData(true)
//             }
//             else {
//                 setFromIndex(fromIndex + 10);
//                 setCurrentShulsReturn(current);
//                 setShuls(current);
//                 setLoading(false)
//             }
//         }
//         fetchShuls();
//     }, []);

//     async function search() {
//         debugger;
//         setReturnBefor(true)
//         setMoreShul(false)
//         let response = await fetch(`https://donation-project-server.onrender.com/api/shul/search/${nameOfShul}`);
//         let resultShuls = await response.json();
//         if (resultShuls == null) {
//             setExist(false);
//             setShulsBefor([...shuls])
//             setShuls([]);
//         }
//         if (resultShuls[0] == null) {
//             setExist(false);
//             setShulsBefor([...shuls])
//             setShuls(resultShuls);
//         }
//         else {
//             console.log(resultShuls);
//             setShulsBefor([...shuls])
//             setShuls(resultShuls);
//             setExist(true);
//         }
//     }

//     function nameShul(e) {
//         setNameOfShul(e.target.value);
//     }

//     function ItemOfShul(shul) {
//         console.log(shul);
//         setShul({ ...shul })
//         navigate('/Donates/Shul/ItemsOfShul', { state: { shul: shul } })
//     }

//     async function more() {
//         debugger;
//         let shul = [...shuls];
//         if (currentShulsReturn.length === 10) {
//             console.log(fromIndex)
//             const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`;
//             let response = await fetch(url);
//             let current = await response.json();
//             shul = shuls.concat(current);
//             setCurrentShulsReturn(current)
//             setFromIndex(fromIndex + 10);
//             if (current.length < 10) {
//                 setMoreShul(false);
//             }
//         }
//         else {
//             setMoreShul(false);
//         }
//         console.log(shuls);
//         setShuls(shul);
//     }

//     function back() {
//         setMoreShul(true)
//         setReturnBefor(false)
//         setExist(true)
//         setShuls([...shulsBefor])
//     }

//     return (
//         <div>
//             {loading && <h1>loading</h1>}
//             <NavDonate />
//             {!emptyData && !loading && !returnBefor && <label>תבחר את בית הכנסת אליו אתה רוצה לתרום</label>}
//             {!emptyData && !loading && !returnBefor && <p id="p">הכנס שם בית כנסת לחיפוש:</p>}
//             {!emptyData && !loading && !returnBefor && <input className="inputSearch" type="text" placeholder="חיפוש" onBlur={nameShul}></input>}
//             {!emptyData && !loading && !returnBefor && <button className="buttonSearch" onClick={search}>חיפוש</button>}
//             {!emptyData && !loading && (!exist) && <label>בית כנסת זה לא קים במאגר</label>}
//             {!emptyData && !loading && <div className="shulImages">  {shuls.map((shul) => { return (<button className="btnShul" onClick={() => ItemOfShul(shul)} key={shul.ShulId} value={shul.NameShul}><img className="shulImg" src={shul.Img}></img>{shul.NameShul}<br></br>{shul.Address}</button>) })}
//                 {(exist) && moreShul && <button className='btnBack' onClick={more}>הצג עוד בתי כנסת</button>}
//             </div>}
//             {emptyData &&<h1>אין בתי כנסיות</h1>}
//             {returnBefor && !loading && <button className='btnBack' onClick={back}>חזור</button>}
//         </div>);
// }
// export default Donates;




import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavDonate from './NavDonate'

function Donates() {
    let navigate = useNavigate();
    const [shulsBefor, setShulsBefor] = useState([]);
    const [shuls, setShuls] = useState([]);
    const [shul, setShul] = useState({});
    const [text, setText] = useState("");
    const [exist, setExist] = useState(true);
    const [moreShul, setMoreShul] = useState(true);
    const [returnBefor, setReturnBefor] = useState(false);
    const [loading, setLoading] = useState(true);
    const [emptyData, setEmptyData] = useState(false);
    const [nameOfShul, setNameOfShul] = useState('');
    const [currentShulsReturn, setCurrentShulsReturn] = useState([]);
    const [fromIndex, setFromIndex] = useState(0);
    const [twoOptions, setTwoOptions] = useState(false);
    useEffect(() => {
        // בדוק אם יש נתונים מ-GitHub OAuth ב-URL
        const urlParams = new URLSearchParams(window.location.search);
        const login = urlParams.get('login');
        const email = urlParams.get('email');
        const userType = urlParams.get('type');
        const userId = urlParams.get('userId');
        const multipleUsers = urlParams.get('multipleUsers');
        const error = urlParams.get('error');
        
        // טיפול בהצלחת התחברות
        if (login === 'success' && email) {
            // נקה את ה-URL מהפרמטרים
            window.history.replaceState({}, '', window.location.pathname);
            
            if (multipleUsers === 'true') {
                // הצג אפשרויות בחירה
                sessionStorage.setItem('email', email);
                setTwoOptions(true);
                return; // יוצא מ-useEffect
                
            } else if (userType && userId) {
                // שמור את פרטי המשתמש
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('type', userType);
                sessionStorage.setItem('userId', userId);
                
                // נווט לפי הסוג
                if (userType === '1') {
                    navigate('/Gabay');
                    return;
                }
                // אם type=2 (תורם), נשאר בדף הנוכחי
            }
        }
        
        // טיפול בשגיאות
        if (error) {
            // נקה את ה-URL
            window.history.replaceState({}, '', window.location.pathname);
            
            if (error === 'not-registered') {
                alert('המשתמש לא רשום במערכת - נא להירשם');
                navigate('/SignUp', { state: { email: email } });
                return;
            } else {
                alert('שגיאה בהתחברות - נסה שוב');
                console.error('GitHub login error:', error);
            }
        }
        
        // בדוק אם יש sessionStorage ישן (לתמיכה לאחור)
        const githubLogin = sessionStorage.getItem('github_login');
        const githubEmail = sessionStorage.getItem('github_email');
        const githubType = sessionStorage.getItem('github_type');
        const githubTwoOptions = sessionStorage.getItem('github_two_options');
        const githubError = sessionStorage.getItem('github_error');
        
        if (githubLogin === 'true') {
            if (githubTwoOptions === 'true') {
                sessionStorage.setItem('email', githubEmail);
                setTwoOptions(true);
                
                // ניקוי
                sessionStorage.removeItem('github_login');
                sessionStorage.removeItem('github_two_options');
                sessionStorage.removeItem('github_email');
                return;
                
            } else if (githubEmail && githubType) {
                sessionStorage.setItem('email', githubEmail);
                sessionStorage.setItem('type', githubType);
                
                // ניקוי
                sessionStorage.removeItem('github_login');
                sessionStorage.removeItem('github_email');
                sessionStorage.removeItem('github_type');
                
                if (githubType === '1') {
                    navigate('/Gabay');
                    return;
                }
            }
        }
        
        if (githubError) {
            if (githubError === 'not-registered') {
                alert('המשתמש לא רשום במערכת - נא להירשם');
                const email = sessionStorage.getItem('github_email');
                navigate('/SignUp', { state: { email: email } });
            } else {
                alert('שגיאה בהתחברות - נסה שוב');
            }
            
            // ניקוי
            sessionStorage.removeItem('github_error');
            sessionStorage.removeItem('github_email');
            return;
        }
    
        // טען בתי כנסת (רק אם לא היה redirect)
        fetchShuls();
    
        async function fetchShuls() {
            try {
                const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`;
                const response = await fetch(url);
                const current = await response.json();
                
                if (current == null) {
                    alert("אין בתי כנסיות");
                    setLoading(false);
                    setEmptyData(true);
                } else {
                    setFromIndex(fromIndex + 10);
                    setCurrentShulsReturn(current);
                    setShuls(current);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching shuls:', error);
                setLoading(false);
            }
        }
    }, []);
    // useEffect(() => {
    //     // בדוק אם יש התחברות GitHub
    //     const githubLogin = sessionStorage.getItem('github_login');
    //     const githubEmail = sessionStorage.getItem('github_email');
    //     const githubType = sessionStorage.getItem('github_type');
    //     const githubTwoOptions = sessionStorage.getItem('github_two_options');
    //     const githubError = sessionStorage.getItem('github_error');
        
    //     if (githubLogin === 'true') {
    //         if (githubTwoOptions === 'true') {
    //             // הצג אפשרויות בחירה
    //             sessionStorage.setItem('email', githubEmail);
    //             setTwoOptions(true);
                
    //             // ניקוי חלקי
    //             sessionStorage.removeItem('github_login');
    //             sessionStorage.removeItem('github_two_options');
    //         } else if (githubEmail && githubType) {
    //             sessionStorage.setItem('email', githubEmail);
    //             sessionStorage.setItem('type', githubType);
                
    //             // ניקוי מלא
    //             sessionStorage.removeItem('github_login');
    //             sessionStorage.removeItem('github_email');
    //             sessionStorage.removeItem('github_type');
                
    //             // נווט לפי הסוג
    //             if (githubType === '1') {
    //                 navigate('/Gabay');
    //                 return; // חשוב - יוצא מ-useEffect
    //             }
    //             // אם type=2 (תורם), הוא כבר בדף הנכון
    //         }
    //     }
        
    //     if (githubError) {
    //         if (githubError === 'not-registered') {
    //             alert('המשתמש לא רשום במערכת - נא להירשם');
    //             const email = sessionStorage.getItem('github_email');
    //             navigate('/SignUp', { state: { email: email } });
                
    //             // ניקוי
    //             sessionStorage.removeItem('github_error');
    //             sessionStorage.removeItem('github_email');
    //             return; // יוצא מ-useEffect
    //         } else {
    //             alert('שגיאה בהתחברות - נסה שוב');
                
    //             // ניקוי
    //             sessionStorage.removeItem('github_error');
    //             sessionStorage.removeItem('github_email');
    //         }
    //     }

    //     // רק אם לא התחברנו דרך GitHub, נטען את בתי הכנסת
    //     if (!githubLogin && !githubError) {
    //         fetchShuls();
    //     } else if (githubLogin === 'true' && githubType === '2') {
    //         // משתמש התחבר דרך GitHub וזה תורם - נטען את בתי הכנסת
    //         fetchShuls();
    //     }

    //     async function fetchShuls() {
    //         debugger
    //         const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`
    //         let response = await fetch(url);
    //         let current = await response.json();
    //         if (current == null) {
    //             alert("אין בתי כנסיות");
    //             setLoading(false)
    //             setEmptyData(true)
    //         }
    //         else {
    //             setFromIndex(fromIndex + 10);
    //             setCurrentShulsReturn(current);
    //             setShuls(current);
    //             setLoading(false)
    //         }
    //     }
    // }, []);


    
    async function search() {
        debugger;
        setReturnBefor(true)
        setMoreShul(false)
        let response = await fetch(`https://donation-project-server.onrender.com/api/shul/search/${nameOfShul}`);
        let resultShuls = await response.json();
        if (resultShuls == null) {
            setExist(false);
            setShulsBefor([...shuls])
            setShuls([]);
        }
        if (resultShuls[0] == null) {
            setExist(false);
            setShulsBefor([...shuls])
            setShuls(resultShuls);
        }
        else {
            console.log(resultShuls);
            setShulsBefor([...shuls])
            setShuls(resultShuls);
            setExist(true);
        }
    }

    function nameShul(e) {
        setNameOfShul(e.target.value);
    }

    function ItemOfShul(shul) {
        console.log(shul);
        setShul({ ...shul })
        navigate('/Donates/Shul/ItemsOfShul', { state: { shul: shul } })
    }

    async function more() {
        debugger;
        let shul = [...shuls];
        if (currentShulsReturn.length === 10) {
            console.log(fromIndex)
            const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`;
            let response = await fetch(url);
            let current = await response.json();
            shul = shuls.concat(current);
            setCurrentShulsReturn(current)
            setFromIndex(fromIndex + 10);
            if (current.length < 10) {
                setMoreShul(false);
            }
        }
        else {
            setMoreShul(false);
        }
        console.log(shuls);
        setShuls(shul);
    }

    function back() {
        setMoreShul(true)
        setReturnBefor(false)
        setExist(true)
        setShuls([...shulsBefor])
    }

    // פונקציות לטיפול ב-GitHub עם שתי אפשרויות
    function enterOfGabay() {
        sessionStorage.setItem('type', '1');
        sessionStorage.removeItem('github_email');
        navigate('/Gabay');
    }

    function enterOfDonate() {
        sessionStorage.setItem('type', '2');
        sessionStorage.removeItem('github_email');
        setTwoOptions(false);
        // נשאר בדף הנוכחי ונטען את בתי הכנסת
        window.location.reload(); // רענון לטעינת בתי הכנסת
    }

    // אם יש שתי אפשרויות מ-GitHub
    if (twoOptions) {
        return (
            <div>
                <NavDonate />
                <h1>בחר איך להתחבר:</h1>
                <button type="button" className="btnLogIn" onClick={enterOfGabay}>הכנס כגבאי</button>
                <button type="button" className="btnLogIn" onClick={enterOfDonate}>הכנס כתורם</button>
            </div>
        );
    }

    return (
        <div>
            {loading && <h1>loading</h1>}
            <NavDonate />
            {!emptyData && !loading && !returnBefor && <label>תבחר את בית הכנסת אליו אתה רוצה לתרום</label>}
            {!emptyData && !loading && !returnBefor && <p id="p">הכנס שם בית כנסת לחיפוש:</p>}
            {!emptyData && !loading && !returnBefor && <input className="inputSearch" type="text" placeholder="חיפוש" onBlur={nameShul}></input>}
            {!emptyData && !loading && !returnBefor && <button className="buttonSearch" onClick={search}>חיפוש</button>}
            {!emptyData && !loading && (!exist) && <label>בית כנסת זה לא קים במאגר</label>}
            {!emptyData && !loading && <div className="shulImages">  {shuls.map((shul) => { return (<button className="btnShul" onClick={() => ItemOfShul(shul)} key={shul.ShulId} value={shul.NameShul}><img className="shulImg" src={shul.Img} alt={shul.NameShul}></img>{shul.NameShul}<br></br>{shul.Address}</button>) })}
                {(exist) && moreShul && <button className='btnBack' onClick={more}>הצג עוד בתי כנסת</button>}
            </div>}
            {emptyData &&<h1>אין בתי כנסיות</h1>}
            {returnBefor && !loading && <button className='btnBack' onClick={back}>חזור</button>}
        </div>);
}
export default Donates;