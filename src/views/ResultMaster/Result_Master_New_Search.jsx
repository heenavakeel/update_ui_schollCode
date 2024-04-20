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
  Alert,
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../constants/ApiService';

const Result_Master_New_Search = () => {
  const navigate = useNavigate();
  const [Result_Master_New_data, setResult_Master_New_data] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Result_Master_New_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    console.log('sss');
    const value = e.target.value;
    GetResult_Master_NewData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Result_Master_New_data.find((e) => e.id === id);
    navigate('/Result_Master_New_Add_Edit_Screen', {
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
            'Content-Type': 'application/json', // Important for file uploads
            accept: 'application/json',
          },
        };

        const response = await apiService.delete(
          `api/Result_Master_NewX/Delete Result_Master_New?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetResult_Master_NewData();
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
        setResult_Master_New_data(response.data);
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

  const handlePageClick = (data) => {
    GetResult_Master_NewData(data.selected + 1);
  };

  useEffect(() => {
    GetResult_Master_NewData();
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
              Result_Master_New Details
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
                onChange={(e) => {
                  onHandleSearchKeyItem(e);
                }}
              />
            </Row>

            <Button
              color='primary'
              size='bg'
              onClick={onHandle_AddDesired_Redirect}
            >
              Add Result_Master_New
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>admit_no</th>
                  <th>stud_name</th>
                  <th>subject_name</th>
                  {/* Add more header columns as needed */}
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Result_Master_New_data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.admit_no}</td>
                    <td>{item.stud_name}</td>
                    <td>{item.subject_name}</td>
                    {/* Add more table data cells as needed */}
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

export default Result_Master_New_Search;
