import React, { useState, useEffect } from 'react'

import Carousel from './src/Carousel'
import Carouselhook from './src/Carouselhook'

import './App.css'
import { useUncontrolled, uncontrollable } from 'uncontrollable'

function ControlledCarouselx() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(null)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
    setDirection(e.direction)
  }

  console.log('ControlledCarousel')

  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/703/800/400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/702/800/400"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/701/800/400"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

function ControlledCarousel() {
  // const [index, setIndex] = useState(0);
  // const [direction, setDirection] = useState(null);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  //   setDirection(e.direction);
  // };

  // console.log("ControlledCarousel");

  return (
    <div>
      <Carouselhook>
        <Carouselhook.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/703/800/400"
            alt="First slide"
          />
          <Carouselhook.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carouselhook.Caption>
        </Carouselhook.Item>
        <Carouselhook.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/702/800/400"
            alt="Second slide"
          />

          <Carouselhook.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carouselhook.Caption>
        </Carouselhook.Item>
        <Carouselhook.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/id/701/800/400"
            alt="Third slide"
          />

          <Carouselhook.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carouselhook.Caption>
        </Carouselhook.Item>
      </Carouselhook>
    </div>
  )
}

let BasicHook = React.forwardRef((props,ref) => {
  const {fake, onFake}=useUncontrolled(props,{
    fake:'onFake'
  })

  const click = () => {
    console.log('click')
    onFake("!props.fake")
  }

  useEffect(() => {
      console.log('eff',fake);
      
  })

  console.log("render",fake);
  

  return <div onClick={click}>basic{fake}</div>
})
BasicHook.defaultProps = {
  fake: true,
}
// BasicHook = uncontrollable(BasicHook, { fake: 'onFake' })

const App = () => {
  return (
    <div className="header">
      <ControlledCarousel />
      {/* <BasicHook /> */}
    </div>
  )
}

export default App
