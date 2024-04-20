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
  Table,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { apiService } from '../../constants/ApiService';

const Subject_Master_Search = () => {
  const navigate = useNavigate();
  const [subjectMasterData, setSubjectMasterData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Subject_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    debugger;
    setSearchValue(value);
    GetSubjectMasterData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = subjectMasterData.find((e) => e.id === id);
    navigate('/Subject_Master_Add_Edit_Screen', {
      state: { ...findArrayData },
    });
  };

  const onHandleDelete = async (id) => {
    const isDeleteConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (isDeleteConfirmed) {
      try {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        };

        const response = await apiService.delete(
          `api/SubjectMaster/DeleteSubjectMaster?id=${id}`,
          config
        );

        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetSubjectMasterData(null);
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  const GetSubjectMasterData = async (search) => {
    debugger;
    if (search === null) {
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
        `api/SubjectMaster/GetSubjectMaster?search=${search}`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setSubjectMasterData(response.data);
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
    debugger;
    GetSubjectMasterData(null);
  }, []);

  return (
    <>
      <Col lg='12'>
        <Card>
          <CardTitle
            tag='h6'
            className='border-bottom p-3 mb-0 d-flex align-items-center justify-content-between'
          >
            <div className='d-flex align-items-center'>
              <i className='bi bi-card-text me-2'></i>
              Subject_Master Details
            </div>

            <Row
              className='align-items-center'
              style={{ marginRight: '10px', width: '300px' }}
            >
              <Input
                id='search'
                name='search'
                placeholder='Search...'
                type='text'
                value={searchValue}
                onChange={(e) => onHandleSearchKeyItem(e)}
              />
            </Row>

            <Button
              color='primary'
              size='bg'
              onClick={onHandle_AddDesired_Redirect}
            >
              Add Subject_Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>subject_code</th>
                  <th>subject_name</th>
                  <th>subject_marks</th>
                  <th>class_name</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {subjectMasterData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subject_code}</td>
                    <td>{item.subject_name}</td>
                    <td>{item.subject_marks}</td>
                    <td>{item.class_name}</td>
                    <td>
                      <Button
                        color='success'
                        size='bg'
                        onClick={() => onHandleEdit(item.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        color='danger'
                        size='bg'
                        onClick={() => onHandleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Subject_Master_Search;
