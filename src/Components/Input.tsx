import * as React from "react";
import styled from 'styled-components'

interface Props {
    type: boolean;
}
const Input = styled.input<{type:any}>`
 display: block;
  padding: 2px;
  //width: 100%;
  font-size: 1.1rem;
  color:${Props =>
        Props.type ? '#c7222a' : '#000000'};
 background-color: white;
 border-radius: 5px;
 border: 1px solid ${Props =>
    Props.type ? '#c7222a' : '#d4ae69'};
    outline: none;
    &:focus {
        border: 1px solid
          ${Props =>
            Props.type ? '#c7222a' : '#d4ae69'};
      }
      &::placeholder {
    
        color: ${Props =>
            Props.type ? '#c7222a' : '#d4ae69'};
      }

      &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

`
export default Input

