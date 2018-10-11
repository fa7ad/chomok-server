import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { css } from 'react-emotion'
import { navigate } from '@reach/router'
import ImageUploader from 'react-images-upload'
import { Form, Select, Button, Input, Icon, DatePicker } from 'antd'

const FormItem = Form.Item
const { Option } = Select

const formStyle = css`
  text-align: left;

  .fileContainer {
    box-shadow: none;
  }
  .chooseFileButton {
    border-radius: 3px;
  }
`

const tob64 = file =>
  new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('loadend', e => {
      resolve(reader.result)
    })
    reader.readAsDataURL(file)
  })

class AddOffer extends React.PureComponent {
  state = {
    zones: [],
    partners: [],
    progress: 'plus'
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ progress: 'loading' })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return this.setState({ progress: 'close' })
      values.date = values.date.format('YYYYMMDD')
      tob64(values.image[0])
        .then(image =>
          JSON.stringify({ ...values, percentage: +values.percentage, image })
        )
        .then(body =>
          fetch('/api/offers', {
            credentials: 'include',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body
          })
        )
        .then(r => {
          if (r.status === 401) navigate('/login')
          return r.json()
        })
        .then(rep => {
          if (rep.ok) {
            this.setState({ progress: 'check' })
            navigate('/admin/offers')
          } else throw new Error('Something wrong, again!')
        })
        .catch(e => {
          this.setState({ progress: 'close' })
          console.error(e)
        })
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit} className={formStyle}>
        <FormItem>
          {getFieldDecorator('image', {
            rules: [{ required: true, message: 'Please upload an image!' }]
          })(
            <ImageUploader
              withIcon
              singleImage
              buttonText='Choose image'
              imgExtension={['.jpg', '.png']}
              maxFileSize={2098000}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('date', {
            rules: [
              {
                type: 'object',
                required: true,
                message: 'Please select a date!'
              }
            ],
            initialValue: moment()
          })(<DatePicker format='DD-MM-YYYY' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('zoneid', {
            rules: [{ required: true, message: 'Please select a zone!' }]
          })(<Select placeholder='Select a zone'>{this.state.zones}</Select>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('partnerid', {
            rules: [{ required: true, message: 'Please select a partner!' }]
          })(
            <Select placeholder='Select a partner'>
              {this.state.partners}
            </Select>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('percentage', {
            rules: [{ required: true, message: 'Please enter a percentage!' }]
          })(
            <Input
              type='number'
              min={1}
              max={100}
              placeholder='Enter a percentage'
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type={this.state.progress === 'close' ? 'danger' : 'primary'}
            htmlType='submit'>
            <Icon type={this.state.progress} />
          </Button>
        </FormItem>
      </Form>
    )
  }

  componentDidMount () {
    fetch('/api/zones', { credentials: 'include' })
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(res => {
        if (!res.ok) throw new Error('Something went wrong')
        const zones = res.data.map(it => (
          <Option key={it._id} value={it._id}>
            {it.division.toUpperCase()} &gt; {it.name.toUpperCase()}
          </Option>
        ))
        this.setState({ zones })
      })
      .catch(e => console.error(e))
    fetch('/api/users/partner', { credentials: 'include' })
      .then(r => {
        if (r.status === 401) navigate('/login')
        return r.json()
      })
      .then(res => {
        if (!res.ok) throw new Error('Something went wrong')
        const partners = res.data.map(it => (
          <Option key={it._id} value={it._id}>
            {it.name} / {it.business.name}
          </Option>
        ))
        this.setState({ partners })
      })
      .catch(e => console.error(e))
  }

  static propTypes = {
    form: PropTypes.object
  }
}

const ControlledAddOffer = Form.create()(AddOffer)

export default ControlledAddOffer
