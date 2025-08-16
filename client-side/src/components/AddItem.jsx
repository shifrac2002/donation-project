
import react, { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { useNavigate, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Gabay from './Gabay';

function AddItem(props) {
    const location = useLocation();
    let navigate = useNavigate();
    const [item, setItem] = useState({ NameItem: '', PriceForUnit: '', Amount: '', ShulId: props.ShulId })
    const [flag, setFlag] = useState(false)
    const [itemAdd, setItemAdd] = useState(false)
    const [highPrice, setHighPrice] = useState(false)
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const [imageName, setImageName] = useState('')

    function insertName(e) {
        const value = e.target.value;
        setItem({
            ...item,
            NameItem: value
        });
    }
    function insertPrice(e) {
        const value = e.target.value;
        if (value > 100000) {
            alert("סכום מדי גבוה")
            setHighPrice(true)
        }
        else {
            setHighPrice(false)
            setItem({
                ...item,
                PriceForUnit: value

            });
        }
    }
    function insertAmount(e) {
        const value = e.target.value;
        setItem({
            ...item,
            Amount: value

        });
    }

    function handleFileChange(e) {
        debugger 
        setImageName(e.target.files[0].name);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0].name,
        }
        setImage(img)
    }
    async function AddClicked(e) {
        debugger
        if (highPrice) {
            alert("סכום פריט מדי גבוה")
        }
        else {
            debugger
            setHighPrice(false)
            e.preventDefault()
            let formData = new FormData();
            formData.append('file', image.data);
            formData.append('NameItem', item.NameItem);
            formData.append('PriceForUnit', item.PriceForUnit);
            formData.append('Amount', item.Amount);
            formData.append('ShulId', item.ShulId);
            formData.append('imageName', imageName);
            const response = await fetch(`https://donation-project-server.onrender.com/api/item/add`, {
                method: 'POST',
                body: formData,
            })
            const result = await response.json();
            if (result) {
                debugger
                setStatus(response.statusText)
                setItemAdd(true);
                navigate('/Gabay', { state: { testS: "פריט נוסף בהצלחה" } })
            }
            else {
                debugger
                setFlag(true);
                navigate('/Gabay', { state: { testS: "פריט כבר קיים אפשר לעדכן ברשימת  הבקשות לתרומה" } })
            }
        }
    }
    return (
        <div className="confirmation">
            <h1 className='h1Donate'>הוספת פריט</h1>
            <h2 className='tDonate'>שם פריט</h2>
            <input className='confirmationInpImage' type="text" placeholder="שם פריט" onBlur={insertName}></input>
            <h2 className='tDonate'>כמות</h2>
            <input className='confirmationInpImage' type="text" placeholder="כמות" onBlur={insertAmount}></input>
            <h2 className='tDonate'>סכום תרומה עבור פריט בודד</h2>
            <input className='confirmationInpImage' type="text" placeholder=" מחיר לבודד " onBlur={insertPrice}></input>
            {/* <div className='App'>
                <h2 className='tDonate'>הוספת תמונה</h2>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <input className='confirmationInpImage' type='file' name='file' onChange={handleFileChange}></input>
            </div> */}
            <button className='buttonAddItem' onClick={AddClicked}>הוסף</button>
        </div>);
}
export default AddItem;