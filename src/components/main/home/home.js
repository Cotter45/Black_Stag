import { useTransition, animated, useSpring, config } from '@react-spring/web';
import { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../navigation/navbar';

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

const webpImages = [
    '/images/home_images/after_deck.webp',
    '/images/home_images/deck.webp',
    '/images/home_images/after_living_room.webp',
    '/images/home_images/living_room.webp',
    '/images/home_images/deck_after.webp',
    '/images/home_images/deck_pre.webp',
    '/images/home_images/sidewalk.webp',
    '/images/home_images/sidewalk_grade.webp',
    '/images/home_images/sidewalk_after.webp',
    '/images/home_images/sidewalk_prep.webp',
]

const calc = (x, y, rect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.2
];

const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}

preloadImages(images);
preloadImages(webpImages);

export default function Home() {
    const history = useHistory();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const [xys, set] = useState([0, 0, 1]);
    const [xys2, set2] = useState([0, 0, 1]);
    const [xys3, set3] = useState([0, 0, 1]);
    const props = useSpring({ xys, config: config.slow });
    const props2 = useSpring({ xys2, config: config.slow });
    const props3 = useSpring({ xys3, config: config.slow });


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
        {/* <h1>Welcome to the Black Stag</h1> */}
        <section className='home-header'>
            <h1 className='left'>Recent project highlights</h1>
            {transitions((style, index) => (
                <animated.div className='home-carousel' style={{ position: 'relative' }}>
                    <picture>
                        <source srcSet={webpImages[index]} type='image/webp' />
                        <source srcSet={images[index]} type='image/png' />
                        <animated.img height='400px' width='400px' src={images[index]} alt='workers' style={{...style, position: 'absolute', right: '1vw', zIndex: '-1' }} />
                    </picture>
                    <picture>
                        <source srcSet={webpImages[index + 1]} type='image/webp' />
                        <source srcSet={images[index + 1]} type='image/png' />
                        <animated.img height='400px' width='400px' src={images[index + 1]} alt='workers' style={{...style, position: 'absolute', left: '1vw', zIndex: '-1'}} />
                    </picture>
                </animated.div>
            ))}
        </section>
        <section className='home-content'>
            <h2 className='right'>About Black Stag Contracting</h2>
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
                <div className='home-card' ref={ref1}>
                    <animated.img 
                        src={'/business-card.png'} 
                        alt='business card' 
                        style={{ transform: props.xys.to(trans) }}
                        onMouseLeave={() => set([0, 0, 1])}
                        onMouseMove={(e) => {
                            const rect = ref1.current.getBoundingClientRect();
                            set(calc(e.clientX, e.clientY, rect));
                        }}
                        onClick={() => history.push('/contact')}
                    />
                </div>
            </div>
            <h2 className='left'>From the owner</h2>
            <div className='home-content-container'>
                <div className='home-card' ref={ref2}>
                    <animated.img 
                        src={'/pat.png'} 
                        alt='the beginning' 
                        style={{ transform: props2.xys2.to(trans) }}
                        onMouseLeave={() => set2([0, 0, 1])}
                        onMouseEnter={(e) => {
                            // const rect = ref2.current.getBoundingClientRect();
                            // set2(calc(e.clientX, e.clientY, rect));
                            set2([0, 0, 1.2]);
                        }}
                        onClick={() => history.push('/contact')}
                    />
                </div>
                <div className='home-content-text2'>
                    <p>
                        I started my career in the construction industry in 2011, working my way up specializing in blacktop, concrete and natural gas.
                        I have worked on a variety of construction projects, from small homes, large multi-family buildings to large commercial and civil projects.
                        I have a passion for building and maintaining beautiful homes and landscapes.
                    </p>
                    <p>
                        With my years of experience, I have a strong understanding of the industry and the needs of the client.
                        I am able to provide a professional service that is tailored to your needs.
                    </p>
                </div>
            </div>
            <h2 className='right'>Have an idea for your next project?</h2>
            <div className='home-content-container1'>
                <div className='home-content-text'>
                    <p>
                        We are here to help! Especially over the last couple of years, there have been major changes in the way we work. We are committed 
                        to providing a safe, covid-19 aware environment for our clients and employees. 
                    </p>
                    <p>
                        An estimate can be provided within 24 hours, and depending on the project: completely remotely. Our <Link className='link' to='/contact'>contact</Link> page
                        provides options for how you'd like us to contact you for a quote, as well as room for you to provide us with any additional information.
                    </p>
                </div>
                <div className='home-card' ref={ref3}>
                    <animated.img 
                        src={'/covid.png'} 
                        alt='stay safe together' 
                        style={{ transform: props3.xys3.to(trans) }}
                        onMouseLeave={() => set3([0, 0, 1])}
                        onMouseEnter={(e) => {
                            // const rect = ref2.current.getBoundingClientRect();
                            // set2(calc(e.clientX, e.clientY, rect));
                            set3([0, 0, 1.2]);
                        }}
                        onClick={() => window.open("https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html", "_blank")}
                    />
                </div>
            </div>
            {/* <section className='home-footer'>
                <h1 onClick={() => history.push('/contact')}>Contact Us today to get started!</h1>
            </section> */}
            <NavBar footer={true} />
        </section>
    </main>
    );
}

