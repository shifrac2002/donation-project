import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
function Item(props) {
    const location = useLocation();
    const [isDanated, setIsDanated] = useState(true);
    useEffect(() => {
        async function isDonated() {
            if (props.amountDonated == null) {
                setIsDanated(false);
            }
        }
        isDonated();
    }, []);
    return (
        <div>
            <h1 className='h2Titel'>{props.name}</h1>
            <p>מחיר לתרומה {props.price}</p>
            <p>מספר פריטים שעדין לא נתרמו {props.amountNotDonated} מתוך {props.amount}</p>
            <button className="itemClick" onClick={() => { props.updateItem(props.id) }}>עדכן</button>
            <button className="itemClick" onClick={() => { props.deleteItem(props.id) }}>מחק</button>
        </div>
    );
}
export default Item;

