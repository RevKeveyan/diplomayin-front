import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import useUserService from "../../../../../service/accountService";

const PersonalInfoForm = () => {
  const {updateUser} = useUserService()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  return (
    <Container className="personal-info-form p-4 rounded">
      <h2 className="mb-3">Personal Information</h2>
      <Form onSubmit={handleSubmit(updateUser)}>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            {...register("firstName")}
            isInvalid={!!errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            {...register("lastName")}
            isInvalid={!!errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              // required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone", {
              // required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default PersonalInfoForm;
