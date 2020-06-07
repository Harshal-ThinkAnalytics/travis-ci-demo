import * as React from "react";
import styled from "styled-components";


// import styled from 'styled-components'
interface Props {
    data: string;
}
const StyledLabel = styled.label`
  label {
    font-size: 1.2rem;
    color: var(--color-footergray);
    display: block;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0rem;
`


export default class Label extends React.Component<Props>{
    render() {
        return (
            <StyledLabel>

                    <label>{this.props.data}</label>
                    {/* <Button >click me</Button> */}
                
            </StyledLabel>
        )
    }
}