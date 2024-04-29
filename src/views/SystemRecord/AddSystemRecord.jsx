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

const AddSystemRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolData, setSchoolData] = useState({
    id: null,
    school_name: '',
    address: '',
    school_code: '',
    school_phn: '',
    state: '',
    city: '',
    pincode: '',
    established_date: '',
    school_id: null,
    school_type: '',
  });

  useEffect(() => {
    // Check if location state exists and set the schoolData accordingly
    if (location.state) {
      setSchoolData(location.state);
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState({});

  const onHandleBack = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setSchoolData((prevData) => ({
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

    if (!schoolData.school_name) {
      errors.school_name = 'School Name is required';
    }

    if (!schoolData.address) {
      errors.address = 'Address is required';
    }

    // Add validations for other fields as needed

    return errors;
  };

  const addSchool = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length > 0) {
        setErrorMessage(errors);
        return;
      }

      const response = await apiService.post(
        'api/SystemRecord/AddSystemRecord',
        JSON.stringify(schoolData),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response);

      if (response.status === true) {
        alert(response.message);
        setSchoolData({
          school_name: '',
          address: '',
          school_code: '',
          school_phn: '',
          state: '',
          city: '',
          pincode: '',
          established_date: '',
          school_id: '',
          school_type: '',
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
              School Form
            </div>
            <Button
              color='warning'
              size='bg'
              onClick={onHandleBack}
              className='ms-auto'
            >
              Go Back
            </Button>
          </CardTitle>

          <CardBody>
            <Form>
              <FormGroup>
                <Label for='school_name'>School Name</Label>
                <Input
                  id='school_name'
                  name='school_name'
                  value={schoolData.school_name}
                  onChange={onChangeHandle}
                />
                {errorMessage.school_name && (
                  <FormText color='danger'>{errorMessage.school_name}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='address'>Address</Label>
                <Input
                  id='address'
                  name='address'
                  value={schoolData.address}
                  onChange={onChangeHandle}
                />
                {errorMessage.address && (
                  <FormText color='danger'>{errorMessage.address}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='school_code'>School Code</Label>
                <Input
                  id='school_code'
                  name='school_code'
                  value={schoolData.school_code}
                  onChange={onChangeHandle}
                />
                {errorMessage.school_code && (
                  <FormText color='danger'>{errorMessage.school_code}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='address'>School Phn</Label>
                <Input
                  id='school_phn'
                  name='school_phn'
                  value={schoolData.school_phn}
                  onChange={onChangeHandle}
                />
                {errorMessage.school_phn && (
                  <FormText color='danger'>{errorMessage.school_phn}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='state'>State</Label>
                <Input
                  id='state'
                  name='state'
                  value={schoolData.state}
                  onChange={onChangeHandle}
                />
                {errorMessage.state && (
                  <FormText color='danger'>{errorMessage.state}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='city'>City</Label>
                <Input
                  id='city'
                  name='city'
                  value={schoolData.city}
                  onChange={onChangeHandle}
                />
                {errorMessage.city && (
                  <FormText color='danger'>{errorMessage.city}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='pincode'>Pincode</Label>
                <Input
                  id='pincode'
                  name='pincode'
                  value={schoolData.pincode}
                  onChange={onChangeHandle}
                />
                {errorMessage.pincode && (
                  <FormText color='danger'>{errorMessage.pincode}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='established_date'>Established Date</Label>
                <Input
                  id='established_date'
                  name='established_date'
                  value={schoolData.established_date}
                  onChange={onChangeHandle}
                  type='date'
                />
                {errorMessage.address && (
                  <FormText color='danger'>
                    {errorMessage.established_date}
                  </FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='pincode'>School Type</Label>
                <Input
                  id='school_type'
                  name='school_type'
                  value={schoolData.school_type}
                  onChange={onChangeHandle}
                />
                {errorMessage.school_type && (
                  <FormText color='danger'>{errorMessage.school_type}</FormText>
                )}
              </FormGroup>
              {/* Add inputs for other fields */}
              <Button className='mt-2' color='primary' onClick={addSchool}>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSystemRecord;
