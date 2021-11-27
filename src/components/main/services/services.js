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
            <h1>Some of our most popular services</h1>
            <Tree name="Indoor Services" defaultOpen>
              <Tree name="Painting">
                <Tree name="Walls" />
                <Tree name="Flooring" />
                <Tree name="Ceiling" />
                <Tree name="Windows" />
                <Tree name="Doors" />
                <Tree name="Cabinets" />
              </Tree>
              <Tree name="Flooring">
                <Tree name="Vinyl / Laminate">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Vinyl is a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
                <Tree name="Tile">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Tile is a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
                <Tree name="Carpet">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Carpet is a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
                <Tree name="Hardwood">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Hardwood is a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
              </Tree>
              <Tree name="Kitchens">
                <Tree name="Cabinets">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Cabinets are a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
                <Tree name="Countertops">
                  <div style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      padding: 10,
                      whiteSpace: 'initial',
                    }}>
                    <p>
                      Countertops are a popular flooring material that is easy to install and easy to maintain.
                    </p>
                  </div>
                </Tree>
                <Tree name="Utility / Appliances">
                  <Tree name="Sinks" />
                  <Tree name="Dishwashers" />
                  <Tree name="Fridges" />
                  <Tree name="Ovens" />
                </Tree>
                <Tree name="Backsplashes">
                  <Tree name="Tile" />
                  <Tree name="Vinyl" />
                  <Tree name="Laminate" />
                  <Tree name="Shiplap" />
                  <Tree name="Brick / Mason stone" />
                </Tree>
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

