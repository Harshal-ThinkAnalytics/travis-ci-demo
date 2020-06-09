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
    location:any
}

class ConfigurePartnerJourney extends React.Component<Props> {
    data=this.props.location.state
    state = {
        id: this.data['partner_journey_id'],
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
        mrpVersionRow:{},
        ceApis:[],
        ceApisRow:[],
        dkycKey:'',
        dkycKeyError:false,
        mrpKey:'',
        mrpKeyError:false,
        ceKey:'',
        ceKeyError:false,
        redirect:false
    }

    kycOptions = [
        {label:'pre-eligibility',value:'pre-eligibility'},
        {label:'post-eligibility',value:'post-eligibility'}
    ]

    bureauOptions = [
        {label:'CIBIL',value:'CIBIL'},
        {label:'EXPERIAN',value:'EXPERIAN'}
    ]

    mandateOptions = [
        {label:'Razorpay',value:'Razorpay'},
        {label:'DIGIO',value:'DIGIO'}
    ]

    paymentGatewayOptions = [
        {label:'Paytm',value:'Paytm'},
        {label:'Mobikwik',value:'Mobikwik'}
    ]

    disbursalOptions = [
        {label:'Sanction + Drawdown',value:'Sanction + Drawdown'},
        {label:'LOS Upload',value:'LOS Upload'}
    ]

    dkycOptions = [
        {label:'1.0',value:'1.0'},
        {label:'2.0',value:'2.0'}
    ]

    mrpOptions = [
        {label:'1.0',value:'1.0'},
        {label:'2.0',value:'2.0'}
    ]

    ceApiOptions=[
        {label:'Pincode Serviceability',value:'Pincode Serviceability'},
        {label:'Age Check',value:'Age Check'},
        {label:'UNSCR',value:'UNSCR'},
        {label:'NSDL and Namematch',value:'NSDL and Namematch'},
        {label:'CCC',value:'CCC'},
        {label:'LMS Blacklist',value:'LMS Blacklist'},
        {label:'Softcell',value:'Softcell'},
        {label:'DS Digit Check',value:'DS Digital Check'},
        {label:'DS MBK',value:'DS MBK'}
    ]

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

    setKyc = (kyc:any) =>{
        this.setState({
            kycRow:kyc,
            kyc:kyc.value
        })
    }

    setBureau = (bureau:any) =>{
        this.setState({
            bureauToCallRow:bureau,
            bureauToCall:bureau.value
        })
    }

    setMandate = (mandate:any) =>{
        this.setState({
            mandateRow:mandate,
            mandate:mandate.value
        })
    }

    setPaymentGateway = (pg:any) =>{
        this.setState({
            paymentGatewayRow:pg,
            paymentGateway:pg.value
        })
    }

    setDisbursal = (disbursal:any) =>{
        this.setState({
            lmsDisbursalRow:disbursal,
            lmsDisbursal:disbursal.value
        })
    } 

    setDkyc = (dkyc:any) =>{
        this.setState({
            dkycVersionRow:dkyc,
            dkycVersion:dkyc.value
        })
    } 

    setMrp = (mrp:any) =>{
        this.setState({
            mrpVersionRow:mrp,
            mrpVersion:mrp.value
        })
    } 

    setCE = (ce:any) =>{
        console.log(ce)
        var row = []
        var apis = []
        for (var key in ce){
            row.push(ce[key])
            apis.push(ce[key]['value'])
        }
        this.setState({
            ceApisRow:row,
            ceApis:apis
        })
    } 

