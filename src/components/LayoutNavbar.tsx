import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LogoutButton from './LogoutButton'

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
    <Navbar bg="light" expand="sm">
      <Container className="m-0 px-4" fluid>
        <Navbar.Brand href="/dashboards">5G-V2X</Navbar.Brand>
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
