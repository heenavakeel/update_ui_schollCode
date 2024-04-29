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

const Multi_Purpose_Type_Master_Search = () => {
  const navigate = useNavigate();
  const [Multi_Purpose_Type_Master_data, setMulti_Purpose_Type_Master_data] =
    useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Multi_Purpose_Type_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    console.log('sss');
    const value = e.target.value;
    getMulti_Purpose_Type_MasterData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Multi_Purpose_Type_Master_data.find((e) => e.id === id);
    navigate('/Multi_Purpose_Type_Master_Add_Edit_Screen', {
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
          `api/Multi_Purpose_Type_MasterX/Delete Multi_Purpose_Type_Master?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          getMulti_Purpose_Type_MasterData();
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

  const getMulti_Purpose_Type_MasterData = async (search) => {
    if (search == null) {
      search = '';
    }
    console.log(search);
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file uploads
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/Multi_Purpose_Type_Master/GetMulti_Purpose_Type_Master?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setMulti_Purpose_Type_Master_data(response.data);
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
    getMulti_Purpose_Type_MasterData(data.selected + 1);
  };

  useEffect(() => {
    getMulti_Purpose_Type_MasterData();
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
              Multi_Purpose_Type_Master Details
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
              Add Multi_Purpose_Type_Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>multi_purpose_code</th>
                  <th>multi_purpose_type</th>
                  <th>multi_purpose_remark</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Multi_Purpose_Type_Master_data.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>

                    <th>{item.multi_purpose_code}</th>
                    <th>{item.multi_purpose_type}</th>

                    <th>{item.multi_purpose_remark}</th>
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

export default Multi_Purpose_Type_Master_Search;
