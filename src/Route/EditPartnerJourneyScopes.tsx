import * as React from "react";
import styled from "styled-components";
import Modal from '../Components/Modal'
import { Redirect } from "react-router-dom";
import Table from '../Components/PartnerJourneyScopesTable';
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
interface Props{
    location:any
}

export default class EditPartnerJourneyScopes extends React.Component<Props> {
    data=this.props.location.state
    state = {
        id:this.data.partner_journey_id,
        redirect:false,
        icon: null,
        index: "0",
        data:[],
        dialog:false,
        saveScopes:[],
        loading:true,
        refresh:false,
        scopes:[]
    }
    columns=[
        {
            title: 'Scope', field: 'scope_no',
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
    
    setDialog=(rowData:any)=>{
        var scopes=[]
        for (var key in rowData){
            scopes.push(rowData[key]['scope_no'])
        }
        this.setState({
            dialog:true,
            saveScopes:scopes
        })
    }
    hideDialog=()=>{
        this.setState({
            dialog:false
        })
    }
    addScope=(rowData:any)=>{
        console.log("0000",rowData)
    }
    saveScopes = async() =>{
        try {
            this.setState({
                loading:true,
                dialog:false
            })
            var response  = await sendRequest('/SaveJourneyScopes', {
                partner_journey_id:Number(this.state.id),
                scopes:this.state.saveScopes
            },'POST')
            console.log(response)
            if (response.data.success){
                console.log("Scopes Saved Successfully")
            }
            else{
                console.log("Error in deleting data.")
            }
          } catch (error) {
            console.log(error)
          }
        this.setState({
            saveScopes:[],
            loading:false,
            refresh:true
        })
    }  
    
    getAllScopes = async() =>{
        try {
            var response  = await sendRequest('/FetchAPIList', {},'GET')
            console.log(response)
            if (response.data.success){
                var data=response.data.data
                var scopes:string[] = this.state.scopes
                for (var key in data){
                    var scope:string = data[key]['scope_no']
                    if(scopes.includes(scope)){

                        data[key]['tableData']= {
                            checked: true
                        }
                    } 
                }
                this.setState({data:data})
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

    getScopes = async() =>{
        try {
            console.log("id is",this.state.id)
            var response  = await sendRequest('/FetchJourneyScopes', {
                partner_journey_id:Number(this.state.id)
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({scopes:response.data.data})
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
        await this.getScopes()
        this.getAllScopes()

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
        
        // console.log("data is",this.state.data,"scope is",this.state.scopes)
        return (
            <DetailsWrapper>
                <Loading open={this.state.loading}/>
                <DialogShow openFlag={this.state.dialog} onButtonClick={this.saveScopes} onHide={this.hideDialog} 
                    msg={"Are you sure?"} buttonText={"Confirm"} heading={'Alert'}
                />

            <div className="table">
                <Table data={this.state.data} columns={this.columns} title={"API"} setDialog={this.setDialog}/>
            </div>
            </DetailsWrapper>

        )
    }
} 