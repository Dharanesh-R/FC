// // // import React, { useState } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import { toast, ToastContainer } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import './BookTable.css'; // Make sure to import the CSS file

// // // const BookTable = () => {
// // //   const { state } = useLocation();
// // //   const navigate = useNavigate();
  
// // //   const [showCart, setShowCart] = useState(false);
// // //   const [role, setRole] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [phone, setPhone] = useState('');

// // //   // Extract cart and total amount from state
// // //   const cartItems = state?.cart || [];
// // //   const totalWithGST = state?.totalWithGST || 0;

// // //   const validatePhone = (phone) => {
// // //     const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
// // //     return phoneRegex.test(phone);
// // //   };

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();

// // //     if (!role || !email || !phone) {
// // //       toast.error('Please fill in all fields.');
// // //       return;
// // //     }

// // //     if (!validatePhone(phone)) {
// // //       toast.error('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
// // //       return;
// // //     }

// // //     // Store user details in local storage
// // //     localStorage.setItem('userDetails', JSON.stringify({ role, email, phone }));

// // //     // Set default payment type as GPay
// // //     const paymentType = 'GPay';

// // //     // Navigate to the payment selection page with the selected payment type
// // //     navigate('/payment', { 
// // //       state: { 
// // //         role, 
// // //         email, 
// // //         phone, 
// // //         cart: cartItems, 
// // //         totalWithGST, 
// // //         paymentType // Pass the payment type here
// // //       } 
// // //     });
// // //   };

// // //   return (
// // //     <div className="book-table-container">
// // //       <h2>Cart Details</h2>

// // //       <button className="toggle-cart" onClick={() => setShowCart(!showCart)}>
// // //         {showCart ? 'Hide Cart' : 'Show Cart'}
// // //       </button>

// // //       {showCart && (
// // //         <div className="cart-details">
// // //           <h3>Cart Details:</h3>
// // //           <table className="cart-table">
// // //             <thead>
// // //               <tr>
// // //                 <th>Item</th>
// // //                 <th>Quantity</th>
// // //                 <th>Price per Item</th>
// // //                 <th>Total</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {cartItems.length > 0 ? (
// // //                 cartItems.map((item, index) => (
// // //                   <tr key={index}>
// // //                     <td>{item.title}</td>
// // //                     <td>{item.quantity}</td>
// // //                     <td>₹{item.price.toFixed(2)}</td>
// // //                     <td>₹{(item.price * item.quantity).toFixed(2)}</td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td colSpan="4">No items in the cart.</td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //           <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>
// // //         </div>
// // //       )}

// // //       <div className="user-details">
// // //         <h3>Enter Your Details:</h3>
// // //         <form onSubmit={handleSubmit}>
// // //           <label>
// // //             Role:
// // //             <select
// // //               value={role}
// // //               onChange={(e) => setRole(e.target.value)}
// // //               required
// // //             >
// // //               <option value="" disabled>Select your role</option>
// // //               <option value="Student">Student</option>
// // //               <option value="Staff">Staff</option>
// // //             </select>
// // //           </label>
// // //           <label>
// // //             Email:
// // //             <input
// // //               type="email"
// // //               value={email}
// // //               onChange={(e) => setEmail(e.target.value)}
// // //               required
// // //             />
// // //           </label>
// // //           <label>
// // //             Phone:
// // //             <input
// // //               type="tel"
// // //               value={phone}
// // //               onChange={(e) => setPhone(e.target.value)}
// // //               required
// // //             />
// // //           </label>
// // //           <button type="submit">Proceed to Payment</button>
// // //         </form>
// // //       </div>

// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // };

// // // export default BookTable;


// // import React, { useState } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import './BookTable.css'; // Make sure to import the CSS file

// // const BookTable = () => {
// //   const { state } = useLocation();
// //   const navigate = useNavigate();
  
// //   const [showCart, setShowCart] = useState(false);
// //   const [role, setRole] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [deliveryType, setDeliveryType] = useState(''); // New state for delivery type

// //   // Extract cart and total amount from state
// //   const cartItems = state?.cart || [];
// //   const totalWithGST = state?.totalWithGST || 0;

// //   const validatePhone = (phone) => {
// //     const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
// //     return phoneRegex.test(phone);
// //   };

// //   // const handleSubmit = (e) => {
// //   //   e.preventDefault();

