import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import notFound from '../images/not_found.jpg'

const NotFound = () => {
  return (
    <Container className="text-center">
      <Image src={notFound} fluid />
      <h1>Oops the page you were looking for doesn't exist!</h1>
      <Link to="/dashboards" className="fs-5">
        Back to the home page
      </Link>
    </Container>
  )
}

export default NotFound
