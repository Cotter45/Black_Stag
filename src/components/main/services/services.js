import React, { useRef, useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import useMeasure from 'react-use-measure';

import * as Icons from './icons.tsx';


const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle',
}

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => (ref.current = value), [value])
  console.log(ref.current)
  return ref.current
}

const Tree = (({ children, name, style, defaultOpen=false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)

  const [ref, { height: viewHeight }] = useMeasure()
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  })

  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]

  return (
    <div className='frame'>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
      <span className='title' style={style}>{name}</span>
      <animated.div
        className='content'
        style={{
          opacity,
          height: isOpen && previous === true ? 'auto' : height,
        }}>
          <animated.div ref={ref} style={{ opacity, y }} children={children} />
      </animated.div>
    </div>
  )
})

export default function Services() {

    return (
        <div className='container'>
            <Tree name="Indoor Services" defaultOpen>
              <Tree name="Painting" />
              <Tree name="Flooring">
                <Tree name="Vinyl" />
                <Tree name="Tile" />
                <Tree name="Hardwood">
                  <Tree name="child 1" style={{ color: '#37ceff' }} />
                  <Tree name="child 2" style={{ color: '#37ceff' }} />
                  <Tree name="child 3" style={{ color: '#37ceff' }} />
                  <Tree name="custom content">
                    {/* <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 200,
                        padding: 10,
                      }}>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'black',
                          borderRadius: 5,
                        }}
                      />
                    </div> */}
                  </Tree>
                </Tree>
                <Tree name="hello" />
              </Tree>
              <Tree name="world" />
              <Tree name={<span>🙀 something something</span>} />
            </Tree>
            <Tree name="Outdoor Services" defaultOpen>
              <Tree name="hello" />
              <Tree name="subtree with children">
                <Tree name="hello" />
              </Tree>
            </Tree>
        </div>
    )
}

