// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './';
// import '../orderManagement.css'
// import rooster from '../assets/rooster.png';

// function HistoryOfOrders() {
//   const [orders, setOrders] = useState([]);
//   const [sortAscending, setSortAscending] = useState(false);
//   const [editOrderId, setEditOrderId] = useState(null);
//   const [inputCode, setInputCode] = useState('');
//   const [searchCode, setSearchCode] = useState('');
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [activeOrderType, setActiveOrderType] = useState('All'); // Added state for active order type

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/api/orders');
//         console.log('Orders fetched:', response.data);

//         if (Array.isArray(response.data)) {
//           setOrders(response.data);
//           setFilteredOrders(response.data); // Initially, show all orders
//         } else {
//           console.error('Unexpected response data format:', response.data);
//           setOrders([]);
//           setFilteredOrders([]);
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setOrders([]);
//         setFilteredOrders([]);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const sortOrdersByDate = () => {
//     const sortedOrders = [...filteredOrders].sort((a, b) => {
//       return sortAscending 
//         ? new Date(b.bookingDate) - new Date(a.bookingDate) 
//         : new Date(a.bookingDate) - new Date(b.bookingDate);
//     });
//     setFilteredOrders(sortedOrders);
//     setSortAscending(!sortAscending);
//   };

//   const handleCompleteClick = (orderId) => {
//     setEditOrderId(orderId);
//     setInputCode('');
//   };

//   const handleCompleteSubmit = async (orderId, orderCode) => {
//     if (inputCode === orderCode) {
//       try {
//         await axios.delete(`http://localhost:3001/api/orders/${orderId}`);
//         console.log('Order deleted:', orderId);

//         setOrders(orders.filter((order) => order._id !== orderId));
//         setFilteredOrders(filteredOrders.filter((order) => order._id !== orderId));

//         setEditOrderId(null);
//       } catch (error) {
//         console.error('Error deleting order:', error);
//       }
//     } else {
//       alert('The entered code does not match the order code.');
//     }
//   };

//   const handleSearch = () => {
//     const filtered = orders.filter((order) =>
//       order.orderCode.includes(searchCode)
//     );
//     setFilteredOrders(filtered);
//   };

//   const handleFilterByType = (type) => {
//     setActiveOrderType(type);
//     if (type === 'All') {
//       setFilteredOrders(orders);
//     } else {
//       const filteredByType = orders.filter(order => order.orderType === type);
//       setFilteredOrders(filteredByType);
//     }
//   };

//   // Separate orders by type
//   const takeawayOrders = filteredOrders.filter(order => order.orderType === 'Takeaway');
//   const tableBookingOrders = filteredOrders.filter(order => order.orderType === 'Table Booking');
//   const homeDeliveryOrders = filteredOrders.filter(order => order.orderType === 'Home Delivery');

//   return (
//     <div className='abg'>
//       <div className='order-management-container'>
//         <div className='place'>
//           <img src={rooster} width={100} height={100} alt='Rooster Logo' />
//           <h2 className='hea'>History Of Orders</h2>
//         </div>
//         <hr /><br />
        
//         {/* Search and filter functionality */}
//         <div className='searchbar'>
//           <div className='search-bar'>
//           <input
//             type='text'
//             className='ip'
//             value={searchCode}
//             onChange={(e) => setSearchCode(e.target.value)}
//             placeholder='Search by order code'
//           />
//           <button onClick={handleSearch} className='btns'>Search</button>
//         </div>
//           <div className='shortitems'>
//             <button onClick={() => handleFilterByType('All')} className='btns'>All Orders</button>
//             <button onClick={() => handleFilterByType('Takeaway')} className='btns'>Takeaway Orders</button>
//             <button onClick={() => handleFilterByType('Table Booking')} className='btns'>Table Booking Orders</button>
//             <button onClick={() => handleFilterByType('Home Delivery')} className='btns'>Home Delivery Orders</button>
//           </div>
//         </div>
//         {/* <div className='search-bar'>
//           <input
//             type='text'
//             className='ip'
//             value={searchCode}
//             onChange={(e) => setSearchCode(e.target.value)}
//             placeholder='Search by order code'
//           />
//           <button onClick={handleSearch} className='btns'>Search</button>
//           <button onClick={() => handleFilterByType('All')} className='btns'>All Orders</button>
//           <button onClick={() => handleFilterByType('Takeaway')} className='btns'>Takeaway Orders</button>
//           <button onClick={() => handleFilterByType('Table Booking')} className='btns'>Table Booking Orders</button>
//           <button onClick={() => handleFilterByType('Home Delivery')} className='btns'>Home Delivery Orders</button>
//         </div> */}
        
