import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import SignUp from '../src/components/SignUp'
import LogIn from '../src/components/LogIn'
import Gabay from '../src/components/Gabay'
import Donates from '../src/components/Donates'
import Confirmation from './components/Confirmation'
import ItemsOfShul from '../src/components/ItemsOfShul'
import FreeDonation from '../src/components/FreeDonation'
import DonationByItem from '../src/components/DonationByItem'
import ShulsOfItem from '../src/components/ShulsOfItem'
import DonationsDonated from '../src/components/DonationsDonated'
import UpdateUser from '../src/components/UpdateUser'
import GitHubSuccess from '../src/components/GitHubSuccess'


function App() {
  {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/Donates" />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/LogIn" exact element={<LogIn />} />
          <Route path="/github-success" element={<GitHubSuccess />} />
          <Route path="/Donates/Shul/ItemsOfShul/LogIn" exact element={<LogIn />} />
          <Route path="/Gabay/*" exact element={<Gabay />} />
          <Route path="/Donates/*" exact element={<Donates />} />
          {/* <Route path="/Donates/Exit" exact element={<Donates />} /> */}
          <Route path="/Donates/Shul/ItemsOfShul/Confirmation" exact element={<Confirmation />} />
          <Route path="/Donates/DonationByItem/ShulsOfItem/LogIn" exact element={<LogIn />} />
          <Route path="/Donates/DonationByItem/ShulsOfItem/Confirmation" exact element={<Confirmation />} />
          <Route path="/Donates/item/shul/Confirmation" exact element={<Confirmation />} />
          <Route path="/Donates/DonationByItem/ShulsOfItem" exact element={<ShulsOfItem />} />
          <Route path="/Donates/DonationsDonated" exact element={<DonationsDonated />} />
          <Route path="/Donates/Shul/ItemsOfShul" exact element={<ItemsOfShul />} />
          <Route path="/Donates/FreeDonation" exact element={<FreeDonation />} />
          <Route path="/Donates/DonationByItem" exact element={<DonationByItem />} />
          <Route path="/Donates/UpdateUser" element={<UpdateUser />} />
        </Routes>
      </Router>
    );
  }
}
export default App;