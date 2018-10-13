import React from 'react'
import PropTypes from 'prop-types'
import { Location, Router } from '@reach/router'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { cx } from 'emotion'

const TransitionRouter = ({ children, ...p }) => (
  <Location
    children={({ location }) => (
      <TransitionGroup className='transition-group'>
        <CSSTransition key={location.key} classNames='fade' timeout={100}>
          <Router
            location={location}
            className={cx(
              'router',
              { admin: /admin/.test(location.href) },
              { partner: /partner/.test(location.href) }
            )}
            {...p}>
            {children}
          </Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  />
)

TransitionRouter.propTypes = {
  children: PropTypes.node
}

export default TransitionRouter
