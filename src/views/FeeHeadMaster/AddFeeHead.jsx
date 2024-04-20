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

const AddFeeHead = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [feeheadData, setfeeheadData] = useState({
    id: 0,
    head_no: 0,
    head_name: '',
    caltime: '',
    headname_Short: '',
    fee_amt_default: 0,
    samp: 'test ',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if location state exists and set the feeheadData accordingly
    if (location.state) {
      setfeeheadData(location.state);
    }
  }, [location.state]);

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

    if (!feeheadData.head_no) {
      errors.head_no = 'Party Name is required';
    }

    if (!feeheadData.headname_Short) {
      errors.headname_Short = 'Party Address is required';
    }

    return errors;
  };

  const AddFeeHead = async () => {
    try {
      const errors = validateInputs();
      if (Object.keys(errors).length > 0) {
        setErrorMessage(errors);
        return;
      }

      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const data = JSON.stringify(feeheadData);

      let response;

      if (feeheadData.id !== '0' && feeheadData.id !== 0) {
        response = await apiService.put(
          `api/FeeHeadMaster/UpdateFeeHeadMaster?id=${feeheadData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/FeeHeadMaster/AddFeeHeadMaster',
          data,
          config
        );
      }

      if (response.status === true) {
        alert(response.message);
        // Redirect to desired page after successful submission
        navigate('/FeeHead');
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
              Fee Head Form
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
                <Label for='head_no'>Head No</Label>
                <Input
                  id='head_no'
                  name='head_no'
                  value={feeheadData.head_no}
                  onChange={onChangeHandle}
                />
                {errorMessage.name && (
                  <FormText color='danger'>{errorMessage.name}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='head_name'>Head Name</Label>
                <Input
                  id='head_name'
                  name='head_name'
                  value={feeheadData.head_name}
                  onChange={onChangeHandle}
                  type='head_name'
                />
                {errorMessage.head_name && (
                  <FormText color='danger'>{errorMessage.head_name}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='caltime'>caltime</Label>
                <Input
                  id='caltime'
                  name='caltime'
                  value={feeheadData.caltime}
                  onChange={onChangeHandle}
                  type='tel'
                />
                {errorMessage.caltime && (
                  <FormText color='danger'>{errorMessage.caltime}</FormText>
                )}
              </FormGroup>
              <FormGroup>
                <Label for='headname_Short'>headname_Short</Label>
                <Input
                  id='headname_Short'
                  name='headname_Short'
                  value={feeheadData.headname_Short}
                  onChange={onChangeHandle}
                  type='text'
                />
                {errorMessage.headname_Short && (
                  <FormText color='danger'>
                    {errorMessage.headname_Short}
                  </FormText>
                )}
              </FormGroup>
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
                )}
              </FormGroup>
              <Button className='mt-2' color='primary' onClick={AddFeeHead}>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddFeeHead;
