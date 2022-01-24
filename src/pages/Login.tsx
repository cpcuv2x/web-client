import React from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import LoginForm from '../components/LoginForm'
import bus from '../images/bus.jpg'

const Login: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={2} md={4}></Col>
        <Col>
          <Image className="mb-5" src={bus} alt="bus image banner" fluid />
          <h2 className="mb-4">5G-V2X Dashboard</h2>
          <LoginForm />
        </Col>
        <Col sm={2} md={4}></Col>
      </Row>
    </Container>
  )
}

export default Login
