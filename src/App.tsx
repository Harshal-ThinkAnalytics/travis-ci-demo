import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Page from './Components/Page'
import LoginPage from './Components/LoginPage'
import PrivateRoute from './Components/PrivatePage'
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
import EditPartnerJourney from './Route/EditPartnerJourneyScopes'
import EditPartnerJourneyScopes from "./Route/EditPartnerJourneyScopes";
import Login from "./Route/Login";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Page>
        <Switch>
        <PrivateRoute path="/APIDetails" component={APIDetails} />
        <PrivateRoute path="/PartnerDetails" component={PartnerDetails} />
        <PrivateRoute path="/ProductDetails" component={ProductDetails} />
        <PrivateRoute path="/JourneyDetails" component={JourneyDetails} />
        <PrivateRoute path="/PartnerJourneyDetails" component={PartnerJourneyDetails} />
        <PrivateRoute path="/AddAPI" component={AddAPI} />
        <PrivateRoute path="/AddPartner" component={AddPartner} />
        <PrivateRoute path="/AddProduct" component={AddProduct} />
        <PrivateRoute path="/AddJourney" component={AddJourney} />
        <PrivateRoute path="/EditAPI" component={EditAPI} />
        <PrivateRoute path="/EditPartner" component={EditPartner} />
        <PrivateRoute path="/EditProduct" component={EditProduct} />
        <PrivateRoute path="/EditJourney" component={EditJourney} />
        <PrivateRoute path="/MapPartnerJourney" component={MapPartnerJourney} />
        <PrivateRoute path="/ConfigurePartnerJourney" component={ConfigurePartnerJourney} />
        <PrivateRoute path="/EditPartnerJourneyScopes" component={EditPartnerJourneyScopes} />
        <Route path="/Login" component={Login}  />
        </Switch>
    </Page>
    </BrowserRouter>
    </div>
  );
}

export default App;
