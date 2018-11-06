import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { NavContainer, NavItem } from '../components/HexNav'
import { Section, Heading, ButtonLink, Content } from '../components/Layout'

const Home = ({ navItems, style }) => (
  <>
    <Section style={style}>
      <NavContainer size='70%'>
        {navItems.map((it, idx) => (
          <Fragment key={it._id}>
            {idx > 0 && idx % 2 === 0 ? <div /> : null}
            <NavItem to={`/offer/${it.name}/perc`}>{it.name}</NavItem>
          </Fragment>
        ))}
      </NavContainer>
    </Section>
    <Section dark nophone style={style}>
      <Heading>CHOMOK</Heading>
      <Content>
        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. ALIQUAM LAOREET
        ARCU URNA, ET PORTA IPSUM ULLAMCORPER VEL. IN BLANDIT ULTRICES ARCU, AC
        BLANDIT EX MATTIS EU. AENEAN MALESUADA LUCTUS ERAT IN LUCTUS. UT
        ULLAMCORPER DICTUM ACCUMSAN. DONEC SED LAOREET URNA. ETIAM VESTIBULUM
        RUTRUM LACUS. MAECENAS RISUS TORTOR, PULVINAR AC FINIBUS UT, LOBORTIS
        EGET JUSTO. FUSCE ULTRICES ENIM VEL IPSUM BIBENDUM, SED ACCUMSAN METUS
        DICTUM.
      </Content>
      <ButtonLink to='/about'>Learn more!</ButtonLink>
    </Section>
  </>
)

Home.propTypes = {
  style: PropTypes.object,
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Home
