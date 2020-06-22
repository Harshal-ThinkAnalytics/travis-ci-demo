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
        
        partnerIdError: false,
        data:[],
        minAge:'',
        minAgeError:false,
        maxAge:'',
        maxAgeError:false,
        lmsScheme:'',
        lmsSchemeRow:{},
        lmsSchemes:[],
        lmsSchemeError:true,
        lmsProduct:'',
        lmsProductRow:{},
        lmsProducts:[],
        lmsProductError:true,
        kyc:'',
        kycRow:{},
        kycError:true,
        bureauToCall:'',
        bureauToCallRow:{},
        bureauToCallError:true,
        mandate:'',
        mandateRow:{},
        mandateError:true,
        paymentGateway:'',
        paymentGatewayRow:{},
        paymentGatewayError:true,
        lmsDisbursal:'',
        lmsDisbursalRow:{},
        lmsDisbursalError:true,
        dkycVersion:'',
        dkycVersionRow:{},
        dkycVersionError:true,
        mrpVersion:'',
        mrpVersionRow:{},
        mrpVersionError:true,
        ceApis:[],
        ceApisRow:[],
        ceApisError:true,
        dkycKey:'',
        dkycKeyError:false,
        mrpKey:'',
        mrpKeyError:false,
        ceKey:'',
        ceKeyError:false,
        redirect:false,
        isValidScreen:false,
        startCheck: new Set()
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
            console.log(this.state.ceApis);
            var response = await sendRequest('/SaveB2BJourneyConfig', {
                "partner_journey_id":Number(this.data.partner_journey_id),
                "active" : true,
	            "bureau_to_call" : this.state.bureauToCall,
	            "kyc" : this.state.kyc,
	            "lms_product" : this.state.lmsProduct,
	            "lms_scheme" : this.state.lmsScheme,
	            "mandate" : this.state.mandate,
	            "max_age" : this.state.maxAge,
	            "min_age" : this.state.minAge,
                "payment_gateway": this.state.paymentGateway,
                "lms_disbursal":this.state.lmsDisbursal,
	            "dkyc_version":this.state.dkycVersion,
	            "mrp_version":this.state.mrpVersion,
	            "ce_api":this.state.ceApis,
	            "mrp_key":this.state.mrpKey,
	            "ce_key":this.state.ceKey,
	            "dkyc_key":this.state.dkycKey,
	            "operation" : "save"
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({
                    data: response.data.data,
                    redirect:true})
                
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
                    if(response.data.data[key]['schemeId']==this.state.lmsScheme){
                        this.setState({
                            lmsSchemeRow:{label:response.data.data[key]['schemeDesc'],value:response.data.data[key]['schemeId']}
                        })
                    }
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
            lmsSchemeRow: lms_scheme,
            lmsScheme: lms_scheme.value,
            lmsSchemeError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
            
        });
    }

    getLmsProducts = async() =>{
        try {
            var response  = await sendRequest('/FetchProductFromLms', {},'GET')
            console.log(response)
            if (response.data.success){
                var products=[]
                for(var key in response.data.data){
                    if(response.data.data[key]['productId']==this.state.lmsProduct){
                        this.setState({
                            lmsProductRow:{label:response.data.data[key]['productDesc'],value:response.data.data[key]['productId']}
                        })
                    }
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
            lmsProductRow: lms_product,
            lmsProduct: lms_product.value,
            lmsProductError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    }

    setKyc = (kyc:any) =>{
        this.setState({
            kycRow:kyc,
            kyc:kyc.value,
            kycError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    }

    setBureau = (bureau:any) =>{
        this.setState({
            bureauToCallRow:bureau,
            bureauToCall:bureau.value,
            bureauToCallError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    }

    setMandate = (mandate:any) =>{
        this.setState({
            mandateRow:mandate,
            mandate:mandate.value,
            mandateError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    }

    setPaymentGateway = (pg:any) =>{
        this.setState({
            paymentGatewayRow:pg,
            paymentGateway:pg.value,
            paymentGatewayError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    }

    setDisbursal = (disbursal:any) =>{
        this.setState({
            lmsDisbursalRow:disbursal,
            lmsDisbursal:disbursal.value,
            lmsDisbursalError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    } 

    setDkyc = (dkyc:any) =>{
        this.setState({
            dkycVersionRow:dkyc,
            dkycVersion:dkyc.value,
            dkycVersionError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.mrpVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    } 

    setMrp = (mrp:any) =>{
        this.setState({
            mrpVersionRow:mrp,
            mrpVersion:mrp.value,
            mrpVersionError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.ceApisError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    } 

    setCE = (ce:any,start?:boolean) =>{
        if (start==true){
            var cerows=[]
            for (var key in ce){
                cerows.push(this.getRow(ce[key]))
            }
            ce=cerows
        }
        var row = []
        var apis = []
        for (var key in ce){
            row.push(ce[key])
            apis.push(ce[key]['value'])
        }
        this.setState({
            ceApisRow:row,
            ceApis:apis,
            ceApisError: false
        }, () => {
                this.setState({
                    isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                        !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                        && !this.state.bureauToCallError && !this.state.mandateError &&
                        !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                        !this.state.dkycVersionError && !this.state.mrpVersionError
                        && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                        && (this.state.startCheck.size == 5)),
                });
        })
    } 

    getData = async() =>{
        try {
            console.log("id :",this.data.partner_journey_id)
            var response  = await sendRequest('/FetchB2BJourneyConfig', {
                partner_journey_id:Number(this.data.partner_journey_id)
            },'POST')
            console.log("data is",response)
            if (response.data.success){
                var data =response.data.data[0]
                console.log("data is",data)
                this.setCE(data.ce_api,true)
                this.setState({
                    minAge: data.min_age,
                    maxAge: data.max_age,
                    lmsScheme: data.lms_scheme,
                    lmsSchemeRow: this.getRow(data.lms_scheme),
                    lmsProduct: data.lms_product,
                    lmsProductRow: this.getRow(data.lms_product),
                    kyc: data.kyc,
                    kycRow: this.getRow(data.kyc),
                    mandate: data.mandate,
                    mandateRow: this.getRow(data.mandate),
                    bureauToCall: data.bureau_to_call,
                    bureauToCallRow: this.getRow(data.bureau_to_call),
                    paymentGateway: data.payment_gateway,
                    paymentGatewayRow: this.getRow(data.payment_gateway),
                    lmsDisbursal: data.lms_disbursal,
                    lmsDisbursalRow: this.getRow(data.lms_disbursal),
                    dkycVersion: data.dkyc_version,
                    dkycVersionRow: this.getRow(data.dkyc_version),
                    mrpVersion: data.mrp_version,
                    mrpVersionRow: this.getRow(data.mrp_version),
                    dkycKey: data.dkyc_key,
                    mrpKey: data.mrp_key,
                    ceKey: data.ce_key,
                    
                    
                });
                if (response.data.data.partner_journey_id != "") {
                    this.setState({
                        startCheck: this.state.startCheck.add("1").add("2").add("3").add("4").add("5"),
                        isValidScreen: false,
                        lmsSchemeError: false,
                        lmsProductError: false,
                        bureauToCallError: false,
                        kycError: false,
                        mandateError: false,
                        paymentGatewayError: false,
                        lmsDisbursalError: false,
                        dkycVersionError: false,
                        mrpVersionError: false,
                        ceApisError: false,
                        
                        
                    
                    });
                    
                } 

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
            minAge: filteredValue,
            isValidScreen:false,
            startCheck:this.state.startCheck.add("1")
        });

    }


    validateAgeChange = () => {
        console.log("inside validate TenureChange")
        if (this.state.startCheck.has("1") && (this.state.startCheck.has("2"))) {
            if ((Number(this.state.minAge) > Number(this.state.maxAge)) ||
                (Number(this.state.minAge) < 20 && Number(this.state.maxAge) < 25)) {
                this.setState({
                    maxAgeError: true,
                    minAgeError: true
                });
            } else {
            
                if (Number(this.state.minAge) < 20) {
                    this.setState({
                        minAgeError: true,
                        maxAgeError: false
                    });
        
                } else if (Number(this.state.maxAge) < 25) {
                    this.setState({
                        minAgeError: false,
                        maxAgeError: true
                    });
                } else {
                    this.setState({
                        minAgeError: false,
                        maxAgeError: false,
                    });
                    this.setState({
                        minAgeError: false,
                        maxAgeError: false,
                    }, () => {
                        console.log(this.state.minAgeError, this.state.maxAgeError)
                        this.setState({
                            isValidScreen: (!this.state.lmsSchemeError && !this.state.lmsProductError &&
                                !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                                && !this.state.bureauToCallError && !this.state.mandateError &&
                                !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                                !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError
                                && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError
                                && (this.state.startCheck.size == 5)),
                        });

                    });
                }
            }
        } else {
            if (Number(this.state.minAge) < 20 && this.state.startCheck.has("1")) {
                this.setState({
                    minAgeError: true
                });
    
            }
            if (Number(this.state.maxAge) < 25 && this.state.startCheck.has("2")) {
                this.setState({
                    maxAgeError: true
                });
            }
        }
    }
 
    

    handleMaxAgeChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxAge: filteredValue,
            isValidScreen:false,
            startCheck:this.state.startCheck.add("2")
        });

    }

    

    handleDKYCKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            dkycKey: filteredValue,
            isValidScreen:false,
            startCheck:this.state.startCheck.add("3")
        });

    }

    validateDKYCKeyChange = () => {
        console.log("inside DKYCKEYChange")
        if (this.state.dkycKey.length < 5) {
            this.setState({
                dkycKeyError: true
            });

        }else {
            this.setState({
                minAgeError:false,
            });

            this.setState({
                isValidScreen:(!this.state.lmsSchemeError && !this.state.lmsProductError && 
                    !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                     && !this.state.bureauToCallError && !this.state.mandateError &&
                     !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                    !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError 
                    && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError 
                    && (this.state.startCheck.size==5)),
            });
        }
    }

    handleMRPKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            mrpKey: filteredValue,
            isValidScreen:false,
            startCheck:this.state.startCheck.add("4")
        });

    }

    validateMRPKeyChange = () => {
        console.log("inside MRPKEYChange")
        if (this.state.mrpKey.length < 5) {
            this.setState({
                mrpKeyError: true
            });

        }else {
            this.setState({
                minAgeError:false,
            });

            this.setState({
                isValidScreen:(!this.state.lmsSchemeError && !this.state.lmsProductError && 
                    !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                     && !this.state.bureauToCallError && !this.state.mandateError &&
                     !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                    !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError 
                    && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError 
                    && (this.state.startCheck.size==5)),
            });
        }
    }

    handleCEKeyChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            ceKey: filteredValue,
            isValidScreen:false,
            startCheck:this.state.startCheck.add("5")
        });

    }

    validateCEKeyChange = () => {
        console.log("inside CEKEYChange")
        if (this.state.ceKey.length < 5) {
            this.setState({
                ceKeyError: true
            });

        }else {
            this.setState({
                minAgeError:false,
            });

            this.setState({
                isValidScreen:(!this.state.lmsSchemeError && !this.state.lmsProductError && 
                    !this.state.minAgeError && !this.state.maxAgeError && !this.state.kycError
                     && !this.state.bureauToCallError && !this.state.mandateError &&
                     !this.state.paymentGatewayError && !this.state.lmsDisbursalError &&
                    !this.state.dkycVersionError && !this.state.mrpVersionError && !this.state.ceApisError 
                    && !this.state.dkycKeyError && !this.state.mrpKeyError && !this.state.ceKeyError 
                    && (this.state.startCheck.size==5)),
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
                    onBlur={() => { this.validateAgeChange() }}
                    value={this.state.minAge}
                    cltype={this.state.minAgeError}
                />
                 <ErrorMessage show={this.state.minAgeError} className="error-message">
                    Enter valid minimum age
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
                    onBlur={() => { this.validateAgeChange() }}
                    value={this.state.maxAge}
                    cltype={this.state.maxAgeError}
                />
                 <ErrorMessage show={this.state.maxAgeError} className="error-message">
                    Enter valid maximum age
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
                    cltype={this.state.dkycKeyError}
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
                    cltype={this.state.mrpKeyError}
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
                    cltype={this.state.ceKeyError}
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
                    disabled={!this.state.isValidScreen}
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





