import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Input, Button } from 'antd'
import { navigate } from '@reach/router'

import styled from 'react-emotion'

const Wrapper = styled('div')`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled('form')`
  background-color: rgba(55, 55, 55, 0.85);
  box-shadow: 0 0 5px rgba(55, 55, 55, 0.85);
  border-radius: 5px;
  padding: 24px;
  width: 50%;
  max-width: 360px;
  min-height: 240px;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
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
    return (
      <Wrapper style={this.props.style}>
        <Box action='/api/login' method='POST' onSubmit={this.doLogin}>
          <strong>Please log in</strong>
          <Input
            placeholder='Enter your username'
            prefix={<Icon type='user' style={this.prefixStyle} />}
            value={this.state.username}
            onChange={this.onChange('username')}
            onPressEnter={this.doLogin}
            required
          />
          <Input
            placeholder='Enter your password'
            prefix={<Icon type='lock' style={this.prefixStyle} />}
            value={this.state.password}
            onChange={this.onChange('password')}
            type='password'
            onPressEnter={this.doLogin}
            required
          />
          <Button
            type={this.state.progress === 'close' ? 'danger' : 'primary'}
            onClick={this.doLogin}>
            <Icon type={this.state.progress} />
          </Button>
        </Box>
      </Wrapper>
    )
  }

  onChange = name => e => {
    this.setState({ [name]: e.currentTarget.value })
  }

  doLogin = e => {
    e.preventDefault()

    this.setState({ progress: 'loading' })

    const { username: uname, password } = this.state
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
      .catch(e => {
        console.error(e)
        this.setState({ progress: 'close' })
        setTimeout(() => {
          this.setState({ progress: 'lock' })
        }, 1500)
      })
  }

  static propTypes = {
    style: PropTypes.object
  }
}

export default Login
