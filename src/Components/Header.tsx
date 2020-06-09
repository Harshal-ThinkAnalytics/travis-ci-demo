import * as React from "react";
import styled from 'styled-components'
import logo from '../Images/logo-fill.png'
import { useToken } from '../Context/AppContext'
import sendRequest from '../utils/sendRequest'

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
  const { token,setToken } = useToken()!;
  const login = async()=>{
    const response  = await sendRequest('/Login', {
      username: "b2bhub",
      password: "admin123"
    },'POST')
    console.log(response,setToken,token)
    setToken(response.data.token)
  }

      return (
          <HeaderWrapper>

          <img src={logo} alt="ABFL" />
          { <button
            onClick={()=>login()}
          >Logout</button>}
          </HeaderWrapper>
      )
    
}
export default Header