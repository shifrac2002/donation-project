import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
function DeleteItem() {
    const location = useLocation();
    let navigate = useNavigate();
    const [item, setItem] = useState({ NameItem: '', Amount: '', ShulId: location.state.shul, Donated: "false" })

    function insertName(e) {
        const value = e.target.value;
        console.log(location.status)
        setItem({
            ...item,
            NameItem: value
        });
    }
    function insertAmount(e) {
        const value = e.target.value;
        setItem({
            ...item,
            Amount: value

        });
    }
    async function DeleteClicked() {
        console.log(item);
        const url = `${process.env.REACT_APP_API_URL}/api/item/delete`;
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
        console.log(response);
    }
    return (
        <div>
            <h1>מחיקת פריט</h1>
            <h2>שם פריט למחיקה</h2>
            <input type="text" placeholder="שם פריט" onBlur={insertName}></input>
            <h2>סכום פריט</h2>
            <input type="text" placeholder="סכום פריט" onBlur={insertAmount}></input>
            <button onClick={DeleteClicked}>מחק</button>
        </div>);
}
export default DeleteItem;