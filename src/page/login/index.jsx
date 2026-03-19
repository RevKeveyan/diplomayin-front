import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Card, InputGroup, Modal } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserService from "../../service/accountService";
import useAuthService from "../../service/authService";
import ResetModal from "./modal-form";
import "./style.scss";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const {registerUser} = useUserService();
  const { login, resetCode,getCode } = useAuthService();

  const registerNewUser = (data) =>{
    registerUser(data, setIsRegister)
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 auth-container">
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="shadow-lg p-4 auth-card">
            <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
            <Form onSubmit={handleSubmit(isRegister ? registerNewUser : login)}>
              {isRegister && (
                <>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    {...register("firstName", { required: "Name is required" })}
                  />
                  {errors.firstName && <small className="text-danger">{errors.firstName.message}</small>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    {...register("lastName", { required: "LastName is required" })}
                  />
                  {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone"
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.lastName && <small className="text-danger">{errors.lastName.message}</small>}
                </Form.Group>
                </>
              )}

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && <small className="text-danger">{errors.email.message}</small>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters" } })}
                  />
                  <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                {errors.password && <small className="text-danger">{errors.password.message}</small>}
              </Form.Group>

              {isRegister && (
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
                </Form.Group>
              )}

              <Button variant="primary" type="submit" className="w-100">
                {isRegister ? "Register" : "Login"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                {isRegister ? "Already have an account?" : "Don't have an account?"} 
                <Button variant="link" onClick={() => setIsRegister(!isRegister)} className="p-0">
                  {isRegister ? "Login" : "Register"}
                </Button>
              </small>
            </div>

            {!isRegister && (
              <div className="text-center mt-3">
                <Button variant="link" onClick={() => setShowModal(true)}>
                  Forgot Password?
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      <ResetModal showModal={showModal}  onHide={() => setShowModal(false)}/>
    </Container>
  );
};

export default AuthPage;
