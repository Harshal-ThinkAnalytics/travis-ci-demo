import * as React from "react";
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
import { Redirect } from "react-router-dom";
import { start } from "repl";

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


class AddProduct extends React.Component {

    state = {
        productId: '',
        productIdError: false,
        productName: '',
        productNameError: false,
        minLoanAmount: '',
        minLoanAmountError: false,
        maxLoanAmount: '',
        maxLoanAmountError: false,
        minTenure: '',
        minTenureError: false,
        maxTenure: '',
        maxTenureError: false,
        redirect:false,
        isValidScreen: false,
        startCheck: new Set()

    }
    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveB2BProductDetails', {
                product_name:this.state.productName,
                active:true,
                min_loan_amount:this.state.minLoanAmount,
                max_loan_amount:this.state.maxLoanAmount,
                min_tenure:this.state.minTenure,
                max_tenure:this.state.maxTenure,
                operation:'save'
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


    
    handleProductNameChange = (value: string) => {

        const filteredValue = value.replace(/[^a-z^A-Z^0-9^\s ]/g,'')
        this.setState({
            productName: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("2")
        });

    }

    validateProductNameChange = () => {
        console.log("inside validateProductNameChange")
        if (this.state.productName.length < 3) {
            this.setState({
                productNameError: true
            });

        } else {
            this.setState({
                productNameError: false
            });
            this.setState({
                isValidScreen:(!this.state.productIdError && !this.state.productNameError 
                    && !this.state.maxTenureError && !this.state.minTenureError && 
                    !this.state.minLoanAmountError && !this.state.maxLoanAmountError &&
                    (this.state.startCheck.size==5)
                    )
            });
        }
    }


    validateLoanAmountChange = () => {
        console.log("inside validate LoanChange")
        if (this.state.startCheck.has("3") && (this.state.startCheck.has("4"))) {
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
                    },() => {
                        console.log(this.state.minTenureError,this.state.maxTenureError,this.state.minLoanAmountError,this.state.maxLoanAmountError);
                        this.setState({
                            isValidScreen: (!this.state.productNameError 
                                && !this.state.maxTenureError && !this.state.minTenureError && 
                                !this.state.minLoanAmountError && !this.state.maxLoanAmountError &&
                                (this.state.startCheck.size==5))
                        });
                    });
                    
                    
                }
        }
    } else {
        if (this.state.minLoanAmount.length < 2 && this.state.startCheck.has("3")) {
            this.setState({
                minLoanAmountError: true,
                
            });

        }
        if (this.state.maxLoanAmount.length < 2 && this.state.startCheck.has("4")) {
            this.setState({
                maxLoanAmountError: true
            });
        }
    }
    }


    validateTenureChange = () => {
        console.log("inside validate TenureChange")
        if (this.state.startCheck.has("5") && (this.state.startCheck.has("6"))) {
            if ((Number(this.state.minTenure) > Number(this.state.maxTenure)) ||
                (this.state.minTenure.length < 2 && this.state.maxTenure.length < 2)) {
                this.setState({
                    maxTenureError: true,
                    minTenureError: true
                });
            } else {
            
                if (this.state.minTenure.length < 2) {
                    this.setState({
                        minTenureError: true,
                        maxTenureError: false
                    });
        
                } else if (this.state.maxTenure.length < 2) {
                    this.setState({
                        minTenureError: false,
                        maxTenureError: true
                    });
                } else {
                    this.setState({
                        minTenureError: false,
                        maxTenureError: false,
                    });
                    this.setState({
                        minTenureError: false,
                        maxTenureError: false,
                    }, () => {
                        console.log(this.state.minTenureError, this.state.maxTenureError, this.state.minLoanAmountError, this.state.maxLoanAmountError)
                        this.setState({
                            isValidScreen: (!this.state.productNameError
                                && !this.state.maxTenureError && !this.state.minTenureError &&
                                !this.state.minLoanAmountError && !this.state.maxLoanAmountError &&
                                (this.state.startCheck.size == 5))
                        });

                    });
                    
                    
                }
            }
        } else {
            if (this.state.minTenure.length < 2 && this.state.startCheck.has("5")) {
                this.setState({
                    minTenureError: true                    
                });
    
            }
            if (this.state.maxTenure.length < 2 && this.state.startCheck.has("6")) {
                this.setState({
                    maxTenureError: true
                });
            }
        }
    }




    handleMinLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            minLoanAmount: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("3")
        });

    }

    

    handleMaxLoanAmountChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxLoanAmount: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("4")
        });

    }

    
    handleMinTenureChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            minTenure: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("5")
        });

    }

    
    handleMaxTenureChange = (value: string) => {
        const filteredValue = value.replace(/\D+/g, '')
        this.setState({
            maxTenure: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("6")
        });

    }

    
    render() {
        if(this.state.redirect){
            return <Redirect to='/ProductDetails'/>;
        }
        return (
            <StyledAddPartner>
                <Mystyle>
                    <Mystyle1>
                    <h1>Add Product</h1>
                    </Mystyle1>
                </Mystyle>
                

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Product Name"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleProductNameChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            productNameError: false
                        })}
                    onBlur={() => { this.validateProductNameChange() }}
                    value={this.state.productName}
                    cltype={this.state.productNameError}
                />
                <ErrorMessage show={this.state.productNameError} className="error-message">
                    Enter valid product name
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
                    Please enter maximum tenure
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
                
                

                
                

                
                

                
                

                
                

                


            </StyledAddPartner >
        )
    }
};

export default AddProduct