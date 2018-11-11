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

class Login extends React.PureComponent {
  state = {
    username: '',
    password: '',
    progress: 'lock'
  }

  prefixStyle = {
    color: 'rgba(0, 0, 0, 0.25)'
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Wrapper style={this.props.style}>
        <Form onSubmit={this.doLogin} className={form}>
          <strong>Please log in</strong>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={<Icon type='user' style={this.prefixStyle} />}
                placeholder='Username'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={<Icon type='lock' style={this.prefixStyle} />}
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>

          <Button.Group>
            <Button
              type={this.state.progress === 'close' ? 'danger' : 'primary'}
              htmlType='submit'>
              <Icon type={this.state.progress} /> Login
            </Button>
            <Button type='default' href='/register'>
              Register <Icon type='user-add' />
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
      this.setState({ progress: 'lock' })
    }, 1500)
  }

  doLogin = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return this.handleErr(err)

      this.setState({ progress: 'loading' })
      const { username: uname, password } = values
      const username = uname.toLowerCase()

      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then(r => r.json())
        .then(({ ok }) => {
          if (ok) {
            this.setState({ progress: 'check' })
            setTimeout(() => {
              navigate('/')
            }, 500)
          } else throw new Error('Unauthorized')
        })
        .catch(this.handleErr)
    })
  }

  static propTypes = {
    style: PropTypes.object,
    form: PropTypes.object
  }
}

export default Form.create()(Login)
