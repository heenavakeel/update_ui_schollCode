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

const Fee_Group_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Fee_Group_MasterData, setFee_Group_MasterData] = useState({
    id: 0,
    fee_group_code: 1,
    fee_group_name: '',
    fee_group_detail: '',
    fee_group_detail2: '',
  });
  useEffect(() => {
    // Check if location state exists and set the Fee_Group_MasterData accordingly
    if (location.state) {
      setFee_Group_MasterData(location.state);
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFee_Group_MasterData((prevData) => ({
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

    if (!Fee_Group_MasterData.fee_group_code) {
      errors.fee_group_code = 'fee_group_code is required';
    }
    if (!Fee_Group_MasterData.fee_group_name) {
      errors.fee_group_name = 'fee_group_name is required';
    }
    if (!Fee_Group_MasterData.fee_group_detail) {
      errors.fee_group_detail = 'fee_group_detail is required';
    }
    if (!Fee_Group_MasterData.fee_group_detail2) {
      errors.fee_group_detail2 = 'fee_group_detail2 is required';
    }

    return errors;
  };

  const Fee_Group_Master_Add_Edit_Screen = async () => {
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
      const data = JSON.stringify(Fee_Group_MasterData);

      debugger;
      let response;

      if (Fee_Group_MasterData.id != '0' && Fee_Group_MasterData.id != 0) {
        response = await apiService.put(
          `api/FeeGroupMaster/UpdateFeeGroup?id=${Fee_Group_MasterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/FeeGroupMaster/AddFeeGroup',
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
        setFee_Group_MasterData({
          field_names: '',
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong"');
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
              Fee Group Masater Form
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
                      accordian title
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
                        <Label for='fee_group_code'>fee_group_code</Label>
                        <Input
                          id='fee_group_code'
                          name='fee_group_code'
                          value={Fee_Group_MasterData.fee_group_code}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.name && (
                          <FormText color='danger'>
                            {errorMessage.fee_group_code}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='fee_group_name'>fee_group_name</Label>
                        <Input
                          id='fee_group_name'
                          name='fee_group_name'
                          value={Fee_Group_MasterData.fee_group_name}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.name && (
                          <FormText color='danger'>
                            {errorMessage.fee_group_name}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='fee_group_detail'>fee_group_detail</Label>
                        <Input
                          id='fee_group_detail'
                          name='fee_group_detail'
                          value={Fee_Group_MasterData.fee_group_detail}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.name && (
                          <FormText color='danger'>
                            {errorMessage.fee_group_detail}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='fee_group_detail2'>fee_group_detail2</Label>
                        <Input
                          id='fee_group_detail2'
                          name='fee_group_detail2'
                          value={Fee_Group_MasterData.fee_group_detail2}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.name && (
                          <FormText color='danger'>
                            {errorMessage.fee_group_detail2}
                          </FormText>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className='mt-2'
                color='primary'
                onClick={Fee_Group_Master_Add_Edit_Screen}
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

export default Fee_Group_Master_Add_Edit_Screen;
