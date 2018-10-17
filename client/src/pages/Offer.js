import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Modal } from 'antd'
import { navigate } from '@reach/router'
import styled, { css } from 'react-emotion'
import QrCode from 'qrcode.react'

import { Section } from '../components/Layout'
import { Wrapper, Box } from './NotFound'
import Loading from '../components/Loading'

const section = css`
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
  max-height: ${p => p['data-size']};
  height: 100%;
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

const WheelWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
`

const qrmodal = css`
  .ant-confirm-content {
    margin-left: 0 !important;
    text-align: center;

    img {
      width: 100%;
    }
  }
`

const SpinCTA = styled('div')`
  font-size: 1.5em;
  margin: 15px auto;
  color: #fff;
  span {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.85);
  }
`

function qrModal (code, type) {
  const dict = {
    perc: 'Percentage Off',
    special: 'Special Offer',
    bulk: 'Bulk Discount'
  }
  Modal.info({
    title: 'Show this code to the partner',
    content: (
      <>
        <QrCode value={'chomok://' + code} />
        <pre>{code}</pre>
        <h3>Type: {dict[type]}</h3>
      </>
    ),
    className: qrmodal
  })
}

class Offer extends React.PureComponent {
  state = {
    offer: 'loading'
  }

  wheel = React.createRef()

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
        <Section dark style={style} className={section}>
          <Zone>
            <Icon type='environment' />
            <span>{zone}</span>
          </Zone>
          <HexImg
            data-bg={this.state.offer.image}
            data-size='40vmin'
            className='hex-img'
          />
          <SpinCTA>
            Spin the <span>WHEEL</span> to get your <span>OFFER</span>!
          </SpinCTA>
          <div className='descr'>
            <div>{this.state.offer.partner.name}</div>
            <div>
              <Icon type='compass' /> {this.state.offer.partner.address}
            </div>
          </div>
        </Section>
        <Section style={style}>
          <WheelWrapper>
            <svg ref={this.wheel} />
          </WheelWrapper>
        </Section>
      </>
    )
  }

  componentDidMount () {
    fetch('/api/offers/dhaka/' + this.props.zone)
      .then(r => r.json())
      .then(reply => {
        if (!reply.ok) return this.setState({ offer: false })
        this.setState({ offer: reply.data })
        return this.getCode(reply.data._id)
      })
      .then(code => {
        window.wheel({
          el: this.wheel.current,
          data: this.state.offer.offers[this.props.type].values.map((v, i) => ({
            text: v,
            chance: i === code.value ? 100 : 1
          })),
          clockwise: false,
          limit: 1,
          mode: 'online',
          radius: Math.floor(
            Math.min(window.innerHeight, window.innerWidth) * 0.22
          ),
          url: '/api/codes/' + code.code,
          onSuccess: win => {
            this.showQR(code.code, this.props.type)
          }
        })
      })
  }

  getCode = id =>
    fetch('/api/codes/' + id + '/' + this.props.type, {
      credentials: 'include'
    })
      .then(r => {
        if (r.status === 401) {
          throw new Error('Unauthorized')
        }
        return r.json()
      })
      .then(res => {
        if (!res.ok) {
          this.setState({ offer: false })
        }
        return res.data
      })
      .catch(e => {
        if (e.message === 'Unauthorized') navigate('/login')
        else console.error(e)
      })

  showQR = (code, type) => qrModal(code, type)

  static propTypes = {
    style: PropTypes.object,
    zone: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }
}

export default Offer
