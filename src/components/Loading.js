import React from 'react'
import styled from 'react-emotion'
import GridLoader from 'react-spinners/GridLoader'

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled(GridLoader)`
  filter: drop-shadow(0 0 5px #fff);
`

export default p => (
  <Wrapper>
    <Spinner size={50} color='#111' />
  </Wrapper>
)
