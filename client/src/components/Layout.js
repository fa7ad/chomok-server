import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styled, { css, cx } from 'react-emotion'

export const cdark = css`
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: #fefefe;
  }
`

export const cnophone = css`
  @media (max-width: 639px) {
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
  @media (max-width: 639px) {
    flex-basis: 100%;
  }
`

const btn = type => styled(type)`
  text-transform: uppercase;
  font-family: Montserrat, sans-serif;
  padding: 10px;
  border: solid 2px #fff;
  color: #fff;
  cursor: pointer;
  outline: none;
  transition: background-position 250ms ease, background-color 225ms 50ms ease;
  background: transparent linear-gradient(to bottom, #fff 50%, transparent 50%)
    0 100%/100% 200% no-repeat;
  &:hover {
    color: #333;
    background-color: #fff;
    background-position: 0 0;
  }
`

export const Button = btn('button')
export const ButtonLink = btn(Link)

export const Heading = styled('h1')`
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 4em;
  color: #fefefe;
  text-transform: uppercase;
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

export const qrmodal = css`
  .ant-modal-content {
    background: rgba(0, 0, 0, 0.65);
    text-align: center;
    border-radius: 0;
  }
  .ant-modal-confirm-content,
  .ant-modal-confirm-title,
  h3,
  pre,
  span {
    color: #fff;
  }

  .ant-modal-confirm-body-wrapper {
    border: 4px solid #fff;
    padding: 20px;
  }

  .ant-modal-confirm-btns {
    float: none;
  }

  .ant-modal-confirm-content {
    margin-left: 0 !important;
    text-align: center;

    img {
      width: 100%;
    }
  }

  .ant-btn {
    background: #fff;
    border-radius: 0;
    border: none;
    padding: 0 40px;
    &,
    & span {
      color: #111;
    }
  }

  i.anticon {
    margin-right: 0;
  }
`
