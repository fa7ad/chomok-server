import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Page } from '../components/Layout'

import who from '../img/Who we are-original Image.png'
import how from '../img/How it Works.png'
import spin from '../img/Spin the wheel.png'
import lucky from '../img/Licky Winner.png'

import contact from '../img/Contact us-.png'
import fb from '../img/Facebook.png'
import email from '../img/Email.png'
import phone from '../img/Call -.png'
import partner from '../img/Partnership.png'

class About extends React.PureComponent {
  render () {
    return (
      <Page.White>
        <div className='empty' />
        <Grid fluid>
          <Row center='xs'>
            <Col sm={9}>
              <h2>About Chomok</h2>
              <div>
                <i>Chomok</i> is a dedicated place for food lovers. We believe
                that people who love to taste different foods in different
                places; deserve a <i>Chomok offer</i> everyday at a new place!
                Our QC team is dedicated to find the best offer of the day near
                you! Download
                <i>Chomok app</i> from the play store and get <i>chomoked</i>!
              </div>
            </Col>
          </Row>
          <Row center='xs'>
            <Col sm={5}>
              <img src={who} alt='Who we are' />
              <h3>Who we are</h3>
              <div>
                Our growing team based in offices in Dhaka, Bangladesh. We are a
                creatively-minded company whose founders came from different
                backgrounds with the love for foods! For information about
                current opportunities to work with us, please see our{' '}
                <u>branding page.</u>
              </div>
            </Col>
            <Col sm={5}>
              <img src={how} alt='how it works' />
              <h3>How It Works</h3>
              <div>
                Chomok brings the simplest way to enjoy offers; which is fun and
                keeps you focused. Simply login with your mobile number &gt;
                select a location &gt; spin a lucky wheel to get a chomok offer
                &gt; you’ll get the best offer of the day &gt; Show the chomok
                code to the restaurant and get Chomoked!
              </div>
            </Col>
          </Row>
          <Row center='xs'>
            <Col sm={5}>
              <img src={spin} alt='Spin The Wheel' />
              <h3>Spin The Wheel</h3>
              <div>
                We love to have fun as we love to taste different foods! You’ll
                get the chomok offer in a different way. Why not try your luck
                with Chomok? You will need to spin a wheel and get a lucky
                offer! Which is fun and interesting!
              </div>
            </Col>
            <Col sm={5}>
              <img src={lucky} alt='lucky winner' />
              <h3>Chomok Lucky Winner</h3>
              <div>
                Yes, you can be the Chomok Lucky Winner of the week. Each time
                you show the chomok code to the restaurant that means the code
                is been used. Every week we announce a lucky winner who used the
                highest number of Chomok code in a week. The lucky winner will
                enjoy a free dish along with a lucky partner!
              </div>
            </Col>
          </Row>
          <div className='empty' />
          <Row center='xs'>
            <Col xs={12}>
              <img src={contact} alt='contact' height='100' />
              <h2>Contact us!</h2>
            </Col>
            <Col sm={9}>
              <Row center='xs' className='contacts'>
                <Col>
                  <img src={fb} alt='fb' />
                  Facebook
                </Col>
                <Col>
                  <img src={email} alt='email' />
                  info@chomok.xyz
                </Col>
                <Col>
                  <img src={partner} alt='partnership' />
                  partner@chomok.xyz
                </Col>
                <Col>
                  <img src={phone} alt='phone' />
                  01738085053
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Page.White>
    )
  }
}

export default About
