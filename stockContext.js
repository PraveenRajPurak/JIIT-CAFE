import React, { createContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
 // const [currentOrders, setCurrentOrders] = useState([]);
  
  const [currentOrders, setCurrentOrders] = useState([
    {
        Order_Id: 1,
        Name_of_customer: 'Customer A',
        items: [
          { name: 'Coffee', quantity: 2 },
          { name: 'Cake', quantity: 1 },
        ],
      },
      {
          Order_Id: 2,
          Name_of_customer: 'Customer B',
          items: [
            { name: 'Coffee', quantity: 2 },
            { name: 'Cake', quantity: 1 },
          ],
        },
        {
          Order_Id: 3,
          Name_of_customer: 'Customer C',
          items: [
            { name: 'Coffee', quantity: 2 },
            { name: 'Cake', quantity: 1 },
          ],
        },
        {
            Order_Id: 4,
            Name_of_customer: 'Customer C',
            items: [
              { name: 'Coffee', quantity: 2 },
              { name: 'Cake', quantity: 1 },
            ],
          },
          {
            Order_Id: 5,
            Name_of_customer: 'Customer C',
            items: [
              { name: 'Coffee', quantity: 2 },
              { name: 'Cake', quantity: 1 },
            ],
          },
          {
            Order_Id: 6,
            Name_of_customer: 'Customer C',
            items: [
              { name: 'Coffee', quantity: 2 },
              { name: 'Cake', quantity: 1 },
            ],
          },
          {
            Order_Id: 7,
            Name_of_customer: 'Customer C',
            items: [
              { name: 'Coffee', quantity: 2 },
              { name: 'Cake', quantity: 1 },
            ],
          },
          {
            Order_Id: 8,
            Name_of_customer: 'Customer C',
            items: [
              { name: 'Coffee', quantity: 2 },
              { name: 'Cake', quantity: 1 },
            ],
          },
    
  ]);
  
  const [completedOrders, setCompletedOrders] = useState([]);
  const [unusedOrders, setUnusedOrders] = useState([]);

  // Function to complete an order
  const completeOrder = (order) => {
    setCompletedOrders([...completedOrders, order]);
    setCurrentOrders(currentOrders.filter((o) => o.Order_Id !== order.Order_Id));
    console.log(completedOrders)
  };

  // Timer function to move orders to unusedOrders after 15 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      const expiredOrders = currentOrders.filter((order) => {
        const fifteenMinutesAgo = new Date().getTime() - 900000; // 15 minutes in milliseconds
        return order.timeStamp < fifteenMinutesAgo;
      });

      if (expiredOrders.length > 0) {
        setUnusedOrders([...unusedOrders, ...expiredOrders]);
        setCurrentOrders(currentOrders.filter(
          (order) => !expiredOrders.some((expired) => expired.Order_Id === order.Order_Id)
        ));
      }
    }, 1000); // Check every second

    return () => clearInterval(timer);
  }, [currentOrders, unusedOrders]);

  const contextValue = {
    currentOrders,
    completedOrders,
    unusedOrders,
    completeOrder,
  };

  return (
    <OrdersContext.Provider value={contextValue}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };
