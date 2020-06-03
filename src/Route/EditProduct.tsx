import * as React from "react";
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";

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

interface Props{
    location:any
}



class EditProduct extends React.Component<Props> {
    data=this.props.location.state
    state = {
        productId: this.data.product_id,
        productIdError: false,
        productName: this.data.product_name,
        productNameError: false,
        minLoanAmount: this.data.min_loan_amount,
        minLoanAmountError: false,
        maxLoanAmount: this.data.max_loan_amount,
        maxLoanAmountError: false,
        minTenure: this.data.min_tenure,
        minTenureError: false,
        maxTenure: this.data.max_tenure,
        maxTenureError: false,

    }
    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveB2BProductDetails', {
                product_id:Number(this.state.productId),
                product_name:this.state.productName,
                active:true,
                min_loan_amount:this.state.minLoanAmount,
                max_loan_amount:this.state.maxLoanAmount,
                min_tenure:this.state.minTenure,
                max_tenure:this.state.maxTenure,
                operation:'update'
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


    handleIdChange = (value: string) => {
        const Id = value.replace(/\D+/g, '')
        this.setState({
            productId: Id
        });

    }
    validateId = () => {
        console.log("inside validateID")
        if (this.state.productId.length <= 1) {
            this.setState({
                productIdError: true
            });

        }
    }

    handleProductNameChange = (value: string) => {

        const filteredValue = value.replace(/[^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            productName: filteredValue
        });

    }

    validateProductNameChange = () => {
        console.log("inside validateProductNameChange")
        if (this.state.productName.length < 3) {
            this.setState({
                productNameError: true
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
    render() {
        return (
            <StyledAddPartner>
                <h1>Edit Product</h1>

                <Label data={"Product Id: "} />
                <Input
                    onChange={e => this.handleIdChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            productIdError: false
                        })}
                    onBlur={() => { this.validateId() }}
                    value={this.state.productId}
                    type={this.state.productIdError}
                />
                <ErrorMessage show={this.state.productIdError} className="error-message">
                    Please enter valid Id
          </ErrorMessage>

                <Label data={"Product Name: "} />
                <Input
                    onChange={e => this.handleProductNameChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            productNameError: false
                        })}
                    onBlur={() => { this.validateProductNameChange() }}
                    value={this.state.productName}
                    type={this.state.productNameError}
                />
                <ErrorMessage show={this.state.productNameError} className="error-message">
                    Please enter product name
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

export default EditProduct