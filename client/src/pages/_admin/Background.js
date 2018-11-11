import React from 'react'
import styled from 'react-emotion'
import { navigate } from '@reach/router'
import { Avatar, Button, Upload, Radio, Icon, message } from 'antd'

const RadioGroup = styled(Radio.Group)`
  display: block;
  margin: 15px auto;

  img {
    line-height: 128px;
  }

  .ant-avatar {
    height: 128px;
    width: 128px;
  }
`

class UploadLogo extends React.PureComponent {
  state = {
    choice: undefined,
    images: []
  }

  render () {
    return (
      <div>
        <div>
          <h3>Select a background</h3>
          <RadioGroup onChange={this.selectImage}>
            {this.state.images.map(im => (
              <Radio value={im.id} key={im.id}>
                <Avatar src={im.link} size='large' shape='square' />
              </Radio>
            ))}
          </RadioGroup>
          <Button type='primary' onClick={this.setBG}>
            Set as Background
          </Button>
        </div>
        <div>
          <h3>Upload a new background</h3>
          <Upload
            name='file'
            listType='picture-card'
            accept='image/*'
            action='/images/bg'
            withCredentials
            beforeUpload={this.beforeUpload}
            onChange={this.updateList}>
            <Icon type='plus' />
            <div className='ant-upload-text'>Upload</div>
          </Upload>
        </div>
      </div>
    )
  }

  beforeUpload = file => {
    const isLt3M = file.size / 1024 / 1024 < 3
    if (!isLt3M) message.error('Image must smaller than 2.5MB!')
    return isLt3M
  }

  selectImage = e => {
    this.setState({ choice: e.target.value })
  }

  setBG = e => {
    if (!this.state.choice) return false
    fetch('/images/bg/' + this.state.choice, {
      method: 'POST',
      credentials: 'include'
    })
      .then(r => {
        if (r.status === 401) {
          navigate('/login')
          throw new Error('Unauthorized')
        }
        if (r.status !== 200) throw r
        return r.json()
      })
      .then(res => {
        message.success('The background was successfully set')
      })
      .catch(e => {
        console.error(e)
      })
  }

  updateList = e => {
    fetch('/images/bg/all', {
      credentials: 'include'
    })
      .then(r => {
        if (r.status === 401) {
          navigate('/login')
          throw new Error('Unauthorized')
        }
        return r.json()
      })
      .then(images => {
        this.setState({ images })
      })
  }

  componentDidMount () {
    this.updateList()
  }
}

export default UploadLogo
