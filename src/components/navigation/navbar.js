import { useHistory } from 'react-router-dom';



function NavBar() {
    const history = useHistory();

    return (
        <div className='nav-container'>
            <nav className='navbar'>
                {/* <img src={'/black_stag.png'} className='logo' alt='black stag logo' onClick={() => history.push('/')} /> */}
                <h1 onClick={() => history.push('/')}>Black Stag General Contracting LLC</h1>
                <div className='nav-links'>
                    <button className='nav-button' onClick={() => history.push('/')}>Home</button>
                    {/* <button className='nav-button' onClick={() => history.push('/about')}>About</button> */}
                    <button className='nav-button' onClick={() => history.push('/services')}>Services</button>
                    <button className='nav-button' onClick={() => history.push('/contact')}>Contact</button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;