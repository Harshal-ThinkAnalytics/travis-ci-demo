import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Counter from './Route/Counter'
import Label from './Components/Label';
import Header from './Components/Header'
import LabeledInput from './Components/LabeledInput'
import AddPartnerModel from './Modals/AddPartnerModal'
import EditPartnerModel from './Modals/EditPartnerModal'
import Sidebar from './Route/Sidebar'
import PartnerDetails from './Route/PartnerDetails'
// import Header from './Components/Header'
// import 
function App() {
  return (
    // <Counter/>
    //  <Button type={"disabled"}/>
    //  <Label data={"hello sid"}/>
    // <AddPartnerModel/>
    // <EditPartnerModel/>
    <div>
    <Header/>
    <Sidebar/>
    </div>
    // <h1>app</h1>
  );
}

export default App;