// //   //   if (!role || !email || !phone || !deliveryType) {
// //   //     toast.error('Please fill in all fields, including delivery type.');
// //   //     return;
// //   //   }

// //   //   if (!validatePhone(phone)) {
// //   //     toast.error('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
// //   //     return;
// //   //   }

// //   //   // Store user details in local storage
// //   //   localStorage.setItem('userDetails', JSON.stringify({ role, email, phone }));

// //   //   // Set default payment type as GPay
// //   //   const paymentType = 'GPay';

// //   //   // Navigate to the payment selection page with the selected payment type and delivery type
// //   //   navigate('/payment', { 
// //   //     state: { 
// //   //       role, 
// //   //       email, 
// //   //       phone, 
// //   //       deliveryType, // Pass the delivery type here
// //   //       cart: cartItems, 
// //   //       totalWithGST, 
// //   //       paymentType // Pass the payment type here
// //   //     } 
// //   //   });
// //   // };

// //    // Inside your BookTable component
// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   if (!role || !email || !phone || !deliveryType) {
// //     toast.error('Please fill in all fields, including delivery type.');
// //     return;
// //   }

// //   if (!validatePhone(phone)) {
// //     toast.error('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
// //     return;
// //   }

// //   // Store user details in local storage
// //   localStorage.setItem('userDetails', JSON.stringify({ role, email, phone }));

// //   // Prepare data to send
// //   const userDetails = {
// //     role,
// //     email,
// //     phone,
// //     deliveryType,
// //     cart: cartItems,
// //     totalWithGST,
// //     paymentType: 'GPay', // Set default payment type
// //   };

// //   try {
// //     // Send user details to the backend
// //     await axios.post('http://localhost:5000/api/save-order', userDetails);
// //     navigate('/payment', { 
// //       state: { 
// //         role, 
// //         email, 
// //         phone, 
// //         deliveryType, 
// //         cart: cartItems, 
// //         totalWithGST, 
// //         paymentType: 'GPay'
// //       } 
// //     });
// //   } catch (error) {
// //     toast.error('Error saving user details: ' + error.message);
// //   }
// // };

// //   return (
// //     <div className="book-table-container">
// //       <h2>Cart Details</h2>

// //       <button className="toggle-cart" onClick={() => setShowCart(!showCart)}>
// //         {showCart ? 'Hide Cart' : 'Show Cart'}
// //       </button>

// //       {showCart && (
// //         <div className="cart-details">
// //           <h3>Cart Details:</h3>
// //           <table className="cart-table">
// //             <thead>
// //               <tr>
// //                 <th>Item</th>
// //                 <th>Quantity</th>
// //                 <th>Price per Item</th>
// //                 <th>Total</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {cartItems.length > 0 ? (
// //                 cartItems.map((item, index) => (
// //                   <tr key={index}>
// //                     <td>{item.title}</td>
// //                     <td>{item.quantity}</td>
// //                     <td>₹{item.price.toFixed(2)}</td>
// //                     <td>₹{(item.price * item.quantity).toFixed(2)}</td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="4">No items in the cart.</td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //           <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>
// //         </div>
// //       )}

// //       <div className="user-details">
// //         <h3>Enter Your Details:</h3>
// //         <form onSubmit={handleSubmit}>
// //           <label>
// //             Role:
// //             <select
// //               value={role}
// //               onChange={(e) => setRole(e.target.value)}
// //               required
// //             >
// //               <option value="" disabled>Select your role</option>
// //               <option value="Student">Student</option>
// //               <option value="Staff">Staff</option>
// //             </select>
// //           </label>
// //           <label>
// //             Email:
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Phone:
// //             <input
// //               type="tel"
// //               value={phone}
// //               onChange={(e) => setPhone(e.target.value)}
// //               required
// //             />
// //           </label>
// //           <label>
// //             Delivery Type:
// //             <select
// //               value={deliveryType}
// //               onChange={(e) => setDeliveryType(e.target.value)}
// //               required
// //             >
// //               <option value="" disabled>Select delivery type</option>
// //               <option value="Parcel">Parcel</option>
// //               <option value="Dining">Dining</option>
// //             </select>
// //           </label>
// //           <button type="submit">Proceed to Payment</button>
// //         </form>
// //       </div>

// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default BookTable;








// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './BookTable.css'; // Import the CSS file

// const BookTable = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [showCart, setShowCart] = useState(false);
//   const [role, setRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [deliveryType, setDeliveryType] = useState('');

//   const cartItems = state?.cart || [];
//   const totalWithGST = state?.totalWithGST || 0;

//   const validatePhone = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
//     return phoneRegex.test(phone);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!role || !email || !phone || !deliveryType) {
//       toast.error('Please fill in all fields.');
//       return;
//     }

//     if (!validatePhone(phone)) {
//       toast.error('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
//       return;
//     }

//     // Prepare data to pass to PaymentPage
//     const userDetails = {
//       role,
//       email,
//       phone,
//       deliveryType,
//       cart: cartItems,
//       totalWithGST,
//       paymentType: 'GPay', // Set default payment type
//     };

//     // Navigate to the payment page with user details
//     navigate('/payment', { 
//       state: userDetails // Pass all necessary details directly
//     });
//   };

//   return (
//     <div className="book-table-container">
//       <h2>Cart Details</h2>

//       <button className="toggle-cart" onClick={() => setShowCart(!showCart)}>
//         {showCart ? 'Hide Cart' : 'Show Cart'}
//       </button>

//       {showCart && (
//         <div className="cart-details">
//           <h3>Cart Details:</h3>
//           <table className="cart-table">
//             <thead>
//               <tr>
//                 <th>Item</th>
//                 <th>Quantity</th>
//                 <th>Price per Item</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.length > 0 ? (
//                 cartItems.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.title}</td>
//                     <td>{item.quantity}</td>
//                     <td>₹{item.price.toFixed(2)}</td>
//                     <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No items in the cart.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//           <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>
//         </div>
//       )}

//       <div className="user-details">
//         <h3>Enter Your Details:</h3>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Role:
//             <select value={role} onChange={(e) => setRole(e.target.value)} required>
//               <option value="" disabled>Select your role</option>
//               <option value="Student">Student</option>
//               <option value="Staff">Staff</option>
//             </select>
//           </label>
//           <label>
//             Email:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </label>
//           <label>
//             Phone:
//             <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           </label>
//           <label>
//             Delivery Type:
//             <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} required>
//               <option value="" disabled>Select delivery type</option>
//               <option value="Parcel">Parcel</option>
//               <option value="Dining">Dining</option>
//             </select>
//           </label>
//           <button type="submit">Proceed to Payment</button>
//         </form>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default BookTable;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookTable.css'; // Import the CSS file

const BookTable = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showCart, setShowCart] = useState(false);
  const [username, setUsername] = useState(''); // New state for username
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState('');

  const cartItems = state?.cart || [];
  const totalWithGST = state?.totalWithGST || 0;

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number validation
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!username || !role || !email || !phone || !deliveryType) {
      toast.error('Please fill in all fields.');
      return;
    }
  
    if (!validatePhone(phone)) {
      toast.error('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9.');
      return;
    }
  
    // Prepare data to pass to PaymentPage
    const userDetails = {
      username,
      role,
      email,
      phone,
      deliveryType, // Include deliveryType
      cart: cartItems,
      totalWithGST,
      paymentType: 'GPay', // Set default payment type
    };
  
    // Navigate to the payment page with user details
    navigate('/payment', { 
      state: userDetails 
    });
  };
  

  return (
    <div className="book-table-container">
      <h2>Cart Details</h2>

      <button className="toggle-cart" onClick={() => setShowCart(!showCart)}>
        {showCart ? 'Hide Cart' : 'Show Cart'}
      </button>

      {showCart && (
        <div className="cart-details">
          <h3>Cart Details:</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price per Item</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No items in the cart.</td>
                </tr>
              )}
            </tbody>
          </table>
          <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>
        </div>
      )}

      <div className="user-details">
        <h3>Enter Your Details:</h3>
        <form onSubmit={handleSubmit}>
          {/* Username input above the role selection */}
          <div>
            <label>
              Username:
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </label>
          </div>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="" disabled>Select your role</option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Phone:
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>
          <label>
            Delivery Type:
            <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} required>
              <option value="" disabled>Select delivery type</option>
              <option value="Parcel">Parcel</option>
              <option value="Dining">Dining</option>
            </select>
          </label>
          <button type="submit">Proceed to Payment</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default BookTable;
