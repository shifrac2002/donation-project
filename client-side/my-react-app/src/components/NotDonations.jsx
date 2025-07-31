import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import Item from '../components/Item'
import UpdateItem from '../components/UpdateItem'


function NotDonations(props) {
    const location = useLocation();
    let navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [haveItems, setHaveItems] = useState(true);;
    const [update, setUpdateItem] = useState({});
    const [Donated, setDonated] = useState(0);
    const [flagUpdate, setFlagUpdate] = useState(false);


    useEffect(() => {
        debugger;
        async function allNotDonation() {
            console.log(props.ShulId)
            const url = `${process.env.REACT_APP_API_URL}/api/item/notDonations/${props.ShulId}`;
            let response = await fetch(url);
            const myItems = await response.json();
            console.log(myItems);
            if (myItems == null) {
                setHaveItems(false);
            }
            else {

                setItems(myItems);
                console.log(myItems);
            }
        }
        allNotDonation();
    }, []);


    function updateArray(itemToUpdate) {
        debugger;
        console.log(itemToUpdate, "hello");
        let arr = [...items]
        if (itemToUpdate.Amount == 0) {
            for (let index = 0; index < arr.length; index++) {
                if (arr[index].Id == itemToUpdate.Id) {
                    arr.splice(index, 1);
                }
            }
            setItems([...arr]);
        }
        else {
            for (let index = 0; index < items.length; index++) {
                if (arr[index].Id == itemToUpdate.Id) {
                    arr[index].Name = itemToUpdate.Name;
                    arr[index].Amount = itemToUpdate.Amount;
                    arr[index].Price = itemToUpdate.Price;
                }
            }
            setItems([...arr]);
        }
        setFlagUpdate(false)
    }


    function updateItem(itemId) {
        setFlagUpdate(true);
        console.log(itemId)
        for (let index = 0; index < items.length; index++) {
            if (items[index].Id == itemId) {

                setUpdateItem(items[index]);
            }

        }
        console.log(update);
        navigate('/Gabay/NotDonations/UpdateItem');
    }

    async function deleteItem(itemId) {
        debugger
        let newAmount;
        console.log(itemId);
        console.log(items);
        let arrOfItems = [...items];;
        for (let index = 0; index < arrOfItems.length; index++) {
            if (arrOfItems[index].Id == itemId) {
                if (arrOfItems[index].Donated == null) { newAmount = 0; }
                else { newAmount = arrOfItems[index].Donated; }
                arrOfItems.splice(index, 1);
                setItems([...arrOfItems]);
                console.log(items);
            }
        }
        try {
            debugger
            let data = { itemId: itemId, newAmount: newAmount }
            const url = `${process.env.REACT_APP_API_URL}/api/item/delete`;
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }
        catch (error) {
        }
    }

    return (
        <div>
            {(!haveItems) && <h1 className='h1Donation'>כל הבקשות נתרמו</h1>}
            {(haveItems) && (!flagUpdate) && <div>
                <h1 className='h1Donation'>הבקשות שעדיין לא נתרמו</h1>
                <div className="shulImages">{items.map((item) => <div className="itemShul" key={item.Id}><Item key={item.Id} id={item.Id} amount={item.Amount} amountNotDonated={item.Amount - parseInt(item.Donated)} price={item.Price} name={item.Name} deleteItem={deleteItem} updateItem={updateItem} /></div>)}
                </div></div>}
            <Routes>
                <Route path="/UpdateItem" element={<UpdateItem updateArray={updateArray} item={update} />} />
            </Routes>
        </div>
    );
}
export default NotDonations;