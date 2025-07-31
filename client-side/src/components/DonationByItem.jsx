import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import Item from '../components/Item'
import UpdateItem from '../components/UpdateItem'
import { Link } from 'react-router-dom'
import NavDonate from './NavDonate'

function DonationByItem() {
    const location = useLocation();
    let navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [nameOfItem, setNameOfItem] = useState({ name: '' });
    const [exist, setExist] = useState(true);
    const [currentDonationsReturn, setCurrentDonationsReturn] = useState([]);
    const [fromIndex, setFromIndex] = useState(0);
    const [moreItems, setMoreItems] = useState(true);
    const [returnBefor, setReturnBefor] = useState(false);
    const [itemsBefor, setItemsBefor] = useState([]);

    useEffect(() => {
        async function allItems() {
            debugger
            const url = `http://localhost:3000/api/item/all/${fromIndex}`;
            let response = await fetch(url);
            let myItems = await response.json();
            if (myItems == null) {
                alert("אין פריטים");
            }
            else {
                setFromIndex(fromIndex + 10);
                setCurrentDonationsReturn(myItems);
                setItems(myItems);
            }
        }
        allItems();
    }, []);

    async function search() {
        setReturnBefor(true)
        setMoreItems(false)
        sessionStorage.setItem('allItems', items);
        const url = `http://localhost:3000/api/item/search/${nameOfItem.name}`;
        let response = await fetch(url);
        const itemSearch = await response.json();
        console.log(itemSearch);
        if (itemSearch == null) {
            setExist(false)
            setItemsBefor([...items])
            setItems([])
        }
        if (itemSearch[0] == null) {
            setExist(false)
            setItemsBefor([...items])
            setItems([])
        }
        else {
            setExist(true)
            setItemsBefor([...items])
            setItems(itemSearch);
        }
    }

    function nameItem(e) {
        setNameOfItem({
            name: e.target.value
        });
    }

    function itemToDonate(itemId) {
        navigate('./ShulsOfItem', { state: { itemId: itemId } });
    }

    async function more() {
        let item = [...items];
        if (currentDonationsReturn.length == 10) {
            const url = `http://localhost:3000/api/item/all/${fromIndex}`;
            let response = await fetch(url);
            let current = await response.json();
            item = items.concat(current);
            setCurrentDonationsReturn(current);
            setFromIndex(fromIndex + 10);
            if (current.length < 10) {
                setMoreItems(false);
            }
        }
        else {
            setMoreItems(false);
        }
        setItems(item);
    }

    function bach() {
        setMoreItems(true)
        setReturnBefor(false)
        setExist(true)
        setItems([...itemsBefor])
    }

    return (
        <div>
            <NavDonate />
            <label>תבחר את הפריט אותו אתה רוצה לתרום</label>
            {!returnBefor && <p id="p">הכנס שם פריט לחיפוש</p>}
            {!returnBefor && <input className="inputSearch" type="text" placeholder="חיפוש" onBlur={nameItem}></input>}
            {!returnBefor && <button className="buttonSearch" onClick={search}>חיפוש</button>}
            {(!exist) && <label>פריט זה לא קים במאגר</label>}
            {exist && <div className="shulImages">{items.map((item) => { return (<button className="btnShul" onClick={() => itemToDonate(item.Id)} key={item.Id} value={item.Id}><img className="shulImg" src={item.Img}></img>{item.Name}</button>) })}</div>}
            {moreItems && <button className='btnBack' onClick={more}>הצג עוד פריטים</button>}
            {returnBefor && <button className='btnBack' onClick={bach}>חזור</button>}
        </div>
    )
}
export default DonationByItem;