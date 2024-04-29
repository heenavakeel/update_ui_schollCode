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

const Class_Detail_Master_Add_Edit_Screen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastId, setLastId] = useState(0);
  const [classmaster, setTclassmaster] = useState([]);
  const [classMasterTransection, setClassMasterTransection] = useState([]);
  const [class_detail_masterData, setclass_detail_masterData] = useState({
    id: 0,
    class_trn_uniq_id: '',
    class_name_id: null,
    class_name: '',
    section_name: '',
    no_of_stud: '',
    class_medium: '',
    feetype: '',
    subject_id: '',
    class_teacher_name: '',
    define_y_n: '',
    rec_type: '',
    index_no: '',
    class_name_2: '',
    remarks: '',
    deleted_yn: '',
  });
  const [rowsTransection, setRowsTransection] = useState([
    {
      id: 0,
      page_selection: '',
      subject_name: '',
      sub_teacher_name: '',
      per_in: '',
      per_out: '',
      ut_1: '',
      ut_2: '',
      ut_3: '',
      ut_4: '',
      ut_5: '',
      grade_type: '',
      grade_type_2: '',
      tm_1: '',
      tm_2: '',
      tm_3: '',
      class_detail_id: null,
      admit_no_id: null,
    },
  ]);
  const [partyTable, setPartyTable] = useState([]);
  useEffect(() => {
    // Check if location state exists and set the class_detail_masterData accordingly
    if (location.state) {
      setclass_detail_masterData(location.state);
      debugger;
      setLastId(location.state?.id);
      GetClass_Transection_Data(location.state?.id);
    }
  }, [location.state]);

  useEffect(() => {
    // Check if location state exists and set the class_detail_masterData accordingly
    getClass_MasterData('');
    GetAdmission('');
  }, []);
  const [errorMessage, setErrorMessage] = useState('');

  const onHandleBackParty = () => {
    navigate(-1);
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setclass_detail_masterData((prevData) => ({
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

    //  if (!class_detail_masterData.class_trn_uniq_id) {
    //    errors.class_trn_uniq_id = 'class_trn_uniq_id is required';
    //  }
    //  if (!class_detail_masterData.class_name_detail_id) {
    //    errors.class_name_detail_id = 'class_name_id is required';
    //  }
    if (!class_detail_masterData.class_name) {
      errors.class_name = 'class_name is required';
    }
    //  if (!class_detail_masterData.section_name) {
    //    errors.section_name = 'section_name is required';
    //  }
    //  if (!class_detail_masterData.no_of_stud) {
    //    errors.no_of_stud = 'no_of_stud is required';
    //  }
    //  if (!class_detail_masterData.class_medium) {
    //    errors.class_medium = 'class_medium is required';
    //  }
    //  if (!class_detail_masterData.feetype) {
    //    errors.feetype = 'feetype is required';
    //  }
    //  if (!class_detail_masterData.subject_id) {
    //    errors.subject_id = 'subject_id is required';
    //  }
    //  if (!class_detail_masterData.subject_name) {
    //    errors.subject_name = 'subject_name is required';
    //  }
    //  if (!class_detail_masterData.define_y_n) {
    //    errors.define_y_n = 'define_y_n is required';
    //  }
    //  if (!class_detail_masterData.rec_type) {
    //    errors.rec_type = 'rec_type is required';
    //  }

    //  if (!class_detail_masterData.index_no) {
    //    errors.index_no = 'index_no is required';
    //  }

    //  if (!class_detail_masterData.class_name_2) {
    //    errors.class_name_2 = 'class_name_2 is required';
    //  }
    if (!class_detail_masterData.remarks) {
      errors.remarks = 'remarks is required';
    }

    //  if (!class_detail_masterData.deleted_yn) {
    //    errors.deleted_yn = 'deleted_yn is required';
    //  }

    return errors;
  };

  const GetClass_Transection_Data = async (id) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/ClassTransactionDetail/GetClass_Transaction_Detail?id=${id}`,
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

  const Class_Detail_Master_Add_Edit_Screen = async () => {
    try {
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      const data = JSON.stringify(class_detail_masterData);

      debugger;
      let response;

      if (class_detail_masterData.id != 0) {
        response = await apiService.put(
          `api/ClassDetailMaster/UpdateClass_Detail_Master?id=${class_detail_masterData.id}`,
          data,
          config
        );
      } else {
        response = await apiService.post(
          'api/ClassDetailMaster/AddClass_Detail_Master',
          data,
          config
        );
      }
      if (response.status === true) {
        alert(response.message);
        debugger;
        const feeDetailValue = JSON.stringify(rowsTransection);
        response = await apiService.post(
          `api/ClassTransactionDetail/AddClass_Transaction_Detail?class_detailsId=${response.id}`,
          feeDetailValue,
          config
        );
        setclass_detail_masterData({
          id: 0,
          class_trn_uniq_id: '',
          class_name_id: null,
          class_name: '',
          section_name: '',
          no_of_stud: '',
          class_medium: '',
          feetype: '',
          subject_id: '',
          class_teacher_name: '',
          define_y_n: '',
          rec_type: '',
          index_no: '',
          class_name_2: '',
          remarks: '',
          deleted_yn: '',
        });
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong"');
    }
  };

  const addTransectionDetails = () => {
    setRowsTransection([
      ...rowsTransection,
      {
        subject_name: '',
        sub_teacher_name: '',
        per_in: '',
        per_out: '',
        ut_1: '',
        ut_2: '',
        ut_3: '',
        ut_4: '',
        ut_5: '',
        grade_type: '',
        grade_type_2: '',
        tm_1: '',
        tm_2: '',
        tm_3: '',
      },
    ]);
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
        `api/Admission/GetSchAdmissionResult?search=${search}`,
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
  const handleInputChange = (index, event) => {
    debugger;
    const { name, value } = event.target;
    const newRows = [...rowsTransection];
    newRows[index][name] = value;
    setRowsTransection(newRows);
  };
  const removeRow = (index) => {
    if (rowsTransection.length === 1) {
      return;
    }
    const newRows = [...rowsTransection];
    newRows.splice(index, 1);
    setRowsTransection(newRows);
  };

  const getClass_MasterData = async (search) => {
    debugger;
    if (search == null) {
      search = '';
    }
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/ClassMaster/GetClassMaster?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setTclassmaster(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
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
          `api/ClassTransactionDetail/DeleteTransactionClass?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetClass_Transection_Data(lastId);
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
              Class Detail Form
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
                      Class Detail Master
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
                          {' '}
                          <FormGroup>
                            <Label for='class_trn_uniq_id'>
                              class_trn_uniq_id
                            </Label>
                            <Input
                              id='class_trn_uniq_id'
                              name='class_trn_uniq_id'
                              value={class_detail_masterData.class_trn_uniq_id}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.class_trn_uniq_id}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='class_name'>class_name</Label>
                            <select
                              className='form-select'
                              value={class_detail_masterData.class_name_id}
                              name='class_name_id'
                              onChange={onChangeHandle}
                            >
                              <option value='0'>Select Class Name</option>
                              {classmaster.map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.class_Name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='section_name'>section_name</Label>
                            <Input
                              id='section_name'
                              name='section_name'
                              value={class_detail_masterData.section_name}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.section_name}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='col-3'>
                          {' '}
                          <FormGroup>
                            <Label for='no_of_stud'>no_of_stud</Label>
                            <Input
                              id='no_of_stud'
                              name='no_of_stud'
                              value={class_detail_masterData.no_of_stud}
                              onChange={onChangeHandle}
                            />
                            {errorMessage.name && (
                              <FormText color='danger'>
                                {errorMessage.no_of_stud}
                              </FormText>
                            )}
                          </FormGroup>
                        </div>
                        <div className='row'>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='class_medium'>class_medium</Label>
                              <Input
                                id='class_medium'
                                name='class_medium'
                                value={class_detail_masterData.class_medium}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.name && (
                                <FormText color='danger'>
                                  {errorMessage.class_medium}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='feetype'>feetype</Label>
                              <Input
                                id='feetype'
                                name='feetype'
                                value={class_detail_masterData.feetype}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.name && (
                                <FormText color='danger'>
                                  {errorMessage.feetype}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='subject_id'>subject_id</Label>
                              <Input
                                id='subject_id'
                                name='subject_id'
                                value={class_detail_masterData.subject_id}
                                onChange={onChangeHandle}
                              />
                              {errorMessage.name && (
                                <FormText color='danger'>
                                  {errorMessage.subject_id}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='col-3'>
                            {' '}
                            <FormGroup>
                              <Label for='class_teacher_name'>
                                class_teacher_name
                              </Label>
                              <Input
                                id='class_teacher_name'
                                name='class_teacher_name'
                                value={
                                  class_detail_masterData.class_teacher_name
                                }
                                onChange={onChangeHandle}
                              />
                              {errorMessage.name && (
                                <FormText color='danger'>
                                  {errorMessage.class_teacher_name}
                                </FormText>
                              )}
                            </FormGroup>
                          </div>
                          <div className='row'>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='define_y_n'>define_y_n</Label>
                                <Input
                                  id='define_y_n'
                                  name='define_y_n'
                                  value={class_detail_masterData.define_y_n}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.define_y_n}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='rec_type'>rec_type</Label>
                                <Input
                                  id='rec_type'
                                  name='rec_type'
                                  value={class_detail_masterData.rec_type}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.rec_type}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='index_no'>index_no</Label>
                                <Input
                                  id='index_no'
                                  name='index_no'
                                  value={class_detail_masterData.index_no}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.index_no}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='class_name_2'>class_name_2</Label>
                                <Input
                                  id='class_name_2'
                                  name='class_name_2'
                                  value={class_detail_masterData.class_name_2}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.class_name_2}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='admit_no_id'> Admit No</Label>
                                <select
                                  className='form-select'
                                  value={class_detail_masterData.admit_no_id}
                                  name='admit_no_id'
                                  onChange={onChangeHandle}
                                >
                                  <option value='0'>Select Admit No</option>
                                  {partyTable.map((option) => (
                                    <option key={option.id} value={option.id}>
                                      {option.admit_no}
                                    </option>
                                  ))}
                                </select>
                              </FormGroup>
                            </div>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='remarks'>remarks</Label>
                                <Input
                                  id='remarks'
                                  name='remarks'
                                  value={class_detail_masterData.remarks}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.remarks}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                            <div className='col-3'>
                              {' '}
                              <FormGroup>
                                <Label for='deleted_yn'>deleted_yn</Label>
                                <Input
                                  id='deleted_yn'
                                  name='deleted_yn'
                                  value={class_detail_masterData.deleted_yn}
                                  onChange={onChangeHandle}
                                />
                                {errorMessage.name && (
                                  <FormText color='danger'>
                                    {errorMessage.deleted_yn}
                                  </FormText>
                                )}
                              </FormGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='accordion-item'>
                  <h2 className='accordion-header' id='flush-headingTwo'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#flush-collapseTwo'
                      aria-expanded='false'
                      aria-controls='flush-collapseTwo'
                    >
                      Class Transaction Master
                    </button>
                  </h2>
                  <div
                    id='flush-collapseTwo'
                    className='accordion-collapse collapse'
                    aria-labelledby='flush-headingTwo'
                    data-bs-parent='#accordionFlushExample'
                  >
                    <div className='accordion-body'>
                      <div className='row'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>Sno</th>
                              <th>Action</th>
                              <th>page_selection</th>
                              <th>subject_name</th>
                              <th>sub_teacher_name</th>
                              <th>per_in</th>
                              <th>per_out</th>
                              <th>ut_1</th>
                              <th>ut_2</th>
                              <th>ut_3</th>
                              <th>ut_4</th>
                              <th>ut_5</th>
                              <th>grade_type</th>
                              <th>grade_type_2</th>
                              <th>tm_1</th>
                              <th>tm_2</th>
                              <th>tm_3</th>
                            </tr>
                          </thead>

                          <tbody>
                            {classMasterTransection.map((item, index) => (
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
                                <td>{item.page_selection}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.sub_teacher_name}</td>
                                <td>{item.per_in}</td>
                                <td>{item.per_out}</td>
                                <td>{item.ut_1}</td>
                                <td>{item.ut_2}</td>
                                <td>{item.ut_3}</td>
                                <td>{item.ut_4}</td>
                                <td>{item.ut_5}</td>
                                <td>{item.grade_type}</td>
                                <td>{item.grade_type_2}</td>
                                <td>{item.tm_1}</td>
                                <td>{item.tm_2}</td>
                                <td>{item.tm_3}</td>
                                <td>{item.class_detail_id}</td>
                              </tr>
                            ))}
                            {rowsTransection.map((row, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <Button
                                    color='danger'
                                    size='small'
                                    onClick={() => removeRow(index)} // Pass the index to removeRow function
                                  >
                                    Remove
                                  </Button>
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    name='page_selection'
                                    value={row.page_selection}
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.subject_name}
                                    name='subject_name'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.sub_teacher_name}
                                    name='sub_teacher_name'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.per_in}
                                    name='per_in'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.per_out}
                                    name='per_out'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.ut_1}
                                    name='ut_1'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.ut_2}
                                    name='ut_2'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.ut_3}
                                    name='ut_3'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.ut_4}
                                    name='ut_4'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.ut_5}
                                    name='ut_5'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.grade_type}
                                    name='grade_type'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.grade_type_2}
                                    name='grade_type_2'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.tm_1}
                                    name='tm_1'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.tm_2}
                                    name='tm_2'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type='text'
                                    className='form-control'
                                    value={row.tm_3}
                                    name='tm_3'
                                    onChange={(e) =>
                                      handleInputChange(index, e)
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <Button
                        color='primary'
                        size='small'
                        onClick={addTransectionDetails}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                className='mt-2'
                color='primary'
                onClick={Class_Detail_Master_Add_Edit_Screen}
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

export default Class_Detail_Master_Add_Edit_Screen;
