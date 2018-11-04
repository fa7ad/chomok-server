import styled from 'react-emotion'

export default styled('img')`
  width: 80px;
  position: absolute;
  cursor: pointer;
  top: 2px;
  left: calc(50% - 40px);
  z-index: 2;

  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.45));
  transform-origin: top center;
  backface-visibility: hidden;
  transition: transform 100ms ease;
  &:hover {
    transform: scale(1.08) translateZ(2em);
  }
`
