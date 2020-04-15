import React from 'react'
import moment from 'moment'
const UserHistoryBlock = (props) => {

  const renderBlock = () => (
    props.products ? 
      props.products.map((product, i) => (
        <tr key = {i}>
          <td>{moment(product.dateOfPurchase).format("MM-DD-YYYY")}</td>
          <td>{product.brand} {product.name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
        </tr>
      ))
    : null
  )

  return(
    <div className = 'history_block'>
      <table>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {renderBlock()}
        </tbody>
      </table>
    </div>
  )
}

export default UserHistoryBlock