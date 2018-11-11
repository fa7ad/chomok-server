import React from 'react'
import { Upload, Icon, message } from 'antd'

class UploadLogo extends React.PureComponent {
  state = {
    noImageUp: false
  }

  render () {
    return (
      <div>
        <Upload
          name='file'
          listType='picture-card'
          accept='image/*'
          action='/images/logo'
          withCredentials
          beforeUpload={this.beforeUpload}
          onRemove={this.enableUpload}>
          {this.state.noImageUp ? null : (
            <>
              <Icon type='plus' />
              <div className='ant-upload-text'>Upload</div>
            </>
          )}
        </Upload>
      </div>
    )
  }

  beforeUpload = file => {
    const isLt3M = file.size / 1024 / 1024 < 3
    if (!isLt3M) message.error('Image must smaller than 2.5MB!')
    this.disableUpload()
    return isLt3M
  }

  enableUpload = e => this.setState({ noImageUp: false })

  disableUpload = e => this.setState({ noImageUp: true })
}

export default UploadLogo
