import React, { useState, useContext } from 'react'
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import PrivatePage from '../Components/PrivatePage'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import sendRequest from "../utils/sendRequest";
import { Redirect } from "react-router-dom";
import { useToken } from '../Context/AppContext'
import {AppProvider} from '../Context/AppContext';
import PartnerDetails from '../Route/PartnerDetails'
import JourneyDetails from '../Route/JourneyDetails'
import ProductDetails from '../Route/ProductDetails'
import APIDetails from '../Route/APIDetails'
import PartnerJourneyDetails from '../Route/PartnerJourneyDetails'
import AddPartner from '../Route/AddPartner'
import AddProduct from '../Route/AddProduct'
import AddJourney from '../Route/AddJourney'
import AddAPI from '../Route/AddAPI'
import EditPartner from '../Route/EditPartner'
import EditProduct from '../Route/EditProduct'
import EditJourney from '../Route/EditJourney'
import EditAPI from '../Route/EditAPI'
import MapPartnerJourney from '../Route/MapPartnerJourney'
import ConfigurePartnerJourney from '../Route/ConfigurePartnerJourney'
import EditPartnerJourney from '../Route/EditPartnerJourneyScopes'
import EditPartnerJourneyScopes from "../Route/EditPartnerJourneyScopes";

const AddPartnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  
  width: auto;
  margin-left: 210px;
  h1{
    display: block;
    font-size: 2em;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  input {
    padding-top: 5px;
    //padding-bottom: 5px;
    float:right;
  }
  p{
    margin-top: -0.19rem;
    margin-bottom: auto;
    margin-left: 0.3rem
  }
  button{
    margin-top:1rem;  
  }
`

const Mystyle = styled.div`
display: flex;
  flex-direction: row row-wrap;
  flex: 2;
  padding: 0.5rem;
`

const Mystyle1 = styled.div`
display: flex;
align-items: center;

flex:1;
padding: 1px;
order:1;
`
const Mystyle2 = styled.div`
display: flex;
align-items: center;

flex:1 20%;
padding: 1px;
order:2;
`


const Login:React.FunctionComponent=()=>{
    const [username,setUsername]=useState('')
    const [usernameError,setUsernameError]=useState(false)
    const [password,setPassword]=useState('')
    const [passwordError,setPasswordError]=useState(false)
    const { token,setToken } = useToken()!;

    // if (token.length!=0){
    //   return(
    //   <PrivatePage>
    //   <Switch>
    //   <Route path="/APIDetails" component={APIDetails} />
    //   <Route path="/PartnerDetails" component={PartnerDetails} />
    //   <Route path="/ProductDetails" component={ProductDetails} />
    //   <Route path="/JourneyDetails" component={JourneyDetails} />
    //   <Route path="/PartnerJourneyDetails" component={PartnerJourneyDetails} />
    //   <Route path="/AddAPI" component={AddAPI} />
    //   <Route path="/AddPartner" component={AddPartner} />
    //   <Route path="/AddProduct" component={AddProduct} />
    //   <Route path="/AddJourney" component={AddJourney} />
    //   <Route path="/EditAPI" component={EditAPI} />
    //   <Route path="/EditPartner" component={EditPartner} />
    //   <Route path="/EditProduct" component={EditProduct} />
    //   <Route path="/EditJourney" component={EditJourney} />
    //   <Route path="/MapPartnerJourney" component={MapPartnerJourney} />
    //   <Route path="/ConfigurePartnerJourney" component={ConfigurePartnerJourney} />
    //   <Route path="/EditPartnerJourneyScopes" component={EditPartnerJourneyScopes} />
    //   </Switch>
    // </PrivatePage>
    //   )
    // }

  const login = async()=>{
    const response  = await sendRequest('/Login', {
      username: "b2bhub",
      password: "admin123"
    },'POST')
    console.log(response,setToken,token)
    setToken(response.data.token)
  }

    const handleUsernameChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        setUsername(filteredValue)
    }

    const validateUsernameChange = () => {
        console.log("inside validateUsernameChange")
        if (username.length < 1) {
            setUsernameError(true)
        }
    }

    const handlePasswordChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        setPassword(filteredValue)
    }

    const validatePasswordChange = () => {
        console.log("inside validatePasswordChange")
        if (password.length < 1) {
            setPasswordError(true)
        }
    }


    return (
      <AppProvider>
        <AddPartnerWrapper>
        <Mystyle>
            <Mystyle1>
            <h1>Login</h1>
            </Mystyle1>
        </Mystyle>

        <Mystyle>
            <Mystyle1>
            <Label data={"Username"} />
            </Mystyle1>
            <Mystyle2>
            <Input
                    onChange={e => handleUsernameChange(e.target.value)}
                    onFocus={() =>setUsernameError(false)}
                    onBlur={() => { validateUsernameChange() }}
                    value={username}
                    type={usernameError}
                />
                <ErrorMessage show={usernameError} className="error-message">
                    Please enter valid username
                 </ErrorMessage>
            </Mystyle2>
            </Mystyle>

            <Mystyle>
            <Mystyle1>
            <Label data={"Password"} />
            </Mystyle1>
            <Mystyle2>
            <Input
                    onChange={e => handlePasswordChange(e.target.value)}
                    onFocus={() =>setPasswordError(false)}
                    onBlur={() => { validatePasswordChange() }}
                    value={password}
                    type={passwordError}
                />
                <ErrorMessage show={passwordError} className="error-message">
                    Please enter valid password
                 </ErrorMessage>
            </Mystyle2>
            </Mystyle>

            <Mystyle>
                    <Mystyle1>
                    <Button
                    type={''}
                    // disabled={false}
                    onClick={() => login()}
                    
                >
                    Submit
                </Button>
                </Mystyle1>
            </Mystyle>

       </AddPartnerWrapper >
       </AppProvider>
    )
} 


export default Login;




