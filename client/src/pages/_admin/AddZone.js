import PropTypes from 'prop-types'
import { map, toLower } from 'ramda'
import { navigate } from '@reach/router'
import React, { PureComponent } from 'react'
import { Form, Button, Input, Icon } from 'antd'

const FormItem = Form.Item

class AddZone extends PureComponent {
  state = {
    progress: 'plus'
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ progress: 'loading' })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return this.setState({ progress: 'close' })
      const body = JSON.stringify(map(toLower, values))
      fetch('/api/zones', {
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
            navigate('/admin/zones')
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
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('division', {
            rules: [{ required: true, message: 'Please enter a division!' }]
          })(<Input placeholder='Enter a division' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter a zone name!' }]
          })(<Input placeholder='Enter a zone name' />)}
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

  static propTypes = {
    form: PropTypes.object
  }
}

const ControlledAddZone = Form.create()(AddZone)

export default ControlledAddZone
