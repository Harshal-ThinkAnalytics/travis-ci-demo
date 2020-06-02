import styled from 'styled-components'

const Heading = styled.div`
  h1,
  h2 {
    font-size: 1.8rem;
    color: var(--color-mango);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.6rem;
    color: var(--color-footergray);
  }

  @media screen and (min-width: 760px) {
    text-align: center;
  }
`

export default Heading
