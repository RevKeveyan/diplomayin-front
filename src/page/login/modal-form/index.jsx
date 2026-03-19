import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuthService from "../../../service/authService";

const ResetModal = ({ onHide, showModal }) => {
  const [step, setStep] = useState(1); // 1 - ввод email, 2 - ввод кода и пароля
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { getCode, resetCode } = useAuthService();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const handleGetCode = async (data) => {
    getCode(data, setStep);
  };

  const handleResetPassword = async (data) => {
    resetCode(data, setStep);
  };

  return (
    <Modal show={showModal} onHide={onHide} centered className="reset-modal">
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form onSubmit={handleSubmit(handleGetCode)}>
            <Form.Group className="mb-3" controlId="resetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Send Reset Code
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit(handleResetPassword)}>
            <Form.Group className="mb-3" controlId="resetCode">
              <Form.Label>Reset Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reset code"
                {...register("resetCode", {
                  required: "Reset code is required",
                })}
              />
              {errors.resetCode && (
                <small className="text-danger">
                  {errors.resetCode.message}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("newPassword", {
                    required: "Password is required",
                  })}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
              {errors.newPassword && (
                <small className="text-danger">
                  {errors.newPassword.message}
                </small>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === newPassword || "Passwords do not match",
                  })}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </InputGroup>
              {errors.confirmPassword && (
                <small className="text-danger">
                  {errors.confirmPassword.message}
                </small>
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Reset Password
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ResetModal;
