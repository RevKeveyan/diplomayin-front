import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Nav,
  Tab,
  Card,
  Navbar,
} from "react-bootstrap";
import { FaCamera } from "react-icons/fa";
import ChangeAddressForm from "./components/user-forms/user-address";
import PaymentDetailsForm from "./components/user-forms/user-payment";
import ChangePasswordForm from "./components/user-forms/password";
import PersonalInfoForm from "./components/user-forms/user-info";
import ProfileStatsPage from "./components/statistics";
import PurchaseHistory from "./components/history";
import SalesHistory from "./components/sales";
import useUserService from "../../service/accountService";
import useAuthService from "../../service/authService";
import { api } from "../../helpers";
import userImage from "../../assets/user/user.jpg";

import "./style.scss";

const userData = JSON.parse(localStorage.getItem("userData"));

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("profileStats");
  const [purchaseTab, setPurchaseTab] = useState("active");
  const [salesTab, setSalesTab] = useState("active");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const { updateAvatar } = useUserService();
  const { logout } = useAuthService();

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) updateAvatar(selectedFile);
  }, [selectedFile]);

  return (
    <Container className="user-page">
      <div className="user-page-section">
        <Row className="justify-content-center">
          <Col md={10} lg={12}>
            <Row>
              {/* Основной контент */}
              <Col md={8} className="user-page__content-container">
                <Tab.Container activeKey={activeTab}>
                  <Card className="user-page__content">
                    <Card.Body>
                      <Tab.Content>
                        <Tab.Pane eventKey="profileStats">
                          <ProfileStatsPage />
                        </Tab.Pane>
                        <Tab.Pane eventKey="personalInfo">
                          <PersonalInfoForm />
                        </Tab.Pane>
                        <Tab.Pane eventKey="changeAddress">
                          <ChangeAddressForm />
                        </Tab.Pane>
                        <Tab.Pane eventKey="paymentDetails">
                          <PaymentDetailsForm />
                        </Tab.Pane>
                        <Tab.Pane eventKey="changePassword">
                          <ChangePasswordForm />
                        </Tab.Pane>
                        <Tab.Pane eventKey="purchases">
                          <PurchaseHistory
                            activeTab={purchaseTab}
                            setActiveTab={setPurchaseTab}
                          />
                        </Tab.Pane>
                        <Tab.Pane eventKey="sales">
                          <SalesHistory
                            activeTab={salesTab}
                            setActiveTab={setSalesTab}
                          />
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </Col>

              {/* Меню пользователя с бургером */}
              <Col md={4} className="user-page__menu-container">
                <Card className="user-page__menu">
                  <Card.Body className="text-center">
                    {/* Загрузка аватара */}
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarInput"
                      style={{ display: "none" }}
                      onChange={handleAvatarChange}
                    />
                    <div
                      className="user-page__avatar-container"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => document.getElementById("avatarInput").click()}
                    >
                      <Image
                        src={userData.avatar ? `${api}${userData.avatar}` : userImage}
                        roundedCircle
                        className="user-page__avatar"
                      />
                      {isHovered && (
                        <div className="user-page__avatar-overlay">
                          <FaCamera className="user-page__avatar-icon" />
                        </div>
                      )}
                    </div>

                    <h5 className="user-page__username mt-2">
                      {userData.firstName} {userData.lastName}
                    </h5>

                    {/* Бургер-меню */}
                    <Navbar expand="md" className="user-page__nav" expanded={expanded}>
                      <Navbar.Toggle
                        aria-controls="userMenu"
                        onClick={() => setExpanded(!expanded)}
                      />
                      <Navbar.Collapse id="userMenu">
                        <Nav className="flex-column mt-3">
                          {[
                            { key: "profileStats", label: "Profile Stats" },
                            { key: "personalInfo", label: "Personal Info" },
                            { key: "changeAddress", label: "Change Address" },
                            { key: "paymentDetails", label: "Payment Details" },
                            { key: "changePassword", label: "Change Password" },
                            { key: "purchases", label: "Purchases" },
                            { key: "sales", label: "Sales" },
                          ].map((item) => (
                            <Nav.Link
                              key={item.key}
                              eventKey={item.key}
                              active={activeTab === item.key}
                              onClick={() => {
                                setActiveTab(item.key);
                                setExpanded(false);
                              }}
                            >
                              {item.label}
                            </Nav.Link>
                          ))}
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>

                    {/* Logout */}
                    <Button
                      variant="danger"
                      className="mt-4 w-100"
                      onClick={() => logout()}
                    >
                      Log Out
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default UserPage;
