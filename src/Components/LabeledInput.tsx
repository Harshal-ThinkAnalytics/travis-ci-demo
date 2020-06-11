import * as React from "react";
import styled from 'styled-components'
import Label from './Label'
import Input from './Input'

const LabeledInputWrapper = styled.div`
display: inline;
    
Label{
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 18px;
    color: #333;
    // height: 20px;
    margin-bottom:2px;
    margin-top: 2px;
     margin-right: 2px;
    text-align: left;
    clear: left;
   // float:left;
   
}
Input{
  text-align: left;
  clear: right;
  float:left;
}

`
interface Props {
   
    label: string;
    error: string;
}

export default class LabeledInput extends React.Component<Props>{
    render() {
        return (
            <LabeledInputWrapper>
                <Label data={this.props.label}/>
                <Input cltype={this.props.error}/>
            </LabeledInputWrapper>

        )
    }
    }
