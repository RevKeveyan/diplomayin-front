import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import useAddressService from "../../../../../service/addressService";

const ChangeAddressForm = ({onSuccess}) => {
  const { getUserAddresses, updateAddress, addAddress } = useAddressService();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    getUserAddresses(setAddresses);
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]);
      reset(addresses[0]);
    }
  }, []);

  const handleAddressChange = (event) => {
    const address = addresses.find((addr) => addr._id === event.target.value);
    setSelectedAddress(address);
    reset(address);
  };

  const onSubmit = async (data) => {
    let newAddress;
    if (selectedAddress) {
      await updateAddress(selectedAddress._id, data);
    } else {
      newAddress = await addAddress(data); // должен возвращать address
    }

    if (onSuccess && newAddress?._id) {
      
      onSuccess("address", newAddress); // возвращаем type и объект
    }
  }

  return (
    <Container className="change-address-form p-4 rounded">
      <h2 className="mb-3">Select or Add Address</h2>

      {/* Select existing address */}
      {addresses.length > 0 && (
        <Form.Group className="mb-3">
          <Form.Label>Select Address</Form.Label>
          <Form.Control as="select" onChange={handleAddressChange}>
            {addresses.map((address) => (
              <option key={address._id} value={address._id}>
                {`${address.street}, ${address.city}, ${address.country}`}
              </option>
            ))}
            <option value="">Add New Address</option>
          </Form.Control>
        </Form.Group>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street"
            {...register("street", { required: "Required field" })}
            isInvalid={!!errors.street}
          />
          <Form.Control.Feedback type="invalid">
            {errors.street?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                {...register("city", { required: "Required field" })}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>State / Region</Form.Label>
              <Form.Control type="text" placeholder="Enter State" {...register("state")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                {...register("country", { required: "Required field" })}
                isInvalid={!!errors.country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.country?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                {...register("postalCode", {
                  required: "Required field",
                  pattern: { value: /^[0-9]{4,6}$/, message: "Enter a valid postal code" },
                })}
                isInvalid={!!errors.postalCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.postalCode?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="success" type="submit">
          {selectedAddress ? "Update Address" : "Add Address"}
        </Button>
      </Form>
    </Container>
  );
};

export default ChangeAddressForm;