    getData = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BJourneyConfig', {
                partner_journey_id:Number(this.state.id)
            },'POST')
            console.log("data is",response)
            if (response.data.success){
                var data =response.data.data[0]
                console.log("data is",data)
                this.setCE(data['ce_apis'])
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
                    lmsDisbursal:data['lms_disbursal'],
                    lmsDisbursalRow:this.getRow(data['lms_disbursal']),
                    dkycVersion:data['dkyc_version'],
                    dkycVersionRow:this.getRow(data['dkyc_version']),
                    mrpVersion:data['mrp_version'],
                    mrpVersionRow:this.getRow(data['mrp_version']),
                    dkycKey:data['dkyc_x_api_key'],
                    mrpKey:data['mrp_x_api_key'],
                    ceKey:data['ce_x_api_key'],
                    
                })

            }
                
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    handleMinAgeChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            minAge: filteredValue
        });

    }

    validateMinAgeChange = () => {
        console.log("inside validateAgeChange")
        if (this.state.minAge.length <= 0) {
            this.setState({
                minAgeError: true
            });

        }
    }

    handleMaxAgeChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxAge: filteredValue
        });

    }

    validateMaxAgeChange = () => {
        console.log("inside validateAgeChange")
        if (this.state.maxAge.length <= 0) {
            this.setState({
                maxAgeError: true
            });

        }
    }

    handleDKYCKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            dkycKey: filteredValue
        });

    }

    validateDKYCKeyChange = () => {
        console.log("inside DKYCKEYChange")
        if (this.state.dkycKey.length < 5) {
            this.setState({
                dkycKeyError: true
            });

        }
    }

    handleMRPKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            mrpKey: filteredValue
        });

    }

    validateMRPKeyChange = () => {
        console.log("inside MRPKEYChange")
        if (this.state.mrpKey.length < 5) {
            this.setState({
                mrpKeyError: true
            });

        }
    }

    handleCEKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            ceKey: filteredValue
        });

    }

    validateCEKeyChange = () => {
        console.log("inside CEKEYChange")
        if (this.state.ceKey.length < 5) {
            this.setState({
                ceKeyError: true
            });

        }
    }

    async componentDidMount(){
        this.getData()
        this.getLmsSchemes()
        this.getLmsProducts()
    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/PartnerJourneyDetails'/>;
        }
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
                    <Label data={"Minimum Age"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleMinAgeChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            minAgeError: false
                        })}
                    onBlur={() => { this.validateMinAgeChange() }}
                    value={this.state.minAge}
                    type={this.state.minAgeError}
                />
                 <ErrorMessage show={this.state.minAgeError} className="error-message">
                    Please enter minimum age
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Maximum Age"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleMaxAgeChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            maxAgeError: false
                        })}
                    onBlur={() => { this.validateMaxAgeChange() }}
                    value={this.state.maxAge}
                    type={this.state.maxAgeError}
                />
                 <ErrorMessage show={this.state.maxAgeError} className="error-message">
                    Please enter maximum age
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>
                
                <Mystyle>
                    <Mystyle1>
                        <Label data={"KYC: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.kycRow} onChange={this.setKyc} options={this.kycOptions} placeholder={'Select KYC'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"Bureau: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.bureauToCallRow} onChange={this.setBureau} options={this.bureauOptions} placeholder={'Select Bureau'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"Mandate: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.mandateRow} onChange={this.setMandate} options={this.mandateOptions} placeholder={'Select Mandate'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"Payment Gateway: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.paymentGatewayRow} onChange={this.setPaymentGateway} options={this.paymentGatewayOptions} placeholder={'Select Payment Gateway'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"LMS Disbursal: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.lmsDisbursalRow} onChange={this.setDisbursal} options={this.disbursalOptions} placeholder={'Select LMS Disbursal'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"DKYC Version: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.dkycVersionRow} onChange={this.setDkyc} options={this.dkycOptions} placeholder={'Select DKYC Version'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"MRP Version: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown value={this.state.mrpVersionRow} onChange={this.setMrp} options={this.mrpOptions} placeholder={'Select MRP Version'} />
                    </Mystyle2>
                 </Mystyle>

                 <Mystyle>
                    <Mystyle1>
                        <Label data={"CE APIs: "} />
                    </Mystyle1>
                    <Mystyle2>
                        <Dropdown isMulti={true} value={this.state.ceApisRow} onChange={this.setCE} options={this.ceApiOptions} placeholder={'Select CE APIs'} />
                    </Mystyle2>
                 </Mystyle>
                
                 <Mystyle>
                    <Mystyle1>
                    <Label data={"DKYC X_API_KEY"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleDKYCKeyChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            dkycKeyError: false
                        })}
                    onBlur={() => { this.validateDKYCKeyChange() }}
                    value={this.state.dkycKey}
                    type={this.state.dkycKeyError}
                />
                <ErrorMessage show={this.state.dkycKeyError} className="error-message">
                    Please enter valid key
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>
                
                <Mystyle>
                    <Mystyle1>
                    <Label data={"MRP X_API_KEY"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleMRPKeyChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            mrpKeyError: false
                        })}
                    onBlur={() => { this.validateMRPKeyChange() }}
                    value={this.state.mrpKey}
                    type={this.state.mrpKeyError}
                />
                <ErrorMessage show={this.state.mrpKeyError} className="error-message">
                    Please enter valid key
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"CE X_API_KEY"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleCEKeyChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            ceKeyError: false
                        })}
                    onBlur={() => { this.validateCEKeyChange() }}
                    value={this.state.ceKey}
                    type={this.state.ceKeyError}
                />
                <ErrorMessage show={this.state.ceKeyError} className="error-message">
                    Please enter valid key
                 </ErrorMessage>
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





