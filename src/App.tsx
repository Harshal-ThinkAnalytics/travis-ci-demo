import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Page from './Components/Page'
import Label from './Components/Label';
import Header from './Components/Header'
import LabeledInput from './Components/LabeledInput'
import PartnerDetails from './Route/PartnerDetails'
import JourneyDetails from './Route/JourneyDetails'
import ProductDetails from './Route/ProductDetails'
import APIDetails from './Route/APIDetails'
import PartnerJourneyDetails from './Route/PartnerJourneyDetails'
import AddPartner from './Route/AddPartner'
import AddProduct from './Route/AddProduct'
import AddJourney from './Route/AddJourney'
import AddAPI from './Route/AddAPI'
import EditPartner from './Route/EditPartner'
import EditProduct from './Route/EditProduct'
import EditJourney from './Route/EditJourney'
import EditAPI from './Route/EditAPI'
import MapPartnerJourney from './Route/MapPartnerJourney'
import ConfigurePartnerJourney from './Route/ConfigurePartnerJourney'

function App() {
  return (

    <div>
    <BrowserRouter>
      <Page>
        <Switch>
        <Route path="/APIDetails" component={APIDetails} />
        <Route path="/PartnerDetails" component={PartnerDetails} />
        <Route path="/ProductDetails" component={ProductDetails} />
        <Route path="/JourneyDetails" component={JourneyDetails} />
        <Route path="/PartnerJourneyDetails" component={PartnerJourneyDetails} />
        <Route path="/AddAPI" component={AddAPI} />
        <Route path="/AddPartner" component={AddPartner} />
        <Route path="/AddProduct" component={AddProduct} />
        <Route path="/AddJourney" component={AddJourney} />
        <Route path="/EditAPI" component={EditAPI} />
        <Route path="/EditPartner" component={EditPartner} />
        <Route path="/EditProduct" component={EditProduct} />
        <Route path="/EditJourney" component={EditJourney} />
        <Route path="/MapPartnerJourney" component={MapPartnerJourney} />
        <Route path="/ConfigurePartnerJourney" component={ConfigurePartnerJourney} />
        </Switch>
      </Page>
    </BrowserRouter>
    </div>
  );
}

export default App;
