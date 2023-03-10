import {Link} from 'react-router-dom'

import './index.css'

const Cart = props => {
  const {courseItem} = props
  const {name, id, logoUrl} = courseItem

  return (
    <li className="list">
      <Link className="link-cart" to={`/courses/${id}`}>
        <img src={logoUrl} className="log-item" alt={name} />
        <p className="name-course">{name}</p>
      </Link>
    </li>
  )
}

export default Cart
