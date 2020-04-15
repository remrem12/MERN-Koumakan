import React from 'react'
import UserLayout from '../../../HOC/user'
import ManageBrands from './manage_brands'
import ManageWoods from './manage_woods'



const ManageCategories = () => (
  <UserLayout>
    <ManageBrands/>
    <ManageWoods/>
  </UserLayout>
)

export default ManageCategories