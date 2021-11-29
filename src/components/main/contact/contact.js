import { useForm, ValidationError } from '@formspree/react';
import { useState, useEffect, useRef, useMemo, MouseEvent } from 'react';
import { useTransition, animated } from '@react-spring/web';

let id = 0;

function MessageHub({
    config = { tension: 125, friction: 20, precision: 0.1 },
    timeout = 5000,
    children,
}) {
    const refMap = useMemo(() => new WeakMap(), []);
    const cancelMap = useMemo(() => new WeakMap(), []);
    const [items, setItems] = useState([]);

    const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: item => item.key,
    enter: item => async (next, cancel) => {
      cancelMap.set(item, cancel)
      await next({ opacity: 1, height: refMap.get(item).offsetHeight })
      await next({ life: '0%' })
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (result, ctrl, item) => {
      setItems(state =>
        state.filter(i => {
          return i.key !== item.key
        })
      )
    },
    config: (item, index, phase) => key => phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  })

  useEffect(() => {
    children((msg) => {
      setItems(state => [...state, { key: id++, msg }])
    })
  }, [])

  return (
    <div className='message-container'>
      {transitions(({ life, ...style }, item) => (
        <animated.div className='message' style={style}>
          <div className='message-content' ref={(ref) => ref && refMap.set(item, ref)}>
            <animated.div className='message-life' style={{ right: life }} />
            <p>{item.msg}</p>
            <button
              className='message-button'
              onClick={(e) => {
                e.stopPropagation()
                if (cancelMap.has(item) && life.get() !== '0%') cancelMap.get(item)()
              }}>
            </button>
          </div>
        </animated.div>
      ))}
    </div>
  )
}


export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    // const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState(false);

    const ref = useRef(null);

    const handleClick = () => {
        ref.current?.('Thank you! Expect a reply within 24 hours.');
        setName('');
        setEmail('');
        setMessage('');
        setSuccess(true);
    }

    useEffect(() => {
        let err = [];

        if (name.length < 1) err.push({ name: "Please include your name"});
        if (email.length < 1) err.push({ email: "Please include a valid email"});
        if (!email.includes('@')) err.push({ email: "Please include a valid email"});
        if (message.length < 1) err.push({ message: "Please include a message"});

        if (!success) setErrors(err);
        err = [];
    }, [name, email, message, success]);

    const [state, handleSubmit] = useForm("xgedwlzl");
    // if (state.succeeded) {
    //     return (
    //         <div className="contact-main">
    //             <div className="contact-container">
    //                 <h1>Thank you for your message!</h1>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <main className='contact-main'>
            <div className='contact-container'>
            <h1>Contact Us</h1>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='contact-form'>
                <label htmlFor="name">
                    Name
                </label>
                <div>
                    <input
                        id="name"
                        type="text" 
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onClick={() => setSuccess(false)}
                        />
                    {errors.find(err => err.name) && <p className='error'>{errors.find(err => err.name).name}</p>}
                </div>
                <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                />
                <label htmlFor="email">
                    Email Address
                </label>
                <div>
                    <input
                        id="email"
                        type="email" 
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onClick={() => setSuccess(false)}
                    />
                    {errors.find(err => err.email) && <p className='error'>{errors.find(err => err.email).email}</p>}
                </div>
                <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                />
                <label htmlFor="message">
                    Tell us about your project
                </label>
                <div>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onClick={() => setSuccess(false)}
                    />
                    {errors.find(err => err.message) && <p className='error'>{errors.find(err => err.message).message}</p>}
                </div>
                <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                />
                {/* <label className='upload'>
                    Attach a picture (optional)
                    <input className='upload-button' type="file" name="upload" onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <ValidationError
                    prefix="File"
                    field="upload"
                    errors={state.errors}
                /> */}
                {/* <label className='image-upload'>
                    Your Picture:
                    {image && <img src={URL.createObjectURL(image)} alt="uploaded" />}
                </label> */}
                <label htmlFor="preference">
                    How should we contact you?
                </label>
                <select id="preference" name="preference">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                </select>
                </div>
                <button onClick={handleClick} className='submit' type="submit" disabled={errors.length || state.submitting ? true : false}>
                    Submit
                    <MessageHub children={add => ref.current = add} />
                </button>
                {errors.length > 0 && <p className='warning'>Please fill out all fields</p>}
                {success && <p className='success'>Thank you for your message!</p>}
            </form>
            </div>
        </main>
    )

}
