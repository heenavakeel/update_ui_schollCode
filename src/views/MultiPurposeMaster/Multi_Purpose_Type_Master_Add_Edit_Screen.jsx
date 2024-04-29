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

const Multi_Purpose_Type_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [feeheadData, setfeeheadData] = useState({
    id: 0,
    adm_sch_id: 0,
    session_year: '',
    admit_no: '',
    stud_name: '',
    sex_mf: 'male',
    d_o_b: '',
    adm_date: new Date().toISOString().substr(0, 10), // Set current date
    class_admit: '',
    curr_class: '',
    curr_sec: '',
    roll_no: '',
    barcode_no: '',
    ac_close_yn: '',
    ac_close_date: new Date('Sat Jul 19 1990 14:00:00 GMT+0200')
      .toISOString()
      .substr(0, 10),
    tc_issue_yn: '',
    tc_issue_date: new Date('Sat Jul 19 1990 14:00:00 GMT+0200')
      .toISOString()
      .substr(0, 10),
    sadd1: '',
    sadd2: '',
    sadd3: '',
    state_name: '',
    pin_code: '',
    alt_add: '',
    living_dur: '',
    category_class: '',
    religion_name: '',
    mother_tong: '',
    addhar_no: '',
    bank_name: '',
    bank_ac_no: '',
    cov_yn: '',
    con_det: '',
    fee_group_id: 0,
    slab_code: 0,
    slabMstId: 0,
    fee_flag_type: 0,
    tot_fees: 0,
    op_bal: 0,
    douc_list_det: '',
    f_name: '',
    m_name: '',
    g_name: '',
    f_quali: '',
    m_quali: '',
    g_quali: '',
    f_prof: '',
    m_prof: '',
    g_prof: '',
    f_income: '',
    m_income: '',
    g_income: '',
    f_officeph: '',
    m_officeph: '',
    g_officeph: '',
    f_mob: '',
    m_mob: '',
    g_mob: '',
    entering_date_time: null,
    last_sch_name: '',
    last_sch_add: '',
    last_sch_city: '',
    last_sch_state: '',
    last_sch_pincode: '',
    last_sch_adm_no: '',
    mark_obtain: 0,
    max_marks: 0,
    last_marks_per: 0,
    sibling_adm_no_1: '',
    sibling_class_1: '',
    sibling_name_1: '',
    sibling_adm_no_2: '',
    sibling_class_2: '',
    sibling_name_2: '',
    sys_remark: '',
    curr_class_id: null,
    samp: 'test ',
  });
  const [Multi_Purpose_Type_MasterData, setMulti_Purpose_Type_MasterData] =
    useState({
      multi_purpose_flag: '',
      multi_purpose_code: '',
      multi_purpose_type: '',
      multi_purpose_remark: '',
    });
  useEffect(() => {
    console.log('location.state');
    debugger;
    //console.log(location.state);
    //debugger;
    // Check if location state exists and set the Multi_Purpose_Type_MasterData accordingly
    if (location.state) {
      console.log('location.state');
      console.log(location.state.feeheadData);
      setfeeheadData(location.state.feeheadData);
      setMulti_Purpose_Type_MasterData((prevData) => ({
        ...prevData,
        multi_purpose_type: location.state.type,
      }));
    }
  }, [location.state]);

  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setMulti_Purpose_Type_MasterData((prevData) => ({
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

    return errors;
  };

  // const receiveDataFromParent = (data) => {
  //   debugger;
  //   setfeeheadData(data);
  // };

  const Multi_Purpose_Type_Master_Add_Edit_Screen = async () => {
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
      const data = JSON.stringify(Multi_Purpose_Type_MasterData);

      //debugger;
      let response;

      if (
        Multi_Purpose_Type_MasterData.id === '0' ||
        Multi_Purpose_Type_MasterData.id === 0
      ) {
        response = await apiService.put(
          `api/Multi_Purpose_Type_Master/UpdateMulti_Purpose_Type_Master?id=${Multi_Purpose_Type_MasterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/Multi_Purpose_Type_Master/AddMulti_Purpose_Type_Master',
          data,
          config
        );
      }
      if (response.status === true) {
        alert(response.message);
        navigate('/addAdmission', {
          state: { feeheadData: feeheadData },
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
              Multipurpose Form
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
                        <Label for='multi_purpose_flag'>
                          multi_purpose_flag
                        </Label>
                        <Input
                          id='multi_purpose_flag'
                          name='multi_purpose_flag'
                          value={
                            Multi_Purpose_Type_MasterData.multi_purpose_flag
                          }
                          onChange={onChangeHandle}
                        />
                        {errorMessage.multi_purpose_flag && (
                          <FormText color='danger'>
                            {errorMessage.multi_purpose_flag}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='multi_purpose_code'>
                          multi_purpose_code
                        </Label>
                        <Input
                          id='multi_purpose_code'
                          name='multi_purpose_code'
                          value={
                            Multi_Purpose_Type_MasterData.multi_purpose_code
                          }
                          onChange={onChangeHandle}
                        />
                        {errorMessage.multi_purpose_code && (
                          <FormText color='danger'>
                            {errorMessage.multi_purpose_code}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='multi_purpose_type'>
                          multi_purpose_type
                        </Label>
                        <Input
                          id='multi_purpose_type'
                          name='multi_purpose_type'
                          value={
                            Multi_Purpose_Type_MasterData.multi_purpose_type
                          }
                          onChange={onChangeHandle}
                        />
                        {errorMessage.multi_purpose_type && (
                          <FormText color='danger'>
                            {errorMessage.multi_purpose_type}
                          </FormText>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <Label for='multi_purpose_remark'>
                          multi_purpose_remark
                        </Label>
                        <Input
                          id='multi_purpose_remark'
                          name='multi_purpose_remark'
                          value={
                            Multi_Purpose_Type_MasterData.multi_purpose_remark
                          }
                          onChange={onChangeHandle}
                        />
                        {errorMessage.multi_purpose_remark && (
                          <FormText color='danger'>
                            {errorMessage.multi_purpose_remark}
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
                onClick={Multi_Purpose_Type_Master_Add_Edit_Screen}
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

export default Multi_Purpose_Type_Master_Add_Edit_Screen;
