import React from 'react'
import styled from 'react-emotion'
import { navigate } from '@reach/router'
import { Button, Input, Modal } from 'antd'
import QrCodeScanner from '@sensorfactdev/qr-code-scanner'

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  > div {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .result pre {
    font-size: 16px;
    color: #111;
    text-align: left;
  }
`

function showQR (data) {
  const dict = {
    perc: 'Percentage Off',
    special: 'Special Offer',
    bulk: 'Bulk Discount'
  }
  Modal.info({
    title: 'Valid code found!',
    content: (
      <>
        <h1>Value: {data.value}</h1>
        <h3>Type: {dict[data.offertype]}</h3>
        <h3>Validity: {data.validity}</h3>
      </>
    ),
    onOk: _ => window.location.reload()
  })
}

class PartnerScan extends React.PureComponent {
  state = {
    manual: ''
  }

  handleScan = async code => {
    try {
      if (!code || !code.result) return
      const qrcode = code.result.replace('chomok://', '')
      const r = await fetch(`/api/codes/${qrcode}`, {
        method: 'POST',
        credentials: 'include'
      })
      if (r.status === 403 || r.status === 401) {
        navigate('/login')
        throw new Error('Unauthorized')
      }
      const res = await r.json()
      if (res.ok) showQR(res.data)
      else throw new Error('Invalid code')
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const size = Math.min(300, (window.innerWidth * 0.75) | 0)

    return (
      <Container>
        <div className='result'>
          <pre>No valid QR found...</pre>
        </div>
        <div>
          <h3>Manual Entry</h3>
          <Input placeholder='Offer code' onChange={this.manualInput} />
          <Button onClick={this.checkManual}>Check</Button>
        </div>
        <div>
          <QrCodeScanner
            onQrCodeScanned={this.handleScan}
            width={size}
            height={size}
            showAimAssist={false}
          />
        </div>
      </Container>
    )
  }

  manualInput = e => this.setState({ manual: e.target.value })

  checkManual = e => this.handleScan(this.state.manual)
}

export default PartnerScan
