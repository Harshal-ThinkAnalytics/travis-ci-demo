import React from 'react'
import styled from 'styled-components'
import Sidebar from '../Route/Sidebar'
import Header from './Header'

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
interface Props{
    children:any
}
const Page: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div style={{position:"fixed", top:0,left:0,right:0,overflowX: "hidden",zIndex: 1030}}>
    <Header />
    </div>
      <Sidebar/>
      <Body>{props.children}</Body>
    </>
  )
}

export default Page
