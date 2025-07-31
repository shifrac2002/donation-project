import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
function UpdateItem(props) {
    console.log(props);
    const location = useLocation();
    let navigate = useNavigate();
    const [item, setItem] = useState({ ...props.item })
    function updateName(e) {
        const value = e.target.value;
        setItem({
            ...item,
            Name: value
        });
    }
    function updateAmount(e) {
        const value = e.target.value;
        setItem({
            ...item,
            Amount: value

        });
    }
    function updatePrice(e) {
        console.log(props.item);
        const value = e.target.value;
        setItem({
            ...item,
            Price: value

        });
    }

    async function UpdateClicked() {
        debugger;
        console.log(item, "hello");
        const url = `${process.env.REACT_APP_API_URL}/api/item/update`;
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(response);
        props.updateArray(item);
        navigate('Gabay/NotDonations')
    }
    return (
        <div className="itemShul">
            <h1>עידכון פריט</h1>
            <h2>שם פריט לעידכון</h2>
            <input type="text" placeholder={props.item.Name} onBlur={updateName}></input>
            <h2>סכום פריט</h2>
            <input type="text" placeholder={props.item.Price} onBlur={updatePrice}></input>
            <h2>כמות פריטים</h2>
            <input type="number" id={item.Id} min={parseInt(item.Donated)} placeholder={props.item.Amount}  onBlur={updateAmount}></input>
            <button onClick={() => {UpdateClicked()}}>אישור</button>
        </div>);
}
export default UpdateItem;