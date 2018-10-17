import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import styled, { css } from 'react-emotion'
import { merge, lensProp, set, repeat, values, filter, equals } from 'ramda'
import { Form, Select, Button, Icon, DatePicker, Upload, message } from 'antd'

import SixInput from '../../components/SixInput'

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
const Wrapper = styled('div')`
  display: flex;
  justify-content: stretch;
  width: 100%;
  > div {
    flex-basis: 33%;
  }
`

class AddOffer extends React.PureComponent {
  state = {
    zones: [],
    partners: [],
    progress: 'plus',
    offers: {
      perc: false,
      special: false,
      bulk: false
    },
    noImageUp: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ progress: 'loading' })
    this.props.form.validateFieldsAndScroll((err, data) => {
      const offerTypes = filter(el => el, values(this.state.offers))
      if (offerTypes.length < 1) {
        message.error('Select at least one offer type')
        if (!err) err = new Error('No offer type selected')
      }
      offerTypes.forEach(type => {
        if (equals(undefined, type.win)) {
          message.error('Select a winning offer')
          if (!err) err = new Error('No offer winner selected')
        }
      })
      if (err) {
        setTimeout(_ => this.setState({ progress: 'plus' }), 900)
        return this.setState({ progress: 'close' })
      }
      data.date = data.date.format('YYYYMMDD')
      data.image = data.image.file.response
      const { offers } = this.state

      const body = JSON.stringify(merge(data, { offers }))
      fetch('/api/offers', {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
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
    const { offers, noImageUp, progress, zones, partners } = this.state

    return (
      <Form onSubmit={this.handleSubmit} className={formStyle}>
        <FormItem>
          {getFieldDecorator('image', {
            valuePropName: 'file',
            rules: [{ required: true, message: 'Please upload an image!' }]
          })(
            <Upload
              name='file'
              listType='picture-card'
              accept='image/*'
              action='/images'
              withCredentials
              beforeUpload={this.beforeUpload}
              onRemove={this.enableUpload}>
              {noImageUp ? null : (
                <>
                  <Icon type='plus' />
                  <div className='ant-upload-text'>Upload</div>
                </>
              )}
            </Upload>
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
          })(<Select placeholder='Select a zone'>{zones}</Select>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('partnerid', {
            rules: [{ required: true, message: 'Please select a partner!' }]
          })(<Select placeholder='Select a partner'>{partners}</Select>)}
        </FormItem>
        <Button.Group>
          <Button
            onClick={this.toggleOffer('perc')}
            type={offers.perc ? 'primary' : 'default'}>
            Percentage
          </Button>
          <Button
            onClick={this.toggleOffer('special')}
            type={offers.special ? 'primary' : 'default'}>
            Special
          </Button>
          <Button
            onClick={this.toggleOffer('bulk')}
            type={offers.bulk ? 'primary' : 'default'}>
            Bulk
          </Button>
        </Button.Group>
        <Wrapper>
          {offers.perc && (
            <SixInput onChange={this.offerChange('perc')} label='Percentage' />
          )}
          {offers.special && (
            <SixInput onChange={this.offerChange('special')} label='Special' />
          )}
          {offers.bulk && (
            <SixInput onChange={this.offerChange('bulk')} label='Bulk' />
          )}
        </Wrapper>
        <FormItem>
          <Button
            type={progress === 'close' ? 'danger' : 'primary'}
            htmlType='submit'>
            <Icon type={progress} />
          </Button>
        </FormItem>
      </Form>
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

  offerChange = offer => val => {
    this.setState(p => {
      const offers = merge(p.offers, { [offer]: val })
      return { offers }
    })
  }

  toggleOffer = name => e => {
    this.setState(p => {
      const offers = set(
        lensProp(name),
        p.offers[name] === false && { win: undefined, values: repeat(null, 6) },
        p.offers
      )
      return { offers }
    })
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
