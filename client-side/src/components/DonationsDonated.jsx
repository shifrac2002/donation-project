import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavDonate from './NavDonate';
import { jsPDF } from "jspdf";
import alefFont from './alefFont'; // ייבוא פונט עברי

// Helper to reverse Hebrew text for basic RTL support
function reverseText(str) {
  return str.split('').reverse().join('');
}

function DonationsDonated() {
  const navigate = useNavigate();
  const [freeDonations, setFreeDonations] = useState([]);
  const [itemDonations, setItemDonations] = useState([]);
  const [associatedShul, setAssociatedShul] = useState('');
  const [flag, setFlag] = useState(true);
  const [shuls, setShuls] = useState([]);
  const [user, setUser] = useState({ idShul: '' });
  const [showShulUpdate, setShowShulUpdate] = useState(false);

  useEffect(() => {
    async function fetchDonations() {
      const email = sessionStorage.getItem('email');
      if (email) {
        let res1 = await fetch(`http://localhost:3000/api/user/${email}/freeDonation`);
        let data1 = await res1.json();
        setFreeDonations(data1);

        let res2 = await fetch(`http://localhost:3000/api/user/${email}/itemDonation`);
        let data2 = await res2.json();
        setItemDonations(data2);

        let res3 = await fetch(`http://localhost:3000/api/user/${email}/shul`);
        let data3 = await res3.json();
        if (data3 && data3[0]) setAssociatedShul(data3[0].NameShul);
        let shulRes = await fetch('http://localhost:3000/api/shul/all');
        let shulData = await shulRes.json();
        setShuls(shulData);
      } else {
        setFlag(false);
      }
    }
    fetchDonations();
  }, []);

  function initPDF(doc) {
    // הוספת פונט Alef ל־jsPDF
    doc.addFileToVFS("Alef-Regular.ttf", alefFont);
    doc.addFont("Alef-Regular.ttf", "Alef", "normal");
    doc.setFont("Alef");
  }

  function generateReceiptFree(donation) {
    const doc = new jsPDF();
    initPDF(doc);
    const pageWidth = doc.internal.pageSize.getWidth();
    const email = sessionStorage.getItem('email');

    doc.setFontSize(18);
    doc.text(reverseText('קבלה על תרומה'), pageWidth - 20, 20, { align: 'right' });
    doc.setFontSize(12);
    doc.text(reverseText(`םרות םש: ${email}`), pageWidth - 20, 40, { align: 'right' });
    doc.text(reverseText(`סכום התרומה: ₪${donation.Sum}`), pageWidth - 20, 50, { align: 'right' });
    doc.text(reverseText(`בית כנסת: ${donation.NameShul}`), pageWidth - 20, 60, { align: 'right' });
    if (donation.Dedication) doc.text(reverseText(`השדקה: ${donation.Dedication}`), pageWidth - 20, 70, { align: 'right' });
    doc.text(reverseText(`תאריך: ${new Date().toLocaleDateString()}`), pageWidth - 20, 80, { align: 'right' });
    doc.text(reverseText('תודה על תרומתך!'), pageWidth - 20, 100, { align: 'right' });

    doc.save('קבלה.pdf');
  }

  function generateReceiptItem(donation) {
    const doc = new jsPDF();
    initPDF(doc);
    const pageWidth = doc.internal.pageSize.getWidth();
    const email = sessionStorage.getItem('email');

    doc.setFontSize(18);
    doc.text(reverseText('קבלה על תרומת פריט'), pageWidth - 20, 20, { align: 'right' });
    doc.setFontSize(12);
    doc.text(reverseText(`םרות םש: ${email}`), pageWidth - 20, 40, { align: 'right' });
    doc.text(reverseText(`שם הפריט: ${donation.Name}`), pageWidth - 20, 50, { align: 'right' });
    doc.text(reverseText(`כמות: ${donation.Amount}`), pageWidth - 20, 60, { align: 'right' });
    doc.text(reverseText(`מחיר ליחידה: ₪${donation.Price}`), pageWidth - 20, 70, { align: 'right' });
    doc.text(reverseText(`בית כנסת: ${donation.NameShul}`), pageWidth - 20, 80, { align: 'right' });
    if (donation.Dedication) doc.text(reverseText(`הקדשה: ${donation.Dedication}`), pageWidth - 20, 90, { align: 'right' });
    doc.text(reverseText(`תאריך: ${new Date().toLocaleDateString()}`), pageWidth - 20, 100, { align: 'right' });
    doc.text(reverseText('תודה על תרומתך!'), pageWidth - 20, 110, { align: 'right' });

    doc.save('קבלה_פריט.pdf');
  }
  async function updateShul() {
    const email = sessionStorage.getItem('email');
    const response = await fetch(`http://localhost:3000/api/user/update/${email}/shul`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    if (response.ok) {
      alert("בית הכנסת עודכן בהצלחה");
      setShowShulUpdate(false);
    } else {
      alert("שגיאה בעדכון בית הכנסת");
    }
  }

  return (
    <div>
      <NavDonate />
      {!flag && <h2 className='h2login'>כדי לראות את התרומות עליך להתחבר</h2>}
      {flag && (
        <div>
          <h1 className='h1Donation'>האזור האישי שלך</h1>
          {associatedShul && (
            <div className='divSh'>בית הכנסת המועדף שלך: <b>{associatedShul}</b></div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button
              onClick={() => setShowShulUpdate(!showShulUpdate)}
              style={{ fontSize: '13px', padding: '4px 10px', maxWidth: '150px' }}
            >
              {showShulUpdate ? 'סגור עדכון בית כנסת' : 'עדכן בית כנסת'}
            </button>
          </div>

          {showShulUpdate && (
            <div style={{ maxWidth: '300px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
              <h2 className='tDonate'>בחר בית כנסת</h2>
              <select
                className='confirmationInp'
                value={user.idShul}
                onChange={(e) => setUser({ ...user, idShul: e.target.value })}
              >
                <option value="">בחר בית כנסת</option>
                {shuls.map((shul) => (
                  <option className='optionShuls' key={shul.ShulId} value={shul.ShulId}>
                    {shul.NameShul}
                  </option>
                ))}
              </select>
              <button className='btnOkConfirmation' onClick={updateShul} style={{ fontSize: '14px', marginTop: '10px', padding: '4px 12px' }}>עדכן</button>
            </div>
          )}
          {freeDonations.length > 0 && <h2 className='h2Donation'>התרומות החופשיות שלך:</h2>}
          <div className='itemsOfShul'>
            {freeDonations.map(free => (
              <div className='itemShul' key={free.Id}>
                <h2>סכום תרומה: {free.Sum}</h2>
                <p>הקדשה: {free.Dedication}</p>
                <p>לבית כנסת: {free.NameShul}</p>
                <button onClick={() => generateReceiptFree(free)}>הורד קבלה</button>
              </div>
            ))}
          </div>
          {itemDonations.length > 0 && <h2 className='h2Donation'>תרומות הפריטים שלך:</h2>}
          <div className='itemsOfShul'>
            {itemDonations.map(item => (
              <div className='itemShul' key={item.Id}>
                <h2 className='h2Titel'>{item.Name}</h2>
                <p>הקדשה: {item.Dedication}</p>
                <p>לבית כנסת: {item.NameShul}</p>
                <p>מחיר לבודד: {item.Price}</p>
                <p>כמות: {item.Amount}</p>
                <button onClick={() => generateReceiptItem(item)}>הורד קבלה</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DonationsDonated;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import NavDonate from './NavDonate';
// import { jsPDF } from "jspdf";
// import alefFont from './alefFont'; // ייבוא פונט עברי

// function reverseText(str) {
//   return str.split('').reverse().join('');
// }

// function DonationsDonated() {
//   const navigate = useNavigate();
//   const [freeDonations, setFreeDonations] = useState([]);
//   const [itemDonations, setItemDonations] = useState([]);
//   const [associatedShul, setAssociatedShul] = useState('');
//   const [flag, setFlag] = useState(true);
//   const [shuls, setShuls] = useState([]);
//   const [user, setUser] = useState({ idShul: '' });
//   const [showShulUpdate, setShowShulUpdate] = useState(false);

//   useEffect(() => {
//     async function fetchDonations() {
//       const email = sessionStorage.getItem('email');
//       if (email) {
//         let res1 = await fetch(`http://localhost:6200/api/user/${email}/freeDonation`);
//         let data1 = await res1.json();
//         setFreeDonations(data1);

//         let res2 = await fetch(`http://localhost:6200/api/user/${email}/itemDonation`);
//         let data2 = await res2.json();
//         setItemDonations(data2);

//         let res3 = await fetch(`http://localhost:6200/api/user/${email}/shul`);
//         let data3 = await res3.json();
//         if (data3 && data3[0]) setAssociatedShul(data3[0].NameShul);

//         let shulRes = await fetch('http://localhost:6200/api/shul/all');
//         let shulData = await shulRes.json();
//         setShuls(shulData);
//       } else {
//         setFlag(false);
//       }
//     }
//     fetchDonations();
//   }, []);

//   async function updateShul() {
//     const response = await fetch("http://localhost:6200/api/user/update/shul", {
//       method: "PUT",
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     });
//     if (response.ok) {
//       alert("בית הכנסת עודכן בהצלחה");
//       setShowShulUpdate(false);
//     } else {
//       alert("שגיאה בעדכון בית הכנסת");
//     }
//   }

//   function initPDF(doc) {
//     doc.addFileToVFS("Alef-Regular.ttf", alefFont);
//     doc.addFont("Alef-Regular.ttf", "Alef", "normal");
//     doc.setFont("Alef");
//   }

//   function generateReceiptFree(donation) {
//     const doc = new jsPDF();
//     initPDF(doc);
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const email = sessionStorage.getItem('email');

//     doc.setFontSize(18);
//     doc.text(reverseText('קבלה על תרומה'), pageWidth - 20, 20, { align: 'right' });
//     doc.setFontSize(12);
//     doc.text(reverseText(`שם תורם: ${email}`), pageWidth - 20, 40, { align: 'right' });
//     doc.text(reverseText(`סכום התרומה: ₪${donation.Sum}`), pageWidth - 20, 50, { align: 'right' });
//     doc.text(reverseText(`בית כנסת: ${donation.NameShul}`), pageWidth - 20, 60, { align: 'right' });
//     if (donation.Dedication) doc.text(reverseText(`הקדשה: ${donation.Dedication}`), pageWidth - 20, 70, { align: 'right' });
//     doc.text(reverseText(`תאריך: ${new Date().toLocaleDateString()}`), pageWidth - 20, 80, { align: 'right' });
//     doc.text(reverseText('תודה על תרומתך!'), pageWidth - 20, 100, { align: 'right' });

//     doc.save('קבלה.pdf');
//   }

//   function generateReceiptItem(donation) {
//     const doc = new jsPDF();
//     initPDF(doc);
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const email = sessionStorage.getItem('email');

//     doc.setFontSize(18);
//     doc.text(reverseText('קבלה על תרומת פריט'), pageWidth - 20, 20, { align: 'right' });
//     doc.setFontSize(12);
//     doc.text(reverseText(`שם תורם: ${email}`), pageWidth - 20, 40, { align: 'right' });
//     doc.text(reverseText(`שם הפריט: ${donation.Name}`), pageWidth - 20, 50, { align: 'right' });
//     doc.text(reverseText(`כמות: ${donation.Amount}`), pageWidth - 20, 60, { align: 'right' });
//     doc.text(reverseText(`מחיר ליחידה: ₪${donation.Price}`), pageWidth - 20, 70, { align: 'right' });
//     doc.text(reverseText(`בית כנסת: ${donation.NameShul}`), pageWidth - 20, 80, { align: 'right' });
//     if (donation.Dedication) doc.text(reverseText(`הקדשה: ${donation.Dedication}`), pageWidth - 20, 90, { align: 'right' });
//     doc.text(reverseText(`תאריך: ${new Date().toLocaleDateString()}`), pageWidth - 20, 100, { align: 'right' });
//     doc.text(reverseText('תודה על תרומתך!'), pageWidth - 20, 110, { align: 'right' });

//     doc.save('קבלה_פריט.pdf');
//   }

//   return (
//     <div>
//       <NavDonate />
//       {!flag && <h2 className='h2login'>כדי לראות את התרומות עליך להתחבר</h2>}
//       {flag && (
//         <div>
//           <h1 className='h1Donation'>האזור האישי שלך</h1>
//           {associatedShul && (
//             <div className='divSh'>בית הכנסת המועדף שלך: <b>{associatedShul}</b></div>
//           )}
//           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
//             <button
//               onClick={() => setShowShulUpdate(!showShulUpdate)}
//               style={{ fontSize: '13px', padding: '4px 10px', maxWidth: '150px' }}
//             >
//               {showShulUpdate ? 'סגור עדכון בית כנסת' : 'עדכן בית כנסת'}
//             </button>
//           </div>

//           {showShulUpdate && (
//             <div style={{ maxWidth: '300px', margin: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
//               <h2 className='tDonate'>בחר בית כנסת</h2>
//               <select
//                 className='confirmationInp'
//                 value={user.idShul}
//                 onChange={(e) => setUser({ ...user, idShul: e.target.value })}
//               >
//                 <option value="">בחר בית כנסת</option>
//                 {shuls.map((shul) => (
//                   <option className='optionShuls' key={shul.ShulId} value={shul.ShulId}>
//                     {shul.NameShul}
//                   </option>
//                 ))}
//               </select>
//               <button className='btnOkConfirmation' onClick={updateShul} style={{ fontSize: '14px', marginTop: '10px', padding: '4px 12px' }}>עדכן</button>
//             </div>
//           )}

//           {freeDonations.length > 0 && <h2 className='h2Donation'>התרומות החופשיות שלך:</h2>}
//           <div className='itemsOfShul'>
//             {freeDonations.map(free => (
//               <div className='itemShul' key={free.Id}>
//                 <h2>סכום תרומה: {free.Sum}</h2>
//                 <p>הקדשה: {free.Dedication}</p>
//                 <p>לבית כנסת: {free.NameShul}</p>
//                 <button style={{ fontSize: '14px' }} onClick={() => generateReceiptFree(free)}>הורד קבלה</button>
//               </div>
//             ))}
//           </div>
//           {itemDonations.length > 0 && <h2 className='h2Donation'>תרומות הפריטים שלך:</h2>}
//           <div className='itemsOfShul'>
//             {itemDonations.map(item => (
//               <div className='itemShul' key={item.Id}>
//                 <h2 className='h2Titel'>{item.Name}</h2>
//                 <p>הקדשה: {item.Dedication}</p>
//                 <p>לבית כנסת: {item.NameShul}</p>
//                 <p>מחיר לבודד: {item.Price}</p>
//                 <p>כמות: {item.Amount}</p>
//                 <button style={{ fontSize: '14px' }} onClick={() => generateReceiptItem(item)}>הורד קבלה</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DonationsDonated;
