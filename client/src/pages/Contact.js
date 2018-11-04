import React from 'react'
import { Input, Button } from 'antd'

import { Page, Container } from '../components/Layout'

class Contact extends React.PureComponent {
  render () {
    return (
      <Page>
        <Container>
          <h1>Contact Us</h1>
          <p>Leave a message, and we will contact you!</p>
          <form
            action='https://formspree.io/info@chomok.xyz'
            method='POST'>
            <Input name='fullName' placeholder='Your full Name' required />
            <Input
              name='phoneNum'
              placeholder='Your phone number'
              required
              type='tel'
            />
            <Input
              name='email'
              placeholder='Your email address'
              required
              type='email'
            />
            <Input.TextArea
              name='message'
              placeholder='Your message'
              rows='12'
              required
            />
            <input type='hidden' name='_next' value='/' />
            <input type='hidden' name='_format' value='plain' />
            <Button type='primary' htmlType='submit'>
              Send!
            </Button>
          </form>
        </Container>
      </Page>
    )
  }
}

export default Contact
