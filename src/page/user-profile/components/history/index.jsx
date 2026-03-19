  import React, { useEffect, useState } from "react";
  import { Container, Nav, Tab } from "react-bootstrap";
  import OrderItem from "../item";
  import useOrderService from "../../../../service/orderService";

  const PurchaseHistory = ({ activeTab, setActiveTab }) => {
    const { getUserOrders } = useOrderService();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      let status = "";
      if (activeTab === "active") status = "active";
      if (activeTab === "history") status = "history"; 
      if (activeTab === "disputes") status = "disputes"; 
      if (activeTab === "offers") status = "offers"; 

      getUserOrders(setOrders,status);
      setLoading(false)
      
    },[activeTab])

  

    return (
      <Container>
        <h2 className="history-title">My Purchases</h2>
        <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
          <Nav variant="tabs" className="mb-3  custom-tabs">
            <Nav.Item>
              <Nav.Link className="history-links" eventKey="active">Active Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="history-links" eventKey="history">Order History</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="history-links" eventKey="disputes">Disputes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="history-links" eventKey="offers">Offers</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="active">
              {loading ? (
                <p className="text-center text-muted status-text">Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  
                  <OrderItem key={order._id} order={order} isSeller={false} />
                ))
              ) : (
                <p className="text-center text-muted status-text">No active orders.</p>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="history">
              {loading ? (
                <p className="text-center text-muted status-text">Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <OrderItem key={order._id} order={order} isSeller={false} />
                ))
              ) : (
                <p className="text-center text-muted status-text">No completed orders.</p>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="disputes">
              {loading ? (
                <p className="text-center text-muted status-text">Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <OrderItem key={order._id} order={order} isSeller={false} />
                ))
              ) : (
                <p className="text-center text-muted status-text">No disputes yet.</p>
              )}
            </Tab.Pane>

            <Tab.Pane eventKey="offers">
              {loading ? (
                <p className="text-center text-muted status-text">Loading orders...</p>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <OrderItem key={order._id} order={order} isSeller={false} />
                ))
              ) : (
                <p className="text-center text-muted status-text">No disputes yet.</p>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  };

  export default PurchaseHistory;
