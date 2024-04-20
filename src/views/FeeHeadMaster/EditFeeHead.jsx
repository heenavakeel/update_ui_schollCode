import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../constants/ApiService';

const EditFeeHead = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState('');
  const [partyData, setPartyData] = useState({
    id: '',
    name: '',
    email: '',
    mobile_number: '',
    address: '',
    pincode: '',
  });

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setPartyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    const errors = {};

    if (!partyData.name) {
      errors.name = 'Party Name is required';
    }

    if (!partyData.address) {
      errors.address = 'Party Address is required';
    }
    return errors;
  };

  const updatePartyData = async () => {
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

      const response = await apiService.put(
        `/api/PartyMaster/update?partyId=${partyData.id}`,
        partyData,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!!');
    }
  };

  useEffect(() => {
    if (location.state) {
      setPartyData(location.state);
    }
  }, [location.state]);

  return (
    <Row>
      <Col>
        <Card>
          <CardTitle
            tag='h6'
            className='border-bottom p-3 mb-0 d-flex aliPartys-center justify-content-between'
          >
            <div className='d-flex align-items-center'>
              <i className='bi bi-bell me-2'></i>
              Edit Party Form
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
              <Button
                type='button'
                className='mt-2'
                color='primary'
                onClick={updatePartyData}
              >
                Update
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default EditFeeHead;
