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
const Fee_Reciept_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paidFee, setPaidFee] = useState(0);

  const [SlabMasterTotalMont, setSlabMasterTotalMont] = useState([
    {
      id: 0,
      fee_head_name: '',
      fee_amt: 0,
      month_1: null,
      month_2: null,
      month_3: null,
      month_4: null,
      month_5: null,
      month_6: null,
      month_7: null,
      month_8: null,
      month_9: null,
      month_10: null,
      month_11: null,
      month_12: null,
      paid: 0,
      pending: 0,
      current: 0,
      rec_amt: 0,
      fee_Reciept_id: null,
      slabdetailid: null,
    },
  ]);
  const [Fee_Reciept_MasterData, setFee_Reciept_MasterData] = useState({
    id: 0,
    sadmitno: '',
    sname1: '',
    fee_slab_code: '',
    fee_slab_name: '',
    fee_head_code: '',
    fee_head_name: '',
    reciept_no: '',
    rect_date: null,
    rect_time: null,
    fee_amt: null,
    paid_amt: null,
    outstanding: null,
    rec_type: '',
    net_amt: null,
    amt_rec: null,
    dis_amt: null,
    adv_amt: null,
    vou_type: '',
    amt_in_wor: '',
    mode: '',
    chq_no: '',
    chq_date: '',
    bank_name: '',
    narr: '',
    other1: '',
    other2: '',
    other3: '',
    other4: '',
    other5: '',
    other6: '',
    other7: null,
    other8: null,
    other9: null,
    other10: null,
    other11: '',
    other12: '',
    other13: '',
    other14: '',
    other15: '',
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [currentMonth, setCurrentMonth] = useState(0);
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
    fee_tot: null,
    month_tot_1: null,
    month_tot_2: null,
    month_tot_3: null,
    month_tot_4: null,
    month_tot_5: null,
    month_tot_6: null,
    month_tot_7: null,
    month_tot_8: null,
    month_tot_9: null,
    month_tot_10: null,
    month_tot_11: null,
    month_tot_12: null,
    late_Fee: null,
    recieved_Amount: null,
    slabMstId: null,
  });

  useEffect(() => {
    if (location.state) {
      setFee_Reciept_MasterData(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (Admission_data.admit_no !== '') {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentMonthNumber = currentMonth + 1;
      setCurrentMonth(currentMonthNumber);
    }
  }, [Admission_data]);

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const GetSlabMasterDetail = async (slabMstId) => {
    debugger;
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };
      const response = await apiService.get(
        `api/SlabDetail/GetSlabDetailById?id=${slabMstId}`,
        config
      );
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }
      if (response.status === true) {
        debugger;
        setSlabMasterTotalMont(response.modelSlabDetailReq);
        //updateHeaderData();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFee_Reciept_MasterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == 'admitno') {
      GetAdmissionDetailByAdmNo(value);
    }
    if (name == 'dis_amt') {
      const after_dis =
        currentMonth === 1
          ? Admission_data.month_tot_1 - value
          : currentMonth === 2
          ? Admission_data.month_tot_2 - value
          : currentMonth === 3
          ? Admission_data.month_tot_3 - value
          : currentMonth === 4
          ? Admission_data.month_tot_4 - value
          : currentMonth === 6
          ? Admission_data.month_tot_6 - value
          : currentMonth === 7
          ? Admission_data.month_tot_7 - value
          : currentMonth === 8
          ? Admission_data.month_tot_8 - value
          : currentMonth === 9
          ? Admission_data.month_tot_9 - value
          : currentMonth === 10
          ? Admission_data.month_tot_10 - value
          : currentMonth === 11
          ? Admission_data.month_tot_11 - value
          : currentMonth === 12
          ? Admission_data.month_tot_12 - value
          : 0; // default to 0 if currentMonth doesn't match any case

      setFee_Reciept_MasterData((prevData) => ({
        ...prevData,
        adv_amt: after_dis,
      }));
    }

    if (name == 'paid_amt') {
      //setPaidFee(value);
      setFee_Reciept_MasterData((prevData) => ({
        ...prevData,
        paid_amt: value,
      }));
      //   debugger;
      // const correctAmt =
      //   currentMonth >= 1 && currentMonth <= 12
      //     ? SlabMasterTotalMont[`month_${currentMonth}`]
      //     : 0;
      // setSlabMasterTotalMont((prevData) => {
      //   return prevData.map((record, index) => {
      //     const valueToSubtract = value === '' ? 0 : parseInt(value);
      //     return {
      //       ...record,
      //       paid: record.fee_amt - valueToSubtract,
      //       pending: 0,
      //       current:
      //         currentMonth >= 1 && currentMonth <= 12
      //           ? SlabMasterTotalMont[index][`month_${currentMonth}`]
      //           : 0,
      //       rec_amt:
      //         currentMonth >= 1 && currentMonth <= 12
      //           ? SlabMasterTotalMont[index][`month_${currentMonth}`] -
      //             valueToSubtract
      //           : 0,
      //     };
      //   });
      // });
    }
    setErrorMessage((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the previous error when the user starts typing
    }));
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
        setSlabMasterTotalMont([]);
        setAdmit_Group_data(
          response.modelAdmitNewRes != null
            ? response.modelAdmitNewRes
            : Admission_data
        );
        if (response.modelAdmitNewRes?.slabMstId != null) {
          GetSlabMasterDetail(response.modelAdmitNewRes?.slabMstId);
        }
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

  const HandleBlurEvent = (e) => {
    let tot_rec_amt = e.target.value;
    const feeList = SlabMasterTotalMont.map((item, index) => {
      let rec_amt;
      if (index === SlabMasterTotalMont.length - 1) {
        if (tot_rec_amt >= 0) {
          let balance = parseFloat(tot_rec_amt) + item.fee_amt;
          if (balance >= 0) {
            rec_amt = balance;
          }
        } else {
          rec_amt = 0;
        }
      } else {
        let balance = parseFloat(tot_rec_amt) - item.fee_amt;
        debugger;
        if (balance >= 0) {
          rec_amt = item.fee_amt;
          console.log(rec_amt);
        } else {
          rec_amt = parseFloat(tot_rec_amt) >= 0 ? parseFloat(tot_rec_amt) : 0;
          console.log(rec_amt);
        }
        tot_rec_amt = balance;
      }

      return {
        ...item,
        rec_amt: rec_amt,
      };
    });
    setSlabMasterTotalMont(feeList);
    console.log(SlabMasterTotalMont);
  };
  const Fee_Reciept_Master_Add_Edit = async () => {
    debugger;
    console.log(SlabMasterTotalMont);
    try {
      debugger;
      // const errors = validateInputs();
      // if (Object.keys(errors).length > 0) {
      //   setErrorMessage(errors);
      //   return;
      // }

      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const after_dis =
        currentMonth === 1
          ? Admission_data.month_tot_1
          : currentMonth === 2
          ? Admission_data.month_tot_2
          : currentMonth === 3
          ? Admission_data.month_tot_3
          : currentMonth === 4
          ? Admission_data.month_tot_4
          : currentMonth === 6
          ? Admission_data.month_tot_6
          : currentMonth === 7
          ? Admission_data.month_tot_7
          : currentMonth === 8
          ? Admission_data.month_tot_8
          : currentMonth === 9
          ? Admission_data.month_tot_9
          : currentMonth === 10
          ? Admission_data.month_tot_10
          : currentMonth === 11
          ? Admission_data.month_tot_11
          : currentMonth === 12
          ? Admission_data.month_tot_12
          : 0;
      Fee_Reciept_MasterData.net_amt = Admission_data.fee_tot;
      Fee_Reciept_MasterData.amt_rec = after_dis;
      Fee_Reciept_MasterData.sname1 = Admission_data.stud_name;
      const data = JSON.stringify(Fee_Reciept_MasterData);

      let response;

      if (Fee_Reciept_MasterData.id != 0) {
        response = await apiService.put(
          `api/FeeReciept/UpdateInsertFeeReciept?id=${Fee_Reciept_MasterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/FeeReciept/AddFeeReciept',
          data,
          config
        );
      }
      debugger;
      if (response.status === true) {
        alert(response.message);
        const feeDetailValue = JSON.stringify(SlabMasterTotalMont);
        response = await apiService.post(
          `api/FeeRecieptDetail/AddFeeRecieptDetail?feeMasterId=${response.id}`,
          feeDetailValue,
          config
        );
        setFee_Reciept_MasterData({});
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className='container'>
      <Row>
        <Col className='col-6'>
          <Card>
            <CardTitle
              tag='h6'
              className='border-bottom p-3 mb-0 d-flex align-items-center justify-content-between'
            >
              <div className='d-flex align-items-center'>
                <i className='bi bi-bell me-2'></i>
                Fee Reciept Master Form
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
                        Student Details
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
                                //value={Admission_data.admitno}
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
                              <Label for='d_o_b'>D O B</Label>
                              <Input
                                id='d_o_b'
                                name='d_o_b'
                                value={Admission_data.d_o_b}
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
                            {' '}
                            <FormGroup>
                              <Label for='adm_date'>Adm Date</Label>
                              <Input
                                id='adm_date'
                                name='adm_date'
                                value={Admission_data.adm_date}
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
                              <Label for='admit_no'>Adm No.</Label>
                              <Input
                                id='admit_no'
                                name='admit_no'
                                value={Admission_data.admit_no}
                                type='tel'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            {currentMonth === 1 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_1'
                                  name='month_tot_1'
                                  value='January'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 2 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_2'
                                  name='month_tot_2'
                                  value='February'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 3 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_3'
                                  name='month_tot_3'
                                  value='March'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 4 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_4'
                                  name='month_tot_4'
                                  value='April'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 5 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_5'
                                  name='month_tot_5'
                                  value='May'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 6 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_6'
                                  name='month_tot_6'
                                  value='June'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 7 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_7'
                                  name='month_tot_7'
                                  value='July'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 8 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_8'
                                  name='month_tot_8'
                                  value='August'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 9 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_9'
                                  name='month_tot_9'
                                  value='September'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 10 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_10'
                                  name='month_tot_10'
                                  value='October'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 11 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_11'
                                  name='month_tot_11'
                                  value='November'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 12 ? (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_12'
                                  name='month_tot_12'
                                  value='December'
                                  type='tel'
                                />
                              </FormGroup>
                            ) : (
                              <FormGroup>
                                <Label for='tc_issue_yn'>
                                  Fee for the Month
                                </Label>
                                <Input
                                  id='month_tot_1'
                                  name='month_tot_1'
                                  value=''
                                  type='tel'
                                />
                              </FormGroup>
                            )}
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='fee_tot'>Total fee Due</Label>
                              <Input
                                id='fee_tot'
                                name='fee_tot'
                                value={Admission_data.fee_tot}
                                type='tel'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            {currentMonth === 1 ? (
                              <FormGroup>
                                <Label for='month_tot_1'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_1'
                                  name='month_tot_1'
                                  value={Admission_data.month_tot_1}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 2 ? (
                              <FormGroup>
                                <Label for='month_tot_2'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_2'
                                  name='month_tot_2'
                                  value={Admission_data.month_tot_2}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 3 ? (
                              <FormGroup>
                                <Label for='month_tot_3'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_3'
                                  name='month_tot_3'
                                  value={Admission_data.month_tot_3}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 4 ? (
                              <FormGroup>
                                <Label for='month_tot_4'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_4'
                                  name='month_tot_4'
                                  value={Admission_data.month_tot_4}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 5 ? (
                              <FormGroup>
                                <Label for='month_tot_5'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_5'
                                  name='month_tot_5'
                                  value={Admission_data.month_tot_5}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 6 ? (
                              <FormGroup>
                                <Label for='month_tot_6'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_6'
                                  name='month_tot_6'
                                  value={Admission_data.month_tot_6}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 7 ? (
                              <FormGroup>
                                <Label for='month_tot_7'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_7'
                                  name='month_tot_7'
                                  value={Admission_data.month_tot_7}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 8 ? (
                              <FormGroup>
                                <Label for='month_tot_8'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_8'
                                  name='month_tot_8'
                                  value={Admission_data.month_tot_8}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 9 ? (
                              <FormGroup>
                                <Label for='month_tot_9'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_9'
                                  name='month_tot_9'
                                  value={Admission_data.month_tot_9}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 10 ? (
                              <FormGroup>
                                <Label for='month_tot_10'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_10'
                                  name='month_tot_10'
                                  value={Admission_data.month_tot_10}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 11 ? (
                              <FormGroup>
                                <Label for='month_tot_11'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_11'
                                  name='month_tot_11'
                                  value={Admission_data.month_tot_11}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : currentMonth === 12 ? (
                              <FormGroup>
                                <Label for='month_tot_12'>
                                  Fee Amount Current
                                </Label>
                                <Input
                                  id='month_tot_12'
                                  name='month_tot_12'
                                  value={Admission_data.month_tot_12}
                                  type='tel'
                                />
                              </FormGroup>
                            ) : (
                              <FormGroup>
                                <Label for='fee_amt'>Fee Amount Current</Label>
                                <Input
                                  id='fee_amt'
                                  name='fee_amt'
                                  value={Fee_Reciept_MasterData.fee_amt}
                                  type='tel'
                                />
                              </FormGroup>
                            )}
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='dis_amt'>DisCount Amount</Label>
                              <Input
                                id='dis_amt'
                                name='dis_amt'
                                value={Fee_Reciept_MasterData.dis_amt}
                                onChange={onChangeHandle}
                                type='tel'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='adv_amt'>Amount After DisCount</Label>
                              <Input
                                id='adv_amt'
                                name='adv_amt'
                                value={Fee_Reciept_MasterData.adv_amt}
                                type='tel'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='fee_amt'>Late Fee</Label>
                              <Input
                                id='fee_amt'
                                name='fee_amt'
                                value={Fee_Reciept_MasterData.fee_amt}
                                onChange={onChangeHandle}
                                type='tel'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='paid_amt'>Recieved Amount</Label>
                              <Input
                                id='paid_amt'
                                name='paid_amt'
                                value={Fee_Reciept_MasterData.paid_amt}
                                onChange={onChangeHandle}
                                onBlur={(e) => {
                                  setPaidFee(e.target.value);
                                  HandleBlurEvent(e);
                                }}
                                type='tel'
                              />
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
                        Reciept Details
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
                              <Label for='possible_attend_days'>sadmitno</Label>
                              <Input
                                id='sadmitno'
                                name='sadmitno'
                                value={Fee_Reciept_MasterData.sadmitno}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.sadmitno && (
                                <FormText color='danger'>
                                  {errorMessage.sadmitno}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='reciept_no'> Manual Reciept No</Label>
                              <Input
                                id='reciept_no'
                                name='reciept_no'
                                value={Fee_Reciept_MasterData.reciept_no}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.reciept_no && (
                                <FormText color='danger'>
                                  {errorMessage.reciept_no}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='rect_date'>Reciept Date</Label>
                              <Input
                                id='rect_date'
                                name='rect_date'
                                value={Fee_Reciept_MasterData.rect_date}
                                onChange={onChangeHandle}
                                type='date'
                              />
                              {errorMessage.rect_date && (
                                <FormText color='danger'>
                                  {errorMessage.rect_date}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='bank_name'>Bank Name</Label>
                              <Input
                                id='bank_name'
                                name='bank_name'
                                value={Fee_Reciept_MasterData.bank_name}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.bank_name && (
                                <FormText color='danger'>
                                  {errorMessage.bank_name}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='chq_no'>Chq No</Label>
                              <Input
                                id='chq_no'
                                name='chq_no'
                                value={Fee_Reciept_MasterData.chq_no}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.chq_no && (
                                <FormText color='danger'>
                                  {errorMessage.chq_no}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='chq_date'>Chq Date</Label>
                              <Input
                                id='chq_date'
                                name='chq_date'
                                value={Fee_Reciept_MasterData.chq_date}
                                onChange={onChangeHandle}
                                type='date'
                              />
                              {errorMessage.chq_date && (
                                <FormText color='danger'>
                                  {errorMessage.chq_date}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='narr'>Cash A/c</Label>
                              <Input
                                id='narr'
                                name='narr'
                                value={Fee_Reciept_MasterData.narr}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.fee_remark && (
                                <FormText color='danger'>
                                  {errorMessage.fee_remark}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='other1'>Reciept From</Label>
                              <Input
                                id='other1'
                                name='other1'
                                value={Fee_Reciept_MasterData.other1}
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
                  onClick={Fee_Reciept_Master_Add_Edit}
                >
                  Submit
                </Button>
                &nbsp;
                <PDFDownloadLink
                  document={
                    <PdfView
                      admission_Data={Admission_data}
                      tc_Issue_Master_Data={Fee_Reciept_MasterData}
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
        <Col className='col-6'>
          <div class='card'>
            <div class='card-body'>
              <div class='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Head_Name</th>
                      <th>Tot_Fee</th>
                      <th>Paid</th>
                      <th>Pending</th>
                      <th>Current</th>
                      <th>Rec_Amt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SlabMasterTotalMont ? (
                      SlabMasterTotalMont.map((item, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td>{item.fee_head_name}</td>
                              <td>{item.fee_amt}</td>
                              <td>{item.paid}</td>
                              <td>{item.pending}</td>
                              <td>{item.fee_amt}</td>
                              <td>{item.rec_amt}</td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <tr>no data to show</tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Fee_Reciept_Master_Add_Edit_Screen;
