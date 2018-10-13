import { Button } from 'antd'
import QrReader from 'react-qr-reader'
import { navigate } from '@reach/router'
import React, { PureComponent } from 'react'

class PartnerScan extends PureComponent {
  state = {
    delay: 300,
    correct: false,
    legacyMode: false,
    percentage: null
  }

  qr = React.createRef()

  handleScan = code => {
    if (code && code.startsWith('chomok://')) {
      fetch('/api/codes/' + code.replace('chomok://', ''), {
        method: 'POST',
        credentials: 'include'
      })
        .then(r => {
          if (r.status === 401) return navigate('/login')
          return r.json()
        })
        .then(res => {
          if (res.ok) {
            this.setState({
              correct: true,
              percentage: res.data.percentage + ' %'
            })
          } else throw new Error('Invalid')
        })
        .catch(e => {
          this.setState({ correct: false })
        })
    }
  }
  handleError = e => {
    this.setState({ legacyMode: true })
  }
  openImageDialog = e => {
    this.qr.current.openImageDialog()
  }

  render () {
    const previewStyle = {
      width: '50%',
      margin: '0 auto'
    }

    return (
      <div>
        <QrReader
          ref={this.qr}
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode={this.state.legacyMode}
          onImageLoad={this.handleUpload}
        />
        <Button onClick={this.openImageDialog}>Submit QR</Button>
        <h1 style={{ color: this.state.correct ? 'green' : 'black' }}>
          {this.state.percentage && 'Value: ' + this.state.percentage}
        </h1>
      </div>
    )
  }

  handleUpload = e => {
    console.log(e)
  }
}

export default PartnerScan
