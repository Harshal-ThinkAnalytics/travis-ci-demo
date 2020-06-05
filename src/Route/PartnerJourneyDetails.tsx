import * as React from "react";
import styled from "styled-components";
import Modal from '../Components/Modal'
import { Redirect } from "react-router-dom";
import PartnerJourneyTable from '../Components/PartnerJourneyTable';
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


export default class PartnerJourneyDetails extends React.Component {
    state = {
        redirect:false,
        icon: null,
        index: "0",
        data:[],
        dialog:false,
        passDialog:false,
        passId:'',
        deletePartnerJourneyId:'',
        loading:true,
        encryptedPass:'loading...',
        refresh:false
    }
    columns=[
        {
            title: 'Id', field: 'partner_journey_id',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Partner Name', field: 'partner_name',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Journey Name', field: 'journey_name',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        },
        {
            title: 'Username', field: 'username',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
            // type: 'numeric'
        },
        {
            title: 'Active', field: 'active',
            cellStyle: {
                border: 'solid #f2f3f6 3px',
            },
        }

    ]
    getEncryptedPass=async(id:string)=>{
        try {
            var response  = await sendRequest('/GetEncryptedPassword', {
                partner_journey_id:Number(id)
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({
                    encryptedPass:response.data.data
                })
            }
            else{
                console.log("Error in getting passsword.")
            }
          } catch (error) {
            console.log(error)
          }

    }
    setPassDialog=(rowData:any)=>{
        this.setState({
            passDialog:true,
        })
        this.getEncryptedPass(rowData.partner_journey_id)

    }
    hidePassDialog=()=>{
        this.setState({
            passDialog:false,
            encryptedPass:'loading...'
        })
    }
    
    setDialog=(rowData:any)=>{
        this.setState({
            dialog:true,
            deletePartnerJourneyId:rowData.partner_journey_id
        })
    }
    hideDialog=()=>{
        this.setState({
            dialog:false
        })
    }
    deleteRow = async() =>{
        try {
            this.setState({
                loading:true,
                dialog:false
            })
            var response  = await sendRequest('/DeleteB2BPartnerJourneyMapping', {
                partner_journey_id:Number(this.state.deletePartnerJourneyId)
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
            loading:false,
            refresh:true
        })
    }  
    
    getData = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BPartnerJourneyMappings', {},'GET')
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
            return <Redirect to='/MapPartnerJourney'/>;
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
                <DialogShow openFlag={this.state.dialog} onButtonClick={this.deleteRow} onHide={this.hideDialog} 
                    msg={"Are you sure you want to delete?"} buttonText={"Confirm"} heading={'Alert'}
                />
                <DialogShow openFlag={this.state.passDialog} onButtonClick={this.hidePassDialog} onHide={this.hidePassDialog} 
                    msg={this.state.encryptedPass} buttonText={"OK"} heading={'Password'}
                />

                 <div className="topDiv">
                {/* <h1>Users</h1> */}
                <button onClick={() => {
                    this.setState({
                        redirect : true
                    })
                   }}>+ Map New Partner</button>
            </div>
            <div className="table">
                <PartnerJourneyTable data={this.state.data} columns={this.columns} title={"PartnerJourney"} setDialog={this.setDialog} setPassDialog={this.setPassDialog}/>
            </div>
            </DetailsWrapper>

        )
    }
} 