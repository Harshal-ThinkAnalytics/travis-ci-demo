import * as React from "react";
import styled from "styled-components";

const Button = styled.button<{type: any,disabled?:boolean}>`
  all: unset;
  font-size: 1.6rem;
  
  width: 5rem;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #d4ae69;
  border-radius: 5px;
  text-align: center;
  color: white;
  
  border: 1px solid #d4ae69;
  cursor: pointer;
  ${Props =>
    Props.type === 'bordered' ?  `
    background-color: white;
    border: 1px solid #d4ae69;
    color: #d4ae69;
    box-shadow: 0 2px 4px 0 rgba(212,174,105,0.12);
  ` : ''};

 

  ${Props =>
    Props.disabled  ?  `
   
    background-color: #f2f3f6;
    color: #cdcece;
    border: 1px solid #f2f3f6;
  `
      : ''}

`

export default Button
