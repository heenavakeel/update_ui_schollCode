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
  Table,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../constants/ApiService';

const SystemRecords = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState([]);

  const onHandle_AddSchool_Redirect = () => {
    navigate('/AddSystemRecord');
  };

  const onHandleSearch = (e) => {
    const value = e.target.value;
    fetchSchoolData(value);
  };

  const onHandleEdit = (id) => {
    let foundSchool = schoolData.find((school) => school.school_id === id);
    navigate('/AddSystemRecord', {
      state: { ...foundSchool },
    });
  };

  const onHandleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this school?'
    );
    if (confirmed) {
      try {
        const response = await apiService.delete(
          `api/SystemRecord/DeletSystemRecord?id=${id}`
        );
        if (response.status === true) {
          alert(response.message);
          fetchSchoolData(); // Refresh school data after deletion
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting the school.');
      }
    }
  };

  const fetchSchoolData = async (search = '') => {
    debugger;
    try {
      const response = await apiService.get(
        `api/SystemRecord/GetSystemRecord?search=${search}`
      );
      if (response.status === true) {
        setSchoolData(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching school data.');
    }
  };

  useEffect(() => {
    fetchSchoolData();
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
              School Details
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
                onChange={onHandleSearch}
              />
            </Row>
            <Button
              color='primary'
              size='bg'
              onClick={onHandle_AddSchool_Redirect}
            >
              Add School
            </Button>
          </CardTitle>
          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>School Name</th>
                  <th>Address</th>
                  <th>School Code</th>
                  <th>Phone Number</th>
                  <th>State</th>
                  <th>City</th>
                  <th>Pincode</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {schoolData.map((school, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{school.school_name}</td>
                    <td>{school.address}</td>
                    <td>{school.school_code}</td>
                    <td>{school.school_phn}</td>
                    <td>{school.state}</td>
                    <td>{school.city}</td>
                    <td>{school.pincode}</td>

                    <td>
                      <Button
                        color='success'
                        size='bg'
                        onClick={() => onHandleEdit(school.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        color='danger'
                        size='bg'
                        onClick={() => onHandleDelete(school.id)}
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

export default SystemRecords;
