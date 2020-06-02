import * as React from "react";
import styled from "styled-components";
import Modal from '../Components/Modal'
import { Redirect } from "react-router-dom";
import Table from '../Components/Table'

import sendRequest from "../utils/sendRequest";


const DetailsWrapper = styled.div`
margin-left:23rem;
margin-right:4rem;
margin-top:1rem;


.topDiv{

button{
    float:right;
    margin:0rem;
    margin-bottom: 2rem;
    border-radius:1rem;
    margin-top: 0.5rem;
    padding: 10px;
    background-color: #D4AE69;
    color: white;
    box-shadow: 0 9px 15px -9px #333;
    border: none;
    margin-right: 3rem;
    outline:none;
    font-size:18px;
}}
`


export default class PartnerDetails extends React.Component {
    state = {
        redirect:false,
        icon: null,
        index: "0",
        data:[]
    }
    columns=[
        {
            title: 'Partner Id', field: 'partner_id',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },

        },
        {
            title: 'Address', field: 'address',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Contact Person', field: 'contact_person_name',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            // type: 'numeric'
        },
        {
            title: 'Email Id', field: 'email_id',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Mobile No', field: 'mobile_number',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Short Code', field: 'short_code',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Active', field: 'active',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        }

    ]
    getData = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BPartnerDetails', {},'GET')
            console.log(response)
            if (response.data.success){
                this.setState({data:response.data.data})
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }
    
    async componentDidMount(){
        this.getData()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/AddPartner'/>;
        }
       

        return (
            <DetailsWrapper>

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        redirect : true
                    })
                   }}>+ Add New Partner</button>
            </div>
            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"Partner"}/>
            </div>
            </DetailsWrapper>

        )
    }
} 