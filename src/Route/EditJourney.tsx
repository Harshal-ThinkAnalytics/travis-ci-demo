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

interface Props{
    location:any
}


class EditJourney extends React.Component<Props> {
    data=this.props.location.state
    state = {
        journeyId: this.data.journey_id,
        journeyIdError: false,
        journeyName: this.data.journey_name,
        journeyNameError: false,
        minLoanAmount: this.data.min_loan_amount,
        minLoanAmountError: false,
        maxLoanAmount: this.data.max_loan_amount,
        maxLoanAmountError: false,
        minTenure: this.data.min_tenure,
        minTenureError: false,
        maxTenure: this.data.max_tenure,
        maxTenureError: false,
        productId:this.data.product_id,
        productIdError:false,
        productIdRow:{},
        productIds:[],
        redirect:false

    }
    setProductId = (product_id:any) =>{
        this.setState({
            productIdRow:product_id,
            productId:product_id.value
        })
    }
    saveData = async() =>{
        try {
            var response  = await sendRequest('/SaveB2BJourneyDetails', {
                journey_id:Number(this.state.journeyId),
                journey_name:this.state.journeyName,
                active:true,
                min_loan_amount:this.state.minLoanAmount,
                max_loan_amount:this.state.maxLoanAmount,
                min_tenure:this.state.minTenure,
                max_tenure:this.state.maxTenure,
                product_id:Number(this.state.productId),
                operation:'update'
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({redirect:true})
            }
            else{
                console.log("Error in saving data.")
            }
          } catch (error) {
            console.log(error)
          }
    }
    getProductIds = async() =>{
        try {
            var response  = await sendRequest('/FetchB2BProductDetails', {},'GET')
            console.log(response)
            if (response.data.success){
                var ids=[]
                for(var key in response.data.data){
                    if (response.data.data[key]['product_id']==this.state.productId){
                        this.setState({
                            productIdRow:{label:response.data.data[key]['product_name'],value:response.data.data[key]['product_id']}
                        })
                        console.log("-=-=-=-",this.state.productIdRow)
                    }
                    ids.push({label:response.data.data[key]['product_name'],value:response.data.data[key]['product_id']})
                }
                this.setState({
                    productIds:ids
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
            journeyId: this.data.journey_id
        });

    }
    validateId = () => {
        console.log("inside validateID")
        if (this.state.journeyId.length < 1) {
            this.setState({
                journeyIdError: true
            });

        }
    }

    handlejourneyNameChange = (value: string) => {

        const filteredValue = value.replace(/[^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            journeyName: filteredValue
        });

    }

    validatejourneyNameChange = () => {
        console.log("inside validatejourneyNameChange")
        if (this.state.journeyName.length < 3) {
            this.setState({
                journeyNameError: true
            });

        }
    }

    handleMinLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            minLoanAmount: filteredValue
        });

    }

    validateMinLoanAmountChange = () => {
        console.log("inside validateMinLoanAmountChange")
        if (this.state.minLoanAmount.length < 2) {
            this.setState({
                minLoanAmountError: true
            });

        }
    }

    handleMaxLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxLoanAmount: filteredValue
        });

    }

    validateMaxLoanAmountChange = () => {
        console.log("inside validateMaxLoanAmountChange")
        if (this.state.maxLoanAmount.length < 2) {
            this.setState({
                maxLoanAmountError: true
            });

        }
    }

    handleMinTenureChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            minTenure: filteredValue
        });

    }

    validateMinTenureChange = () => {
        console.log("inside validateTenureChange")
        if (this.state.minTenure.length < 2) {
            this.setState({
                minTenureError: true
            });

        }
    }

    handleMaxTenureChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxTenure: filteredValue
        });

    }

    validateMaxTenureChange = () => {
        console.log("inside validateTenureChange")
        if (this.state.maxTenure.length < 2) {
            this.setState({
                maxTenureError: true
            });

        }
    }
    async componentDidMount(){
        this.getProductIds()
    }
    render() {
        console.log(this.data)
        if(this.state.redirect){
            return <Redirect to='/JourneyDetails'/>;
        }
        return (
            <StyledAddPartner>
                <Mystyle>
                    <Mystyle1>
                    <h1>Edit Journey</h1>
                    </Mystyle1>        
                </Mystyle>
                

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Journey Id"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleIdChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            journeyIdError: false
                        })}
                    onBlur={() => { this.validateId() }}
                    value={this.state.journeyId}
                    type={this.state.journeyIdError}
                />
                <ErrorMessage show={this.state.journeyIdError} className="error-message">
                    Please enter valid Id
          </ErrorMessage>
                    </Mystyle2>
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
                    type={this.state.journeyNameError}
                />
                <ErrorMessage show={this.state.journeyNameError} className="error-message">
                    Please enter journey name
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Minimum Loan Amount"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleMinLoanAmountChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            minLoanAmountError: false
                        })}
                    onBlur={() => { this.validateMinLoanAmountChange() }}
                    value={this.state.minLoanAmount}
                    type={this.state.minLoanAmountError}
                />
                <ErrorMessage show={this.state.minLoanAmountError} className="error-message">
                    Please enter minimum loan amount
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
                    onBlur={() => { this.validateMaxLoanAmountChange() }}
                    value={this.state.maxLoanAmount}
                    type={this.state.maxLoanAmountError}
                />
                <ErrorMessage show={this.state.maxLoanAmountError} className="error-message">
                    Please enter maximum loan amount
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
                    onBlur={() => { this.validateMinTenureChange() }}
                    value={this.state.minTenure}
                    type={this.state.minTenureError}
                />
                 <ErrorMessage show={this.state.minTenureError} className="error-message">
                    Please enter minimum tenure
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
                    onBlur={() => { this.validateMaxTenureChange() }}
                    value={this.state.maxTenure}
                    type={this.state.maxTenureError}
                />
                 <ErrorMessage show={this.state.maxTenureError} className="error-message">
                    Please enter maximum tenure
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
                    // disabled={false}
                    onClick={() => this.saveData()}
                >
                    Save
                </Button>
                </Mystyle2>
                </Mystyle> 
                

            </StyledAddPartner >
        )
    }
};

export default EditJourney