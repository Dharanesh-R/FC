// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './PaymentPage.css';

// const PaymentPage = () => {
//     const { state } = useLocation();
//     const { username, role, email, phone, cart, totalWithGST, deliveryType } = state;

//     const [orderCode, setOrderCode] = useState('');
//     const [showPaymentForm, setShowPaymentForm] = useState(false);
//     const [cardDetails, setCardDetails] = useState({
//         cardNumber: '',
//         expiryDate: '',
//         cvv: ''
//     });
//     const [paymentCompleted, setPaymentCompleted] = useState(false);

//     useEffect(() => {
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         setOrderCode(code);
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;

//         if (name === 'cardNumber') {
//             const formattedValue = value.replace(/\D/g, '').slice(0, 16);
//             const dashFormattedValue = formattedValue.replace(/(.{4})/g, '$1-').trim();
//             setCardDetails((prev) => ({
//                 ...prev,
//                 [name]: dashFormattedValue.endsWith('-') ? dashFormattedValue.slice(0, -1) : dashFormattedValue
//             }));
//         } else if (name === 'expiryDate') {
//             const formattedValue = value.replace(/\D/g, '').slice(0, 4);
//             if (formattedValue.length >= 2) {
//                 setCardDetails((prev) => ({
//                     ...prev,
//                     [name]: `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`
//                 }));
//             } else {
//                 setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
//             }
//         } else {
//             setCardDetails((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const validateExpiryDate = (expiryDate) => {
//         const [month, year] = expiryDate.split('/');
//         const currentDate = new Date();
//         const currentMonth = currentDate.getMonth() + 1;
//         const currentYear = currentDate.getFullYear() % 100;

//         return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
//     };

//     const handlePayment = async () => {
//         const { cardNumber, expiryDate, cvv } = cardDetails;

//         if (!cardNumber || !expiryDate || !cvv) {
//             toast.error('Please fill in all fields.');
//             return;
//         }

//         if (!/^\d{3}$/.test(cvv)) {
//             toast.error('CVV must be three digits.');
//             return;
//         }

//         if (cardNumber.replace(/-/g, '').length !== 16) {
//             toast.error('Card number must be 16 digits.');
//             return;
//         }

//         if (!validateExpiryDate(expiryDate)) {
//             toast.error('Please enter a valid expiry date.');
//             return;
//         }

//         setPaymentCompleted(true);
//         toast.success('Payment processed successfully!');

//         const orderDetails = {
//             username,
//             role,
//             email,
//             phone,
//             deliveryType,
//             orderCode,
//             cart,
//             totalWithGST,
//             paymentStatus: 'Successful' // Update payment status
//         };

//         try {
//             const response = await fetch('http://localhost:3001/api/preorder', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(orderDetails),
//             });

//             const data = await response.json();
//             console.log(data.message); // Handle success message from backend

//             // WhatsApp message construction
//             let msg = `Welcome to KEC Food Court! 🍽️\n\n`;
//             msg += `Order Summary:\n\nTotal Price with GST: ₹${totalWithGST.toFixed(2)}\n\n`;
//             msg += `Order Code: ${orderCode}\n\n`;
//             msg += `User Details:\nUsername: ${username}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\n\n`;
//             msg += `Cart Items:\n`;
//             cart.forEach(item => {
//                 msg += `${item.title} - Quantity: ${item.quantity} - Price: ₹${item.price}\n`;
//             });
//             msg += `\nPayment Status: Successful\n\n`;
//             msg += `Thank you for ordering with KEC Food Court! 🎉🍽️😊`;
//             msg += `\nIt takes about 1 hour to make your order. Use the Order Code to Verify Your Order!`;

//             const encodedMessage = encodeURIComponent(msg);
//             const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

//             window.open(whatsappLink, '_blank');
//         } catch (error) {
//             toast.error('Error placing the order. Please try again.');
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <div className={`container ${paymentCompleted ? 'payment-success' : ''}`}>
//             <h2>Payment Summary</h2>
//             <p><strong>Username:</strong> {username}</p>
//             <p><strong>Role:</strong> {role}</p>
//             <p><strong>Email:</strong> {email}</p>
//             <p><strong>Phone:</strong> {phone}</p>
//             <p><strong>Delivery Type:</strong> {deliveryType}</p>
//             <p><strong>Order Code:</strong> {orderCode}</p>
//             <h3>Cart Details</h3>
//             <table className="cart-table">
//                 <thead>
//                     <tr>
//                         <th>Item</th>
//                         <th>Quantity</th>
//                         <th>Price per Item</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cart.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.title}</td>
//                             <td>{item.quantity}</td>
//                             <td>₹{item.price}</td>
//                             <td>₹{(item.price * item.quantity).toFixed(2)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//             <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>

//             <button onClick={() => setShowPaymentForm(!showPaymentForm)}>
//                 {showPaymentForm ? 'Hide Payment Form' : 'Pay with Card'}
//             </button>

