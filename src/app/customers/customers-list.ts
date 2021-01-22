

import {Customer} from './customers';


export const EMPLOY: Customer[] = JSON.parse(localStorage.getItem('allCustomerList')) || []
  
