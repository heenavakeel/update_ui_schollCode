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

const AddAdmission = () => {
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
    samp: 'test ',
  });
  const [Fee_Group_data, setFee_Group_data] = useState([]);
  const [SlabMaster, setSlabMaster] = useState([]);
  const [SlabMasterTotalMont, setSlabMasterTotalMont] = useState([]);

  useEffect(() => {
    // Check if location state exists and set the feeheadData accordingly
    if (location.state) {
      debugger;
      setfeeheadData(location.state);
      GetSlabMasterByFeeGroupID(location.state?.fee_group_id);
    }
  }, [location.state]);

  useEffect(() => {
    GetFee_GroupData('');
  }, []);

  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };
  // Example usage:

  const GetFee_GroupData = async (search) => {
    if (search == null) {
      search = '';
    }
    console.log(search);
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/FeeGroupMaster/GetFeeGroup?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setFee_Group_data(response.data);
        console.log(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong');
    }
  };

  const options = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const MotherTongueList = [
    { label: 'Hindi', value: 'Hindi' },
    { label: 'English', value: 'English' },
    { label: 'Tamil', value: 'Tamil' },
    { label: 'Urdu', value: 'Urdu' },
  ];

  const catogeryList = [
    { label: 'GEN', value: 'GEN' },
    { label: 'OBC', value: 'OBC' },
    { label: 'ST', value: 'ST' },
    { label: 'SC', value: 'SC' },
  ];
  const ConveyanceList = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'OBC' },
  ];

  const religionList = [
    { label: 'Hinduism', value: 'Hinduism' },
    { label: 'Islam', value: 'Islam' },
    { label: 'Jainism', value: 'Jainism' },
    { label: 'Buddhism', value: 'Buddhism' },
    { label: 'Sikhism', value: 'Sikhism' },
    { label: 'Zoroastrianism', value: 'Zoroastrianism' },
    { label: 'Other', value: 'Other' },
  ];

  const onChangeHandle = (e) => {
    debugger;
    const { name, value } = e.target;
    if (name == 'fee_group_id') {
      GetSlabMasterByFeeGroupID(value);
      setSlabMasterTotalMont([]);
    }
    if (name === 'slabMstId') {
      const filterDate = SlabMaster.filter((s) => s.id === parseInt(value));
      setSlabMasterTotalMont(filterDate);
    }
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
    return errors;
  };

  const GetSlabMasterByFeeGroupID = async (groupId) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };
      const response = await apiService.get(
        `api/SlabMaster/GetSlabMasterByFeeGroupID?id=${groupId}`,
        config
      );
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }
      if (response.status === true) {
        debugger;
        setSlabMaster(response.data);
        //updateHeaderData();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const AddAdmission = async () => {
    debugger;
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
          `api/Admission/UpdateAdmission?id=${feeheadData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/Admission/AddAdmission',
          data,
          config
        );
      }

      console.log(response);
      console.log(data);

      // if (response.response && response.response.data.errors) {
      //   alert(response.response?.data?.errors);
      // }

      //if (response.status === true) {
      //   alert(response.message);
      //   setfeeheadData({
      //     adm_sch_id: '',
      //     session_year: '',
      //     admit_no: '',
      //     stud_name: '',
      //   });
      if (response.status === true) {
        alert(response.message);
        // Redirect to desired page after successful submission
        navigate('/Admission');
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
              Admission Form
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
                  <h2 className='accordion-header' id='1'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseOne'
                      aria-expanded='false'
                      aria-controls='flush-collapseOne'
                      style={{ backgroundColor: '#808080' }}
                    >
                      Admission Details
                    </button>
                  </h2>
                  <div
                    id='flush-collapseOne'
                    className='accordion-collapse collapse'
                    aria-labelledby='1'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='session_year'>Session Year</Label>
                            <Input
                              id='session_year'
                              name='session_year'
                              value={feeheadData.session_year}
                              onChange={onChangeHandle}
                              type='session_year'
                            />
                            {errorMessage.session_year && (
                              <FormText color='danger'>
                                {errorMessage.session_year}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='admit_no'>Admit No</Label>
                            <Input
                              id='admit_no'
                              name='admit_no'
                              value={feeheadData.admit_no}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.admit_no && (
                              <FormText color='danger'>
                                {errorMessage.admit_no}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='adm_date'>Adm Date</Label>
                            <Input
                              id='adm_date'
                              name='adm_date'
                              value={feeheadData.adm_date}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.adm_date && (
                              <FormText color='danger'>
                                {errorMessage.adm_date}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='stud_name'>Student Name First</Label>
                            <Input
                              id='stud_name'
                              name='stud_name'
                              value={feeheadData.stud_name}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.stud_name && (
                              <FormText color='danger'>
                                {errorMessage.stud_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sex_mf'>Gender</Label>
                            <select
                              className='form-select'
                              id='sex_mf'
                              name='sex_mf'
                              value={feeheadData.sex_mf}
                              onChange={onChangeHandle}
                            >
                              {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.sex_mf}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='d_o_b'>D O B</Label>
                            <Input
                              id='d_o_b'
                              name='d_o_b'
                              value={feeheadData.d_o_b}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.d_o_b && (
                              <FormText color='danger'>
                                {errorMessage.d_o_b}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='category_class'>Catogery</Label>
                            <select
                              className='form-select'
                              id='category_class'
                              name='category_class'
                              value={feeheadData.category_class}
                              onChange={onChangeHandle}
                            >
                              {catogeryList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            {errorMessage.category_class && (
                              <FormText color='danger'>
                                {errorMessage.category_class}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>

                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='religion_name'>Religion</Label>
                            <select
                              className='form-select'
                              id='religion_name'
                              name='religion_name'
                              value={feeheadData.religion_name}
                              onChange={onChangeHandle}
                            >
                              {religionList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.religion_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='mother_tong'>Mother Tongue</Label>
                            <select
                              className='form-select'
                              id='mother_tong'
                              name='mother_tong'
                              value={feeheadData.mother_tong}
                              onChange={onChangeHandle}
                            >
                              {MotherTongueList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errorMessage.mother_tong && (
                              <FormText color='danger'>
                                {errorMessage.mother_tong}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>

                        <div className='col-3'>
                          <FormGroup>
                            <Label for='bank_name'>Bank</Label>
                            <Input
                              id='bank_name'
                              name='bank_name'
                              value={feeheadData.bank_name}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.bank_name && (
                              <FormText color='danger'>
                                {errorMessage.bank_name}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>

                        <div className='col-3'>
                          <FormGroup>
                            <Label for='bank_ac_no'>Ac No</Label>
                            <Input
                              id='bank_ac_no'
                              name='bank_ac_no'
                              value={feeheadData.bank_ac_no}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.bank_ac_no}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='op_bal'>Opening Bal</Label>
                            <Input
                              id='op_bal'
                              name='op_bal'
                              value={feeheadData.op_bal}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.op_bal}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='ac_close_yn'>A/c Close</Label>
                            <Input
                              id='ac_close_yn'
                              name='ac_close_yn'
                              value={feeheadData.ac_close_yn}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.ac_close_yn}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='ac_close_date'>Ac Close Date</Label>
                            <Input
                              id='ac_close_date'
                              name='ac_close_date'
                              value={feeheadData.ac_close_date}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.ac_close_date && (
                              <FormText color='danger'>
                                {errorMessage.ac_close_date}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='tc_issue_yn'>TC Issue</Label>
                            <Input
                              id='tc_issue_yn'
                              name='tc_issue_yn'
                              value={feeheadData.tc_issue_yn}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.tc_issue_yn && (
                              <FormText color='danger'>
                                {errorMessage.tc_issue_yn}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='tc_issue_date'>TC Issue Date</Label>
                            <Input
                              id='tc_issue_date'
                              name='tc_issue_date'
                              value={feeheadData.tc_issue_date}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.tc_issue_date && (
                              <FormText color='danger'>
                                {errorMessage.tc_issue_date}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='2'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseTwo'
                      aria-expanded='false'
                      aria-controls='flush-collapseTwo'
                      style={{ backgroundColor: '#0000FF' }}
                    >
                      Fee Details
                    </button>
                  </h2>
                  <div
                    id='flush-collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='2'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='addhar_no'>Addhar No.</Label>
                            <Input
                              id='addhar_no'
                              name='addhar_no'
                              value={feeheadData.addhar_no}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.addhar_no && (
                              <FormText color='danger'>
                                {errorMessage.addhar_no}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='class_admit'>Class Admit</Label>
                            <Input
                              id='class_admit'
                              name='class_admit'
                              value={feeheadData.class_admit}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.class_admit && (
                              <FormText color='danger'>
                                {errorMessage.class_admit}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='curr_class'>Current Class</Label>
                            <Input
                              id='curr_class'
                              name='curr_class'
                              value={feeheadData.curr_class}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.curr_class}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='curr_sec'>Section</Label>
                            <Input
                              id='curr_sec'
                              name='curr_sec'
                              value={feeheadData.curr_sec}
                              onChange={onChangeHandle}
                              type='d_o_b'
                            />
                            {errorMessage.curr_sec && (
                              <FormText color='danger'>
                                {errorMessage.curr_sec}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='roll_no'>Roll No</Label>
                            <Input
                              id='roll_no'
                              name='roll_no'
                              value={feeheadData.roll_no}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.roll_no && (
                              <FormText color='danger'>
                                {errorMessage.roll_no}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>

                        <div className='col-3'>
                          <FormGroup>
                            <Label for='fee_group_id'>Fee Group Name</Label>
                            <select
                              className='form-select'
                              id='fee_group_id'
                              name='fee_group_id'
                              value={feeheadData.fee_group_id}
                              onChange={onChangeHandle}
                            >
                              <option value='0'>Select Fee Group</option>
                              {Fee_Group_data.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.fee_group_name}
                                </option>
                              ))}
                            </select>

                            {errorMessage.fee_group_id && (
                              <FormText color='danger'>
                                {errorMessage.fee_group_id}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='slabMstId'>Fees Slab Name</Label>
                            <select
                              className='form-select'
                              id='slabMstId'
                              name='slabMstId'
                              value={feeheadData.slabMstId}
                              onChange={onChangeHandle}
                            >
                              <option value='0'>Select Fee Slab</option>
                              {SlabMaster.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.slab_name}
                                </option>
                              ))}
                            </select>

                            {errorMessage.slabMstId && (
                              <FormText color='danger'>
                                {errorMessage.slabMstId}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='barcode_no'>BarCode</Label>
                            <Input
                              id='barcode_no'
                              name='barcode_no'
                              value={feeheadData.barcode_no}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.barcode_no && (
                              <FormText color='danger'>
                                {errorMessage.barcode_no}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>
                      </div>
                      {SlabMasterTotalMont &&
                        SlabMasterTotalMont.length > 0 && (
                          <div className='row'>
                            <table className='table'>
                              <thead>
                                <tr>
                                  <th>Total</th>
                                  <th>Apr-1</th>
                                  <th>May-2</th>
                                  <th>June-3</th>
                                  <th>July-4</th>
                                  <th>Aug-5</th>
                                  <th>Sep-6</th>
                                  <th>Oct-7</th>
                                  <th>Nov-8</th>
                                  <th>Dec-9</th>
                                  <th>Jan-10</th>
                                  <th>Feb-11</th>
                                  <th>Mar-12</th>
                                </tr>
                              </thead>
                              <tbody>
                                {SlabMasterTotalMont.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.fee_tot}</td>

                                    <td>{item.month_tot_1}</td>
                                    <td>{item.month_tot_2}</td>
                                    <td>{item.month_tot_3}</td>
                                    <td>{item.month_tot_4}</td>
                                    <td>{item.month_tot_5}</td>
                                    <td>{item.month_tot_6}</td>
                                    <td>{item.month_tot_7}</td>
                                    <td>{item.month_tot_8}</td>
                                    <td>{item.month_tot_9}</td>
                                    <td>{item.month_tot_10}</td>
                                    <td>{item.month_tot_11}</td>
                                    <td>{item.month_tot_12}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sibling_name_1'>Sibling Name 1</Label>
                            <Input
                              id='sibling_name_1'
                              name='sibling_name_1'
                              value={feeheadData.sibling_name_1}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.sibling_name_1}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sibling_name_2'>Sibling Name 2</Label>
                            <Input
                              id='sibling_name_2'
                              name='sibling_name_2'
                              value={feeheadData.sibling_name_2}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.sibling_name_2}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='cov_yn'>Conveyance[Y/N]</Label>

                            <select
                              className='form-select'
                              id='cov_yn'
                              name='cov_yn'
                              value={feeheadData.cov_yn}
                              onChange={onChangeHandle}
                            >
                              {ConveyanceList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>

                            {errorMessage.cov_yn && (
                              <FormText color='danger'>
                                {errorMessage.cov_yn}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='3'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseThree'
                      aria-expanded='false'
                      aria-controls='flush-collapseThree'
                      style={{ backgroundColor: '#FFFF00' }}
                    >
                      Address Details
                    </button>
                  </h2>
                  <div
                    id='flush-collapseThree'
                    className='accordion-collapse collapse'
                    aria-labelledby='3'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sadd1'>Permanent Address</Label>
                            <Input
                              id='sadd1'
                              name='sadd1'
                              value={feeheadData.sadd1}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.sadd1}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sadd2'>Area/Location Name</Label>
                            <Input
                              id='sadd2'
                              name='sadd2'
                              value={feeheadData.sadd2}
                              onChange={onChangeHandle}
                              type='sadd2'
                            />
                            {errorMessage.sadd2 && (
                              <FormText color='danger'>
                                {errorMessage.sadd2}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sadd3'>District</Label>
                            <Input
                              id='sadd3'
                              name='sadd3'
                              value={feeheadData.sadd3}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.sadd3 && (
                              <FormText color='danger'>
                                {errorMessage.sadd3}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='state_name'>State Name</Label>
                            <Input
                              id='state_name'
                              name='state_name'
                              value={feeheadData.state_name}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.state_name && (
                              <FormText color='danger'>
                                {errorMessage.state_name}
                              </FormText>
                            )}
                          </FormGroup>{' '}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='pin_code'>Pin Code</Label>
                            <Input
                              id='pin_code'
                              name='pin_code'
                              value={feeheadData.pin_code}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.pin_code}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='alt_add'>Alter Nate Address</Label>
                            <Input
                              id='alt_add'
                              name='alt_add'
                              value={feeheadData.alt_add}
                              onChange={onChangeHandle}
                              type='alt_add'
                            />
                            {errorMessage.alt_add && (
                              <FormText color='danger'>
                                {errorMessage.alt_add}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='living_dur'>Living In</Label>
                            <Input
                              id='living_dur'
                              name='living_dur'
                              value={feeheadData.living_dur}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.living_dur && (
                              <FormText color='danger'>
                                {errorMessage.living_dur}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='4'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseFour'
                      aria-expanded='false'
                      aria-controls='flush-collapseFour'
                      style={{ backgroundColor: '#A9A9A9' }}
                    >
                      Parents Details
                    </button>
                  </h2>
                  <div
                    id='flush-collapseFour'
                    className='accordion-collapse collapse'
                    aria-labelledby='4'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <div className='col'>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Qualification</th>
                                <th>Profession</th>
                                <th>Monthly Income</th>
                                <th>Phone No</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Father Details */}
                              <tr>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='f_name'
                                      name='f_name'
                                      value={feeheadData.f_name}
                                      onChange={onChangeHandle}
                                      placeholder="Father's Name"
                                    />
                                    {errorMessage.f_name && (
                                      <FormText color='danger'>
                                        {errorMessage.f_name}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='f_quali'
                                      name='f_quali'
                                      value={feeheadData.f_quali}
                                      onChange={onChangeHandle}
                                      placeholder="Father's Qualification"
                                    />
                                    {errorMessage.f_quali && (
                                      <FormText color='danger'>
                                        {errorMessage.f_quali}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='f_prof'
                                      name='f_prof'
                                      value={feeheadData.f_prof}
                                      onChange={onChangeHandle}
                                      placeholder="Father's Profession"
                                    />
                                    {errorMessage.f_prof && (
                                      <FormText color='danger'>
                                        {errorMessage.f_prof}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='f_income'
                                      name='f_income'
                                      value={feeheadData.f_income}
                                      onChange={onChangeHandle}
                                      placeholder="Father's Monthly Income"
                                    />
                                    {errorMessage.f_income && (
                                      <FormText color='danger'>
                                        {errorMessage.f_income}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='f_mob'
                                      name='f_mob'
                                      value={feeheadData.f_mob}
                                      onChange={onChangeHandle}
                                      placeholder="Father's Mobile"
                                    />
                                    {errorMessage.f_mob && (
                                      <FormText color='danger'>
                                        {errorMessage.f_mob}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                              </tr>
                              {/* Mother Details */}
                              <tr>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='m_name'
                                      name='m_name'
                                      value={feeheadData.m_name}
                                      onChange={onChangeHandle}
                                      placeholder="Mother's Name"
                                    />
                                    {errorMessage.m_name && (
                                      <FormText color='danger'>
                                        {errorMessage.m_name}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='m_quali'
                                      name='m_quali'
                                      value={feeheadData.m_quali}
                                      onChange={onChangeHandle}
                                      placeholder="Mother's Qualification"
                                    />
                                    {errorMessage.m_quali && (
                                      <FormText color='danger'>
                                        {errorMessage.m_quali}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='m_prof'
                                      name='m_prof'
                                      value={feeheadData.m_prof}
                                      onChange={onChangeHandle}
                                      placeholder="Mother's Profession"
                                    />
                                    {errorMessage.m_prof && (
                                      <FormText color='danger'>
                                        {errorMessage.m_prof}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='m_income'
                                      name='m_income'
                                      value={feeheadData.m_income}
                                      onChange={onChangeHandle}
                                      placeholder="Mother's Monthly Income"
                                    />
                                    {errorMessage.m_income && (
                                      <FormText color='danger'>
                                        {errorMessage.m_income}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='m_mob'
                                      name='m_mob'
                                      value={feeheadData.m_mob}
                                      onChange={onChangeHandle}
                                      placeholder="Mother's Mobile"
                                    />
                                    {errorMessage.m_mob && (
                                      <FormText color='danger'>
                                        {errorMessage.m_mob}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                              </tr>
                              {/* Guardian Details */}
                              <tr>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='g_name'
                                      name='g_name'
                                      value={feeheadData.g_name}
                                      onChange={onChangeHandle}
                                      placeholder="Guardian's Name"
                                    />
                                    {errorMessage.g_name && (
                                      <FormText color='danger'>
                                        {errorMessage.g_name}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='g_quali'
                                      name='g_quali'
                                      value={feeheadData.g_quali}
                                      onChange={onChangeHandle}
                                      placeholder="Guardian's Qualification"
                                    />
                                    {errorMessage.g_quali && (
                                      <FormText color='danger'>
                                        {errorMessage.g_quali}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='g_prof'
                                      name='g_prof'
                                      value={feeheadData.g_prof}
                                      onChange={onChangeHandle}
                                      placeholder="Guardian's Profession"
                                    />
                                    {errorMessage.g_prof && (
                                      <FormText color='danger'>
                                        {errorMessage.g_prof}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='g_income'
                                      name='g_income'
                                      value={feeheadData.g_income}
                                      onChange={onChangeHandle}
                                      placeholder="Guardian's Monthly Income"
                                    />
                                    {errorMessage.g_income && (
                                      <FormText color='danger'>
                                        {errorMessage.g_income}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      id='g_mob'
                                      name='g_mob'
                                      value={feeheadData.g_mob}
                                      onChange={onChangeHandle}
                                      placeholder="Guardian's Mobile"
                                    />
                                    {errorMessage.g_mob && (
                                      <FormText color='danger'>
                                        {errorMessage.g_mob}
                                      </FormText>
                                    )}
                                  </FormGroup>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className='mt-2' color='primary' onClick={AddAdmission}>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddAdmission;
