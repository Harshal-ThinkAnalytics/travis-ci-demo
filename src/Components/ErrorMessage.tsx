import * as React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p<{show:any}>`
  font-size: 13px;
  color: #c7222a;
  opacity: ${Props => (Props.show ? '1' : '0')};
`

export default ErrorMessage
