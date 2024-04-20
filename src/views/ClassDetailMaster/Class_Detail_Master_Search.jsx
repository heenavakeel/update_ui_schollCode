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
import { apiService } from '../../constants/ApiService';

const Class_Detail_Master_Search = () => {
  const navigate = useNavigate();
  const [Class_Detail_Master_data, setClass_Detail_Master_data] = useState([]);

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Class_Detail_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    getClass_Detail_MasterData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Class_Detail_Master_data.find((e) => e.id === id);
    navigate('/Class_Detail_Master_Add_Edit_Screen', {
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
          `api/Class_Detail_Master/DeleteClass_Detail_Master?id=${id}`,
          config
        );

        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          getClass_Detail_MasterData(null);
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

  const getClass_Detail_MasterData = async (search) => {
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
        `api/ClassDetailMaster/GetClass_Detail_Master?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setClass_Detail_Master_data(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    getClass_Detail_MasterData(null);
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
              Class_Detail_Master Details
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
              Add Class_Detail_Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>class_trn_uniq_id</th>
                  <th>class_name</th>
                  {/* Add other table headers similarly */}
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Class_Detail_Master_data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.class_trn_uniq_id}</td>
                    <td>{item.class_name}</td>
                    {/* Add other table data similarly */}
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

export default Class_Detail_Master_Search;
