import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import { Redirect } from "react-router-dom";
import Dropdown from '../Components/Dropdown'


const AddPartnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  margin-left: 210px;
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
 
p{
  margin-top: -0.19rem;
  margin-bottom: auto;
  margin-left: 0.3rem
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
interface Props{
    id:string
}

class ConfigurePartnerJourney extends React.Component<Props> {

    state = {
        id: this.props.id,
        partnerIdError: false,
        data:[],
        minAge:'',
        minAgeError:false,
        maxAge:'',
        maxAgeError:false,
        lmsScheme:'',
        lmsSchemeRow:{},
        lmsSchemes:[],
        lmsProduct:'',
        lmsProductRow:{},
        lmsProducts:[],
        kyc:'',
        kycRow:{},
        bureauToCall:'',
        bureauToCallRow:{},
        mandate:'',
        mandateRow:{},
        paymentGateway:'',
        paymentGatewayRow:{},
        lmsDisbursal:'',
        lmsDisbursalRow:{},
        dkycVersion:'',
        dkycVersionRow:{},
        mrpVersion:'',
        mrpVersionRow:{}
    }
    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveB2BPartnerDetails', {
                // contact_person_name:this.state.contactPerson,
                // active:true,
                // address:this.state.address,
                // email_id:this.state.emailId,
                // mobile_number:this.state.mobileNo,
                // short_code:this.state.shortCode,
                // operation:'save'
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({data:response.data.data})
            }
            else{
                console.log("Error in saving data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    getValue=(data:any)=>{
        return data.value
    }

    getRow=(data:string)=>{
        return {label:data,value:data}
    }

    getLmsSchemes = async() =>{
        try {
            var response  = await sendRequest('/FetchSchemeFromLms', {},'GET')
            console.log(response)
            if (response.data.success){
                var schemes=[]
                for(var key in response.data.data){
                    schemes.push({label:response.data.data[key]['schemeDesc'],value:response.data.data[key]['schemeId']})
                }
                this.setState({
                    lmsSchemes:schemes
                })
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    setLmsScheme = (lms_scheme:any) =>{
        this.setState({
            lmsSchemeRow:lms_scheme,
            lmsScheme:lms_scheme.value
        })
    }

    getLmsProducts = async() =>{
        try {
            var response  = await sendRequest('/FetchProductFromLms', {},'GET')
            console.log(response)
            if (response.data.success){
                var products=[]
                for(var key in response.data.data){
                    products.push({label:response.data.data[key]['productDesc'],value:response.data.data[key]['productId']})
                }
                this.setState({
                    lmsProducts:products
                })
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    setLmsProduct = (lms_product:any) =>{
        this.setState({
            lmsProductRow:lms_product,
            lmsProduct:lms_product.value
        })
    }

    getData = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BJourneyConfig', {},'GET')
            console.log(response)
            if (response.data.success){
                var data =response.data.data[0]
                this.setState({
                    minAge:data['min_age'],
                    maxAge:data['max_age'],
                    lmsScheme:data['lms_scheme'],
                    lmsSchemeRow:this.getRow(data['lms_scheme']),
                    lmsProduct:data['lms_product'],
                    lmsProductRow:this.getRow(data['lms_product']),
                    kyc:data['kyc'],
                    kycRow:this.getRow(data['kyc']),
                    mandate:data['mandate'],
                    mandateRow:this.getRow(data['mandate']),
                    bureauToCall:data['bureau_to_call'],
                    bureauToCallRow:this.getRow(data['bureau_to_call']),
                    paymentGateway:data['payment_gateway'],
                    paymentGatewayRow:this.getRow(data['payment_gateway']),
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
        this.getData()
        this.getLmsSchemes()
        this.getLmsProducts()
    }

    render() {
        return (
            <AddPartnerWrapper>
                <Mystyle>
                    <Mystyle1>
                    <h1>Configure Partner Journey</h1>
                    </Mystyle1>
                </Mystyle>
                <Mystyle>
                    <Mystyle1>
                        <Label data={"LMS Scheme: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.lmsSchemeRow} onChange={this.setLmsScheme} options={this.state.lmsSchemes} placeholder={'Select LMS Scheme'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"LMS Product: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.lmsProductRow} onChange={this.setLmsProduct} options={this.state.lmsProducts} placeholder={'Select LMS Product'} />
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

export default ConfigurePartnerJourney;





