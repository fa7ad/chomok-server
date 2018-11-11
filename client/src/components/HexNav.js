import React from 'react'
import styled from 'react-emotion'
import { Link } from '@reach/router'

const Container = styled('div')`
  display: grid;
  justify-content: center;
  grid-auto-rows: 48px;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px;
  padding-bottom: 24px;
  margin: 0 auto;
  width: 100%;
  max-width: ${p => p.size};
`

const ItemLink = p => <Link {...p}><div>{p.children}</div></Link>

const Item = styled(ItemLink)`
  position: relative;

  margin: 0 24px;
  height: 48px;
  width: calc(100% - 48px);
  z-index: 1;

  display: inline-flex;
  align-items: center;

  color: #fff;
  cursor: pointer;
  background-color: #111;

  transition: all 200ms ease;
  text-transform: uppercase;
  font-weight: 400;
  font-family: Montserrat, sans-serif;
  filter: drop-shadow(0 0 1px #333333);


  &,
  &:hover,
  &:link,
  &:active {
    text-decoration: none;
    color: #fff;
  }

  &:hover {
    z-index: 2;
    transform: scale3D(1.08, 1.08, 1.08);
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 34px;
    height: 34px;
    background-color: #111;
    transform: rotate(45deg);
    z-index: -1;
  }

  > div {
    position: absolute;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 420px) {
      font-size: smaller;
    }
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  &::before {
    left: -17px;
  }

  &::after {
    right: -17px;
  }

  &:nth-child(odd) {
    left: 12px;
  }

  &:nth-child(even) {
    top: 26px;
    left: -12px;
  }
`

export { Container as NavContainer, Item as NavItem }

export default { Container, Item }
