import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Page from './Components/Page'
import Label from './Components/Label';
import Header from './Components/Header'
import LabeledInput from './Components/LabeledInput'
import Sidebar from './Route/Sidebar'
import PartnerDetails from './Route/PartnerDetails'
import JourneyDetails from './Route/JourneyDetails'
import ProductDetails from './Route/ProductDetails'
import PartnerJourneyDetails from './Route/PartnerJourneyDetails'
import AddPartner from './Route/AddPartner'
import AddProduct from './Route/AddProduct'
import AddJourney from './Route/AddJourney'
import EditPartner from './Route/EditPartner'
import EditProduct from './Route/EditProduct'
import EditJourney from './Route/EditJourney'
import MapPartnerJourney from './Route/MapPartnerJourney'

function App() {
  return (

    <div>
    <Sidebar/>
    <BrowserRouter>
      <Page>
        <Switch>
        <Route path="/PartnerDetails" component={PartnerDetails} />
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/JourneyDetails" component={JourneyDetails} />
        <Route path="/PartnerJourneyDetails" component={PartnerJourneyDetails} />
        <Route path="/AddPartner" component={AddPartner} />
        <Route path="/AddProduct" component={AddProduct} />
        <Route path="/AddJourney" component={AddJourney} />
        <Route path="/EditPartner" component={EditPartner} />
        <Route path="/EditProduct" component={EditProduct} />
        <Route path="/EditJourney" component={EditJourney} />
        <Route path="/MapPartnerJourney" component={MapPartnerJourney} />
        </Switch>
      </Page>
    </BrowserRouter>
    </div>
  );
}

export default App;
