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

const Fee_Reciept_Master_Search = () => {
  const navigate = useNavigate();
  const [Fee_Reciept_Master_data, setFee_Reciept_Master_data] = useState([]);

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Fee_Reciept_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetFee_Reciept_MasterData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Fee_Reciept_Master_data.find((e) => e.id === id);
    navigate('/Fee_Reciept_Master_Add_Edit_Screen', {
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
          `api/FeeReciept/DeleteFeeReciept?id=${id}`,
          config
        );

        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetFee_Reciept_MasterData();
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

  const GetFee_Reciept_MasterData = async (search) => {
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
        `api/FeeReciept/GetFeeReciept?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setFee_Reciept_Master_data(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    GetFee_Reciept_MasterData();
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
              Fee_Reciept_Master Details
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
              Add Fee_Reciept_Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>sadmitno</th>
                  {/* Add other table headings here */}
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Fee_Reciept_Master_data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.sadmitno}</td>
                    {/* Add other table data here */}
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

export default Fee_Reciept_Master_Search;
