import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom'
import NavDonate from './NavDonate'

function ShulsOfItem() {
    const location = useLocation();
    let navigate = useNavigate();
    const [shulWithAmount, setShulWithAmount] = useState([]);
    const [shulsBefor, setShulsBefor] = useState([]);
    const [flag, setFlag] = useState(false);
    const [inputNumber, setInputNumber] = useState(1);
    const [exist, setExist] = useState(true);
    const [searchH, setSearchH] = useState(false);
    const [nameOfShul, setNameOfShul] = useState({ name: '', itemId: location.state.itemId });

    useEffect(() => {
        async function allItems() {
            const url = `https://donation-project-server.onrender.com/api/item/${location.state.itemId}/getShuls`;
            let response = await fetch(url);
            const content = await response.json();
            console.log(content);
            if (content[0] == null) {
                setFlag(true);
            }
            else {
                setShulWithAmount(content);
            }
        }
        allItems();
    }, []);

    function inputNumValue(e) {
        debugger
        setInputNumber(parseInt(e.target.value))
    }
    function nameShul(e) {
        const value = e.target.value;
        setNameOfShul({
            ...nameOfShul,
            name: value
        });
    }
    async function search() {
        debugger
        setSearchH(true)
        const url = `https://donation-project-server.onrender.com/api/shul/${nameOfShul.itemId}/getShuls/searchShul/${nameOfShul.name}`;
        let response = await fetch(url);
        const content = await response.json();
        console.log(content);
        if (content == null) {
            setExist(false);
            setShulsBefor([...shulWithAmount])
            setShulWithAmount([]);
        }
        else if (content[0] == null) {
            setExist(false);
            setShulsBefor([...shulWithAmount])
            setShulWithAmount([]);
        }
        else {
            setShulsBefor([...shulWithAmount])
            setShulWithAmount([...content]);
        }
    }
    function toDonate(data, amount, price) {
        if (sessionStorage.getItem('email'))
            navigate('./Confirmation', { state: { item: data, amount: amount, price: price } })
        else {
            navigate('/Donates/DonationByItem/ShulsOfItem/LogIn', { state: { item: data, amount: amount, price: price, from: "itemOfShul" } })
        }
    }

    function returnItems() {
        debugger
        setExist(true)
        setSearchH(false)
        if (shulsBefor[0] == null) {
            navigate('/Donates/DonationByItem')
        }
        else {
            setShulWithAmount([...shulsBefor]);
            setShulsBefor([])
        }
    }

    return (
        <div>
            <NavDonate />
            {flag && <div><h1>אין בתי כנסת שמחפשים פריט זה</h1></div>}
            {(!flag) && !searchH && <p id="p">:הכנס שם בית כנסת לחיפוש</p>}
            {(!flag) && !searchH && <input type="text" className="inputSearch" placeholder="חיפוש" onBlur={nameShul}></input>}
            {(!flag) && !searchH && <button className="buttonSearch" onClick={search}>חיפוש</button>}
            {(!exist) && <h2>בית הכנסת שחיפשת לא זקוק לפריט שהינך רוצה לתרום</h2>}
            <div className="itemsOfShul">
                {exist && (!flag) && shulWithAmount.map((data) => {
                    return (<div className="itemShul" key={data.Id} value={data.Id}>
                        {/* <img className="shulImg" src={data.Img}></img> */}
                        <h2 className='h2Titel'>{data.NameShul}</h2>
                        <p>{data.Address}</p>
                        <p>סך לתרומה עבור פריט יחיד: {data.Price}</p>
                        <p>סך הכל חסרים בבית הכנסת: {data.Amount - parseInt(data.Donated)}</p>
                        <p>כמות שהנך רוצה לתרום:</p>
                        <input type="number" id={data.Id} min="0" placeholder="1" max={data.Amount - parseInt(data.Donated)} onChange={inputNumValue}></input>
                        <button onClick={() => toDonate(data, inputNumber, data.Price)}>תרמו עכשיו!</button>
                    </div>)
                })}
            </div>
            <button className='btnBack' onClick={returnItems}>חזור</button>
        </div>)
}
export default ShulsOfItem;