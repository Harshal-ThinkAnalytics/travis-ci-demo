import * as React from "react";
import styled from "styled-components";
import Header from '../Components/Header'
import PartnerDetails from './PartnerDetails'
import {Link} from "react-router-dom";
import {useAuth} from '../contexts/UserContext'

const SidebarWrapper = styled.section`
  flex-direction: column;
   flex: 1;
  display:flex;
  padding: 2.2rem rem;
  background-color: #f2f3f6;
  float:left;
//   width:15rem;
  
    .sidenav {
      height: 100%;
      width: 18%;
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      background-color: #f2f3f6;
      overflow-x: hidden;
      padding-top: 2px;
      margin-top:7.8rem;
      
    }
    .sidenav a {
      padding: 15px 8px 6px 16px;
     margin-right:1rem;
      text-decoration: none;
      font-size: 18px;
      margin-top: 2px;
      color: #000000;
      display: block;
      background-color: #ffffff;
    }
`
const  Sidebar:React.FunctionComponent=()=> {
    const { authenticated, setAuthenticated } = useAuth()!;
    return (
        <div style={{ flexDirection: "row" }}>
            {authenticated && <SidebarWrapper >
                <div className="sidenav">
                    <Link to="/PartnerDetails">Partner</Link>
                    <Link to="/ProductDetails">Product</Link>
                    <Link to="/JourneyDetails">Journey</Link>
                    <Link to="/PartnerJourneyDetails">Map Partner to Journey</Link>
                    <Link to="/APIDetails">API List</Link>
                </div>
            </SidebarWrapper>}
        </div>
    )
    
}

export default Sidebar

