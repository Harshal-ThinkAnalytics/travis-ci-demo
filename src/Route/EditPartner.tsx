import * as React from "react";
import styled from "styled-components";
import Label from "../Components/Label";
import Input from "../Components/Input";
import Button from '../Components/Button'
import ErrorMessage from '../Components/ErrorMessage'
import sendRequest from "../utils/sendRequest";
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
  padding:5px;
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

class EditPartner extends React.Component<Props> {
    data=this.props.location.state
    state = {
        partnerId: this.data.partner_id,
        partnerIdError: false,
        partnerName:this.data.partner_name,
        partnerNameError:false,
        address: this.data.address,
        addressError: false,
        contactPerson: this.data.contact_person_name,
        contactPersonError: false,
        emailId: this.data.email_id,
        emailIdError: false,
        mobileNo: this.data.mobile_number,
        mobileNoError: false,
        shortCode: this.data.short_code,
        shortCodeError: false,
        redirect:false,
        isValidScreen: false,
        startCheck: new Set()

    }

    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveB2BPartnerDetails', {
                partner_id:Number(this.state.partnerId),
                contact_person_name:this.state.contactPerson,
                partner_name:this.state.partnerName,
                active:true,
                address:this.state.address,
                email_id:this.state.emailId,
                mobile_number:this.state.mobileNo,
                short_code:this.state.shortCode,
                operation:'update'
            },'POST')
            console.log(response)
            if (response.data.success){
                this.setState({
                    redirect:true
                })
            }
            else{
                console.log("Error in saving data.")
            }
          } catch (error) {
            console.log(error)
            this.setState({
                shortCodeError:true
            });
          }
    }


    handleIdChange = (value: string) => {
        const Id = value.replace(/\D+/g, '')
        this.setState({
            partnerId: this.data.partner_id
        });

    }
    validateId = () => {
        console.log("inside validateID")
        if (this.state.partnerId.length < 1) {
            this.setState({
                partnerIdError: true
            });

        } else {
            this.setState({
                partnerIdError: false
                
            });
            this.setState({
                
                isValidScreen: (!this.state.partnerNameError && !this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });
        }
    }

    handleNameChange = (value:string) => {

        const filteredValue = value.replace(/[^a-z^A-Z^\s]/g,'')
        this.setState({
            partnerName: filteredValue,
            isValidScreen:false,
            startCheck: this.state.startCheck.add("n")
        })

    }

    validateName = () => {
        console.log("inside validateAddressChange")
        if (this.state.partnerName.length < 3) {
            this.setState({
                partnerNameError: true,
                isValidScreen: false
                
            });

        } else {
            this.setState({
                partnerNameError: false
                
            });
            this.setState({
                
                isValidScreen: (!this.state.partnerNameError && !this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });
        }
    }


    handleAddressChange = (value: string) => {

        const filteredValue = value.replace(/[^.^-^/^@^#^,^;^a-z^A-Z^0-9^\s ]/g, '')
        this.setState({
            address: filteredValue,
            isValidScreen: false,
            startCheck: this.state.startCheck.add("1")
        });

    }

    validateAddressChange = () => {
        console.log("inside validateAddressChange")
        if (this.state.address.length < 5) {
            this.setState({
                addressError: true,
                isValidScreen: false
                
            });

        } else {
            this.setState({
                addressError: false
                
            });
            this.setState({
                
                isValidScreen: (!this.state.partnerNameError &&!this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });
        }
    }

    handleContactPersonChange = (value: string) => {
        const filteredValue = value.replace(/[^a-z^A-Z^\s]/g, '')
        this.setState({
            contactPerson: filteredValue,
            isValidScreen: false,
            startCheck: this.state.startCheck.add("2")
        });

    }

    validateContactPersonChange = () => {
        console.log("inside validateContactPersonChange")
        if (this.state.contactPerson.length < 2) {
            this.setState({
                contactPersonError: true,
                isValidScreen:false
            });

        } else {
            this.setState({
                contactPersonError: false
                
            });

            this.setState({
                
                isValidScreen: (!this.state.partnerNameError &&!this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError ) 
            });
        }
    }

    handleEmailChange = (value: string) => {
        const filteredValue = value.replace(/[^a-zA-Z_.@0-9]/g, '')
        this.setState({
            emailId: filteredValue,
            isValidScreen: false,
            startCheck: this.state.startCheck.add("3")
        });
    }


    validateEmail = () => {
        if (
            this.state.emailId.length <= 0 ||
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailId)
        ) {
            this.setState({
                emailIdError: true,
                isValidScreen: false
                
            });
        } else {
            this.setState({
                emailIdError: false
            });


            this.setState({
                
                isValidScreen: (!this.state.partnerNameError &&!this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });
        }
            


    }

    handleMobileChange = (value: string) => {
        if (value.length > 10) return
        const filteredMobile = value.replace(/[^0-9]/g, '')
        if (filteredMobile.length === 10) this.validateMobile(filteredMobile)
        this.setState({
            mobileNo: filteredMobile,
            isValidScreen: false,
            startCheck: this.state.startCheck.add("4")
        });

    }

    validateMobile = (value: string) => {
        if (!/^[6789]{1}[0-9]{9}$/.test(value || this.state.mobileNo)) {
            this.setState({
                mobileNoError: true,
                isValidScreen: false
            });
            
            // setMobileNoError(true)
        } else {
            this.setState({
                mobileNoError: false
                
            });
            this.setState({
                
                isValidScreen: (!this.state.partnerNameError &&!this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });

            // setMobileNoError(false)
        }
    }

    handleShortCodeChange = (value: string) => {
        const filteredValue = value.replace(/[^a-z^A-Z^\s]/g, '')
        this.setState({
            shortCode: filteredValue,
            isValidScreen: false,
            startCheck: this.state.startCheck.add("5")
        });
        // setShortCode(filteredValue)
    }
    validateShortCodeChange = () => {
        console.log("inside validateShortCodeChange")
        if (this.state.shortCode.length < 1) {
            this.setState({
                shortCodeError: true,
                isValidScreen: false
            });
            

        } else {
            this.setState({
                shortCodeError: false
                
            });

            this.setState({
                shortCodeError: false,
                isValidScreen: (!this.state.partnerNameError &&!this.state.shortCodeError && !this.state.addressError && !this.state.contactPersonError
                    && !this.state.emailIdError && !this.state.mobileNoError )
            });
        }
    }


    render() {
        if(this.state.redirect){
            return <Redirect to='/PartnerDetails'/>;
        }
        console.log(this.data)
        return (
            <StyledAddPartner>
                <Mystyle>
                    <Mystyle1>
                    <h1>Edit Partner</h1>
                    </Mystyle1>
                </Mystyle>
                
                
                
                <Mystyle>
                    <Mystyle1>
                    <Label data={"Partner Id"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleIdChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            partnerIdError: false
                        })}
                    onBlur={() => { this.validateId() }}
                    value={this.state.partnerId}
                    cltype={this.state.partnerIdError}
                />
                <ErrorMessage show={this.state.partnerIdError} className="error-message">
                    Please enter valid Id
          </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                <Mystyle1>
                    <Label data={"Partner Name"} />
                </Mystyle1>
                <Mystyle2>
                    <Input
                    onChange={e => this.handleNameChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            partnerNameError: false
                        })}
                    onBlur={() => { this.validateName() }}
                    value={this.state.partnerName}
                    cltype={this.state.partnerNameError}
                />
                <ErrorMessage show={this.state.partnerNameError} className="error-message">
                    Please enter valid Name
                </ErrorMessage>
                </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Address"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleAddressChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            addressError: false
                        })}
                    onBlur={() => { this.validateAddressChange() }}
                    value={this.state.address}
                    cltype={this.state.addressError}
                />
                <ErrorMessage show={this.state.addressError} className="error-message">
                    Please enter address
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Contact Person"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleContactPersonChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            contactPersonError: false
                        })}
                    onBlur={() => { this.validateContactPersonChange() }}
                    value={this.state.contactPerson}
                    cltype={this.state.contactPersonError}
                />
                <ErrorMessage show={this.state.contactPersonError} className="error-message">
                    Please enter name
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Email Id"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleEmailChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            emailIdError: false
                        })}
                    onBlur={() => { this.validateEmail() }}
                    value={this.state.emailId}
                    cltype={this.state.emailIdError}
                />
                <ErrorMessage show={this.state.emailIdError} className="error-message">
                    Please enter valid email id
                 </ErrorMessage>
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Mobile No"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleMobileChange(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            mobileNoError: false
                        })}
                    onBlur={() => { this.validateMobile(this.state.mobileNo) }}
                    
                    value={this.state.mobileNo}
                    cltype={this.state.mobileNoError}
                />
                 <ErrorMessage show={this.state.mobileNoError} className="error-message">
                    Please enter valid mobile number
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

export default EditPartner