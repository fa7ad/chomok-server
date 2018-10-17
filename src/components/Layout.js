import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, cx } from 'react-emotion'

export const cdark = css`
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  h1, h2, h3, h4, h5 {
    color: #fefefe;
  }
`

export const cnophone = css`
  @media (max-width: 640px) {
    flex-basis: 100%;
    display: none;
  }
`

const Sec = ({ dark, nophone, className, ...p }) => (
  <section
    className={cx(className, { [cdark]: dark }, { [cnophone]: nophone })}
    {...p}
  />
)

Sec.propTypes = {
  dark: PropTypes.bool,
  nophone: PropTypes.bool,
  className: PropTypes.string
}

export const Section = styled(Sec)`
  flex-basis: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  @media (max-width: 640px) {
    flex-basis: 100%;
  }
`

export const Button = styled('button')`
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  padding: 10px;
  border: solid 2px #fff;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: all 250ms ease;
  background-color: transparent;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, transparent 50%, white 50%);

  &:hover {
    color: #333;
    background-position: 0 -100%;
  }
`

export const button = css`
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  padding: 10px;
  border: solid 2px #fff;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: all 250ms ease;
  background-color: transparent;
  background-size: 100% 200%;
  background-image: linear-gradient(to bottom, transparent 50%, white 50%);

  &:hover {
    color: #333;
    background-position: 0 -100%;
  }
`
