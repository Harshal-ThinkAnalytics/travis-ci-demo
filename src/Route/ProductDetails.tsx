import * as React from "react";
import { useEffect} from 'react';
import styled from "styled-components";
import MaterialTable from "material-table";
import Search from '@material-ui/icons/Search';
import Edit from '@material-ui/icons/Edit';
import { forwardRef } from 'react';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Clear from '@material-ui/icons/Clear';
import Modal from '../Components/Modal'
import AddProductModel from '../Modals/AddProductModal'
import EditPartnerModal from '../Modals/EditPartnerModal'
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
        addProductModal: false,
        editProductModal: false,
        icon: null,
        index: "0",
        data:[]
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
        console.log("This is data",this.state.data);
       

        return (
            <DetailsWrapper>
                <Modal
                 onClose={''}
                open={this.state.addProductModal}
                >
                   <AddProductModel
                   onAuthorize={()=>
                       this.setState({
                           addProductModal: false,
                       })
                   }
                   />
                </Modal>

                <Modal
                 onClose={''}
                open={this.state.editProductModal}
                >
                   <EditPartnerModal
                   onAuthorize={()=>
                       this.setState({
                        editProductModal: false,
                       })
                   }
                   />
                </Modal>

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        addProductModal : true,
                    })
                   }}>+ Add New Product</button>
            </div>
            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"Products"}/>
            </div>
            </DetailsWrapper>

        )
    }
} 