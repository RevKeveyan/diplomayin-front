import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import useUserService from "../../../../../service/accountService";

const ChangePasswordForm = () => {
  const {updatePassword} = useUserService()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const newPassword = watch("newPassword");

  return (
    <Container className="change-password-form p-4  rounded">
      <h2 className="mb-3">Change Password</h2>
      <Form onSubmit={handleSubmit(updatePassword)}>
        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter current password"
            {...register("oldPassword", { required: "Current password is required" })}
            isInvalid={!!errors.oldPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.oldPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            isInvalid={!!errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => value === newPassword || "Passwords do not match",
            })}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default ChangePasswordForm;
