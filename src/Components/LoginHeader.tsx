import * as React from "react";
import styled from 'styled-components'
import logo from '../Images/logo-fill.png'



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

const LoginHeader:React.FunctionComponent=()=>{
      return (
          <HeaderWrapper>
          <img src={logo} alt="ABFL" />
          </HeaderWrapper>
      )
    
}
export default LoginHeader