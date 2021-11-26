import { useTransition, animated, useSpring, config } from '@react-spring/web';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

const images = [
    '/images/home_images/after_deck.png',
    '/images/home_images/deck.png',
    '/images/home_images/after_living_room.png',
    '/images/home_images/living_room.png',
    '/images/home_images/deck_after.png',
    '/images/home_images/deck_pre.png',
    '/images/home_images/sidewalk.png',
    '/images/home_images/sidewalk_grade.png',
    '/images/home_images/sidewalk_after.png',
    '/images/home_images/sidewalk_prep.png',
]

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.2
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;


export default function Home() {
    const history = useHistory();
    const ref = useRef(null);
    const [xys, set] = useState([0, 0, 1]);
    const props = useSpring({ xys, config: config.slow });


    const [state, setIndex] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
            if (state > images.length / 2 + 1) {
                setIndex(0);
            } else {
                setIndex(state + 2);
            }
        }, 6000);


        return () => clearInterval(interval);
    }, [state]);

    const transitions = useTransition(state, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 2000 }
    })


  return (
    <main className='home-main'>
        <h1>Welcome to the Black Stag</h1>
        <section className='home-header'>
            {transitions((style, index) => (
                <animated.div className='home-carousel' style={{ position: 'relative' }}>
                    <animated.img src={images[index]} alt='workers' style={{...style, position: 'absolute', right: '1vw', zIndex: '-1' }} />
                    <animated.img src={images[index + 1]} alt='workers' style={{...style, position: 'absolute', left: '1vw', zIndex: '-1'}} />
                </animated.div>
            ))}
        </section>
        <section className='home-content'>
            <div className='home-content-container'>
                <div className='home-content-text'>
                    <p>
                        We are a general contracting company that specializes in construction, landscaping / hardscaping and utilities for residential homes. 
                        Indoors or outdoors we are equipped to tackle any project from the start to finish. Specializing in
                        private contract work, we have a wide range of services that can be tailored to fit your needs. 
                    </p>
                    <p>
                        At Black Stag we are committed to providing the highest quality workmanship and customer service.
                        We are here to help you with your home project.
                    </p>
                </div>
                <div className='home-card' ref={ref}>
                    <animated.img 
                        src={'/business-card.png'} 
                        alt='business card' 
                        style={{ transform: props.xys.to(trans) }}
                        onMouseLeave={() => set([0, 0, 1])}
                        onMouseMove={(e) => {
                        const rect = ref.current.getBoundingClientRect();
                        set(calc(e.clientX, e.clientY, rect));
                        }}
                        onClick={() => history.push('/contact')}
                    />
                </div>
            </div>
        </section>
        <section className='home-footer'>
            <h1 onClick={() => history.push('/contact')}>Contact Us today to get started!</h1>
        </section>
    </main>
    );
}

