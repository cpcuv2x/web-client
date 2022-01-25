import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LogoutButton from './LogoutButton'
import busLogo from '../images/bus_logo.jpg'

interface Props {}

const LayoutNavbar = (props: Props) => {
  const { pathname } = useLocation()
  const menus = [
    { label: 'Map', href: '/map' },
    { label: 'Cars', href: '/cars' },
    { label: 'Drivers', href: '/drivers' },
    { label: 'Dashboards', href: '/dashboards' },
  ]

  return (
    <Navbar expand="sm" bg="dark" variant="dark">
      <Container className="m-0 px-4" fluid>
        <Navbar.Brand href="/dashboards">
          <Image src={busLogo} alt="logo" roundedCircle width={52} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {menus.map(({ label, href }) => (
              <Nav.Link key={label} href={href} active={href === pathname}>
                {label}
              </Nav.Link>
            ))}
          </Nav>
          <LogoutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default LayoutNavbar
