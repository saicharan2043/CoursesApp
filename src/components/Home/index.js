import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cart from '../Cart'

import Header from '../Header'

import './index.css'

const HomePageStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {coursesList: [], status: HomePageStatus.loading}

  componentDidMount() {
    this.getCoursesData()
  }

  responseSuccess = () => {
    const {coursesList} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Courses</h1>
        <ul className="un-order-list">
          {coursesList.map(echValue => (
            <Cart courseItem={echValue} key={echValue.id} />
          ))}
        </ul>
      </div>
    )
  }

  retry = () => {
    this.getCoursesData()
  }

  responseFailure = () => (
    <div className="container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="img-failure"
        alt="failure view"
      />
      <h1 className="heading-failure">Oops! Something Went Wrong</h1>
      <p className="discription-failure">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="button" type="button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  lodering = () => (
    <div className="container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  getCoursesData = async () => {
    this.setState({status: HomePageStatus.loading})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.courses.map(echValue => ({
        logoUrl: echValue.logo_url,
        name: echValue.name,
        id: echValue.id,
      }))

      this.setState({coursesList: updateData, status: HomePageStatus.success})
    } else {
      this.setState({status: HomePageStatus.failure})
    }
  }

  displayCurrentStage = () => {
    const {status} = this.state
    switch (status) {
      case HomePageStatus.success:
        return this.responseSuccess()
      case HomePageStatus.failure:
        return this.responseFailure()
      case HomePageStatus.loading:
        return this.lodering()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.displayCurrentStage()}
      </>
    )
  }
}

export default Home
