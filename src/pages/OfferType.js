import React from 'react'
import { Modal } from 'antd'
import QrCode from 'qrcode.react'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { navigate } from '@reach/router'
import { map, filter, keys } from 'ramda'

import { Wrapper, Box } from './NotFound'
import Loading from '../components/Loading'
import { Section, ButtonLink, qrmodal } from '../components/Layout'

const offerType = css`
  flex-basis: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  h1,
  h2,
  h3 {
    color: #fff;
  }
`

class OfferType extends React.PureComponent {
  state = {
    loading: true,
    types: []
  }

  dict = {
    perc: 'Percentage Off',
    special: 'Special Offer',
    bulk: 'Bulk Discount'
  }

  render () {
    const { style, zone } = this.props
    const { types, loading } = this.state

    if (loading) return <Loading />

    return types.length > 0 ? (
      <Section style={style} className={offerType}>
        <h1>Select an offer type</h1>
        {types.map((type, idx) => (
          <ButtonLink to={`/offer/${zone}/${type.key}`} key={idx}>
            {type.caption}
          </ButtonLink>
        ))}
      </Section>
    ) : (
      <Wrapper style={style}>
        <Box>
          <h1>No offer found!</h1>
        </Box>
      </Wrapper>
    )
  }

  componentDidMount () {
    fetch('/api/offers/dhaka/' + this.props.zone)
      .then(r => r.json())
      .then(reply => {
        if (!reply.ok) return this.setState({ types: [], loading: false })
        if (reply.data.code) return this.showOldCode(reply.data)
        const { offers } = reply.data
        const types = keys(filter(el => el, offers))
        this.setState({
          loading: false,
          types: map(el => ({ key: el, caption: this.dict[el] }), types)
        })
      })
  }

  showOldCode = data => {
    fetch('/api/codes/' + data._id + '/' + data.code.type)
      .then(r => {
        if (r.status === 401) throw new Error('Unauthorized')
        return r.json()
      })
      .then(res => {
        if (!res.ok) return console.error('Something went wrong')
        this.showData(res.data)
      })
      .catch(console.error)
  }

  download = e => {
    const data = e.target.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = data
    a.download = 'qrcode.png'
    a.click()
  }

  showData = data =>
    Modal.info({
      title: 'You already got a code!',
      className: qrmodal,
      content: (
        <>
          <QrCode value={'chomok://' + data.code} onClick={this.download} />
          <pre>{data.code}</pre>
          <em>Click on the QR code to save for later</em>
          <h3>Type: {this.dict[data.offertype]}</h3>
        </>
      ),
      onOk () {
        navigate('/')
      }
    })

  static propTypes = {
    style: PropTypes.object,
    zone: PropTypes.string
  }
}

export default OfferType
