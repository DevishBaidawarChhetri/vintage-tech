// submit order
import axios from 'axios';
import url from '../utils/URL';

const submitOrder = async ({ name, total, items, stripeTokenId, userToken }) => {
  const response = await axios
    .post(`${url}/orders`,
      {
        // datas
        name,
        total,
        items,
        stripeTokenId
      },
      {
        // Headers
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
    .catch(e => console.log(e))
  return response;
}

export default submitOrder;