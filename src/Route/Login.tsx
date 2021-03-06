import React, { useState, useContext, useEffect } from 'react'
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import sendRequest from "../utils/sendRequest";
import Loading from '../Components/Loading';
import {useAuth} from '../contexts/UserContext'

const cookies = new Cookies();

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
    const [redirect,setRedirect]=useState(false)
    const [loading,setLoading]=useState(false)
    const { authenticated, setAuthenticated } = useAuth()!;

  const token = cookies.get('token')

  if (authenticated){
    return <Redirect to='/PartnerDetails'/>
  }


  
  const login = async()=>{
    setLoading(true)
    try {
      const response  = await sendRequest('/Login', {
        username: username,
        password: password
      },'POST')
      console.log(response,token)
    if (response.status==200) {
      cookies.set('token',response.data.token)
      setAuthenticated(true)
      setRedirect(true)
      
    } else {
      setLoading(false)
      setUsernameError(true)
      setPasswordError(true)
    }
    }catch(e){
      setLoading(false)
      setUsernameError(true)
      setPasswordError(true)
    }
    
    
  }

  if (redirect){
    return <Redirect to='/PartnerDetails'/>
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
        <AddPartnerWrapper>
          <Loading open={loading}/>
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
                    cltype={usernameError}
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
                    type="password"
                    cltype={passwordError}
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
    )
} 


export default Login;





