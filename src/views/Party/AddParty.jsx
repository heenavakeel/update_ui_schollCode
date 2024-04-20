import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../constants/ApiService';

const AddParty = () => {
  const navigate = useNavigate();
  const [partyData, setPartyData] = useState({
    name: '',
    email: '',
    mobile_number: '',
    address: '',
    pincode: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setPartyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the previous error when the user starts typing
    }));
  };

  const validateInputs = () => {
    const errors = {};

    if (!partyData.name) {
      errors.name = 'Party Name is required';
    }

    if (!partyData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(partyData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!partyData.mobile_number) {
      errors.mobile_number = 'Mobile Number is required';
    } else if (!/^[0-9]{10}$/.test(partyData.mobile_number)) {
      errors.mobile_number = 'Invalid mobile number. Must be a 10-digit number';
    }

    if (!partyData.address) {
      errors.address = 'Party Address is required';
    }

    if (!partyData.pincode) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(partyData.pincode)) {
      errors.pincode = 'Pincode must be a 6-digit number';
    }
    return errors;
  };

  const addPartyData = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length > 0) {
        setErrorMessage(errors);
        return;
      }

      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const data = JSON.stringify();

      const response = await apiService.post(
        '/api/PartyMaster/create',
        partyData,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        alert(response.message);
        setPartyData({
          name: '',
          email: '',
          mobile_number: '',
          address: '',
          pincode: '',
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!!');
    }
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle
            tag='h6'
            className='border-bottom p-3 mb-0 d-flex align-items-center justify-content-between'
          >
            <div className='d-flex align-items-center'>
              <i className='bi bi-bell me-2'></i>
              Party Form
            </div>
            <Button
              color='warning'
              size='bg'
              onClick={onHandleBackParty}
              className='ms-auto'
            >
              Go Back
            </Button>
          </CardTitle>

          <CardBody>
            <Form>
              <FormGroup>
                <Label for='partyName'>Party Name</Label>
                <Input
                  id='partyName'
                  name='name'
                  value={partyData.name}
                  onChange={onChangeHandle}
                />
                {errorMessage.name && (
                  <FormText color='danger'>{errorMessage.name}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='partyEmail'>Email</Label>
                <Input
                  id='partyEmail'
                  name='email'
                  value={partyData.email}
                  onChange={onChangeHandle}
                  type='email'
                />
                {errorMessage.email && (
                  <FormText color='danger'>{errorMessage.email}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='partyMobile'>Mobile No.</Label>
                <Input
                  id='partyMobile'
                  name='mobile_number'
                  value={partyData.mobile_number}
                  onChange={onChangeHandle}
                  type='tel'
                />
                {errorMessage.mobile_number && (
                  <FormText color='danger'>
                    {errorMessage.mobile_number}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='partyAddress'>Address</Label>
                <Input
                  id='partyAddress'
                  name='address'
                  value={partyData.address}
                  onChange={onChangeHandle}
                  type='text'
                />
                {errorMessage.address && (
                  <FormText color='danger'>{errorMessage.address}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='partyPincode'>Pincode</Label>
                <Input
                  id='partyPincode'
                  name='pincode'
                  value={partyData.pincode}
                  onChange={onChangeHandle}
                  type='text'
                />
                {errorMessage.pincode && (
                  <FormText color='danger'>{errorMessage.pincode}</FormText>
                )}
              </FormGroup>
              <Button className='mt-2' color='primary' onClick={addPartyData}>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddParty;
