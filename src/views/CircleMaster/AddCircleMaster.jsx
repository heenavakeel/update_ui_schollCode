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

const AddCircleMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [feeheadData, setfeeheadData] = useState({
    id: 0,
    circle_name: '',
    circle_name_description: '',
    calculate_month: '',
    calc_month_detail: '',
    samp: 'test ',
  });
  useEffect(() => {
    // Check if location state exists and set the feeheadData accordingly
    if (location.state) {
      setfeeheadData(location.state);
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setfeeheadData((prevData) => ({
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

    if (!feeheadData.circle_name) {
      errors.circle_name = 'Party Name is required';
    }

    if (!feeheadData.circle_name_description) {
      errors.circle_name_description = 'Party Address is required';
    }

    return errors;
  };

  const AddCircleMaster = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length > 0) {
        setErrorMessage(errors);
        return;
      }

      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const data = JSON.stringify(feeheadData);

      debugger;
      let response;

      if (feeheadData.id !== '0' && feeheadData.id !== 0) {
        response = await apiService.put(
          `api/CircleMaster/UpdateCircleMaster?id=${feeheadData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/CircleMaster/AddCircleMaster',
          data,
          config
        );
      }

      console.log(response);
      console.log(data);

      // if (response.response && response.response.data.errors) {
      //   alert(response.response?.data?.errors);
      // }

      if (response.status === true) {
        alert(response.message);
        setfeeheadData({
          circle_name: '',
          circle_name_description: '',
          calculate_month: '',
          calc_month_detail: '',
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
              Circle Master Form
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
              <div
                className='accordion accordion-flush'
                id='accordionFlushExample'
              >
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='flush-headingOne'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseOne'
                      aria-expanded='false'
                      aria-controls='flush-collapseOne'
                    >
                      Form
                    </button>
                  </h2>
                  <div
                    id='flush-collapseOne'
                    className='accordion-collapse collapse'
                    aria-labelledby='flush-headingOne'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <FormGroup>
                        <Label for='circle_name'>circle_name</Label>
                        <Input
                          id='circle_name'
                          name='circle_name'
                          value={feeheadData.circle_name}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.name && (
                          <FormText color='danger'>
                            {errorMessage.circle_name}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='circle_name_description'>
                          circle_name_description
                        </Label>
                        <Input
                          id='circle_name_description'
                          name='circle_name_description'
                          value={feeheadData.circle_name_description}
                          onChange={onChangeHandle}
                          type='circle_name_description'
                        />
                        {errorMessage.circle_name_description && (
                          <FormText color='danger'>
                            {errorMessage.circle_name_description}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='calculate_month'>calculate_month</Label>
                        <Input
                          id='calculate_month'
                          name='calculate_month'
                          value={feeheadData.calculate_month}
                          onChange={onChangeHandle}
                          type='tel'
                        />
                        {errorMessage.caltime && (
                          <FormText color='danger'>
                            {errorMessage.calculate_month}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='calc_month_detail'>calc_month_detail</Label>
                        <Input
                          id='calc_month_detail'
                          name='calc_month_detail'
                          value={feeheadData.calc_month_detail}
                          onChange={onChangeHandle}
                          type='text'
                        />
                        {errorMessage.calc_month_detail && (
                          <FormText color='danger'>
                            {errorMessage.headname_Short}
                          </FormText>
                        )}
                        {/* </FormGroup>
              <FormGroup>
                <Label for='fee_amt_default'>fee_amt_default</Label>
                <Input
                  id='fee_amt_default'
                  name='fee_amt_default'
                  value={feeheadData.fee_amt_default}
                  onChange={onChangeHandle}
                  type='text'
                />
                {errorMessage.fee_amt_default && (
                  <FormText color='danger'>
                    {errorMessage.fee_amt_default}
                  </FormText>
                )} */}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className='mt-2'
                color='primary'
                onClick={AddCircleMaster}
              >
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddCircleMaster;
