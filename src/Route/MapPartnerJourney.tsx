import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import Dropdown from '../Components/Dropdown'


const AddPartnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 2.2rem 0;

  .form {
    margin-top: 2.2rem;
    margin-bottom: 2.5rem;
  }

  .submit-button {
    margin-top: auto;
  }
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
        journeyIdRow:{}

    }
    // saveData = async() =>{
    //     try {

    //         var response  = await sendRequest('/SaveB2BPartnerDetails', {
    //             contact_person_name:this.state.contactPerson,
    //             active:true,
    //             address:this.state.address,
    //             email_id:this.state.emailId,
    //             mobile_number:this.state.mobileNo,
    //             short_code:this.state.shortCode,
    //             operation:'save'
    //         },'POST')
    //         console.log(response)
    //         if (response.data.success){
    //             this.setState({data:response.data.data})
    //         }
    //         else{
    //             console.log("Error in saving data.")
    //         }
    //       } catch (error) {
    //         console.log(error)
    //       }
    // }

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
        return (
            <AddPartnerWrapper>
                <h1>Map Partner to Journey</h1>
                <Label data={"Partner Id: "} />
                 <Dropdown value={this.state.partnerIdRow} onChange={this.setPartnerId} options={this.state.partners} placeholder={'Select Partner'} />

                 <Label data={"Journey Id: "} />
                 <Dropdown value={this.state.journeyIdRow} onChange={this.setJourneyId} options={this.state.journeys} placeholder={'Select Journey'} />
                <Button
                    type={''}
                    // disabled={false}
                    // onClick={() => this.saveData()}
                >
                    Save
                </Button>


            </AddPartnerWrapper >
        )
    }
};

export default MapPartnerJourney;





