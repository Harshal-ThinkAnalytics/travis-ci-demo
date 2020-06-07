import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import Dropdown from '../Components/Dropdown'
import { Redirect } from "react-router-dom";


const AddPartnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 100px;
  h1{
    display: block;
    font-size: 2em;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  input {
    padding-top: 5px;
    //padding-bottom: 5px;
    float:right;
  }
 

button{
  margin-top:1rem;
  
 
}
`

const Mystyle = styled.div`
display: flex;
  flex-direction: row row-wrap;
  flex: 2;
  padding: 0.5rem;
`

const Mystyle1 = styled.div`
display: flex;
align-items: center;

flex:1;
padding: 1px;
order:1;
`
const Mystyle2 = styled.div`
display: flex;
align-items: center;

flex:1 20%;
padding: 1px;
order:2;
`
class MapPartnerJourney extends React.Component {

    state = {
        partnerId: '',
        partnerIdError: false,
        journeyId: '',
        journeyIdError: false,
        journeys:[],
        partners:[],
        partnerIdRow:{},
        journeyIdRow:{},
        redirect:false

    }
    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveB2BPartnerJourneyMapping', {
                partner_id:Number(this.state.partnerId),
                journey_id:Number(this.state.journeyId),
                operation:'save'
            },'POST')
            console.log(response)
            if (response.data.success){
                console.log("data saved successfully.")
                this.setState({
                    redirect:true
                })
            }
            else{
                console.log("Error in saving data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    setPartnerId = (partner_id:any) =>{
        this.setState({
            partnerIdRow:partner_id,
            partnerId:partner_id.value
        })
    }
    setJourneyId = (journey_id:any) =>{
        this.setState({
            journeyIdRow:journey_id,
            journeyId:journey_id.value
        })
    }
    getJourneys = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BJourneyDetails', {},'GET')
            console.log(response)
            if (response.data.success){
                var journeys=[]
                for(var key in response.data.data){
                    journeys.push({label:response.data.data[key]['journey_name'],value:response.data.data[key]['journey_id']})
                }
                this.setState({
                    journeys:journeys
                })
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    getPartners = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BPartnerDetails', {},'GET')
            console.log(response)
            if (response.data.success){
                var partners=[]
                for(var key in response.data.data){
                    partners.push({label:response.data.data[key]['short_code'],value:response.data.data[key]['partner_id']})
                }
                this.setState({
                    partners:partners
                })
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    async componentDidMount(){
        this.getJourneys()
        this.getPartners()
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/PartnerJourneyDetails'/>;
        }
        return (
            <AddPartnerWrapper>
                <Mystyle>
                    <Mystyle1>
                    <h1>Map Partner to Journey</h1>
                    </Mystyle1>
                </Mystyle>
                <Mystyle>
                    <Mystyle1>
                        <Label data={"Partner Id"} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.partnerIdRow} onChange={this.setPartnerId} options={this.state.partners} placeholder={'Select Partner'} />
                    </Mystyle2>
                 </Mystyle>
                 <Mystyle>
                    <Mystyle1>
                        <Label data={"Journey Id"} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.journeyIdRow} onChange={this.setJourneyId} options={this.state.journeys} placeholder={'Select Journey'} />
                    </Mystyle2>
                 </Mystyle>
                 <Mystyle>
                    <Mystyle1>
                    <Button
                    type={''}
                    // disabled={false}
                    onClick={() => this.setState({redirect:true})}
                    
                >
                    Back
                </Button>
                </Mystyle1>
                <Mystyle2>
                    <Button
                    type={''}
                    // disabled={false}
                    onClick={() => this.saveData()}
                >
                    Save
                </Button>
                </Mystyle2>
                </Mystyle>  


            </AddPartnerWrapper >
        )
    }
};

export default MapPartnerJourney;