//             {showPaymentForm && (
//                 <div className="payment-form">
//                     <h4>Enter Card Details</h4>
//                     <label>
//                         Card Number:
//                         <input
//                             type="text"
//                             name="cardNumber"
//                             value={cardDetails.cardNumber}
//                             onChange={handleInputChange}
//                             maxLength="19"
//                             required
//                         />
//                     </label>
//                     <label>
//                         Expiry Date (MM/YY):
//                         <input
//                             type="text"
//                             name="expiryDate"
//                             value={cardDetails.expiryDate}
//                             onChange={handleInputChange}
//                             placeholder="MM/YY"
//                             required
//                             maxLength="5"
//                         />
//                     </label>
//                     <label>
//                         CVV:
//                         <input
//                             type="text"
//                             name="cvv"
//                             value={cardDetails.cvv}
//                             onChange={handleInputChange}
//                             required
//                             maxLength="3"
//                         />
//                     </label>
//                     <button onClick={handlePayment}>Submit Payment</button>
//                 </div>
//             )}

//             <ToastContainer />
//         </div>
//     );
// };

// export default PaymentPage;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaymentPage.css';

const PaymentPage = () => {
    const { state } = useLocation();
    const { username, role, email, phone, cart, totalWithGST, deliveryType } = state;

    const [orderCode, setOrderCode] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    useEffect(() => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setOrderCode(code);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'cardNumber') {
            const formattedValue = value.replace(/\D/g, '').slice(0, 16);
            const dashFormattedValue = formattedValue.replace(/(.{4})/g, '$1-').trim();
            setCardDetails((prev) => ({
                ...prev,
                [name]: dashFormattedValue.endsWith('-') ? dashFormattedValue.slice(0, -1) : dashFormattedValue
            }));
        } else if (name === 'expiryDate') {
            const formattedValue = value.replace(/\D/g, '').slice(0, 4);
            if (formattedValue.length >= 2) {
                setCardDetails((prev) => ({
                    ...prev,
                    [name]: `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`
                }));
            } else {
                setCardDetails((prev) => ({ ...prev, [name]: formattedValue }));
            }
        } else {
            setCardDetails((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateExpiryDate = (expiryDate) => {
        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear() % 100;

        return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth));
    };

    const handlePayment = async () => {
        const { cardNumber, expiryDate, cvv } = cardDetails;

        if (!cardNumber || !expiryDate || !cvv) {
            toast.error('Please fill in all fields.');
            return;
        }

        if (!/^\d{3}$/.test(cvv)) {
            toast.error('CVV must be three digits.');
            return;
        }

        if (cardNumber.replace(/-/g, '').length !== 16) {
            toast.error('Card number must be 16 digits.');
            return;
        }

        if (!validateExpiryDate(expiryDate)) {
            toast.error('Please enter a valid expiry date.');
            return;
        }

        setPaymentCompleted(true);
        toast.success('Payment processed successfully!');

        const orderDetails = {
            username,
            role,
            email,
            phone,
            deliveryType,
            orderCode,
            cart,
            totalWithGST,
            paymentStatus: 'Successful' // Update payment status
        };

        try {
            const response = await fetch('http://localhost:3001/api/preorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            const data = await response.json();
            console.log(data.message); // Handle success message from backend

            // WhatsApp message construction
            let msg = `Welcome to KEC Food Court! 🍽️\n\n`;
            msg += `Order Summary:\n\nTotal Price with GST: ₹${totalWithGST.toFixed(2)}\n\n`;
            msg += `Order Code: ${orderCode}\n\n`;
            msg += `User Details:\nUsername: ${username}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\n\n`;
            msg += `Cart Items:\n`;
            cart.forEach(item => {
                msg += `${item.title} - Quantity: ${item.quantity} - Price: ₹${item.price}\n`;
            });
            msg += `\nPayment Status: Successful\n\n`;
            msg += `Thank you for ordering with KEC Food Court! 🎉🍽️😊`;
            msg += `\nIt takes about 1 hour to make your order. Use the Order Code to Verify Your Order!`;

            const encodedMessage = encodeURIComponent(msg);
            const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;

            window.open(whatsappLink, '_blank');

            // Clear fields and hide payment form
            setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
            setShowPaymentForm(false);

        } catch (error) {
            toast.error('Error placing the order. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div className={`container ${paymentCompleted ? 'payment-success' : ''}`}>
            <h2>Payment Summary</h2>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Role:</strong> {role}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone}</p>
            <p><strong>Delivery Type:</strong> {deliveryType}</p>
            <p><strong>Order Code:</strong> {orderCode}</p>
            <h3>Cart Details</h3>
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
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                            <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p><strong>Total:</strong> ₹{totalWithGST.toFixed(2)}</p>

            <button onClick={() => setShowPaymentForm(!showPaymentForm)}>
                {showPaymentForm ? 'Hide Payment Form' : 'Pay with Card'}
            </button>

            {showPaymentForm && (
                <div className="payment-form">
                    <h4>Enter Card Details</h4>
                    <label>
                        Card Number:
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardDetails.cardNumber}
                            onChange={handleInputChange}
                            maxLength="19"
                            required
                        />
                    </label>
                    <label>
                        Expiry Date (MM/YY):
                        <input
                            type="text"
                            name="expiryDate"
                            value={cardDetails.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            maxLength="5"
                        />
                    </label>
                    <label>
                        CVV:
                        <input
                            type="text"
                            name="cvv"
                            value={cardDetails.cvv}
                            onChange={handleInputChange}
                            required
                            maxLength="3"
                        />
                    </label>
                    <button onClick={handlePayment}>Submit Payment</button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default PaymentPage;
