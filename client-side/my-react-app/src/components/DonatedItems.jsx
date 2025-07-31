import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import Item from '../components/Item'
function DonatedItems(props) {
    const location = useLocation();
    let navigate = useNavigate();
    const [haveItems, setHaveItems] = useState(false);
    const [haveFreeDonation, setHaveFreeDonation] = useState(false);
    const [itemsDonated, setItemsDonated] = useState([]);
    const [freeDonation, setFreeDonation] = useState('0');

    useEffect(() => {
        async function fetchAllDonation() {
            debugger
            const url = `https://donation-project-server.onrender.com/api/item/donatedItems/${props.ShulId}`;
            let response = await fetch(url);
            console.log(response)
            const result = await response.json();
            console.log(result);
            if (result) {
                setHaveItems(true);
                setItemsDonated([...result]);
            }

            let res = await fetch(`https://donation-project-server.onrender.com/api/shul/${props.ShulId}/getFreeDonation`);
            console.log(res);
            const content = await res.json();
            debugger
            console.log(content)
            if (content[0] != null) {
                debugger
                setHaveFreeDonation(true)
                setFreeDonation(content[0].Donated);
            }
        }
        fetchAllDonation();
    }, []);
    return (
        <div>
            {(!haveItems) && <div><h1 className='h1Donate'>אין בקשות שנתרמו</h1></div>}
            {(haveItems) && <div>
                <h1 className='h1Donate'>התרומות  שנתרמו בבית הכנסת שלך</h1>
                <div className="itemsOfShul">
                    {itemsDonated.map((item) => {
                        return (<div className="itemShul" key={item.Id}> <h1> {item.Name}  </h1>
                            <p>סכום לתרומה: {item.Price}</p>
                            <p>נתרמו {parseInt(item.Donated)} מתוך {item.Amount}</p>
                        </div>)
                    })}
                </div>
                {haveFreeDonation && <h1 className='h1Donate'>התרומות החופשיות שלך -  {freeDonation} ש"ח</h1>}
            </div>}
        </div >
    );
}
export default DonatedItems;