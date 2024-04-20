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

const Class_Master_Search_Screen = () => {
  const navigate = useNavigate();
  const [Transporter_Name_data, setTransporter_Name_data] = useState([]);

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Class_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetTransporter_NameData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Transporter_Name_data.find((e) => e.id === id);
    navigate('/Class_Master_Add_Edit_Screen', {
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
          `api/ClassMaster/DeleteClassMaster?id=${id}`,
          config
        );

        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetTransporter_NameData();
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
        alert('SomeThing went wrong');
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  const GetTransporter_NameData = async (search = '') => {
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
        setTransporter_Name_data(response.data);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong');
    }
  };

  useEffect(() => {
    GetTransporter_NameData();
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
              Class Details
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
              Add Class
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  {/* <th>class_id</th> */}
                  <th>class_name</th>
                  <th>next_class_name</th>
                  {/* <th>class_detail</th> */}
                  {/* <th>class_display_name</th>
                  <th>roman_name</th> */}
                  <th>last_class_in_words</th>
                  <th>curr_class_in_words</th>
                  <th>next_class_in_words</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Transporter_Name_data.map((item, index) => (
                  <tr key={index}>
                    {/* <td>{item.class_id}</td> */}
                    <td>{item.class_Name}</td>
                    <td>{item.next_class_name}</td>
                    {/* <td>{item.class_detail}</td> */}
                    {/* <td>{item.class_display_name}</td>
                    <td>{item.roman_name}</td> */}
                    <td>{item.last_class_in_words}</td>
                    <td>{item.curr_class_in_words}</td>
                    <td>{item.next_class_in_words}</td>
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

export default Class_Master_Search_Screen;
