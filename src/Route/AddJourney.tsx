import * as React from "react";
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import Dropdown from '../Components/Dropdown'
import { Redirect } from "react-router-dom";


const StyledAddPartner = styled.div`
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


class AddJourney extends React.Component {

    state = {
        journeyId: '',
        journeyIdError: false,
        journeyName: '',
        journeyNameError: false,
        minLoanAmount: '',
        minLoanAmountError: false,
        maxLoanAmount: '',
        maxLoanAmountError: false,
        minTenure: '',
        minTenureError: false,
        maxTenure: '',
        maxTenureError: false,
        productIdRow:{},
        productId:'',
        productIdError:true,
        productIds:[],
        redirect:false,
        isValidScreen: false,
        startCheck: new Set()

    }
    setProductId = (product_id:any) =>{
        console.log(product_id)
        this.setState({
            productIdRow:product_id,
            productId:product_id.value,
            productIdError:false,
            isValidScreen: (!this.state.journeyNameError &&
                !this.state.maxLoanAmountError && !this.state.minLoanAmountError &&
                !this.state.minTenureError && !this.state.maxTenureError &&
                (this.state.startCheck.size==5))
        })
        
    }
    saveData = async() =>{
        try {

            var checkInfo= await sendRequest('/ValidateJourneyInfo', {
                min_loan_amount:this.state.minLoanAmount,
                max_loan_amount:this.state.maxLoanAmount,
                min_tenure:this.state.minTenure,
                max_tenure:this.state.maxTenure,
                product_id:Number(this.state.productId),
            },'POST')
            console.log(checkInfo)
            if (checkInfo.data.success) {
                var response  = await sendRequest('/SaveB2BJourneyDetails', {
                    journey_name:this.state.journeyName,
                    active:true,
                    min_loan_amount:this.state.minLoanAmount,
                    max_loan_amount:this.state.maxLoanAmount,
                    min_tenure:this.state.minTenure,
                    max_tenure:this.state.maxTenure,
                    product_id:Number(this.state.productId),
                    operation:'save'
                },'POST')
                console.log(response)
                if (response.data.success){
                    this.setState({redirect:true})
                }
                else{
                    console.log("Error in saving data.")
                }
              } else {
                  this.setState({
                    maxLoanAmountError:checkInfo.data.data.maxLoanAmountError,
                    minLoanAmountError:checkInfo.data.data.minLoanAmountError,
                    maxTenureError:checkInfo.data.data.maxTenureError,
                    minTenureError:checkInfo.data.data.minTenureError
                  })
              }

            } catch (error) {
                console.log(error)
              }
            
    }
    getProductIds = async() =>{
        try {
            var response  = await sendRequest('/FetchActiveProductDetails', {},'GET')
            console.log(response)
            if (response.data.success){
                var ids=[]
                for(var key in response.data.data){
                    ids.push({label:response.data.data[key]['product_name'],value:response.data.data[key]['product_id']})
                }
                console.log(ids)
                this.setState({
                    productIds:ids,
                    
                })
            }
            else{
                console.log("Error in fetching data.")
            }
          } catch (error) {
            console.log(error)
          }
    }

    handleIdChange = (value: string) => {
        const Id = value.replace(/\D+/g, '')
        this.setState({
            journeyId: Id,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("1")
        });

    }
    validateId = () => {
        console.log("inside validateID")
        if (this.state.journeyId.length < 1) {
            this.setState({
                journeyIdError: true
            });

        } else {
            this.setState({
                journeyIdError: false
            });
            this.setState({
                isValidScreen: (!this.state.productIdError&&!this.state.journeyNameError &&
                    !this.state.maxLoanAmountError && !this.state.minLoanAmountError &&
                    !this.state.minTenureError && !this.state.maxTenureError &&
                    (this.state.startCheck.size==5))
            });
        }
    }

    handlejourneyNameChange = (value: string) => {

        const filteredValue = value.replace(/[^a-z^A-Z^0-9^\s ]/g, '')
        
        this.setState({
            journeyName: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("2")
        });

    }

    validatejourneyNameChange = () => {
        console.log("inside validatejourneyNameChange")
        if (this.state.journeyName.length < 3) {
            this.setState({
                journeyNameError: true
            });

        } else {
            this.setState({
                journeyNameError: false
            });
            this.setState({
                isValidScreen: (!this.state.productIdError && !this.state.journeyNameError &&
                    !this.state.maxLoanAmountError && !this.state.minLoanAmountError &&
                    !this.state.minTenureError && !this.state.maxTenureError &&
                    (this.state.startCheck.size==5))
            });
        }
    }

    handleMinLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/[^0-9]/g, '')
        
        this.setState({
            minLoanAmount: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("3")
        });

    }

    validateLoanAmountChange = () => {
        console.log("inside validate MinTenureChange")
        if ((Number(this.state.minLoanAmount) > Number(this.state.maxLoanAmount)) || 
        (this.state.minLoanAmount.length < 2 && this.state.maxLoanAmount.length < 2) ) {
            this.setState({
                maxLoanAmountError: true,
                minLoanAmountError:true
            });
        } else {
            
                if (this.state.minLoanAmount.length < 2) {
                    this.setState({
                        minLoanAmountError: true,
                        maxLoanAmountError:false
                    });
        
                } else if (this.state.maxLoanAmount.length < 2) {
                    this.setState({
                        minLoanAmountError: false,
                        maxLoanAmountError:true
                    });
                } else {
                    this.setState({
                        minLoanAmountError: false,
                        maxLoanAmountError:false
                    },()=>{
                        this.setState({
                            isValidScreen: (!this.state.productIdError && !this.state.journeyNameError &&
                                !this.state.maxLoanAmountError && !this.state.minLoanAmountError &&
                                !this.state.minTenureError && !this.state.maxTenureError &&
                                (this.state.startCheck.size==5))
                        });
                    });
                    
                }
        }
    }

    
    handleMaxLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/[^0-9]/g, '')
        
        this.setState({
            maxLoanAmount: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("4")
        });

    }

    

    handleMinTenureChange = (value: string) => {
        const filteredValue = value.replace(/[^0-9]/g, '')
        this.setState({
            minTenure: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("5")
        });

    }

    validateTenureChange = () => {
        console.log("inside validate MinTenureChange")
        if ((Number(this.state.minTenure) > Number(this.state.maxTenure)) || 
        (this.state.minTenure.length < 2 && this.state.maxTenure.length < 2) ) {
            this.setState({
                maxTenureError: true,
                minTenureError:true
            });
        } else {
            
                if (this.state.minTenure.length < 2) {
                    this.setState({
                        minTenureError: true,
                        maxTenureError:false
                    });
        
                } else if (this.state.maxTenure.length < 2) {
                    this.setState({
                        minTenureError: false,
                        maxTenureError:true
                    });
                } else {
                    this.setState({
                        minTenureError: false,
                        maxTenureError:false
                    },()=>{
                        this.setState({
                            isValidScreen: (!this.state.productIdError && !this.state.journeyNameError &&
                                !this.state.maxLoanAmountError && !this.state.minLoanAmountError &&
                                !this.state.minTenureError && !this.state.maxTenureError &&
                                (this.state.startCheck.size==5))
                        });
                    });
                    
                }
        }
    }

    handleMaxTenureChange = (value: string) => {
        const filteredValue = value.replace(/[^0-9]/g, '')
        this.setState({
            maxTenure: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("6")
        });

    }

    
    async componentDidMount(){
        this.getProductIds()
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/JourneyDetails'/>;
        }
        console.log("product id is",this.state.productId)
        return (
            <StyledAddPartner>
            <Mystyle>
            <Mystyle1>
                <h1>Add Journey</h1>
            </Mystyle1>
            </Mystyle>
            
            
            <Mystyle>
            <Mystyle1>
            <Label data={"Journey Name"} />
            </Mystyle1>
            <Mystyle2>
            <Input
                onChange={e => this.handlejourneyNameChange(e.target.value)}
                onFocus={() =>
                    this.setState({
                        journeyNameError: false
                    })}
                onBlur={() => { this.validatejourneyNameChange() }}
                value={this.state.journeyName}
                cltype={this.state.journeyNameError}
            />
            <ErrorMessage show={this.state.journeyNameError} className="error-message">
                Enter valid journey name
             </ErrorMessage>
             </Mystyle2>
            </Mystyle>
            
             
            <Mystyle>
                <Mystyle1>
                <Label data={"Minimum Loan Amount "} />
                </Mystyle1>
                <Mystyle2>
                <Input
                onChange={e => this.handleMinLoanAmountChange(e.target.value)}
                onFocus={() =>
                    this.setState({
                        minLoanAmountError: false
                    })}
                onBlur={() => { this.validateLoanAmountChange() }}
                value={this.state.minLoanAmount}
                cltype={this.state.minLoanAmountError}
            />
            <ErrorMessage show={this.state.minLoanAmountError} className="error-message">
                Enter valid minimum loan amount
             </ErrorMessage>
                </Mystyle2>
            
            </Mystyle>
             
            <Mystyle>
                <Mystyle1>
                <Label data={"Maximum Loan Amount"} />
                </Mystyle1>
            
                <Mystyle2>
                <Input
                onChange={e => this.handleMaxLoanAmountChange(e.target.value)}
                onFocus={() =>
                    this.setState({
                        maxLoanAmountError: false
                    })}
                onBlur={() => { this.validateLoanAmountChange() }}
                value={this.state.maxLoanAmount}
                cltype={this.state.maxLoanAmountError}
                />
                <ErrorMessage show={this.state.maxLoanAmountError} className="error-message">
                Enter valid maximum loan amount
                </ErrorMessage>
                </Mystyle2>
            </Mystyle>
            
            <Mystyle>
                <Mystyle1>
                <Label data={"Minimum Tenure"} />
                </Mystyle1>
                <Mystyle2>
                <Input
                onChange={e => this.handleMinTenureChange(e.target.value)}
                onFocus={() =>
                    this.setState({
                        minTenureError: false
                    })}
                onBlur={() => { this.validateTenureChange() }}
                value={this.state.minTenure}
                cltype={this.state.minTenureError}
                />
                <ErrorMessage show={this.state.minTenureError} className="error-message">
                Enter valid minimum tenure
                </ErrorMessage>
                </Mystyle2>
            </Mystyle>
            
            <Mystyle>
                <Mystyle1>
                <Label data={"Maximum Tenure"} />
                </Mystyle1>
                <Mystyle2>
                <Input
                
                onChange={e => this.handleMaxTenureChange(e.target.value)}
                onFocus={() =>
                    this.setState({
                        maxTenureError: false
                    })}
                onBlur={() => { this.validateTenureChange() }}
                value={this.state.maxTenure}
                cltype={this.state.maxTenureError}
            />
             <ErrorMessage show={this.state.maxTenureError} className="error-message">
                Enter Valid maximum tenure
             </ErrorMessage>
                </Mystyle2>
            </Mystyle>
            

            <Mystyle>
                <Mystyle1>
                <Label data={"Product Id"} />
                </Mystyle1>
                <Mystyle2>
                <Dropdown value={this.state.productIdRow} onChange={this.setProductId} options={this.state.productIds} placeholder={'Select Product Id'} />
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
            

        </StyledAddPartner>
        )
    }
};

export default AddJourney