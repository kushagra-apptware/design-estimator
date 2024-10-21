import Logo from '../assets/Logo.png'

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav>
        <a href="/">
        <img
          src={Logo}
         />
        </a>
      </nav>
    </div>
  )
}

export default Navbar
