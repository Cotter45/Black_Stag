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
  useEffect(() => {
    ref.current = value
    return () => ref.current = false;
  }, [value])
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
            <h1>Some of the services we provide</h1>
            <Tree name="Indoor Services" defaultOpen>
              <div 
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'fit-content',
                  whiteSpace: 'initial',
                  textIndent: '25px',
                }}>
                <p>
                  We provide a variety of indoor services, we tried to be very inclusive 
                  with this list, but if there is anything you don't see here please
                  feel free to contact us and we will be happy to help.
                </p>
              </div>
              <Tree name="Painting">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <Tree name="Walls" />
                  <Tree name="Floors" />
                  <Tree name="Ceilings" />
                  <Tree name="Window Trim" />
                  <Tree name="Doors" />
                  <Tree name="Cabinets" />
                </div>
              </Tree>
              <Tree name="Flooring">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <Tree name="Wood" />
                  <Tree name="Tile" />
                  <Tree name="Carpet" />
                  <Tree name="Ceramic" />
                  <Tree name="Hardwood" />
                  <Tree name="Vinyl" />
                </div>
              </Tree>
              <Tree name="Kitchens">
                <div 
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                </div>
                <Tree name="Cabinets">
                  <div className='frame' style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <p>
                      We do not offer custom cabinets, but we do offer custom
                      alterations to existing cabinets or install and modify new cabinet sets.
                    </p>
                  </div>
                </Tree>
                <Tree name="Countertops">
                  <div className='frame' style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="Concrete" />
                    <Tree name="Butcher Block" />
                    <Tree name="Granite" />
                    <Tree name="Quartz" />
                    <Tree name="Laminate" />
                    <Tree name="Marble" />
                  </div>
                </Tree>
                <Tree name="Backsplashes">
                  <div className='frame' style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="Ceramic Tile" />
                    <Tree name="Porcelain Tile" />
                    <Tree name="Glass Tile" />
                    <Tree name="Stone Tile" />
                    <Tree name="Wood" />
                    <Tree name="Stainless Steel" />
                    <Tree name="Thermoplastic" />
                  </div>
                </Tree>
              </Tree>
              <Tree name="Bathrooms">
                <Tree name="Plumbing" />
                <Tree name="Showers" />
                <Tree name="Tile" />
                <Tree name="Toilets" />
                <Tree name="Vanities" />
              </Tree>
              <Tree name="Utility / Appliances">
                <Tree name="Sinks" />
                <Tree name="Dishwashers" />
                <Tree name="Refridgerators" />
                <Tree name="Ovens" />
                <Tree name="Washers and Dryers" />
                <Tree name="Utilities">
                  <div 
                    className='frame'
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="Water" />
                    <Tree name="Natural Gas" />
                    <Tree name="Sanitary" />
                    <Tree name="Electric" />
                  </div>    
                </Tree>
              </Tree>
              <Tree name="General Renovations">
                <Tree name="Junk Removal" />
                <Tree name="Plumbing" />
                <Tree name="Electrical" />
                <Tree name="Natural Gas" />
                <Tree name="Masonry" />
                <Tree name="Light Carpentry / Framing" />
                <Tree name="Insulation" />
                <Tree name="Drywall and Trim" />
                <Tree name="Railings and Stair treads" />
              </Tree>
            </Tree>
            <Tree name="Outdoor Services" defaultOpen>
              <div 
                className='frame'
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 'fit-content',
                  whiteSpace: 'initial',
                  textIndent: '25px',
                  padding: '5px',
                }}>
                <p>
                  We specialize in outdoor services, from tree and brush removal to 
                  fresh concrete patios, we have to tools and the skills to provide 
                  exceptional service.
                </p>
              </div>
              <Tree name="Landscaping">
                <Tree name="General Maintenance / Detailing">
                  <div
                    className='frame'
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="General Grading" />
                    <Tree name="Storm Drainage" />
                    <Tree name="Dirt Fill" />
                    <Tree name="Landscape Edging" />
                    <Tree name="Mulch" />
                  </div>
                </Tree>
                <Tree name="Tree Services">
                  <div
                    className='frame'
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="Tree Trimming" />
                    <Tree name="Tree Pruning" />
                    <Tree name="Tree Removal" />
                    <Tree name="Tree Installation" />
                  </div>
                </Tree>
                <Tree name="Garden Services">
                  <div
                    className='frame'
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 'fit-content',
                      whiteSpace: 'initial',
                      textIndent: '25px',
                      padding: '5px',
                    }}>
                    <Tree name="Garden Maintenance" />
                    <Tree name="Garden Cleaning" />
                    <Tree name="Garden Design" />
                    <Tree name="Garden Installation" />
                  </div>
                </Tree>
                <Tree name="Brush Removal" />
                <Tree name="Irrigation" />
              </Tree>
              <Tree name="Fence Services">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <Tree name="Fence Maintenance" />
                  <Tree name="Fence Cleaning" />
                  <Tree name="Fence Installation">
                    <div
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px'
                      }}>
                        <Tree name="Chain Link" />
                        <Tree name="Wooden" />
                        <Tree name="Metal" />
                        <Tree name="Vinyl" />
                      </div>
                  </Tree>
                </div>
              </Tree>
              <Tree name="Hardscaping">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <Tree name="Patio Services">
                    <div
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px',
                      }}>
                      <Tree name="Patio Maintenance" />
                      <Tree name="Patio Cleaning" />
                      <Tree name="Patio Installation">
                        <div
                          className='frame'
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'fit-content',
                            whiteSpace: 'initial',
                            textIndent: '25px',
                            padding: '5px',
                          }}>
                          <Tree name="Concrete" />
                          <Tree name="Wood" />
                          <Tree name="Brick" />
                          <Tree name="Pavers" />
                          <Tree name="Pervious Pavers" />
                          <Tree name="Flagstone Patios" />
                        </div>
                      </Tree>
                    </div>
                  </Tree>
                  <Tree name="Walkways">
                    <div
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px',
                      }}>
                      <Tree name="Paver" />
                      <Tree name="Stone" />
                      <Tree name="Pervious Paver" />
                      <Tree name="Flagstone" />
                      <Tree name="Masonry" />
                    </div>
                  </Tree>
                  <Tree name="Retaining Walls">
                    <div
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px',
                      }}>
                      <Tree name="Stacked Stone" />
                      <Tree name="Segmented Block" />
                      <Tree name="Masonry" />
                      <Tree name="Timber" />
                    </div>
                  </Tree>
                </div>
              </Tree>
              <Tree name="Paving Services">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <Tree name="Driveways">
                    <div  
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px',
                      }}>
                      <Tree name="Driveway Maintenance" />
                      <Tree name="Driveway Cleaning" />
                      <Tree name="Seal Coating" />
                      <Tree name="Driveway Installation">
                        <div  
                        className='frame'
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: 'fit-content',
                          whiteSpace: 'initial',
                          textIndent: '25px',
                          padding: '5px',
                        }}>
                        <Tree name="Concrete" />
                        <Tree name="Blacktop" />
                        <Tree name="Pavers" />
                        <Tree name="Eco Stone" />
                        <Tree name="Gravel" />
                      </div>
                      </Tree>
                    </div>  
                  </Tree>
                </div>
              </Tree>
              <Tree name="Pool Services">
                <div
                  className='frame'
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 'fit-content',
                    whiteSpace: 'initial',
                    textIndent: '25px',
                    padding: '5px',
                  }}>
                  <p>
                    We can provide pool services for all types of landscaping. For example:
                  </p>
                  <Tree name="Pool Maintenance" />
                  <Tree name="Above Ground Pool Installation" />
                  <Tree name="Pool Amenities Installation">
                    <div
                      className='frame'
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: 'fit-content',
                        whiteSpace: 'initial',
                        textIndent: '25px',
                        padding: '5px',
                      }}>
                      <Tree name="Decking">
                        <div
                          className='frame'
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: 'fit-content',
                            whiteSpace: 'initial',
                            textIndent: '25px',
                            padding: '5px',
                          }}>
                            <Tree name="Wood" />
                            <Tree name="Trex" />
                      </div>
                      </Tree>
                    </div>
                  </Tree>
                </div>
              </Tree>
            </Tree>
        </div>
    )
}
