import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const Body = styled.div`
  padding: 0 2.2rem;
  display: flex;
  flex: 1;
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
      <Header />
      <Body>{props.children}</Body>
    </>
  )
}

export default Page
