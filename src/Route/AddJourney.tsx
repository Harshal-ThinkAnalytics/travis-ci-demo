import * as React from "react";
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import Dropdown from '../Components/Dropdown'


const StyledAddPartner = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
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
        productIdError:false,
        productIds:[]

    }
    setProductId = (product_id:any) =>{
        console.log(product_id)
        this.setState({
            productIdRow:product_id,
            productId:product_id.value
        })
    }
    saveData = async() =>{
        try {

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
                this.setState({data:response.data.data})
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
                    ids.push({label:response.data.data[key]['product_name'],value:response.data.data[key]['product_id']})
                }
                console.log(ids)
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
            journeyId: Id
        });

    }
    validateId = () => {
        console.log("inside validateID")
        if (this.state.journeyId.length <= 1) {
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
        console.log("product id is",this.state.productId)
        return (
            <StyledAddPartner>
                <h1>Add Journey</h1>
                <Label data={"Journey Name: "} />
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

                <Label data={"Minimum Loan Amount: "} />
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

                <Label data={"Maximum Loan Amount: "} />
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

                <Label data={"Minimum Tenure: "} />
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
                <Label data={"Maximum Tenure: "} />
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
                 <Label data={"Product Id: "} />
                 <Dropdown value={this.state.productIdRow} onChange={this.setProductId} options={this.state.productIds} placeholder={'Select Product Id'} />
                 

                <Button
                    type={''}
                    // disabled={false}
                    onClick={() => this.saveData()}
                >
                    Save
                </Button>


            </StyledAddPartner >
        )
    }
};

export default AddJourney