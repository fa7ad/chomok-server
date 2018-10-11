import styled from 'react-emotion'
import { Link } from '@reach/router'

export const Heading = styled('h1')`
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 900;
  font-size: 4em;
  color: #fefefe;
  text-transform: uppercase;
`

export const Button = styled(Link)`
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  padding: 10px;
  border: solid 2px #fff;
  color: #fff;
  transition: all 250ms ease;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, transparent 50%, white 50%);

  &:hover {
    color: #333;
    background-position: 0 -100%;
  }
`

export const Content = styled('div')`
  width: 75%;
  text-align: justify;
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  margin-bottom: 1.5em;

  max-height: 50vh;
  overflow: hidden;
`
