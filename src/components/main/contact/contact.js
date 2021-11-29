import { useForm, ValidationError } from '@formspree/react';
import { useState, useEffect } from 'react';

export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let err = [];

        if (name.length < 1) err.push({ name: "Please include your name"});
        if (email.length < 1) err.push({ email: "Please include a valid email"});
        if (!email.includes('@')) err.push({ email: "Please include a valid email"});
        if (message.length < 1) err.push({ message: "Please include a message"});

        setErrors(err);
        err = [];
    }, [name, email, message]);

    const [state, handleSubmit] = useForm("xgedwlzl");
    if (state.succeeded) {
        return <p>Thanks for joining!</p>;
    }

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
                    />
                    {errors.find(err => err.message) && <p className='error'>{errors.find(err => err.message).message}</p>}
                </div>
                <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                />
                <label className='upload'>
                    Attach a picture (optional)
                    <input className='upload-button' type="file" name="upload" onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <ValidationError
                    prefix="File"
                    field="upload"
                    errors={state.errors}
                />
                <label className='image-upload'>
                    Your Picture:
                    {image && <img src={URL.createObjectURL(image)} alt="uploaded" />}
                </label>
                <label htmlFor="preference">
                    How should we contact you?
                </label>
                <select id="preference" name="preference">
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="both">Both</option>
                </select>
                </div>
                <button className='submit' type="submit" disabled={errors.length || state.submitting ? true : false}>
                    Submit
                </button>
                {errors.length > 0 && <p className='warning'>Please fill out all fields</p>}
            </form>
            </div>
        </main>
    )

}