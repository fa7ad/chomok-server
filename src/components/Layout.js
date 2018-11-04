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

export const Page = styled('div')`
  flex-basis: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 85px;
`

Page.White = styled(Page)`
  background-color: #fff;
  color: #111;
`

export const Container = styled('main')`
  width: 100%;
  height: 100%;
  max-width: 960px;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-width: 641px) {
    margin-bottom: 85px;
  }
  &, h1, h2, h3, h4, h5 {
    color: #fff;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    input, textarea{
      max-width: 900px;
      width: calc(100% - 10px);
      margin: 1em 0;
    }
    button:last-child {
      margin: 1em 0;
    }
  }
  form input, form textarea, form button {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
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

  .ant-modal-confirm-content pre {
    background-color: #fff;
    color: #111;
    display: inline-flex;
    padding: 2px;
  }

  .ant-modal-confirm-content .the-qr {
    margin: 15px auto;
  }

  .ant-modal-confirm-title {
    text-transform: uppercase;
    font-size: 1.3em;
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
    display: none;
  }
`
