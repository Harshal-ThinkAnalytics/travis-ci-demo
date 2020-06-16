import * as React from "react";
import styled from "styled-components";
import Modal from '../Components/Modal'
import { Redirect } from "react-router-dom";
import Table from '../Components/Table';
import DialogShow from '../Components/DialogShow';
import Loading from '../Components/Loading';

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
        data:[],
        dialog_del:false,
        dialog_act:false,
        deletePartnerId:'',
        activatePartnerId:'',
        loading:true,
        refresh:false
    }
    columns=[
        {
            title: 'Partner Id', field: 'partner_id',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            hidden:true,
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
    
    setDialogDel=(rowData:any)=>{
        this.setState({
            dialog_del:true,
            deletePartnerId:rowData.partner_id
        })
    }
    hideDialogDel=()=>{
        this.setState({
            dialog_del:false
        })
    }

    setDialogAct=(rowData:any)=>{
        this.setState({
            dialog_act:true,
            activatePartnerId:rowData.partner_id
        })
    }
    hideDialogAct=()=>{
        this.setState({
            dialog_act:false
        })
    }
    deleteRow = async() =>{
        try {
            this.setState({
                loading:true,
                dialog_del:false
            })
            var response  = await sendRequest('/DeleteB2BPartnerDetails', {
                partner_id:Number(this.state.deletePartnerId)
            },'POST')
            console.log(response)
            if (response.data.success){
                console.log("Row deleted Successfully")
            }
            else{
                console.log("Error in deleting data.")
            }
          } catch (error) {
            console.log(error)
          }
        this.setState({
            deletePartnerId:'',
            refresh:true
        })
    }  
    

    activateRow = async() =>{
        try {
            this.setState({
                loading:true,
                dialog_act:false
            })
            var response  = await sendRequest('/EnableB2BPartnerDetails', {
                partner_id:Number(this.state.activatePartnerId)
            },'POST')
            console.log(response)
            if (response.data.success){
                console.log("Row deleted Successfully")
            }
            else{
                console.log("Error in deleting data.")
            }
          } catch (error) {
            console.log(error)
          }
        this.setState({
            activatePartnerId:'',
            refresh:true
        })
    }  
    
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
          this.setState({
              loading:false
          })
    }
    
    async componentDidMount(){
        this.getData()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/AddPartner'/>;
        }
        if(this.state.refresh){
            this.setState({
                refresh:false,
                
            })
            this.componentDidMount()
            this.setState({loading:false})
        }
       

        return (
            <DetailsWrapper>
                <Loading open={this.state.loading}/>
                <DialogShow openFlag={this.state.dialog_del} onButtonClick={this.deleteRow} onHide={this.hideDialogDel} 
                    msg={"Are you sure you want to delete?"} buttonText={"Confirm"} heading={'Alert'}
                />
                <DialogShow openFlag={this.state.dialog_act} onButtonClick={this.activateRow} onHide={this.hideDialogAct} 
                    msg={"Are you sure you want to activate this Partner?"} buttonText={"Confirm"} heading={'Alert'}
                />

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        redirect : true
                    })
                   }}>+ Add New Partner</button>
            </div>
            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"Partner"} setDialogAct={this.setDialogAct} setDialogDel={this.setDialogDel}/>
            </div>
            </DetailsWrapper>

        )
    }
} 