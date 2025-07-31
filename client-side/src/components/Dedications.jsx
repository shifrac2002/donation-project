import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


function Dedications(props) {
    let navigate = useNavigate();
    const [itemDedication, setItemDedication] = useState([]);
    const [freeDedication, setfreeDedication] = useState([]);
    const [flagItemDedication, setFlagItemDedication] = useState(false);
    const [flagFreeDedication, setFlagFreeDedication] = useState(false);
    useEffect(() => {
        async function allDedications() {
            let result1 = await fetch(`https://donation-project-server.onrender.com/api/shul/${props.ShulId}/itemsDedication`);
            let itemsDedication = await result1.json();
            setItemDedication(itemsDedication);
            if (itemsDedication[0] == null)
                setFlagItemDedication(true)
            let result2 = await fetch(`https://donation-project-server.onrender.com/api/shul/${props.ShulId}/freeDedication`);
            let freeDedication = await result2.json();
            console.log(freeDedication);
            setfreeDedication(freeDedication);
            if (freeDedication[0] == null)
                setFlagFreeDedication(true)
        }
        allDedications();
    }, []);
    async function handlingItemDedication(id) {
        let data = { id: id }
        console.log(data);
        const url = `https://donation-project-server.onrender.com/api/dedication/itemHandling`;
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        let arr = [...itemDedication];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].Id == id) arr.splice(i, 1);
        }
        if (arr.length !== 0) {
            setItemDedication([...arr])
        }
        else{
            setFlagItemDedication(true)
        }
    }

    async function handlingFreeDedication(id) {
        let data = { id: id }
        console.log(data);
        const url = `https://donation-project-server.onrender.com/api/dedication/freeHandling`;
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response);
        let arr = [...freeDedication];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].Id == id) arr.splice(i, 1);
        }
        if (arr.length !== 0)
            setfreeDedication([...arr])
        else{
            setFlagFreeDedication(true)
        }
    }
    return (
        <div>
            {flagItemDedication && flagFreeDedication && <h1 className='h1Donate'>כל ההקדשות טופלו</h1>}
            {(!flagItemDedication) && <div>
                <h1 className='h1Donate'>הקדשות  פריטים</h1>
                <div className="itemsOfShul">
                    {itemDedication.map((item) => {
                        return (<div id="Dedication" className="itemShul" key={item.Id}>
                            <h2>הקדשה:{item.Dedication}</h2>
                            <h2>שם ומשפחה :{item.LastName}   {item.FirstName}</h2>
                            <h2>שם פריט:{item.Name}</h2>
                            <button onClick={() => handlingItemDedication(item.Id)}>הקדשה טופלה</button>
                        </div>)
                    })}</div></div>}
            {flagItemDedication && !flagFreeDedication && <h1 className='h1Donate'>אין הקדשות פריטים</h1>}
            {(!flagFreeDedication) && <div>
                <h1 className='h1Donate'>הקדשות תרומות חופשיות</h1>
                <div className="itemsOfShul"> {(!flagFreeDedication) && freeDedication.map((item) => {
                    return (<div className="itemShul" id={"Dedication"} key={item.Id}>
                        <h2>הקדשה:{item.Dedication}</h2>
                        <h2> שם ומשפחה  :{item.LastName}   {item.FirstName}</h2>
                        <h2>סכום תרומה:</h2>
                        <h2>{item.Sum}</h2>
                        <button onClick={() => handlingFreeDedication(item.Id)}>הקדשה טופלה</button>
                    </div>)
                })}</div></div>}
            {flagFreeDedication && !flagItemDedication && <h1 className='h1Donate'>אין הקדשות תרומות חופשיות</h1>}
        </div>
    );
}
export default Dedications;