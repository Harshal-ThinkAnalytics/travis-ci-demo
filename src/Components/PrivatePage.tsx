import React from 'react'
import styled from 'styled-components'

import { Route, Redirect } from  "react-router-dom";
import App from '../App'
import Cookies from 'universal-cookie';


const Body = styled.div`
  padding: 0 2.2rem;
  display: flex;
  flex: 1;
  margin-top:7.8rem;
  background-color: white;
  position: relative;
  overflow-x:hidden;
  flex-direction: column;
  @media screen and (min-width: 760px) {
    align-items: center;
    justify-content: flex-start;
  }
`
const cookies = new Cookies();

const  PrivateRoute: React.FC<{
        component: any;
        path: string;
    }> = (props) => {

    const token =cookies.get('token')

    return  token ? (<Route  path={props.path}  exact={true} component={props.component} />) : 
        (<Redirect  to="/Login"  />);
};
export  default  PrivateRoute;


