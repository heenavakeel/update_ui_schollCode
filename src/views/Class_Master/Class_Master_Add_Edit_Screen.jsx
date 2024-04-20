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
import { useNavigate, useLocation } from 'react-router-dom'; // Importing useNavigate and useLocation
import { apiService } from '../../constants/ApiService';

const Class_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Using useLocation hook
  const [Class_MasterData, setClass_MasterData] = useState({
    class_id: '',
    class_name: '',
    next_class_name: '',
    class_detail: '',
    class_display_name: '',
    roman_name: '',
    last_class_in_words: '',
    curr_class_in_words: '',
    next_class_in_words: '',
  });
  useEffect(() => {
    // Check if location state exists and set the Class_MasterData accordingly
    if (location.state) {
      setClass_MasterData(location.state);
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState({});

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setClass_MasterData((prevData) => ({
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

    // if (!Class_MasterData.class_id) {
    //   errors.class_id = 'class_id is required';
    // }
    if (!Class_MasterData.class_name) {
      errors.class_name = 'class_name is required';
    }
    // if (!Class_MasterData.next_class_name) {
    //   errors.next_class_name = 'next_class_name is required';
    // }
    // if (!Class_MasterData.class_detail) {
    //   errors.class_detail = 'class_detail is required';
    // }
    // if (!Class_MasterData.class_display_name) {
    //   errors.class_display_name = 'class_display_name is required';
    // }
    // if (!Class_MasterData.roman_name) {
    //   errors.roman_name = 'roman_name is required';
    // }
    // if (!Class_MasterData.last_class_in_words) {
    //   errors.last_class_in_words = 'last_class_in_words is required';
    // }
    // if (!Class_MasterData.curr_class_in_words) {
    //   errors.curr_class_in_words = 'curr_class_in_words is required';
    // }
    // if (!Class_MasterData.next_class_in_words) {
    //   errors.next_class_in_words = 'next_class_in_words is required';
    // }

    return errors;
  };

  const submitClassData = async () => {
    try {
      debugger;
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
      const data = JSON.stringify(Class_MasterData);

      let response;

      if (Class_MasterData.id === '0' || Class_MasterData.id === 0) {
        response = await apiService.put(
          `api/ClassMaster/UpdateClassMaster?id=${Class_MasterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/ClassMaster/AddClassMaster',
          data,
          config
        );
      }

      console.log(response);
      console.log(data);

      if (response.status === true) {
        alert(response.message);
        setClass_MasterData({
          field_names: '',
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
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
              Class Master Form
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
                      Class Master
                    </button>
                  </h2>
                  <div
                    id='flush-collapseOne'
                    className='accordion-collapse collapse'
                    aria-labelledby='flush-headingOne'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='class_id'>class_id</Label>
                            <Input
                              id='class_id'
                              name='class_id'
                              value={Class_MasterData.class_id}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.class_id && (
                              <FormText color='danger'>
                                {errorMessage.class_id}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='class_Name'>class_name</Label>
                            <Input
                              id='class_Name'
                              name='class_Name'
                              value={Class_MasterData.class_Name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.class_Name && (
                              <FormText color='danger'>
                                {errorMessage.class_Name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='class_detail'>class_detail</Label>
                            <Input
                              id='class_detail'
                              name='class_detail'
                              value={Class_MasterData.class_detail}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.class_detail && (
                              <FormText color='danger'>
                                {errorMessage.class_detail}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='class_display_name'>
                              class_display_name
                            </Label>
                            <Input
                              id='class_display_name'
                              name='class_display_name'
                              value={Class_MasterData.class_display_name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.class_display_name && (
                              <FormText color='danger'>
                                {errorMessage.class_display_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='roman_name'>roman_name</Label>
                            <Input
                              id='roman_name'
                              name='roman_name'
                              value={Class_MasterData.roman_name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.roman_name && (
                              <FormText color='danger'>
                                {errorMessage.roman_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='last_class_in_words'>
                              last_class_in_words
                            </Label>
                            <Input
                              id='last_class_in_words'
                              name='last_class_in_words'
                              value={Class_MasterData.last_class_in_words}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.last_class_in_words && (
                              <FormText color='danger'>
                                {errorMessage.last_class_in_words}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='curr_class_in_words'>
                              curr_class_in_words
                            </Label>
                            <Input
                              id='curr_class_in_words'
                              name='curr_class_in_words'
                              value={Class_MasterData.curr_class_in_words}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.curr_class_in_words && (
                              <FormText color='danger'>
                                {errorMessage.curr_class_in_words}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='next_class_in_words'>
                              next_class_in_words
                            </Label>
                            <Input
                              id='next_class_in_words'
                              name='next_class_in_words'
                              value={Class_MasterData.next_class_in_words}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.next_class_in_words && (
                              <FormText color='danger'>
                                {errorMessage.next_class_in_words}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='next_class_name'>next_class_name</Label>
                            <Input
                              id='next_class_name'
                              name='next_class_name'
                              value={Class_MasterData.next_class_name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.next_class_name && (
                              <FormText color='danger'>
                                {errorMessage.next_class_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      {/* Other Form Groups */}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className='mt-2'
                color='primary'
                onClick={submitClassData}
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

export default Class_Master_Add_Edit_Screen;
