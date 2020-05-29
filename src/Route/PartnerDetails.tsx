import * as React from "react";
import styled from "styled-components";
import Table from "../Components/Table";


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
        addPartnerModal: false,
        editPartnerModal: false,
        icon: null,
        index: "0",
    }
    columns=[
        {
            title: 'Partner Id', field: 'PartnerId',
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
            title: 'Contact Person', field: 'contactPerson',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            // type: 'numeric'
        },
        {
            title: 'Email Id', field: 'EmailId',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Mobile No', field: 'MobileNo',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Short Code', field: 'ShortCode',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        }

    ]
    data=[
        {
            PartnerId: '1', address: 'india', contactPerson: 'modi',
            EmailId: 'ModiR@india', MobileNo: '999', ShortCode: 'dev'
        },
        {
            PartnerId: '2', address: 'maha', contactPerson: 'thakare',
            EmailId: 'thakare@india', MobileNo: '000', ShortCode: 'cm'
        },
        {
            PartnerId: '3', address: 'maha', contactPerson: 'thakare',
            EmailId: 'thakare@india', MobileNo: '000', ShortCode: 'cm'
        },
    ]

    render() {
        return (
            <DetailsWrapper>
                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        addPartnerModal : true,
                    })
                   }}>+ Add New Partner</button>
            </div>
            <div className="table">
                <Table data={this.data} columns={this.columns} title={"users"}/>
            </div>
            </DetailsWrapper>

        )
    }
}