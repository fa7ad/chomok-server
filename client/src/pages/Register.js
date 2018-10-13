import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Button, Form } from 'antd'
import { navigate } from '@reach/router'

import styled, { css } from 'react-emotion'

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const form = css`
  background-color: rgba(55, 55, 55, 0.85);
  box-shadow: 0 0 5px rgba(55, 55, 55, 0.85);
  border-radius: 5px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  min-height: 240px;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
`

class Register extends React.PureComponent {
  state = {
    username: '',
    password: '',
    progress: 'user-add'
  }

  prefixStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Wrapper style={this.props.style}>
        <Form onSubmit={this.doReg} className={form}>
          <strong>Please enter your info</strong>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the full name!'
                }
              ]
            })(<Input placeholder='Full name' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the phone number!'
                }
              ]
            })(<Input placeholder='Phone number' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the username!'
                }
              ]
            })(<Input placeholder='Username' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the password!'
                }
              ]
            })(<Input placeholder='Password' type='password' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please enter the email!'
                }
              ]
            })(<Input placeholder='E-mail' type='email' />)}
          </Form.Item>

          <Button.Group>
            <Button
              type={this.state.progress === 'close' ? 'danger' : 'primary'}
              htmlType='submit'>
              <Icon type={this.state.progress} /> Register
            </Button>
            <Button type='default' href='/login'>
              Login <Icon type='lock' />
            </Button>
          </Button.Group>
        </Form>
      </Wrapper>
    )
  }

  handleErr = e => {
    console.error(e)
    this.setState({ progress: 'close' })
    setTimeout(() => {
      this.setState({ progress: 'user-add' })
    }, 1500)
  }

  doReg = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return this.handleErr(err)

      this.setState({ progress: 'loading' })

      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(r => r.json())
        .then(({ ok }) => {
          if (ok) {
            this.setState({ progress: 'check' })
            setTimeout(() => {
              navigate('/login')
            }, 500)
          } else throw new Error('Bad request')
        })
        .catch(this.handleErr)
    })
  }

  static propTypes = {
    style: PropTypes.object,
    form: PropTypes.object
  }
}

export default Form.create()(Register)
