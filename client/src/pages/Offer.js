import React from 'react'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import styled, { css, cx } from 'react-emotion'

import { Section, Button } from '../components/Layout'
import { Wrapper, Box } from './NotFound'
import Loading from '../components/Loading'

import wheel from '../img/wheelofluck.png'

const jcsb = css`
  &&& {
    justify-content: space-between;
  }
`

const Zone = styled('div')`
  font-size: 1.2em;
  text-transform: uppercase;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  span {
    font-weight: 300;
    font-size: 1.1em;
    margin: 0 5px;
  }
`

const HexImg = styled('div')`
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  min-height: ${p => p['data-size']};
  width: ${p => p['data-size']};
  background-image: ${p => `url(${p['data-bg']})`};
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  transition: background-size 150ms ease;
  &:hover {
    background-size: 120% 120%;
  }
`

const Wheel = styled('img')`
  position: relative;
  width: 75%;
  transform: rotate(143deg);
`

const WheelWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
`

const WheelPin = styled(Icon)`
  position: relative;
  top: 40px;
  z-index: 2;
`

const rand = (min, max) => min + Math.floor(Math.random() * (max - min))

const spin = () => css`
  animation: spin 2s ease-out 1;
  transform-origin: center center;
  @keyframes spin {
    from {
      transform: rotate(143deg);
    }
    to {
      transform: rotate(${143 + 360 * rand(3, 10)}deg);
    }
  }
`

class Offer extends React.PureComponent {
  state = {
    offer: 'loading',
    spinning: false
  }
  render () {
    const { zone, style } = this.props
    if (!this.state.offer) {
      return (
        <Wrapper style={style}>
          <Box>
            <h1>No offer found!</h1>
          </Box>
        </Wrapper>
      )
    }

    if (this.state.offer === 'loading') return <Loading />

    return (
      <>
        <Section dark style={style} className={jcsb}>
          <Zone>
            <Icon type='environment' theme='filled' />
            <span>{zone}</span>
          </Zone>
          <HexImg data-bg={this.state.offer.image} data-size='40vmin' />
          <div>
            <div>SPIN THE WHEEL TO GET YOUR % OFF!</div>
            <Button onClick={this.spin}>Spin the wheel!</Button>
          </div>
          <div />
          <div />
          <div />
        </Section>
        <Section style={style}>
          <WheelWrapper>
            <WheelPin
              style={{ color: '#d12', fontSize: '48px' }}
              type='caret-down'
            />
            <Wheel
              className={cx({ [spin()]: this.state.spinning })}
              src={wheel}
              alt='wheel'
              onAnimationEnd={this.stopSpin}
            />
          </WheelWrapper>
        </Section>
      </>
    )
  }

  componentDidMount () {
    fetch('/api/offers/dhaka/' + this.props.zone)
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(reply => {
        if (!reply.ok) this.setState({ offer: false })
        this.setState({ offer: reply.data })
      })
  }

  spin = e => {
    e.preventDefault()
    this.setState({ spinning: true })
  }

  stopSpin = e => {
    this.setState({ spinning: false })
  }

  static propTypes = {
    style: PropTypes.object,
    zone: PropTypes.string.isRequired
  }
}

export default Offer
