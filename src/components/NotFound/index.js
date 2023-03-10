import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="img-failure"
      />
      <h1 className="heading-failure">Page Not Found</h1>
      <p className="discription-failure">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
