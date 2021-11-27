import { useHistory } from 'react-router-dom';



function NavBar({ footer }) {
    const history = useHistory();

    return (
        <div className={footer ? 'reverse-nav' : 'nav-container'}>
            <nav className={footer ? 'reverse-navbar' : 'navbar'}>
                {/* <img src={'/black_stag.png'} className='logo' alt='black stag logo' onClick={() => history.push('/')} /> */}
                {!footer && (
                    <h1 onClick={() => history.push('/')}>Black Stag General Contracting LLC</h1>
                )}
                <div className='nav-links'>
                    <button className={footer ? 'reverse-button' : 'nav-button'} onClick={() => history.push('/')}>Home</button>
                    {/* <button className='nav-button' onClick={() => history.push('/about')}>About</button> */}
                    <button className={footer ? 'reverse-button' : 'nav-button'} onClick={() => history.push('/services')}>Services</button>
                    <button className={footer ? 'reverse-button' : 'nav-button'} onClick={() => history.push('/contact')}>Contact</button>
                </div>
                {footer && (
                    <h1 onClick={() => history.push('/contact')}>Contact Us today to get started!</h1>
                )}
            </nav>
        </div>
    )
}

export default NavBar;