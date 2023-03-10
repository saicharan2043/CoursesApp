import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const singleItemDisplayStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class CartItem extends Component {
  state = {cartItemDetail: {}, statusOfCart: singleItemDisplayStatus.loading}

  componentDidMount() {
    this.getSingleCourseData()
  }

  responseSuccessInCart = () => {
    const {cartItemDetail} = this.state
    console.log(cartItemDetail)
    const {imageUrl, name, description} = cartItemDetail
    return (
      <div className="container">
        <div className="cart-container">
          <img src={imageUrl} className="img" alt={name} />
          <div className="right-container">
            <h1 className="heading-cart">{name}</h1>
            <p className="discription">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  retry = () => {
    this.getSingleCourseData()
  }

  responseFailureOfCart = () => (
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

  displayCartCurrent = () => {
    const {statusOfCart} = this.state
    switch (statusOfCart) {
      case singleItemDisplayStatus.success:
        return this.responseSuccessInCart()
      case singleItemDisplayStatus.failure:
        return this.responseFailureOfCart()
      case singleItemDisplayStatus.loading:
        return this.lodering()
      default:
        return null
    }
  }

  getSingleCourseData = async () => {
    this.setState({statusOfCart: singleItemDisplayStatus.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    // const id = '736d1108-d98b-482f-bfd6-234498c3571f'
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        id: data.course_details.id,
        description: data.course_details.description,
      }
      console.log(updateData)
      this.setState({
        cartItemDetail: updateData,
        statusOfCart: singleItemDisplayStatus.success,
      })
    } else {
      this.setState({statusOfCart: singleItemDisplayStatus.failure})
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.displayCartCurrent()}
      </>
    )
  }
}

export default CartItem
