import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import React, { PureComponent } from 'react'
import { Form, Button, Input, Icon } from 'antd'

const FormItem = Form.Item

class AddAdmin extends PureComponent {
  state = {
    progress: 'plus'
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ progress: 'loading' })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return this.setState({ progress: 'close' })
      const body = JSON.stringify({ ...values, admin: true })
      fetch('/api/register', {
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
            navigate('/admin/partners')
          } else throw rep
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
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'Please enter the full name!'
              }
            ]
          })(<Input placeholder='Full name' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: 'Please enter the phone number!'
              }
            ]
          })(<Input placeholder='Phone number' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please enter the username!'
              }
            ]
          })(<Input placeholder='Username' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please enter the password!'
              }
            ]
          })(<Input placeholder='Password' type='password' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: 'Please enter the email!'
              }
            ]
          })(<Input placeholder='E-mail' type='email' />)}
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

const ControlledAddAdmin = Form.create()(AddAdmin)

export default ControlledAddAdmin
