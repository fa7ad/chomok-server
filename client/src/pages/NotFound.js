import React from 'react'
import styled from 'react-emotion'

export const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Box = styled('div')`
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.4);
  padding: 20px;
  width: 50%;
  max-width: 480px;

  h1 {
    font-weight: 400;
  }
  h2 {
    font-weight: 400;
    text-transform: uppercase;
  }
`

export default p => (
  <Wrapper style={p.style}>
    <Box>
      <h1>404</h1>
      <h2>Page not found!</h2>
    </Box>
  </Wrapper>
)
