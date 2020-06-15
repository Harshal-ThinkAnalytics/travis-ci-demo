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


export default class APIDetails extends React.Component {
    state = {
        redirect:false,
        icon: null,
        index: "0",
        data:[],
        dialog_del:false,
        dialog_act:false,
        deleteScopeNo:'',
        activateScopeNo:'',
        loading:true,
        refresh:false
    }
    columns=[
        {
            title: 'Scope No', field: 'scope_no',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            
        },
        {
            title: 'API Name', field: 'api_name',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Version', field: 'version',
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
            deleteScopeNo:rowData.scope_no
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
            activateScopeNo:rowData.scope_no
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
            var response  = await sendRequest('/DeleteAPI', {
                scope_no:this.state.deleteScopeNo
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
            deleteScopeNo:'',
            refresh:true
        })
    }  
    
    activateRow = async() =>{
        try {
            this.setState({
                loading:true,
                dialog_act:false
            })
            var response  = await sendRequest('/EnableAPI', {
                scope_no:this.state.activateScopeNo
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
            activateScopeNo:'',
            refresh:true
        })
    }  
    
    getData = async() =>{
        try {
            var response  = await sendRequest('/FetchAPIList', {},'GET')
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
            return <Redirect to='/AddAPI'/>;
        }
        if(this.state.refresh){
            this.setState({
                refresh:false
            })
            this.componentDidMount()
        }
       

        return (
            <DetailsWrapper>
                <Loading open={this.state.loading}/>
                <DialogShow openFlag={this.state.dialog_del} onButtonClick={this.deleteRow} onHide={this.hideDialogDel} 
                    msg={"Are you sure you want to delete?"} buttonText={"Confirm"} heading={'Alert'}
                />

                <DialogShow openFlag={this.state.dialog_act} onButtonClick={this.activateRow} onHide={this.hideDialogAct} 
                    msg={"Are you sure you want to activate?"} buttonText={"Confirm"} heading={'Alert'}
                />
                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        redirect : true
                    })
                   }}>+ Add New API</button>
            </div>
            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"API"} setDialogAct={this.setDialogAct} setDialogDel={this.setDialogDel}/>
            </div>
            </DetailsWrapper>

        )
    }
} 