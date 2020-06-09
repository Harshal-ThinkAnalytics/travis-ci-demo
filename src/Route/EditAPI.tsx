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
  margin-left: 120px;
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

flex:1 30%;
padding: 1px;
order:2;
`


interface Props{
    location:any
}

class EditAPI extends React.Component<Props> {
    data=this.props.location.state
    state = {
        scopeNo:this.data.scope_no,
        scopeNoError:false,
        apiName: this.data.api_name,
        apiNameError: false,
        version: this.data.version,
        versionError: false,
        redirect:false

    }

    saveData = async() =>{
        try {

            var response  = await sendRequest('/SaveAPI', {
                scope_no:this.state.scopeNo,
                api_name:this.state.apiName,
                active:true,
                version:this.state.version,
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
          }
    }

    handleScopeNo = (value: string) => {
        
        this.setState({
            scopeNoError:false,
            scopeNo: this.data.scope_no
        });
    }

    validateScopeNo = () => {
        if (
            !/^\w+(([\d\w]?)*[_]?)*$/.test(this.state.scopeNo)
        )
            this.setState({
                scopeNoError: true
            });

    }
    handleApiName = (value: string) => {
        const filteredValue = value.replace(/[^a-zA-Z-\{\}\/0-9]/g, '')
        this.setState({
            apiNameError:false,
            apiName: filteredValue
        });
    }

    validateApiName = () => {
        if (
            this.state.apiName.length <= 0 ||
            !/^^\/(\w*[-\/\{\}]?\w*)+(\w|\})$/.test(this.state.apiName)
        )
            this.setState({
                apiNameError: true
            });

    }

    handleVersion = (value:string) => {
        const filteredValue = value.replace(/[^0-9.]/g, '')
        this.setState({
            versionError: false,
            version: filteredValue
        });
    }


    validateVersion = () => {
        if (
            this.state.version.length <= 0 ||
            !/^\d+([.]?\d)*$/.test(this.state.version)
        )
            this.setState({
                versionError: true
            });

    }

    
    render() {
        if(this.state.redirect){
            return <Redirect to='/APIDetails'/>;
        }
        console.log(this.data)
        return (
            <StyledAddPartner>
                <Mystyle>
                    <Mystyle1>
                    <h1>Edit API</h1>
                    </Mystyle1>
                </Mystyle>
                
                <Mystyle>
                    <Mystyle1>
                    <Label data={"Scope No"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleScopeNo(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            scopeNoError: false
                        })}
                    onBlur={() => { this.validateScopeNo() }}
                    value={this.state.scopeNo}
                    type={this.state.scopeNoError}/>
                    
                
                    </Mystyle2>
                </Mystyle>
                
                <Mystyle>
                    <Mystyle1>
                    <Label data={"API Name"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleApiName(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            apiNameError: false
                        })}
                    onBlur={() => { this.validateApiName() }}
                    value={this.state.apiName}
                    type={this.state.apiNameError}/>
                    <ErrorMessage show={this.state.apiNameError} className="error-message">
                    Please enter api name
                 </ErrorMessage>
                
                    </Mystyle2>
                </Mystyle>

                <Mystyle>
                    <Mystyle1>
                    <Label data={"Version"} />
                    </Mystyle1>
                    <Mystyle2>
                    <Input
                    onChange={e => this.handleVersion(e.target.value)}
                    onFocus={() =>
                        this.setState({
                            versionError: false
                        })}
                    onBlur={() => { this.validateVersion() }}
                    value={this.state.version}
                    type={this.state.versionError}/>
                    <ErrorMessage show={this.state.versionError} className="error-message">
                    Please enter version
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

            </StyledAddPartner >
        )
    }
};

export default EditAPI