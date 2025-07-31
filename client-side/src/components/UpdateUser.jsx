import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDonate from './NavDonate';
import '../css/SignUp.css';

function UpdateUser() {
    const [user, setUser] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        type: '',
        idShul: '',
        password: ''
    });
    const [oldUser, setOldUser] = useState({});
    const [notValidPhone, setNotValidPhone] = useState(false);
    const [notValidMail, setNotValidMail] = useState(false);
    const [notValidPassword, setNotValidPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [match, setMatch] = useState(false);
    const [password, setPassword] = useState("");
    const [shuls, setShuls] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        debugger
        async function fetchUser() {
            const email = sessionStorage.getItem("email");
            const type = sessionStorage.getItem("type");
            if (!email) {
                alert("משתמש לא מחובר");
                navigate('/LogIn');
                return;
            }
            const response = await fetch(`https://donation-project-server.onrender.com/api/user/${email}/${type}`);
            const data = await response.json();
            if (data && data.length > 0) {
                const u = data[0];
                console.log(u);
                setOldUser(u);
                setUser({
                    name: u.FirstName,
                    lastName: u.LastName,
                    phone: u.Phone,
                    email: u.Mail,
                    type: u.UserType,
                    idShul: u.ShulId,
                    oldmail: u.Mail,
                    password: u.Password
                });
            }

            const resultShuls = await fetch(`https://donation-project-server.onrender.com/api/shul/all`);
            const allShuls = await resultShuls.json();
            setShuls(allShuls);
        }
        fetchUser();
    }, []);

    function validPhone(phone) {
        return /^[0-9]{10}$/.test(phone);
    }

    function validEmail(email) {
        let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return check.test(email);
    }

    async function updateClicked() {
        if (user.name === "" || user.lastName === "" || user.phone === "" || user.email === "" || (showNewPassword && user.password === "")) {
            alert("יש למלא את כל השדות");
            return;
        }
        if (oldUser.name === "donate") {
            if (oldUser.FirstName === user.name && oldUser.LastName === user.lastName && oldUser.Phone === user.phone && oldUser.Mail === user.email && oldUser.ShulId === user.idShul) {
                alert("לא בוצע שינוי");
                return;
            }
        }
        if (oldUser.name === "gabay") {
            if (oldUser.FirstName === user.name && oldUser.LastName === user.lastName && oldUser.Phone === user.phone && oldUser.Mail === user.email) {
                alert("לא בוצע שינוי");
                return;
            }
        }

        if (!validPhone(user.phone)) {
            setNotValidPhone(true);
            return;
        }
        setNotValidPhone(false);

        if (!validEmail(user.email)) {
            setNotValidMail(true);
            return;
        }
        setNotValidMail(false);
        debugger
        const response = await fetch(`https://donation-project-server.onrender.com/api/user/update`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("הפרטים עודכנו בהצלחה");
            sessionStorage.setItem('email', user.email);
            if (user.type === 1)
                navigate('/Gabay');
            else
                navigate('/Donates');
        } else {
            alert("אירעה שגיאה בעדכון הפרטים");
        }
    }

    function oldPasswordValid(e) {
        const isValid = oldUser.Password === e.target.value;
        setNotValidPassword(!isValid);
        setShowNewPassword(isValid);
        if(!showNewPassword){
            setUser({ ...user, password: "" });
        }
    }

    function matchPAssword(e) {
        debugger
        if (password === e.target.value) {
            setMatch(false);
            setUser({ ...user, password: e.target.value });
        }
        else {
            setMatch(true);
        }
    }

    return (
        <div>
            {oldUser.UserType === 2 && <NavDonate />}
            {oldUser.UserType === 1 && <div className="navPlaceholder"></div>}
            <div className="background">
                <div className="shape2"></div>
                <div className="shape2"></div>
            </div>
            <form id="formUpdate">
                <h1 className='h1Donate'>עדכון פרטים אישיים</h1>
                <label className='h1Donate'>שם פרטי</label>
                <input className="input" type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <label className='h1Donate'>שם משפחה</label>
                <input className="input" type="text" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                <label className='h1Donate'>טלפון</label>
                <input className="input" type="text" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                {notValidPhone && <span className="error">טלפון לא תקין</span>}
                <label className='h1Donate'>אימייל</label>
                <input className="input" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                {notValidMail && <span className="error">מייל לא תקין</span>}
                <label className='h1Donate'>סיסמא ישנה</label>
                <input className="input" type="text" onChange={oldPasswordValid} />
                {notValidPassword && <span className="error">הסיסמא שגויה</span>}
                {showNewPassword && <label className='h1Donate'>סיסמא חדשה</label>}
                {showNewPassword && <input className="input" type="text" onChange={(e) => setPassword(e.target.value)} />}
                {showNewPassword && <label className='h1Donate'>אמת סיסמא חדשה</label>}
                {showNewPassword && <input className="input" type="text" onChange={matchPAssword} />}
                {match && <span className="error">הסיסמא לא תואמת</span>}
                {oldUser.UserType === 2 && (
                    <>
                        <h2 className='tDonate'>בחר בית כנסת</h2>
                        <select className='confirmationInp' value={user.idShul} onChange={(e) => setUser({ ...user, idShul: e.target.value })}>
                            <option value="">בחר בית כנסת</option>
                            {shuls.map((shul) => (
                                <option className='optionShuls' key={shul.ShulId} value={shul.ShulId}>
                                    {shul.NameShul}
                                </option>
                            ))}
                        </select>
                    </>
                )}

                <button type="button" className='btnSignUp' onClick={updateClicked}>עדכן</button>
            </form>
        </div>
    );
}

export default UpdateUser;
