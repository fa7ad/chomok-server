import React from 'react'
import styled from 'react-emotion'
import { Button, Input } from 'antd'
import QrReader from 'react-qr-reader'
import { navigate } from '@reach/router'

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

class PartnerScan extends React.PureComponent {
  state = {
    delay: 300,
    legacy: false,
    result: false,
    manual: ''
  }

  qr = React.createRef()

  handleScan = code => {
    if (code && code.startsWith('chomok://')) {
      fetch('/api/codes/' + code.replace('chomok://', ''), {
        method: 'POST',
        credentials: 'include'
      })
        .then(r => {
          if (r.status === 403 || r.status === 401) {
            navigate('/login')
            throw new Error('Unauthorized')
          }
          return r.json()
        })
        .then(res => {
          if (res.ok) {
            this.setState({ result: res.data })
          } else throw new Error('Invalid code')
        })
        .catch(e => {
          this.setState({ result: false })
        })
    } else {
      this.setState({ result: false })
    }
  }

  openImageDialog = e => {
    this.qr.current.openImageDialog()
  }

  render () {
    const previewStyle = {
      width: '90%',
      maxWidth: '480px',
      margin: '0 auto'
    }

    return (
      <Container>
        <div className='result'>
          <h3>Result:</h3>
          <pre>
            {this.state.result
              ? JSON.stringify(this.state.result, null, 4)
              : 'No valid QR found...'}
          </pre>
        </div>
        <div>
          <h3>Manual Entry</h3>
          <Input placeholder='Offer code' onChange={this.manualInput} />
          <Button onClick={this.checkManual}>Check</Button>
        </div>
        <div>
          <QrReader
            ref={this.qr}
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            legacyMode={this.state.legacy}
          />
          <Button onClick={this.openImageDialog}>Submit Image QR</Button>
        </div>
      </Container>
    )
  }

  handleError = () => {
    this.setState({ legacy: true })
  }

  manualInput = e => {
    this.setState({ manual: e.target.value })
  }

  checkManual = e => {
    this.handleScan('chomok://' + this.state.manual)
  }
}

export default PartnerScan
