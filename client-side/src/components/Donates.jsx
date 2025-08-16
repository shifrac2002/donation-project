
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
import { useLocation, useNavigate } from "react-router-dom";


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
    const location = useLocation();  // זה ה־location הנכון
    
    useEffect(() => {
        // קריאת הפרמטרים מה-URL
        const urlParams = new URLSearchParams(window.location.search);
        const githubLogin = urlParams.get('github_login');
        const githubEmail = urlParams.get('github_email');
        const githubType = urlParams.get('github_type');
        const githubTwoOptions = urlParams.get('github_two_options');
        const githubError = urlParams.get('github_error');

        if (githubLogin === 'true') {
            // שמור ב-sessionStorage
            sessionStorage.setItem('email', githubEmail);

            if (githubTwoOptions === 'true') {
                sessionStorage.setItem('type', 1);
                navigate('/Gabay');
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

            // נקה את ה-URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (githubError) {
            // טיפול בשגיאות
            if (githubError === 'not-registered') {
                alert(`המשתמש ${githubEmail || ''} לא רשום במערכת. נא להרשם תחילה.`);
                navigate('/SignUp');
            } else if (githubError === 'database-error') {
                alert('ארעה שגיאה בבדיקת המשתמש. נסה שוב.');
            }

            // נקה את ה-URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // רק אם לא התחברנו דרך GitHub, נטען את בתי הכנסת
        if (!githubLogin && !githubError) {
            fetchShuls();
        } else if (githubLogin === 'true' && githubType === '2') {
            // משתמש התחבר דרך GitHub וזה תורם - נטען את בתי הכנסת
            fetchShuls();
        }

        async function fetchShuls() {
            debugger
            const url = `https://donation-project-server.onrender.com/api/shul/all/${fromIndex}`
            let response = await fetch(url);
            let current = await response.json();
            if (current == null) {
                alert("אין בתי כנסיות");
                setLoading(false)
                setEmptyData(true)
            }
            else {
                setFromIndex(fromIndex + 10);
                setCurrentShulsReturn(current);
                setShuls(current);
                setLoading(false)
            }
        }
    }, []);

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
            {!emptyData && !loading && <div className="shulImages">  {shuls.map((shul) => { return (<button className="btnShul" onClick={() => ItemOfShul(shul)} key={shul.ShulId}>{shul.NameShul}<br></br>{shul.Address}</button>) })}
                {(exist) && moreShul && <button className='btnBack' onClick={more}>הצג עוד בתי כנסת</button>}
            </div>}
            {/* {!emptyData && !loading && <div className="shulImages">  {shuls.map((shul) => { return (<button className="btnShul" onClick={() => ItemOfShul(shul)} key={shul.ShulId}><img className="shulImg" src={shul.Img} alt={shul.NameShul}></img>{shul.NameShul}<br></br>{shul.Address}</button>) })}
                {(exist) && moreShul && <button className='btnBack' onClick={more}>הצג עוד בתי כנסת</button>}
            </div>} */}
            {emptyData && <h1>אין בתי כנסיות</h1>}
            {returnBefor && !loading && <button className='btnBack' onClick={back}>חזור</button>}
        </div>);
}
export default Donates;