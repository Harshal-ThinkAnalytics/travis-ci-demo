import * as React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import Modal from '../Components/Modal'
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


export default class ProductDetails extends React.Component {
    state = {
        icon: null,
        index: "0",
        data:[],
        redirect:false
    }
    columns=[
        {
            title: 'Prodcut Id', field: 'product_id',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },

        },
        {
            title: 'Product Name', field: 'product_name',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Minimum Loan Amount', field: 'min_loan_amount',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            // type: 'numeric'
        },
        {
            title: 'Maximum Loan Amount', field: 'max_loan_amount',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Minimum Tenure', field: 'min_tenure',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Maximum Tenure', field: 'max_tenure',
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
            var response  = await sendRequest('/FetchB2BProductDetails', {},'GET')
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
            return <Redirect to='/AddProduct'/>;
        }
       

        return (
            <DetailsWrapper>

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        redirect:true
                    })
                    
                   }}>+ Add New Product</button>
            </div>
            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"Product"}/>
            </div>
            </DetailsWrapper>

        )
    }
} 