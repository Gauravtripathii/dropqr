// 'use client';
// import { useState } from 'react';
// import Script from 'next/script';

// import { useSession } from 'next-auth/react';

// export default function Payment() {
//     const [amount, setAmount] = useState('0');
//     const [currency, setCurrency] = useState('INR');

//     const { data, status } = useSession();

//     const createOrderId = async () => {
//         if (status === "authenticated") {
//             try {
//                 const response = await fetch('/api/payments/v1/order', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         amount: parseFloat(amount) * 100,
//                     }),
//                 });

//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const data = await response.json();
//                 return data.orderId;
//             } catch (error) {
//                 console.error('There was a problem with your fetch operation:', error);
//             }
//         } else {
//             console.log("login first!");
//         }
//     };

//     const processPayment = async (e) => {
//         e.preventDefault();
//         if (status === "authenticated") {
//             try {
//                 const orderId = await createOrderId();
//                 const options = {
//                     key: process.env.key_id,
//                     amount: parseFloat(amount) * 100,
//                     currency: currency,
//                     name: data.user.name,
//                     description: 'description',
//                     order_id: orderId,
//                     handler: async function (response) {
//                         const data = {
//                             orderCreationId: orderId,
//                             razorpayPaymentId: response.razorpay_payment_id,
//                             razorpayOrderId: response.razorpay_order_id,
//                             razorpaySignature: response.razorpay_signature,
//                         };

//                         const result = await fetch('/api/payments/v1/verify', {
//                             method: 'POST',
//                             body: JSON.stringify(data),
//                             headers: { 'Content-Type': 'application/json' },
//                         });
//                         const res = await result.json();
//                         if (res.isOk) alert("payment succeed");
//                         else {
//                             alert(res.message);
//                         }
//                     },
//                     prefill: {
//                         name: data.user.name,
//                         email: data.user.email,
//                     },
//                     theme: {
//                         color: '#3399cc',
//                     },
//                 };
//                 const paymentObject = new window.Razorpay(options);
//                 paymentObject.on('payment.failed', function (response) {
//                     alert(response.error.description);
//                 });
//                 paymentObject.open();
//             } catch (error) {
//                 console.log(error);
//             }
//         } else {
//             console.log("login first!!");
//         }
//     };


//     return (
//         <>
//             <Script
//                 id="razorpay-checkout-js"
//                 src="https://checkout.razorpay.com/v1/checkout.js"
//             />

//             <section className="min-h-[94vh] flex flex-col gap-6 h-14 mx-5 sm:mx-10 2xl:mx-auto 2xl:w-[1400px] items-center pt-36 ">
//                 <form
//                     className="flex flex-col gap-6 w-full sm:w-80"
//                     onSubmit={processPayment}
//                 >
//                     <div className="space-y-1">
//                         <label>Amount</label>
//                         <div className="flex gap-2">
//                             <input
//                                 type="number"
//                                 step="1"
//                                 min={5}
//                                 required
//                                 value={amount}
//                                 onChange={(e) => setAmount(e.target.value)}
//                                 className='text-background'
//                             />
//                         </div>
//                     </div>

//                     <button type="submit">Pay</button>
//                 </form>
//             </section>
//         </>
//     );
// }