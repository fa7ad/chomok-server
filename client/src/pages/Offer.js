import React from 'react'
import { TheQr } from 'the-qr'
import PropTypes from 'prop-types'
import { Icon, Modal } from 'antd'
import { navigate } from '@reach/router'
import styled, { css } from 'react-emotion'

import { Wrapper, Box } from './NotFound'
import Loading from '../components/Loading'
import { Section, qrmodal } from '../components/Layout'

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

const SpinCTA = styled('div')`
  font-size: 1.5em;
  margin: 15px auto;
  color: #fff;
  span {
    background-color: #fff;
    border: 2px solid #fff;
    color: rgba(0, 0, 0, 0.85);
  }
`

class Offer extends React.PureComponent {
  state = {
    offer: 'loading',
    qr: null
  }

  wheel = React.createRef()

  dict = {
    perc: 'Percentage Off',
    special: 'Special Offer',
    bulk: 'Bulk Discount'
  }

  render () {
    const { zone, style } = this.props
    const { offer } = this.state

    if (!offer) {
      return (
        <Wrapper style={style}>
          <Box>
            <h1>No offer found!</h1>
          </Box>
        </Wrapper>
      )
    }

    if (offer === 'loading') return <Loading />

    return (
      <>
        <Section dark style={style} className={section}>
          <Zone>
            <Icon type='environment' />
            <span>{zone}</span>
          </Zone>
          <HexImg
            data-bg={offer.image}
            data-size='45vmin'
            className='hex-img'
          />
          <SpinCTA>
            Spin the <span>WHEEL</span> to get your <span>OFFER!</span>
          </SpinCTA>
          <div className='descr'>
            <div>{offer.partner.name}</div>
            <div>
              <Icon type='compass' /> {offer.partner.address}
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

  async componentDidMount () {
    try {
      const { type, zone } = this.props
      const reply = await fetch(`/api/offers/dhaka/${zone}`).then(r => r.json())

      if (!reply.ok) return this.setState({ offer: false })
      this.setState({ offer: reply.data })
      const code = await this.getCode(reply.data._id, type)
      const { offers } = this.state.offer
      const colors = [
        '#C600D1',
        '#45C2EE',
        '#80EA52',
        '#444652',
        '#F4343F',
        '#FF9000',
        '#FFF639'
      ]
      const radius = (0.2 * Math.max(window.innerHeight, window.innerWidth)) | 0
      window.wheel({
        el: this.wheel.current,
        data: offers[type].values.filter(el => el !== null).map((v, i) => ({
          text: v,
          chance: i === code.value ? 100 : 1,
          color: colors[i % colors.length]
        })),
        clockwise: false,
        limit: 1,
        mode: 'online',
        color: {
          border: '#f5f5f5',
          prize: '#f5f5f5',
          button: '#f5f5f5',
          line: 'transparent',
          prizeFont: '#fff',
          buttonFont: '#111'
        },
        duration: 3e3,
        buttonWidth: radius * 0.25,
        buttonText: 'SPIN!',
        radius,
        url: `/api/codes/${code.code}`,
        onSuccess: win => this.showData({ ...code, win })
      })
    } catch (e) {
      if (e.message === 'login') navigate('/login')
      console.error(e.stack)
    }
  }

  getCode = async (id, type) => {
    const r = await fetch(`/api/codes/${id}/${type}`, {
      credentials: 'include'
    })
    if (r.status === 401) throw new Error('login')
    const res = await r.json()
    if (!res.ok) this.setState({ offer: false })

    return res.data
  }

  download = e => {
    const a = document.createElement('a')
    a.href = this.state.qr
    a.download = `qrcode-${Date.now()}.png`
    a.click()
  }

  showData = data =>
    Modal.info({
      title: (
        <>
          <div>You have won {data.win.text} discount!</div>
          <div>Here is your chomok code!</div>
        </>
      ),
      className: qrmodal,
      content: (
        <>
          <div>Please show this QR code to the restaurant.</div>
          <TheQr
            text={'chomok://' + data.code}
            onClick={this.download}
            onGenerate={this.saveQr}
            alt={data.code}
          />
          <div>
            <em>Click on the QR code to save for later</em>
          </div>
          <p>You can also show the following code</p>
          <pre>{data.code}</pre>
          <h3>Type: {this.dict[data.offertype]}</h3>
        </>
      ),
      okButtonProps: {
        onMouseDown: e => {
          this.download(e)
          navigate('/')
        }
      },
      okText: 'SAVE!'
    })

  saveQr = qr => this.setState({ qr })

  static propTypes = {
    style: PropTypes.object,
    zone: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }
}

export default Offer
