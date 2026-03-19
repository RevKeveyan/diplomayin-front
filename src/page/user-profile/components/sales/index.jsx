import React, { useEffect, useState } from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import OrderItem from "../item";
import useOrderService from "../../../../service/orderService";

const SalesHistory = ({ activeTab, setActiveTab }) => {
  const { getOrdersBySellerId } = useOrderService();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let statusFilter = "";

      if (activeTab === "active") statusFilter = "active";
      if (activeTab === "history") statusFilter = "history";
      if (activeTab === "disputes") statusFilter = "disputes";
      if (activeTab === "offers") statusFilter = "offers";

      await getOrdersBySellerId(setOrders, statusFilter);
      setLoading(false);
    };

    fetchOrders();
  }, [activeTab]);

  return (
    <Container>
      <h2 className="history-title">My Sales</h2>
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3 custom-tabs">
          <Nav.Item>
            <Nav.Link className="history-links" eventKey="active">
              Active Sales
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="history-links" eventKey="history">
              Sales History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="history-links" eventKey="disputes">
              Disputes
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="history-links" eventKey="offers">
              Offers
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="active">
            {loading ? (
              <p className="text-center text-muted">Loading sales...</p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order._id} order={order} isSeller={true} />
              ))
            ) : (
              <p className="text-center text-muted">No active sales.</p>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="history">
            {loading ? (
              <p className="text-center text-muted">Loading sales history...</p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order._id} order={order} isSeller={true} />
              ))
            ) : (
              <p className="text-center text-muted">No completed sales.</p>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="disputes">
            {loading ? (
              <p className="text-center text-muted">Loading disputes...</p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order._id} order={order} isSeller={true} />
              ))
            ) : (
              <p className="text-center text-muted">No disputes yet.</p>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="offers">
            {loading ? (
              <p className="text-center text-muted status-text">
                Loading orders...
              </p>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <OrderItem key={order._id} order={order} isSeller={true} />
              ))
            ) : (
              <p className="text-center text-muted status-text">
                No disputes yet.
              </p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default SalesHistory;