//         {/* Takeaway Orders Table */}
//         {takeawayOrders.length > 0 && (
//           <div>
//             <h3>Takeaway Orders</h3>
//             <table className='orders-table'>
//               <thead>
//                 <tr>
//                   <th>User Name</th>
//                   <th>Items</th>
//                   <th>Total Amount</th>
//                   <th>Order Code</th>
//                   <th>Order Type</th>
//                   <th>Payment</th>
//                   <th>Phono</th>
//                   <th>Takwaway Time</th>
//                   <th>
//                     Order Date
//                     <button onClick={sortOrdersByDate} className='btns'>
//                       Sort by {sortAscending ? "Ascending" : "Descending"}
//                     </button>
//                   </th>
//                   <th>Completed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {takeawayOrders.map((order) => (
//                   <tr key={order._id}>
//                     <td>{order.username}</td>
//                     <td>
//                       {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
//                         <ul>
//                           {order.orderedItems.map((item, index) => (
//                             <li key={index}>
//                               {item.title} - ₹{item.price} x {item.quantity}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p>No items</p>
//                       )}
//                     </td>
//                     <td>₹{order.totalPrice}</td>
//                     <td>{order.orderCode}</td>
//                     <td>{order.orderType}</td>
//                     <td>{order.paymentStatus}</td>
//                     <td>{order.phone}</td>
//                     <td>{order.takeawayTime}</td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                     <td>
//                       {editOrderId === order._id ? (
//                         <div><center>
//                           <input 
//                             type="text" 
//                             value={inputCode} 
//                             className='ip'
//                             onChange={(e) => setInputCode(e.target.value)} 
//                             placeholder="Enter order code"
//                           /></center>
//                           <button onClick={() => handleCompleteSubmit(order._id, order.orderCode)} className='btns'>Submit</button>
//                         </div>
//                       ) : (
//                         <button onClick={() => handleCompleteClick(order._id)} className='btns'>
//                           Mark as Completed
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Table Booking Orders Table */}
//         {tableBookingOrders.length > 0 && (
//           <div>
//             <h3>Table Booking Orders</h3>
//             <table className='orders-table'>
//               <thead>
//                 <tr>
//                   <th>User Name</th>
//                   <th>Items</th>
//                   <th>Total Amount</th>
//                   <th>Order Code</th>
//                   <th>Order Type</th>
//                   <th>Selected Option</th>
//                   <th>Selected Date</th>
//                   <th>Phono</th>
//                   <th>Selected Time</th>
//                   <th>Payment</th>
//                   <th>
//                     Order Date
//                     <button onClick={sortOrdersByDate} className='btns'>
//                       Sort by {sortAscending ? "Ascending" : "Descending"}
//                     </button>
//                   </th>
//                   <th>Completed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableBookingOrders.map((order) => (
//                   <tr key={order._id}>
//                     <td>{order.username}</td>
//                     <td>
//                       {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
//                         <ul>
//                           {order.orderedItems.map((item, index) => (
//                             <li key={index}>
//                               {item.title} - ₹{item.price} x {item.quantity}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p>No items</p>
//                       )}
//                     </td>
//                     <td>₹{order.totalPrice}</td>
//                     <td>{order.orderCode}</td>
//                     <td>{order.orderType}</td>
//                     <td>{order.selectedOption}</td>
//                     <td>{order.phone}</td>
//                     <td>{order.selectedDate}</td>
//                     <td>{order.selectedTimes}</td>
//                     <td>{order.paymentStatus}</td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                     <td>
//                       {editOrderId === order._id ? (
//                         <div><center>
//                           <input 
//                             type="text" 
//                             value={inputCode} 
//                             className='ip'
//                             onChange={(e) => setInputCode(e.target.value)} 
//                             placeholder="Enter order code"
//                           /></center>
//                           <button onClick={() => handleCompleteSubmit(order._id, order.orderCode)} className='btns'>Submit</button>
//                         </div>
//                       ) : (
//                         <button onClick={() => handleCompleteClick(order._id)} className='btns'>
//                           Mark as Completed
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Home Delivery Orders Table */}
//         {homeDeliveryOrders.length > 0 && (
//           <div>
//             <h3>Home Delivery Orders</h3>
//             <table className='orders-table'>
//               <thead>
//                 <tr>
//                   <th>User Name</th>
//                   <th>Items</th>
//                   <th>Total Amount</th>
//                   <th>Order Code</th>
//                   <th>Order Type</th>
//                   <th>Payment</th>
//                   <th>Phono</th>
//                   <th>Takwaway Time</th>
//                   <th>
//                     Order Date
//                     <button onClick={sortOrdersByDate} className='btns'>
//                       Sort by {sortAscending ? "Ascending" : "Descending"}
//                     </button>
//                   </th>
//                   <th>Completed</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {homeDeliveryOrders.map((order) => (
//                   <tr key={order._id}>
//                     <td>{order.username}</td>
//                     <td>
//                       {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
//                         <ul>
//                           {order.orderedItems.map((item, index) => (
//                             <li key={index}>
//                               {item.title} - ₹{item.price} x {item.quantity}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <p>No items</p>
//                       )}
//                     </td>
//                     <td>₹{order.totalPrice}</td>
//                     <td>{order.orderCode}</td>
//                     <td>{order.orderType}</td>
//                     <td>{order.paymentStatus}</td>
//                     <td>{order.phone}</td>
//                     <td>{order.address}</td>
//                     <td>{new Date(order.createdAt).toLocaleString()}</td>
//                     <td>
//                       {editOrderId === order._id ? (
//                         <div><center>
//                           <input 
//                             type="text" 
//                             value={inputCode} 
//                             className='ip'
//                             onChange={(e) => setInputCode(e.target.value)} 
//                             placeholder="Enter order code"
//                           /></center>
//                           <button onClick={() => handleCompleteSubmit(order._id, order.orderCode)} className='btns'>Submit</button>
//                         </div>
//                       ) : (
//                         <button onClick={() => handleCompleteClick(order._id)} className='btns'>
//                           Mark as Completed
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* If no orders */}
//         {takeawayOrders.length === 0 && tableBookingOrders.length === 0 && homeDeliveryOrders.length === 0 && (
//           <p>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HistoryOfOrders;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../orderManagement.css';
import rooster from '../assets/rooster.png';

function HistoryOfOrders() {
  const [orders, setOrders] = useState([]);
  const [sortAscending, setSortAscending] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeOrderType, setActiveOrderType] = useState('All');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/history');
        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setFilteredOrders(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
        setFilteredOrders([]);
      }
    };

    fetchOrders();
  }, []);

  const sortOrdersByDate = () => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      return sortAscending
        ? new Date(b.bookingDate) - new Date(a.bookingDate)
        : new Date(a.bookingDate) - new Date(b.bookingDate);
    });
    setFilteredOrders(sortedOrders);
    setSortAscending(!sortAscending);
  };

  const handleSearch = () => {
    const filtered = orders.filter((order) =>
      order.orderCode.includes(searchCode)
    );
    setFilteredOrders(filtered);
  };

  const handleFilterByType = (type) => {
    setActiveOrderType(type);
    if (type === 'All') {
      setFilteredOrders(orders);
    } else {
      const filteredByType = orders.filter(order => order.orderType === type);
      setFilteredOrders(filteredByType);
    }
  };

  const takeawayOrders = filteredOrders.filter(order => order.orderType === 'Takeaway');
  const tableBookingOrders = filteredOrders.filter(order => order.orderType === 'Table Booking');
  const homeDeliveryOrders = filteredOrders.filter(order => order.orderType === 'Home Delivery');

  return (
    <div className='abg'>
      <div className='order-management-container'>
        <div className='place'>
          <img src={rooster} width={100} height={100} alt='Rooster Logo' />
          <h2 className='hea'>History Of Orders</h2>
        </div>
        <hr /><br />
        
        <div className='searchbar'>
          <div className='search-bar'>
            <input
              type='text'
              className='ip'
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder='Search by order code'
            />
            <button onClick={handleSearch} className='btns'>Search</button>
          </div>
          <div className='shortitems'>
            <button onClick={() => handleFilterByType('All')} className='btns'>All Orders</button>
            <button onClick={() => handleFilterByType('Takeaway')} className='btns'>Takeaway Orders</button>
            <button onClick={() => handleFilterByType('Table Booking')} className='btns'>Table Booking Orders</button>
            <button onClick={() => handleFilterByType('Home Delivery')} className='btns'>Home Delivery Orders</button>
          </div>
        </div>

        {takeawayOrders.length > 0 && (
          <div>
            <h3>Takeaway Orders</h3>
            <table className='orders-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Order Code</th>
                  <th>Order Type</th>
                  <th>Payment</th>
                  <th>Phone</th>
                  <th>Takeaway Time</th>
                  <th>
                    Order Date
                    {/* <button onClick={sortOrdersByDate} className='btns'>
                      Sort by {sortAscending ? "Ascending" : "Descending"}
                    </button> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {takeawayOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.username}</td>
                    <td>
                      {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
                        <ul>
                          {order.orderedItems.map((item, index) => (
                            <li key={index}>
                              {item.title} - ₹{item.price} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items</p>
                      )}
                    </td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.orderCode}</td>
                    <td>{order.orderType}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{order.phone}</td>
                    <td>{order.takeawayTime}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tableBookingOrders.length > 0 && (
          <div>
            <h3>Table Booking Orders</h3>
            <table className='orders-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Order Code</th>
                  <th>Order Type</th>
                  <th>Selected Option</th>
                  <th>Selected Date</th>
                  <th>Phone</th>
                  <th>Selected Time</th>
                  <th>Payment</th>
                  <th>
                    Order Date
                    {/* <button onClick={sortOrdersByDate} className='btns'>
                      Sort by {sortAscending ? "Ascending" : "Descending"}
                    </button> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableBookingOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.username}</td>
                    <td>
                      {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
                        <ul>
                          {order.orderedItems.map((item, index) => (
                            <li key={index}>
                              {item.title} - ₹{item.price} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items</p>
                      )}
                    </td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.orderCode}</td>
                    <td>{order.orderType}</td>
                    <td>{order.selectedOption}</td>
                    <td>{new Date(order.selectedDate).toLocaleDateString()}</td>
                    <td>{order.phone}</td>
                    <td>{order.selectedTimes}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {homeDeliveryOrders.length > 0 && (
          <div>
            <h3>Home Delivery Orders</h3>
            <table className='orders-table'>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th>Order Code</th>
                  <th>Order Type</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Payment</th>
                  <th>
                    Order Date
                    {/* <button onClick={sortOrdersByDate} className='btns'>
                      Sort by {sortAscending ? "Ascending" : "Descending"}
                    </button> */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {homeDeliveryOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.username}</td>
                    <td>
                      {Array.isArray(order.orderedItems) && order.orderedItems.length > 0 ? (
                        <ul>
                          {order.orderedItems.map((item, index) => (
                            <li key={index}>
                              {item.title} - ₹{item.price} x {item.quantity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No items</p>
                      )}
                    </td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.orderCode}</td>
                    <td>{order.orderType}</td>
                    <td>{order.address}</td>
                    <td>{order.phone}</td>
                    <td>{order.paymentStatus}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredOrders.length === 0 && <p>No orders found</p>}
      </div>
    </div>
  );
}

export default HistoryOfOrders;
