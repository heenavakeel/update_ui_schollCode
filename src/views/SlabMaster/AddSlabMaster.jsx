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
// import SlabPopup from '../SlabMaster/SlabPopup';
import './popup.css'; // Import CSS file

const AddSlabMaster = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [Fee_Group_data, setFee_Group_data] = useState([]);
  const [feeheadData, setfeeheadData] = useState({
    id: 0,
    slab_name: '',
    fee_group_id: null,
    state_name: '',
    slab_detail: '',
    samp: 'test ',
    fee_tot: 0,
    month_tot_1: 0,
    month_tot_2: 0,
    month_tot_3: 0,
    month_tot_4: 0,
    month_tot_5: 0,
    month_tot_6: 0,
    month_tot_7: 0,
    month_tot_8: 0,
    month_tot_9: 0,
    month_tot_10: 0,
    month_tot_11: 0,
    month_tot_12: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [rows, setRows] = useState({
    id: 0,
    slabMstId: 0,
    fee_head_name: '',
    fee_amt: 0,
    circle: '',
    month_1: 0,
    month_2: 0,
    month_3: 0,
    month_4: 0,
    month_5: 0,
    month_6: 0,
    month_7: 0,
    month_8: 0,
    month_9: 0,
    month_10: 0,
    month_11: 0,
    month_12: 0,
    fee_head_id: null,
    circle_id: null,
  });
  const [lastId, setLastId] = useState(0);
  const [slabDetailsTable, setSlabDetailsTable] = useState([]);
  const [displayValue, setDisplayValue] = useState(false);
  const [feeHeadTable, setFeeHeadTable] = useState([]);
  const [circleTable, setCircleTable] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const [month_1, setMonth_1] = useState(0);
  const [month_2, setMonth_2] = useState(0);
  const [month_3, setMonth_3] = useState(0);
  const [month_4, setMonth_4] = useState(0);
  const [month_5, setMonth_5] = useState(0);
  const [month_6, setMonth_6] = useState(0);
  const [month_7, setMonth_7] = useState(0);
  const [month_8, setMonth_8] = useState(0);
  const [month_9, setMonth_9] = useState(0);
  const [month_10, setMonth_10] = useState(0);
  const [month_11, setMonth_11] = useState(0);
  const [month_12, setMonth_12] = useState(0);

  const [slabMonthly, setSlabMonthly] = useState({
    month_1: false,
    month_2: false,
    month_3: false,
    month_4: false,
    month_5: false,
    month_6: false,
    month_7: false,
    month_8: false,
    month_9: false,
    month_10: false,
    month_11: false,
    month_12: false,
  });
  //var monthTotals = Array.from({ length: 12 }, () => 0); // Initialize an array to store totals for each month

  useEffect(() => {
    // Check if location state exists and set the feeheadData accordingly
    if (location.state) {
      setfeeheadData(location.state);
      setRows((prevState) => ({
        ...prevState,
        slabMstId: location.state?.id,
      }));
      setLastId(location.state?.id);
      setDisplayValue(true);
      GetSlabMasterDetail(location.state?.id);
      GetFeeHeadMaster();
      GetCircleMaster();
    }
  }, [location.state]);

  useEffect(() => {
    GetFee_GroupData(null);
  }, []);

  useEffect(() => {
    updateHeaderData();
  }, [rows, slabDetailsTable]);

  const updateHeaderData = async () => {
    debugger;
    setMonth_1(
      slabDetailsTable.reduce((total, item) => total + item.month_1, 0) +
        parseInt(rows.month_1)
    );
    setMonth_2(
      slabDetailsTable.reduce((total, item) => total + item.month_2, 0) +
        parseInt(rows.month_2)
    );
    setMonth_3(
      slabDetailsTable.reduce((total, item) => total + item.month_3, 0) +
        parseInt(rows.month_3)
    );
    setMonth_4(
      slabDetailsTable.reduce((total, item) => total + item.month_4, 0) +
        parseInt(rows.month_4)
    );
    setMonth_5(
      slabDetailsTable.reduce((total, item) => total + item.month_5, 0) +
        parseInt(rows.month_5)
    );
    setMonth_6(
      slabDetailsTable.reduce((total, item) => total + item.month_6, 0) +
        parseInt(rows.month_6)
    );
    setMonth_7(
      slabDetailsTable.reduce((total, item) => total + item.month_7, 0) +
        parseInt(rows.month_7)
    );
    setMonth_8(
      slabDetailsTable.reduce((total, item) => total + item.month_8, 0) +
        parseInt(rows.month_8)
    );
    setMonth_9(
      slabDetailsTable.reduce((total, item) => total + item.month_9, 0) +
        parseInt(rows.month_9)
    );
    setMonth_10(
      slabDetailsTable.reduce((total, item) => total + item.month_10, 0) +
        parseInt(rows.month_10)
    );
    setMonth_11(
      slabDetailsTable.reduce((total, item) => total + item.month_11, 0) +
        parseInt(rows.month_11)
    );
    setMonth_12(
      slabDetailsTable.reduce((total, item) => total + item.month_12, 0) +
        parseInt(rows.month_12)
    );
  };

  const GetSlabMasterDetail = async (slabMstId) => {
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
        setSlabDetailsTable(response.modelSlabDetailReq);
        //updateHeaderData();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    debugger;
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
  // const validateInputs = () => {
  //   const errors = {};

  //   if (!feeheadData.head_no) {
  //     errors.head_no = 'Party Name is required';
  //   }

  //   if (!feeheadData.headname_Short) {
  //     errors.headname_Short = 'Party Address is required';
  //   }

  //   return errors;
  // };

  const AddSlabMaster = async () => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      debugger;
      feeheadData.month_tot_1 = month_1;
      feeheadData.month_tot_2 = month_2;
      feeheadData.month_tot_3 = month_3;
      feeheadData.month_tot_4 = month_4;
      feeheadData.month_tot_5 = month_5;
      feeheadData.month_tot_6 = month_6;
      feeheadData.month_tot_7 = month_7;
      feeheadData.month_tot_8 = month_8;
      feeheadData.month_tot_9 = month_9;
      feeheadData.month_tot_10 = month_10;
      feeheadData.month_tot_11 = month_11;
      feeheadData.month_tot_12 = month_12;
      feeheadData.fee_tot =
        month_1 +
        month_2 +
        month_3 +
        month_4 +
        month_5 +
        month_6 +
        month_7 +
        month_8 +
        month_9 +
        month_10 +
        month_11 +
        month_12;
      const data = JSON.stringify(feeheadData);

      let response;
      if (feeheadData.id !== '0' && feeheadData.id !== 0) {
        response = await apiService.put(
          `api/SlabMaster/UpdateSlabMaster?id=${feeheadData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/SlabMaster/AddSlabMaster',
          data,
          config
        );
      }
      if (response.status === true) {
        alert(response.message);
        setLastId(response.lastId);
        setRows((prevState) => ({
          ...prevState,
          slabMstId: response.lastId,
        }));
        //navigate('/Slab');
        setDisplayValue(true);
        GetFeeHeadMaster();
        GetCircleMaster();
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!!');
    }
  };

  const addRow = async () => {
    try {
      if (lastId === 0) {
        alert('Please add slab details first');
        return;
      }
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      const data = JSON.stringify(rows);

      const response = await apiService.post(
        'api/SlabDetail/AddSlabDetail',
        data,
        config
      );
      // if (feeheadData.id !== '0' && feeheadData.id !== 0) {
      //   response = await apiService.put(
      //     `api/SlabMaster/UpdateSlabDetail?id=${data.id}`,
      //     data,
      //     config
      //   );
      // } else {
      //   response = await apiService.post(
      //     'api/SlabDetail/AddSlabDetail',
      //     data,
      //     config
      //   );
      // }
      if (response.status === true) {
        alert(response.message);
        setLastId(response.lastId);
        // Redirect to desired page after successful submission
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!!');
    }
  };

  const handleInputChange = (e) => {
    debugger;
    const { name, value } = e.target;
    if (e.target?.selectedIndex != undefined) {
      const selectedOption = e.target.options[e.target?.selectedIndex];
      const selectedText = selectedOption?.text;
      const monthlyValue = rows.fee_amt;
      if (
        name.toLowerCase() === 'circle_id'.toLowerCase() &&
        selectedText.toLowerCase() === 'Random'.toLowerCase()
      ) {
        setPopupVisible(true);
      }

      if (name === 'circle_id') {
        if (selectedText === 'Monthly') {
          const updatedMonths = {};
          for (let i = 1; i <= 12; i++) {
            updatedMonths[`month_${i}`] = monthlyValue;
          }
          setRows((prevData) => ({
            ...prevData,
            ...updatedMonths,
            [name]: value,
          }));
        } else if (selectedText === 'Annual') {
          setRows((prevData) => ({
            ...prevData,
            month_1: monthlyValue,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'Jan') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: monthlyValue,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'Feb') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: monthlyValue,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'March') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: monthlyValue,
            [name]: value,
          }));
        } else if (selectedText === 'April') {
          setRows((prevData) => ({
            ...prevData,
            month_1: monthlyValue,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'May') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: monthlyValue,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'June') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: monthlyValue,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'July') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: monthlyValue,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'August') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: monthlyValue,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'September') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: monthlyValue,
            month_7: 0,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'October') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: monthlyValue,
            month_8: 0,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'November') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: monthlyValue,
            month_9: 0,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'December') {
          setRows((prevData) => ({
            ...prevData,
            month_1: 0,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: 0,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: monthlyValue,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        } else if (selectedText === 'Quarterly') {
          setRows((prevData) => ({
            ...prevData,
            month_1: monthlyValue,
            month_2: 0,
            month_3: 0,
            month_4: 0,
            month_5: monthlyValue,
            month_6: 0,
            month_7: 0,
            month_8: 0,
            month_9: monthlyValue,
            month_10: 0,
            month_11: 0,
            month_12: 0,
            [name]: value,
          }));
        }
      } else {
        setRows((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setRows((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onHandleDeletSlabDetails = async (id) => {
    const isDeleteConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (isDeleteConfirmed) {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json', // Important for file upload//s
            accept: 'application/json',
          },
        };

        const response = await apiService.delete(
          `api/SlabDetail/DeletSlabDetail?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetSlabMasterDetail(lastId);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
        alert('SomeThing went wrong!!');
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  const GetFeeHeadMaster = async () => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/FeeHeadMaster/GetFeeHeadMaster`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setFeeHeadTable(response.multiFeeHeadData);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const GetCircleMaster = async () => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/CircleMaster/GetCircleMaster`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setCircleTable(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const handlePopupInputChange = (fieldName, isChecked) => {
    setSlabMonthly((prevState) => ({
      ...prevState,
      [fieldName]: isChecked,
    }));
  };

  const togglePopup = () => {
    setPopupVisible(false);
  };
  const clickOkButton = () => {
    const monthlyValue = rows.fee_amt;
    setRows((prevData) => ({
      ...prevData,
      month_1: slabMonthly.month_1 ? monthlyValue : 0,
      month_2: slabMonthly.month_2 ? monthlyValue : 0,
      month_3: slabMonthly.month_3 ? monthlyValue : 0,
      month_4: slabMonthly.month_4 ? monthlyValue : 0,
      month_5: slabMonthly.month_5 ? monthlyValue : 0,
      month_6: slabMonthly.month_6 ? monthlyValue : 0,
      month_7: slabMonthly.month_7 ? monthlyValue : 0,
      month_8: slabMonthly.month_8 ? monthlyValue : 0,
      month_9: slabMonthly.month_9 ? monthlyValue : 0,
      month_10: slabMonthly.month_10 ? monthlyValue : 0,
      month_11: slabMonthly.month_11 ? monthlyValue : 0,
      month_12: slabMonthly.month_12 ? monthlyValue : 0,
    }));

    // setMonth_1(
    //   slabDetailsTable.reduce((total, item) => total + item.month_1, 0) +
    //     (slabMonthly.month_1 ? parseInt(monthlyValue) : 0)
    // );
    setPopupVisible(false);
  };

  // Calculate totals for each month

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
              Fee Slab Master Form
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
                      Slab Details
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
                            <Label for='slab_name'>slab_name</Label>
                            <Input
                              id='slab_name'
                              name='slab_name'
                              value={feeheadData.slab_name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.slab_name && (
                              <FormText color='danger'>
                                {errorMessage.slab_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='fee_group_id'>fee_Group_Name</Label>
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

                            {errorMessage.fee_group_name && (
                              <FormText color='danger'>
                                {errorMessage.fee_group_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='state_name'>state_name</Label>
                            <Input
                              id='state_name'
                              name='state_name'
                              value={feeheadData.state_name}
                              onChange={onChangeHandle}
                              type='tel'
                            />
                            {errorMessage.state_name && (
                              <FormText color='danger'>
                                {errorMessage.state_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='slab_detail'>slab_Detail</Label>
                            <Input
                              id='slab_detail'
                              name='slab_detail'
                              value={feeheadData.slab_detail}
                              onChange={onChangeHandle}
                              type='text'
                            />
                            {errorMessage.slab_detail && (
                              <FormText color='danger'>
                                {errorMessage.slab_detail}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-end mt-2'>
                  <Button color='primary' onClick={AddSlabMaster}>
                    Submit
                  </Button>
                </div>
                {displayValue && (
                  <div className='accordion-item' style={{ marginTop: '10px' }}>
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
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>Sno</th>
                                <th>Action</th>
                                <th>Fee Head</th>
                                <th>Fee Amount</th>
                                <th>Fee Circle</th>
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
                              <tr>
                                <td>1</td>
                                <td>
                                  <Button
                                    color='primary'
                                    size='bg'
                                    onClick={addRow}
                                  >
                                    Add
                                  </Button>
                                </td>
                                <td>
                                  <select
                                    className='form-select'
                                    style={{ width: '80px' }}
                                    value={rows.fee_head_id}
                                    name='fee_head_id'
                                    onChange={handleInputChange}
                                  >
                                    <option value='0'>Select Fee Head</option>
                                    {feeHeadTable.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.head_name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={rows.fee_amt}
                                    name='fee_amt'
                                    onChange={handleInputChange}
                                  />
                                </td>
                                <td>
                                  <select
                                    className='form-select'
                                    style={{ width: '80px' }}
                                    value={rows.circle_id}
                                    name='circle_id'
                                    onChange={handleInputChange}
                                  >
                                    <option value='0'>Select Circle</option>
                                    {circleTable.map((option) => (
                                      <option key={option.id} value={option.id}>
                                        {option.circle_name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_1}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_2}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_3}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_4}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_5}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_6}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_7}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_8}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_9}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_10}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_11}
                                  />
                                </td>
                                <td>
                                  <input
                                    readOnly
                                    type='text'
                                    className='form-control'
                                    value={rows.month_12}
                                  />
                                </td>
                                <td></td>
                              </tr>

                              {slabDetailsTable.map((item, index) => (
                                <tr key={index}>
                                  <td>{index + 2}</td>
                                  <td>
                                    <Button
                                      color='danger'
                                      size='bg'
                                      onClick={() =>
                                        onHandleDeletSlabDetails(item.id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  </td>
                                  <td>{item.fee_head_name}</td>
                                  <td>{item.fee_amt}</td>
                                  <td>{item.circle}</td>
                                  <td>{item.month_1}</td>
                                  <td>{item.month_2}</td>
                                  <td>{item.month_3}</td>
                                  <td>{item.month_4}</td>
                                  <td>{item.month_5}</td>
                                  <td>{item.month_6}</td>
                                  <td>{item.month_7}</td>
                                  <td>{item.month_8}</td>
                                  <td>{item.month_9}</td>
                                  <td>{item.month_10}</td>
                                  <td>{item.month_11}</td>
                                  <td>{item.month_12}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan='5'>Totals</td>
                                <td>{month_1}</td>
                                <td>{month_2}</td>
                                <td>{month_3}</td>
                                <td>{month_4}</td>
                                <td>{month_5}</td>
                                <td>{month_6}</td>
                                <td>{month_7}</td>
                                <td>{month_8}</td>
                                <td>{month_9}</td>
                                <td>{month_10}</td>
                                <td>{month_11}</td>
                                <td>{month_12}</td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Popup */}
              <div className={`popup${popupVisible ? ' visible' : ''}`}>
                <div className='d-flex justify-content-between align-items-center mt-2'>
                  <b className='m-0'>
                    Select the months you want to fill the data
                  </b>
                  <Button color='primary' size='sm' onClick={togglePopup}>
                    &#10006;
                  </Button>
                </div>
                <div>
                  <ul className='list'>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_1}
                        onChange={(e) =>
                          handlePopupInputChange('month_1', e.target.checked)
                        }
                      />
                      &nbsp;Apr-1
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_2}
                        onChange={(e) =>
                          handlePopupInputChange('month_2', e.target.checked)
                        }
                      />
                      &nbsp;May-2
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_3}
                        onChange={(e) =>
                          handlePopupInputChange('month_3', e.target.checked)
                        }
                      />
                      &nbsp;June-3
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_4}
                        onChange={(e) =>
                          handlePopupInputChange('month_4', e.target.checked)
                        }
                      />
                      &nbsp;July-4
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_5}
                        onChange={(e) =>
                          handlePopupInputChange('month_5', e.target.checked)
                        }
                      />
                      &nbsp;Aug-5
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_6}
                        onChange={(e) =>
                          handlePopupInputChange('month_6', e.target.checked)
                        }
                      />
                      &nbsp;Sep-6
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_7}
                        onChange={(e) =>
                          handlePopupInputChange('month_7', e.target.checked)
                        }
                      />
                      &nbsp;Oct-7
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_8}
                        onChange={(e) =>
                          handlePopupInputChange('month_8', e.target.checked)
                        }
                      />
                      &nbsp;Nov-8
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_9}
                        onChange={(e) =>
                          handlePopupInputChange('month_9', e.target.checked)
                        }
                      />
                      &nbsp;Dec-9
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_10}
                        onChange={(e) =>
                          handlePopupInputChange('month_10', e.target.checked)
                        }
                      />
                      &nbsp;Jan-10
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_11}
                        onChange={(e) =>
                          handlePopupInputChange('month_11', e.target.checked)
                        }
                      />
                      &nbsp;Feb-11
                    </li>
                    <li>
                      <input
                        type='checkbox'
                        className='form-check-input'
                        checked={slabMonthly.month_12}
                        onChange={(e) =>
                          handlePopupInputChange('month_12', e.target.checked)
                        }
                      />
                      &nbsp;Mar-12
                    </li>
                  </ul>
                </div>
                <div className='d-flex justify-content-end mt-2'>
                  <Button color='primary' onClick={clickOkButton}>
                    OK
                  </Button>
                </div>
              </div>
              {/* Popup toggle button */}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AddSlabMaster;
