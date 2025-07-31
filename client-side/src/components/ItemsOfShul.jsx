import react, { useState, useEffect, useRef } from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import NavDonate from './NavDonate'

function ItemsOfShul() {
    const location = useLocation();
    let navigate = useNavigate();
    const [itemToDonate, setItemToDonate] = useState([]);
    const [itemBefor, setItemBefor] = useState([]);
    const [itemInDonation, setItemInDonation] = useState([]);
    const [itemInSearch, setItemInSearch] = useState({ name: '', shulId: location.state.shul.ShulId });
    const [haveItems, setHaveItems] = useState(true);
    const [exist, setExist] = useState(true);
    const [seachH, setSeachH] = useState(false);
    const [inputNumber, setInputNumber] = useState(1);

    function inputNumValue(e) {
        setInputNumber(parseInt(e.target.value))
    }

    function back() {
        debugger
        setSeachH(false)
        setExist(true)
        if (itemBefor[0] == undefined) {
            navigate('/Donates');
        }
        else {
            setItemToDonate([...itemBefor])
            setItemBefor([])
        }
    }
    function toDonate(item, amount, price) {
        console.log(sessionStorage.getItem('email'));
        if (sessionStorage.getItem('email')) {
            navigate('./Confirmation', { state: { item: item, amount: amount, price: price } })
        }
        else {
            navigate('LogIn', { state: { item: item, amount: amount, price: price, from: "itemOfShul" } })
        }
    }
    useEffect(() => {
        async function fetchItemsShul() {
            console.log(location.state.shul.NameShul)
            const url = `http://localhost:3000/api/item/notDonations/${location.state.shul.ShulId}`;
            let response = await fetch(url);
            const ItemOfShul = await response.json();
            console.log(ItemOfShul);
            if (ItemOfShul == null) {
                setHaveItems(false);
            }
            else {
                setItemToDonate([...ItemOfShul])
            }

        }
        fetchItemsShul();
    }, []);
    function nameItem(e) {
        const value = e.target.value;
        setItemInSearch({
            ...itemInSearch,
            name: value
        });
    }
    async function search() {
        debugger
        setSeachH(true)
        console.log(itemInSearch);
        const url = `http://localhost:3000/api/item/notDonations/search/${itemInSearch.shulId}/${itemInSearch.name}`;
        let response = await fetch(url);
        const result = await response.json();
        console.log(result);
        if(result == null){
            setExist(false);
            setItemBefor([...itemToDonate])
            setItemToDonate([])
        }
        else if (result[0] == null) {
            setExist(false);
            setItemBefor([...itemToDonate])
            setItemToDonate([])
        }
        else {
            setItemBefor([...itemToDonate])
            setItemToDonate([...result])
        }
    }
    return (
        <div>
            <NavDonate />
            {haveItems && !seachH && <label>בחר פריט שהינך רוצה לתרום לבית הכנסת {location.state.shul.NameShul}</label>}
            {haveItems && !seachH && <p id="p">הכנס שם פריט לחיפוש:</p>}
            {haveItems && !seachH && <input className="inputSearch" type="text" placeholder="חיפוש" onBlur={nameItem}></input>}
            {haveItems && !seachH && <button className="buttonSearch" onClick={search}>חיפוש</button>}
            <div className="itemsOfShul"> {exist && itemToDonate.map((item) => {
                return (<div className="itemShul" key={item.Id}>
                    <h2 className='h2Titel'>{item.Name}</h2>
                    <p>סך לתרומה עבור פריט יחיד: {item.Price}</p>
                    <p>סך הכל חסרים בבית הכנסת: {item.Amount - parseInt(item.Donated)}</p>
                    <p>כמות שהנך רוצה לתרום:</p>
                    <input type="number" id={item.Id} min="0" placeholder="1" max={item.Amount - parseInt(item.Donated)} onChange={inputNumValue}></input>
                    <br /> <button onClick={() => toDonate(item, inputNumber, item.Price)} >תרמו עכשיו!</button>
                </div>)
            })}</div>
            {!exist && <label>לבית הכנסת אין בקשה לפריט שביקשת</label>}
            {!haveItems && <h1> אין פריטים שדרושים לבית הכנסת {location.state.shul.NameShul}</h1>}
            <button className='btnBack' onClick={back}>חזור</button>
        </div>
    );
}
export default ItemsOfShul;