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

const Subject_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [subjectMasterData, setSubjectMasterData] = useState({
    subject_code: '',
    subject_name: '',
    subject_marks: '',
    class_name: '',
  });
  useEffect(() => {
    // Check if location state exists and set the subjectMasterData accordingly
    if (location.state) {
      setSubjectMasterData(location.state);
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState({});

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setSubjectMasterData((prevData) => ({
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

    if (!subjectMasterData.subject_code) {
      errors.subject_code = 'Subject code is required';
    }
    if (!subjectMasterData.subject_name) {
      errors.subject_name = 'Subject name is required';
    }
    if (!subjectMasterData.subject_marks) {
      errors.subject_marks = 'Subject marks is required';
    }
    if (!subjectMasterData.class_name) {
      errors.class_name = 'Class name is required';
    }

    return errors;
  };

  const Subject_Master_Add_Edit_Screen = async () => {
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
      const data = JSON.stringify(subjectMasterData);

      let response;

      if (subjectMasterData.id === '0' || subjectMasterData.id === 0) {
        // Corrected the condition here
        response = await apiService.put(
          `api/SubjectMaster/UpdateSubjectMaster?id=${subjectMasterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/SubjectMaster/AddSubjectMaster',
          data,
          config
        );
      }

      console.log(response);
      console.log(data);

      if (response.status === true) {
        alert(response.message);
        setSubjectMasterData({
          subject_code: '',
          subject_name: '',
          subject_marks: '',
          class_name: '',
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
              Subject Master Form
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
                        <Label for='subject_code'>Subject Code</Label>
                        <Input
                          id='subject_code'
                          name='subject_code'
                          value={subjectMasterData.subject_code}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.subject_code && (
                          <FormText color='danger'>
                            {errorMessage.subject_code}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='subject_name'>Subject Name</Label>
                        <Input
                          id='subject_name'
                          name='subject_name'
                          value={subjectMasterData.subject_name}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.subject_name && (
                          <FormText color='danger'>
                            {errorMessage.subject_name}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='subject_marks'>Subject Marks</Label>
                        <Input
                          id='subject_marks'
                          name='subject_marks'
                          value={subjectMasterData.subject_marks}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.subject_marks && (
                          <FormText color='danger'>
                            {errorMessage.subject_marks}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='class_name'>Class Name</Label>
                        <Input
                          id='class_name'
                          name='class_name'
                          value={subjectMasterData.class_name}
                          onChange={onChangeHandle}
                        />
                        {errorMessage.class_name && (
                          <FormText color='danger'>
                            {errorMessage.class_name}
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
                onClick={Subject_Master_Add_Edit_Screen}
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

export default Subject_Master_Add_Edit_Screen;
