import * as React from "react";
import styled from "styled-components";
import Header from '../Components/Header'
import PartnerDetails from './PartnerDetails'

const SidebarWrapper = styled.section`
display: flex;
  flex-direction: column;
   flex: 1;
  display:flex;
  padding: 2.2rem rem;
  background-color: #f2f3f6;
  float:left;
  // width:15rem;
  
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

export default class Sidebar extends React.Component {
    render() {
        return (
            <div style={{ flexDirection: "row" }}>
                <SidebarWrapper >
                    <div className="sidenav">
                        <a href="#Merchant">Merchant</a>
                        <a href="#Category">Category</a>
                        <a href="#Product">Product</a>
                        <a href="#Scheme">Scheme</a>
                        <a href="#Charges">Charges</a>
                        <a href="#User">User</a>
                        <a href="#MapScheme">Map Scheme To Merchant</a>
                        <a href="#MapProduct">Map Product To Merchant</a>
                        <a href="#MapCharges">Map Charges To Scheme</a>
                    </div>
                </SidebarWrapper>
            <PartnerDetails />
            </div>
        )
    }
}

