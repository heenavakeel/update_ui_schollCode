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

const Result_Master_New_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [classMasterTransection, setClassMasterTransection] = useState([
    {
      id: 0,
      admit_no: '',
      stud_name: '',
      id: null,
      subject_name: '',
      ut_1: '',
      ut_2: '',
      ut_3: '',
      ut_4: '',
      ut_5: '',
      tm_1: '',
      tm_2: '',
      tm_3: '',
      uT1_OPTAIN: '',
      uT2_OPTAIN: '',
      uT3_OPTAIN: '',
      uT4_OPTAIN: '',
      uT5_OPTAIN: '',
      tM1_OPTAIN: '',
      tM2_OPTAIN: '',
      tM3_OPTAIN: '',
      total_max: '',
      total_optan: '',
      total_per: '',
    },
  ]);

  const [updateMasterTransection, setUpdateMasterTransection] = useState([
    {
      id: 0,
      admit_no: '',
      stud_name: '',
      subject_index_no: '',
      subject_name: '',
      ut_fa_1: '',
      ut_fa_2: '',
      ut_fa_3: '',
      ut_fa_4: '',
      ut_sa_1: '',
      ut_sa_2: '',
      ut_7: '',
      ut_8: '',
      ut_9: '',
      op_fa_1: '',
      op_fa_2: '',
      op_fa_3: '',
      op_fa_4: '',
      op_sa_1: '',
      op_sa_2: '',
      op_7: '',
      op_8: '',
      op_9: '',
      grade_ut_sa_1: '',
      grade_ut_sa_2: '',
      grade_op_ut_sa_1: '',
      grade_op_ut_sa_2: '',
      tot_ut_fa_1: '',
      tot_ut_fa_2: '',
      tot_ut_fa_3: '',
      tot_ut_fa_4: '',
      tot_ut_sa_1: '',
      tot_ut_sa_2: '',
      tot_ut_7: '',
      tot_ut_8: '',
      tot_ut_9: '',
      tot_op_fa_1: '',
      tot_op_fa_2: '',
      tot_op_fa_3: '',
      tot_op_fa_4: '',
      tot_op_sa_1: '',
      tot_op_sa_2: '',
      tot_op_7: '',
      tot_op_8: '',
      tot_op_9: '',
      subj_marks_tot: '',
      subj_optain_tot: '',
      sub_per: '',
      all_marks_tot: '',
      all_optain_tot: '',
      all_per: '',
      pass_fail: '',
      tot_attendance: '',
      remarks: '',
      stud_postion: '',
      rpt_date: '',
      page_name: '',
      other2: '',
      other3: '',
      other4: '',
      other5: '',
      other6: '',
      other7: '',
      other8: '',
      other9: '',
      other10: '',
      printno: '',
      adm_no_id: '',
    },
  ]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [partyTable, setPartyTable] = useState([]);

  useEffect(() => {
    // Check if location state exists and set the Result_Master_NewData accordingly
    if (location.state) {
      setIsUpdate(true);
      GetResult_Master_NewData(location.state?.admit_no);
    }
  }, [location.state]);
  useEffect(() => {
    // Check if location state exists and set the Result_Master_NewData accordingly
    GetClass_Transection_Data();
  }, [!isUpdate]);

  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };
  const GetClass_Transection_Data = async () => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/ClassTransactionDetail/GetClass_Transaction_Details`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setClassMasterTransection(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong');
    }
  };

  const Result_Master_New_Add_Edit_Screen = async () => {
    try {
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };

      debugger;

      let response;

      if (isUpdate) {
        const data = JSON.stringify(updateMasterTransection);
        response = await apiService.post(
          'api/Result_Master_New/UpdateResult_Master_New',
          data,
          config
        );
      } else {
        setClassMasterTransection((prevState) =>
          prevState.map((item) => ({
            ...item,
            admit_no: partyTable[0].admit_no,
            stud_name: partyTable[0].stud_name,
          }))
        );
        console.log('Updated classMasterTransection:', classMasterTransection); //
        const data = JSON.stringify(classMasterTransection);
        response = await apiService.post(
          `api/Result_Master_New/AddResult_Master_New?admit_no=${partyTable[0].admit_no}&stud_name=${partyTable[0].stud_name}`,
          data,
          config
        );
      }
      if (response.status === true) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong"');
    }
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetAdmission(1, 10, value);
  };

  const GetAdmission = async (page = 1, limit = 10, search = '') => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };
      const response = await apiService.get(
        `api/Admission/GetAdmission?search=${search}`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setPartyTable(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const GetResult_Master_NewData = async (search = '') => {
    debugger;
    console.log(search);
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/Result_Master_New/GetResult_Master_New?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setUpdateMasterTransection(response.data);
        console.log(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    GetAdmission();
  }, [!partyTable]);

  const handleInputChange = (index, event) => {
    debugger;
    const { name, value } = event.target;
    const newRows = [...classMasterTransection];
    newRows[index][name] = value;

    const uT1_OPTAIN = parseFloat(newRows[index]['uT1_OPTAIN'] || 0);
    const uT2_OPTAIN = parseFloat(newRows[index]['uT2_OPTAIN'] || 0);
    const uT3_OPTAIN = parseFloat(newRows[index]['uT3_OPTAIN'] || 0);
    const uT4_OPTAIN = parseFloat(newRows[index]['uT4_OPTAIN'] || 0);
    const uT5_OPTAIN = parseFloat(newRows[index]['uT5_OPTAIN'] || 0);
    const tM1_OPTAIN = parseFloat(newRows[index]['tM1_OPTAIN'] || 0);
    const tM2_OPTAIN = parseFloat(newRows[index]['tM2_OPTAIN'] || 0);
    const tM3_OPTAIN = parseFloat(newRows[index]['tM3_OPTAIN'] || 0);

    newRows[index]['total_optain'] =
      uT1_OPTAIN +
      uT2_OPTAIN +
      uT3_OPTAIN +
      uT4_OPTAIN +
      uT5_OPTAIN +
      tM1_OPTAIN +
      tM2_OPTAIN +
      tM3_OPTAIN;

    const utMaxs = ['ut_1', 'ut_2', 'ut_3', 'ut_4', 'ut_5'];
    const tmMaxs = ['tm_1', 'tm_2', 'tm_3'];
    const total_max =
      utMaxs.reduce(
        (acc, key) => acc + parseFloat(newRows[index][key] || 0),
        0
      ) +
      tmMaxs.reduce(
        (acc, key) => acc + parseFloat(newRows[index][key] || 0),
        0
      );
    newRows[index]['total_max'] = total_max;
    let total_per = 0;
    if (total_max !== 0) {
      total_per = (newRows[index]['total_optain'] / total_max) * 100;
    }
    newRows[index]['total_per'] = total_per.toFixed(0);

    setClassMasterTransection(newRows);
  };

  const handleUpdateInputChange = (index, event) => {
    debugger;
    const { name, value } = event.target;
    const newRows = [...updateMasterTransection];
    newRows[index][name] = value;

    const uT1_OPTAIN = parseFloat(newRows[index]['op_fa_1'] || 0);
    const uT2_OPTAIN = parseFloat(newRows[index]['op_fa_2'] || 0);
    const uT3_OPTAIN = parseFloat(newRows[index]['op_fa_3'] || 0);
    const uT4_OPTAIN = parseFloat(newRows[index]['op_fa_4'] || 0);
    const uT5_OPTAIN = parseFloat(newRows[index]['op_sa_1'] || 0);
    const tM1_OPTAIN = parseFloat(newRows[index]['op_sa_2'] || 0);
    const tM2_OPTAIN = parseFloat(newRows[index]['op_8'] || 0);
    const tM3_OPTAIN = parseFloat(newRows[index]['op_9'] || 0);

    newRows[index]['all_optain_tot'] =
      uT1_OPTAIN +
      uT2_OPTAIN +
      uT3_OPTAIN +
      uT4_OPTAIN +
      uT5_OPTAIN +
      tM1_OPTAIN +
      tM2_OPTAIN +
      tM3_OPTAIN;

    const utMaxs = ['ut_fa_1', 'ut_fa_2', 'ut_fa_3', 'ut_fa_4', 'ut_7'];
    const tmMaxs = ['ut_8', 'ut_9', 'op_7'];
    const total_max =
      utMaxs.reduce(
        (acc, key) => acc + parseFloat(newRows[index][key] || 0),
        0
      ) +
      tmMaxs.reduce(
        (acc, key) => acc + parseFloat(newRows[index][key] || 0),
        0
      );
    newRows[index]['all_marks_tot'] = total_max;
    let total_per = 0;
    if (total_max !== 0) {
      total_per = (newRows[index]['all_optain_tot'] / total_max) * 100;
    }
    newRows[index]['all_per'] = total_per.toFixed(0);

    setUpdateMasterTransection(newRows);
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
              Result Masater Form
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
                      {isUpdate ? (
                        <table className='table table-bordered'>
                          <thead>
                            <tr>
                              <th>Subject Name</th>

                              <th>FA1/UT1 Max</th>
                              <th>FA1/UT1 OPTAIN</th>
                              <th>FA2/UT2 Maxs</th>
                              <th>FA2/UT2 OPTAIN</th>
                              <th>FA3/UT3 Maxs</th>
                              <th>FA3/UT3 OPTAIN</th>
                              <th>FA4/UT4 Maxs</th>
                              <th>FA4/UT4 OPTAIN</th>
                              <th>SA1/TM1 Maxs</th>
                              <th>SA1/TM1 OPTAIN</th>
                              <th>SA2/TM2 Maxs</th>
                              <th>FA5/UT5 Maxs</th>
                              <th>FA5/UT5 OPTAIN</th>
                              <th>SA2/TM2 OPTAIN</th>
                              <th>SA3/TM3 Maxs</th>
                              <th>SA3/TM3 OPTAIN</th>
                              <th>ToT Maxs</th>
                              <th>ToT OPTAIN</th>
                              <th>% Per</th>
                            </tr>
                          </thead>

                          <tbody>
                            {updateMasterTransection.map((item, index) => (
                              <tr key={index}>
                                <td>{item.subject_name}</td>
                                <td>{item.ut_fa_1}</td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_fa_1'
                                    value={item.op_fa_1}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>{item.ut_fa_2}</td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_fa_2'
                                    value={item.op_fa_2}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>{item.ut_fa_3}</td>

                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_fa_3'
                                    value={item.op_fa_3}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>

                                <td>{item.ut_fa_4}</td>

                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_fa_4'
                                    value={item.op_fa_4}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>{item.ut_7}</td>

                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_sa_1'
                                    value={item.op_sa_1}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>{item.ut_8}</td>
                                <td>{item.ut_9}</td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_sa_2'
                                    value={item.op_sa_2}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_8'
                                    value={item.op_8}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>{item.op_7}</td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='op_9'
                                    value={item.op_9}
                                    onChange={(e) =>
                                      handleUpdateInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='all_marks_tot'
                                    value={
                                      parseFloat(item.ut_8 || 0) +
                                      parseFloat(item.ut_9 || 0) +
                                      parseFloat(item.op_7 || 0) +
                                      parseFloat(item.ut_fa_1 || 0) +
                                      parseFloat(item.ut_fa_2 || 0) +
                                      parseFloat(item.ut_fa_3 || 0) +
                                      parseFloat(item.ut_fa_4 || 0) +
                                      parseFloat(item.ut_7 || 0)
                                    }
                                    readOnly // Making it read-only to prevent user input
                                  />
                                </td>
                                <td>
                                  {' '}
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='all_optain_tot'
                                    value={item.all_optain_tot}
                                  />
                                </td>
                                <td>
                                  {' '}
                                  <input
                                    style={{ width: '60px' }}
                                    type='text'
                                    className='form-control'
                                    name='all_per'
                                    value={
                                      isNaN(item.all_per) || // Check if total_optain is NaN
                                      isNaN(item.ut_8) ||
                                      isNaN(item.ut_9) ||
                                      isNaN(item.op_7) ||
                                      isNaN(item.ut_fa_1) ||
                                      isNaN(item.ut_fa_2) ||
                                      isNaN(item.ut_fa_3) ||
                                      isNaN(item.ut_fa_4) ||
                                      isNaN(item.ut_7) ||
                                      item.all_per === '' || // Check if any value is empty
                                      item.ut_8 === '' ||
                                      item.ut_9 === '' ||
                                      item.op_7 === '' ||
                                      item.ut_fa_1 === '' ||
                                      item.ut_fa_2 === '' ||
                                      item.ut_fa_3 === '' ||
                                      item.ut_fa_4 === '' ||
                                      item.ut_7 === '' ||
                                      parseFloat(item.ut_8) +
                                        parseFloat(item.ut_9) +
                                        parseFloat(item.op_7) +
                                        parseFloat(item.ut_fa_1) +
                                        parseFloat(item.ut_fa_2) +
                                        parseFloat(item.ut_fa_3) +
                                        parseFloat(item.ut_fa_4) +
                                        parseFloat(item.ut_7) ===
                                        0 // Check if denominator is zero
                                        ? '0'
                                        : (
                                            (parseFloat(
                                              item.all_optain_tot || 0
                                            ) /
                                              (parseFloat(item.ut_8 || 0) +
                                                parseFloat(item.ut_9 || 0) +
                                                parseFloat(item.op_7 || 0) +
                                                parseFloat(item.ut_fa_1 || 0) +
                                                parseFloat(item.ut_fa_2 || 0) +
                                                parseFloat(item.ut_fa_3 || 0) +
                                                parseFloat(item.ut_fa_4 || 0) +
                                                parseFloat(item.ut_7 || 0))) *
                                            100
                                          ).toFixed(0) // Format the percentage with 2 decimal places
                                    }
                                    readOnly
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <>
                          <Row
                            className='align-items-center'
                            style={{ marginRight: '10px', width: '300px' }}
                          >
                            <Input
                              id='search'
                              name='search'
                              placeholder='Search...'
                              type='text'
                              onChange={(e) => {
                                onHandleSearchKeyItem(e);
                              }}
                            />
                          </Row>
                          <br></br>
                          <table className='table'>
                            <thead>
                              <tr>
                                <th>Sr. No.</th>
                                <th>admit No</th>
                                <th>Student Name</th>
                                <th>Curr Class</th>
                                <th>Sex_MF</th>
                                <th>f_name</th>
                                <th>m_name</th>
                              </tr>
                            </thead>
                            <tbody>
                              {partyTable.map((item, index) => (
                                <tr key={index}>
                                  <th scope='row'>{index + 1}</th>
                                  <td>{item.admit_no}</td>
                                  <td>{item.stud_name}</td>
                                  <td>{item.curr_class}</td>
                                  <td>{item.sex_mf}</td>
                                  <td>{item.f_name}</td>
                                  <td>{item.m_name}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <table className='table table-bordered'>
                            <thead>
                              <tr>
                                <th>Subject Name</th>

                                <th>FA1/UT1 Max</th>
                                <th>FA1/UT1 OPTAIN</th>
                                <th>FA2/UT2 Maxs</th>
                                <th>FA2/UT2 OPTAIN</th>
                                <th>FA3/UT3 Maxs</th>
                                <th>FA3/UT3 OPTAIN</th>
                                <th>FA4/UT4 Maxs</th>
                                <th>FA4/UT4 OPTAIN</th>
                                <th>SA1/TM1 Maxs</th>
                                <th>SA1/TM1 OPTAIN</th>
                                <th>SA2/TM2 Maxs</th>
                                <th>FA5/UT5 Maxs</th>
                                <th>FA5/UT5 OPTAIN</th>
                                <th>SA2/TM2 OPTAIN</th>
                                <th>SA3/TM3 Maxs</th>
                                <th>SA3/TM3 OPTAIN</th>
                                <th>ToT Maxs</th>
                                <th>ToT OPTAIN</th>
                                <th>% Per</th>
                              </tr>
                            </thead>

                            <tbody>
                              {classMasterTransection.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.subject_name}</td>
                                  <td>{item.ut_1}</td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='uT1_OPTAIN'
                                      value={item.uT1_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>{item.ut_2}</td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='uT2_OPTAIN'
                                      value={item.uT2_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>{item.ut_3}</td>

                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='uT3_OPTAIN'
                                      value={item.uT3_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>

                                  <td>{item.ut_4}</td>

                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='uT4_OPTAIN'
                                      value={item.uT4_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>{item.ut_5}</td>

                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='uT5_OPTAIN'
                                      value={item.uT5_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>{item.tm_1}</td>
                                  <td>{item.tm_2}</td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='tM1_OPTAIN'
                                      value={item.tM1_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='tM2_OPTAIN'
                                      value={item.tM2_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>{item.tm_3}</td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='tM3_OPTAIN'
                                      value={item.tM3_OPTAIN}
                                      onChange={(e) =>
                                        handleInputChange(index, e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='total_max'
                                      value={
                                        parseFloat(item.tm_1 || 0) +
                                        parseFloat(item.tm_2 || 0) +
                                        parseFloat(item.tm_3 || 0) +
                                        parseFloat(item.ut_1 || 0) +
                                        parseFloat(item.ut_2 || 0) +
                                        parseFloat(item.ut_3 || 0) +
                                        parseFloat(item.ut_4 || 0) +
                                        parseFloat(item.ut_5 || 0)
                                      }
                                      readOnly // Making it read-only to prevent user input
                                    />
                                  </td>
                                  <td>
                                    {' '}
                                    <input
                                      type='text'
                                      className='form-control'
                                      name='total_optain'
                                      value={item.total_optain}
                                    />
                                  </td>
                                  <td>
                                    {' '}
                                    <input
                                      style={{ width: '60px' }}
                                      type='text'
                                      className='form-control'
                                      name='total_per'
                                      value={
                                        isNaN(item.total_optain) || // Check if total_optain is NaN
                                        isNaN(item.tm_1) ||
                                        isNaN(item.tm_2) ||
                                        isNaN(item.tm_3) ||
                                        isNaN(item.ut_1) ||
                                        isNaN(item.ut_2) ||
                                        isNaN(item.ut_3) ||
                                        isNaN(item.ut_4) ||
                                        isNaN(item.ut_5) ||
                                        item.total_optain === '' || // Check if any value is empty
                                        item.tm_1 === '' ||
                                        item.tm_2 === '' ||
                                        item.tm_3 === '' ||
                                        item.ut_1 === '' ||
                                        item.ut_2 === '' ||
                                        item.ut_3 === '' ||
                                        item.ut_4 === '' ||
                                        item.ut_5 === '' ||
                                        parseFloat(item.tm_1) +
                                          parseFloat(item.tm_2) +
                                          parseFloat(item.tm_3) +
                                          parseFloat(item.ut_1) +
                                          parseFloat(item.ut_2) +
                                          parseFloat(item.ut_3) +
                                          parseFloat(item.ut_4) +
                                          parseFloat(item.ut_5) ===
                                          0 // Check if denominator is zero
                                          ? '0'
                                          : (
                                              (parseFloat(
                                                item.total_optain || 0
                                              ) /
                                                (parseFloat(item.tm_1 || 0) +
                                                  parseFloat(item.tm_2 || 0) +
                                                  parseFloat(item.tm_3 || 0) +
                                                  parseFloat(item.ut_1 || 0) +
                                                  parseFloat(item.ut_2 || 0) +
                                                  parseFloat(item.ut_3 || 0) +
                                                  parseFloat(item.ut_4 || 0) +
                                                  parseFloat(item.ut_5 || 0))) *
                                              100
                                            ).toFixed(0) // Format the percentage with 2 decimal places
                                      }
                                      readOnly
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className='mt-2'
                color='primary'
                onClick={Result_Master_New_Add_Edit_Screen}
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

export default Result_Master_New_Add_Edit_Screen;
