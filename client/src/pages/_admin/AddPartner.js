import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import React, { PureComponent } from 'react'
import { Form, Button, Input, Icon } from 'antd'

const FormItem = Form.Item

class AddPartner extends PureComponent {
  state = {
    progress: 'plus'
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({ progress: 'loading' })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return this.setState({ progress: 'close' })
      const body = JSON.stringify(values)
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
                message: "Please enter the partner's full name!"
              }
            ]
          })(<Input placeholder="Partner's full name (person, not business)" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: "Please enter the partner's phone number!"
              }
            ]
          })(<Input placeholder="Partner's phone" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: "Please enter the partner's username!"
              }
            ]
          })(<Input placeholder="Partner's username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: "Please enter the partner's password!"
              }
            ]
          })(<Input placeholder="Partner's password" type='password' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: "Please enter the partner's email!"
              }
            ]
          })(<Input placeholder="Partner's email" type='email' />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('business.name', {
            rules: [
              {
                required: true,
                message: "Please enter the business's name!"
              }
            ]
          })(<Input placeholder="Business's name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('business.address', {
            rules: [
              {
                required: true,
                message: "Please enter the business's address!"
              }
            ]
          })(<Input placeholder="Business's address" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('business.phone', {
            rules: [
              {
                required: true,
                message: "Please enter the business's phone number!"
              }
            ]
          })(<Input placeholder="Business's phone number" />)}
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

const ControlledAddPartner = Form.create()(AddPartner)

export default ControlledAddPartner
