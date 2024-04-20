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
import PdfView from './PdfView';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Tc_Issue_Master_Detail_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Tc_Issue_Master_DetailData, setTc_Issue_Master_DetailData] = useState({
    tc_no_manual: '',
    entry_date_time: '',
    issue_date: '',
    photo_image: '',
    adm_sch_id: '',
    admit_no: '',
    sname: '',
    sex_mf: '',
    d_o_b: '',
    adm_date: '',
    f_name: '',
    m_name: '',
    tc_for_current: '',
    tc_for_end: '',
    curr_class: '',
    curr_class_in_roman: '',
    curr_class_in_word: '',
    promoted_class: '',
    promoted_class_in_roman: '',
    promoted_class_in_word: '',
    date_numric: '',
    month_no: '',
    year_no: '',
    from_year: '',
    to_year: '',
    possible_attend_days: '',
    attendance_days: '',
    leave_taken_days: '',
    result_detail: '',
    promot_yn: '',
    certificate_type: '',
    file_no_1: '',
    file_no_2: '',
    last_attended_date: '',
    withdraw_date: '',
    narr_remark: '',
    sch_session: '',
    sys_remark: '',
    fee_remark: '',
    tc_no_auto_id: '',
    fee_group_id: null,
    slabMstId: 0,
  });

  useEffect(() => {
    if (location.state) {
      setTc_Issue_Master_DetailData(location.state);
    }
  }, [location.state]);
  const [Admission_data, setAdmit_Group_data] = useState({
    id: 0,
    adm_sch_id: 0,
    session_year: '',
    admit_no: '',
    slab_name: '',
    fee_group_name: '',
    sex_mf: '',
    curr_class: '',
    curr_sec: '',
    f_name: '',
    m_name: '',
    religion_name: '',
    f_mob: '',
    m_mob: '',
    ac_close_yn: '',
    ac_close_date: '',
    tc_issue_yn: '',
    tc_issue_date: '',
    category_class: '',
    stud_name: '',
    admitno: '',
    sadd1: '',
    sadd2: '',
    sadd3: '',
  });
  const [errorMessage, setErrorMessage] = useState({});

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    debugger;
    const { name, value } = e.target;
    setTc_Issue_Master_DetailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == 'admitno') {
      GetAdmissionDetailByAdmNo(value);
    }

    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the previous error when the user starts typing
    }));
  };

  const CertificateList = [
    { label: 'Original', value: 'Original' },
    { label: 'Duplicate', value: 'Duplicate' },
    { label: 'Triplicate', value: 'Triplicate' },
  ];
  const tcynList = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
  const PromotList = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const validateInputs = () => {
    const errors = {};

    if (!Tc_Issue_Master_DetailData.tc_no_manual) {
      errors.tc_no_manual = 'tc_no_manual is required';
    }
    if (!Tc_Issue_Master_DetailData.entry_date_time) {
      errors.entry_date_time = 'entry_date_time is required';
    }
    if (!Tc_Issue_Master_DetailData.issue_date) {
      errors.issue_date = 'issue_date is required';
    }
    if (!Tc_Issue_Master_DetailData.photo_image) {
      errors.photo_image = 'photo_image is required';
    }
    if (!Tc_Issue_Master_DetailData.adm_sch_id) {
      errors.adm_sch_id = 'adm_sch_id is required';
    }
    if (!Tc_Issue_Master_DetailData.admit_no) {
      errors.admit_no = 'admit_no is required';
    }
    if (!Tc_Issue_Master_DetailData.sname) {
      errors.sname = 'sname is required';
    }
    if (!Tc_Issue_Master_DetailData.sex_mf) {
      errors.sex_mf = 'sex_mf is required';
    }
    if (!Tc_Issue_Master_DetailData.d_o_b) {
      errors.d_o_b = 'd_o_b is required';
    }
    if (!Tc_Issue_Master_DetailData.adm_date) {
      errors.adm_date = 'adm_date is required';
    }
    if (!Tc_Issue_Master_DetailData.f_name) {
      errors.f_name = 'f_name is required';
    }
    if (!Tc_Issue_Master_DetailData.m_name) {
      errors.m_name = 'm_name is required';
    }
    if (!Tc_Issue_Master_DetailData.tc_for_current) {
      errors.tc_for_current = 'tc_for_current is required';
    }
    if (!Tc_Issue_Master_DetailData.tc_for_end) {
      errors.tc_for_end = 'tc_for_end is required';
    }
    if (!Tc_Issue_Master_DetailData.curr_class) {
      errors.curr_class = 'curr_class is required';
    }
    if (!Tc_Issue_Master_DetailData.curr_class_in_roman) {
      errors.curr_class_in_roman = 'curr_class_in_roman is required';
    }
    if (!Tc_Issue_Master_DetailData.curr_class_in_word) {
      errors.curr_class_in_word = 'curr_class_in_word is required';
    }
    if (!Tc_Issue_Master_DetailData.promoted_class) {
      errors.promoted_class = 'promoted_class is required';
    }
    if (!Tc_Issue_Master_DetailData.promoted_class_in_roman) {
      errors.promoted_class_in_roman = 'promoted_class_in_roman is required';
    }
    if (!Tc_Issue_Master_DetailData.promoted_class_in_word) {
      errors.promoted_class_in_word = 'promoted_class_in_word is required';
    }
    if (!Tc_Issue_Master_DetailData.date_numric) {
      errors.date_numric = 'date_numric is required';
    }
    if (!Tc_Issue_Master_DetailData.month_no) {
      errors.month_no = 'month_no is required';
    }
    if (!Tc_Issue_Master_DetailData.year_no) {
      errors.year_no = 'year_no is required';
    }
    if (!Tc_Issue_Master_DetailData.from_year) {
      errors.from_year = 'from_year is required';
    }
    if (!Tc_Issue_Master_DetailData.to_year) {
      errors.to_year = 'to_year is required';
    }
    if (!Tc_Issue_Master_DetailData.possible_attend_days) {
      errors.possible_attend_days = 'possible_attend_days is required';
    }
    if (!Tc_Issue_Master_DetailData.attendance_days) {
      errors.attendance_days = 'attendance_days is required';
    }
    if (!Tc_Issue_Master_DetailData.leave_taken_days) {
      errors.leave_taken_days = 'leave_taken_days is required';
    }
    if (!Tc_Issue_Master_DetailData.result_detail) {
      errors.result_detail = 'result_detail is required';
    }
    if (!Tc_Issue_Master_DetailData.promot_yn) {
      errors.promot_yn = 'promot_yn is required';
    }
    if (!Tc_Issue_Master_DetailData.certificate_type) {
      errors.certificate_type = 'promot_yn is required';
    }
    if (!Tc_Issue_Master_DetailData.file_no_1) {
      errors.file_no_1 = 'file_no_1 is required';
    }
    if (!Tc_Issue_Master_DetailData.file_no_2) {
      errors.file_no_2 = 'file_no_2 is required';
    }
    if (!Tc_Issue_Master_DetailData.last_attended_date) {
      errors.last_attended_date = 'last_attended_date is required';
    }
    if (!Tc_Issue_Master_DetailData.withdraw_date) {
      errors.withdraw_date = 'withdraw_date is required';
    }
    if (!Tc_Issue_Master_DetailData.narr_remark) {
      errors.narr_remark = 'narr_remark is required';
    }
    if (!Tc_Issue_Master_DetailData.sch_session) {
      errors.sch_session = 'sch_session is required';
    }
    if (!Tc_Issue_Master_DetailData.sys_remark) {
      errors.sys_remark = 'sys_remark is required';
    }
    if (!Tc_Issue_Master_DetailData.fee_remark) {
      errors.fee_remark = 'fee_remark is required';
    }
    if (!Tc_Issue_Master_DetailData.tc_no_auto_id) {
      errors.tc_no_auto_id = 'tc_no_auto_id is required';
    }
  };

  const GetAdmissionDetailByAdmNo = async (search) => {
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
        `api/TcIssueMasterDetail/GetAdmissionDetailByAdmNo?admitNo=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }
      debugger;
      if (response.status === true) {
        setAdmit_Group_data(
          response.modelAdmitNewRes != null
            ? response.modelAdmitNewRes
            : {
                id: 0,
                adm_sch_id: 0,
                session_year: '',
                admit_no: '',
                slab_name: '',
                fee_group_name: '',
                sex_mf: '',
                curr_class: '',
                curr_sec: '',
                f_name: '',
                m_name: '',
                religion_name: '',
                f_mob: '',
                m_mob: '',
                ac_close_yn: '',
                ac_close_date: '',
                tc_issue_yn: '',
                tc_issue_date: '',
                category_class: '',
                stud_name: '',
              }
        );
        console.log(response.admitData);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong');
    }
  };

  const Tc_Issue_Master_Detail_Add_Edit_Screen = async () => {
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
      const data = JSON.stringify(Tc_Issue_Master_DetailData);

      let response;

      if (Tc_Issue_Master_DetailData.id === '0') {
        response = await apiService.put(
          `api/Tc_Issue_Master_Detail/UpdateTc_Issue_Master_Detail?id=${Tc_Issue_Master_DetailData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/Tc_Issue_Master_Detail/Tc_Issue_Master_Detail_Add_Edit_Screen',
          data,
          config
        );
      }

      console.log(response);
      console.log(data);

      if (response.status === true) {
        alert(response.message);
        setTc_Issue_Master_DetailData({
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
  const [pdfBlob, setPdfBlob] = useState(null);

  const handlePrint = () => {
    navigate('/PdfView', Admission_data);
    //setShowPdf(true);
    // return <PdfView />;
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
              TC Master Form
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
                          {' '}
                          <FormGroup>
                            <Label for='admitno'>
                              Adm No-{Admission_data.admit_no}
                            </Label>
                            <Input
                              id='admitno'
                              name='admitno'
                              value={Admission_data.admitno}
                              onChange={onChangeHandle}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='name'>Student Name</Label>
                            <Input
                              id='stud_name'
                              name='stud_name'
                              value={Admission_data.stud_name}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='sex_mf'>Gender</Label>
                            <Input
                              id='sex_mf'
                              name='sex_mf'
                              value={Admission_data.sex_mf}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='Class'>Class</Label>
                            <Input
                              id='curr_class'
                              name='curr_class'
                              value={Admission_data.curr_class}
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='curr_sec'>Section</Label>
                            <Input
                              id='curr_sec'
                              name='curr_sec'
                              value={Admission_data.curr_sec}
                            />
                          </FormGroup>
                        </div>

                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='f_name'>Father Name</Label>
                            <Input
                              id='f_name'
                              name='f_name'
                              value={Admission_data.f_name}
                            />
                          </FormGroup>
                        </div>

                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='m_name'>Mother Name</Label>
                            <Input
                              id='m_name'
                              name='m_name'
                              value={Admission_data.m_name}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='religion_name'>Religion</Label>
                            <Input
                              id='religion_name'
                              name='religion_name'
                              value={Admission_data.religion_name}
                            />
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='f_mob'>Father No</Label>
                            <Input
                              id='f_mob'
                              name='f_mob'
                              value={Admission_data.f_mob}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='m_mob'>Mother No</Label>
                            <Input
                              id='m_mob'
                              name='m_mob'
                              value={Admission_data.m_mob}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='fee_group_id'>Fee Group Name</Label>
                            <Input
                              id='fee_group_name'
                              name='fee_group_name'
                              value={Admission_data.fee_group_name}
                            />
                          </FormGroup>{' '}
                        </div>
                        <div className='col-3'>
                          <FormGroup>
                            <Label for='slab_name'>Fees Slab Name</Label>
                            <Input
                              id='slab_name'
                              name='slab_name'
                              value={Admission_data.slab_name}
                            />
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
                              value={Admission_data.ac_close_yn}
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='ac_close_date'>Ac Close Date</Label>
                            <Input
                              id='ac_close_date'
                              name='ac_close_date'
                              value={Admission_data.ac_close_date}
                              type='date'
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='tc_issue_yn'>TC Issue</Label>
                            <Input
                              id='tc_issue_yn'
                              name='tc_issue_yn'
                              value={Admission_data.tc_issue_yn}
                              type='tel'
                            />
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='tc_issue_date'>TC Issue Date</Label>
                            <Input
                              id='tc_issue_date'
                              name='tc_issue_date'
                              value={Admission_data.tc_issue_date}
                              type='date'
                            />
                          </FormGroup>
                        </div>
                        <div className='row'>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='category_class'>Catogery</Label>
                              <Input
                                id='category_class'
                                name='category_class'
                                value={Admission_data.category_class}
                                type='text'
                              />
                            </FormGroup>{' '}
                          </div>
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
                      Tc Issue Details
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
                            <Label for='tc_issue_yn'>TC Issue</Label>
                            <Input
                              id='tc_issue_yn'
                              name='tc_issue_yn'
                              value={Tc_Issue_Master_DetailData.tc_issue_yn}
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
                          {' '}
                          <FormGroup>
                            <Label for='tc_issue_date'>TC Issue Date</Label>
                            <Input
                              id='tc_issue_date'
                              name='tc_issue_date'
                              value={Tc_Issue_Master_DetailData.tc_issue_date}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.tc_issue_date && (
                              <FormText color='danger'>
                                {errorMessage.tc_issue_date}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='from_year'>Financial year from</Label>
                            <Input
                              id='from_year'
                              name='from_year'
                              value={Tc_Issue_Master_DetailData.from_year}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.from_year && (
                              <FormText color='danger'>
                                {errorMessage.from_year}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='to_year'>Financial year To</Label>
                            <Input
                              id='to_year'
                              name='to_year'
                              value={Tc_Issue_Master_DetailData.to_year}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.to_year && (
                              <FormText color='danger'>
                                {errorMessage.to_year}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='file_no_1'>File/Manual No</Label>
                            <Input
                              id='file_no_1'
                              name='file_no_1'
                              value={Tc_Issue_Master_DetailData.file_no_1}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.file_no_1 && (
                              <FormText color='danger'>
                                {errorMessage.file_no_1}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='narr_remark'>remark</Label>
                            <Input
                              id='narr_remark'
                              name='narr_remark'
                              value={Tc_Issue_Master_DetailData.narr_remark}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.narr_remark && (
                              <FormText color='danger'>
                                {errorMessage.narr_remark}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='certificate_type'>
                              Certificate Type
                            </Label>
                            <select
                              className='form-select'
                              id='certificate_type'
                              name='certificate_type'
                              value={
                                Tc_Issue_Master_DetailData.certificate_type
                              }
                              onChange={onChangeHandle}
                            >
                              {CertificateList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errorMessage.certificate_type && (
                              <FormText color='danger'>
                                {errorMessage.certificate_type}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='tc_for_end'>Tc After End Session</Label>
                            <select
                              className='form-select'
                              id='tc_for_end'
                              name='tc_for_end'
                              value={Tc_Issue_Master_DetailData.tc_for_end}
                              onChange={onChangeHandle}
                            >
                              {tcynList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errorMessage.tc_for_end && (
                              <FormText color='danger'>
                                {errorMessage.tc_for_end}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-3'></div>
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
                      Class Details
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
                            <Label for='possible_attend_days'>
                              Possible Attandent
                            </Label>
                            <Input
                              id='possible_attend_days'
                              name='possible_attend_days'
                              value={
                                Tc_Issue_Master_DetailData.possible_attend_days
                              }
                              onChange={onChangeHandle}
                            />
                            {errorMessage.possible_attend_days && (
                              <FormText color='danger'>
                                {errorMessage.possible_attend_days}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='tc_issue_yn'>Actual Attandent</Label>
                            <Input
                              id='tc_issue_yn'
                              name='tc_issue_yn'
                              value={Tc_Issue_Master_DetailData.tc_issue_yn}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.tc_issue_yn && (
                              <FormText color='danger'>
                                {errorMessage.tc_issue_yn}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='leave_taken_days'>
                              Leave Taken Day
                            </Label>
                            <Input
                              id='leave_taken_days'
                              name='leave_taken_days'
                              value={
                                Tc_Issue_Master_DetailData.leave_taken_days
                              }
                              onChange={onChangeHandle}
                            />
                            {errorMessage.leave_taken_days && (
                              <FormText color='danger'>
                                {errorMessage.leave_taken_days}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='result_detail'>Result</Label>
                            <Input
                              id='result_detail'
                              name='result_detail'
                              value={Tc_Issue_Master_DetailData.result_detail}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.result_detail && (
                              <FormText color='danger'>
                                {errorMessage.result_detail}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='promot_yn'>Promot yes/no</Label>
                            <select
                              className='form-select'
                              id='promot_yn'
                              name='promot_yn'
                              value={Tc_Issue_Master_DetailData.promot_yn}
                              onChange={onChangeHandle}
                            >
                              {PromotList.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            {errorMessage.promot_yn && (
                              <FormText color='danger'>
                                {errorMessage.promot_yn}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='last_attended_date'>
                              Last Attandent Date
                            </Label>
                            <Input
                              id='last_attended_date'
                              name='last_attended_date'
                              value={
                                Tc_Issue_Master_DetailData.last_attended_date
                              }
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.last_attended_date && (
                              <FormText color='danger'>
                                {errorMessage.last_attended_date}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='withdraw_date'>Withdraw Date</Label>
                            <Input
                              id='withdraw_date'
                              name='withdraw_date'
                              value={Tc_Issue_Master_DetailData.withdraw_date}
                              onChange={onChangeHandle}
                              type='date'
                            />
                            {errorMessage.withdraw_date && (
                              <FormText color='danger'>
                                {errorMessage.withdraw_date}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='fee_remark'>Fee ReMark</Label>
                            <Input
                              id='fee_remark'
                              name='fee_remark'
                              value={Tc_Issue_Master_DetailData.fee_remark}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.fee_remark && (
                              <FormText color='danger'>
                                {errorMessage.fee_remark}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                className='mt-2'
                color='primary'
                onClick={Tc_Issue_Master_Detail_Add_Edit_Screen}
              >
                Submit
              </Button>
              &nbsp;&nbsp;
              {/* <Button className='mt-2' color='primary' onClick={handlePrint}>
                Print Blank PDF in New Tab
              </Button> */}
              <PDFDownloadLink
                document={
                  <PdfView
                    admission_Data={Admission_data}
                    tc_Issue_Master_Data={Tc_Issue_Master_DetailData}
                  />
                }
                fileName='fee_acceptance'
              >
                {({ blob, url, loading, error }) =>
                  loading ? 'Loading document...' : 'Download now!'
                }
              </PDFDownloadLink>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tc_Issue_Master_Detail_Add_Edit_Screen;
