import * as React from "react";
import styled from 'styled-components'
import logo from '../Images/logo-fill.png'
import sendRequest from '../utils/sendRequest'
import Cookies from 'universal-cookie';
import { Redirect } from  "react-router-dom";

const cookies = new Cookies();

const HeaderWrapper = styled.header`
  height: 7.7rem;
  background-color: #c7222a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.2rem;
  widht:100%;
  img {
    height: 3.5rem;
  }

  button {
    all: unset;
    cursor: pointer;
    color: white;
    font-size: 1.6rem;
  }

  
`

const Header:React.FunctionComponent=()=>{
    const[redirect,setRedirect]=React.useState(false)

    const logout=()=>{
      cookies.remove('token')
      setRedirect(true)
    }
    if (redirect){
      return <Redirect to='/Login'/>;
    }
      return (
          <HeaderWrapper>
          <img src={logo} alt="ABFL" />
          { <button
            onClick={()=>logout()}
          >Logout</button>}
          </HeaderWrapper>
      )
    
}
export default Header