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

const Fee_Group_Master_Search_Screen = () => {
  const navigate = useNavigate();
  const [Fee_Group_data, setFee_Group_data] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Fee_Group_Master_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    console.log('sss');
    const value = e.target.value;
    GetFee_GroupData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Fee_Group_data.find((e) => e.id === id);
    navigate('/Fee_Group_Master_Add_Edit_Screen', {
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
            'Content-Type': 'application/json', // Important for file upload//s
            accept: 'application/json',
          },
        };

        const response = await apiService.delete(
          `api/FeeGroupMaster/DeleteFeeGroup?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetFee_GroupData();
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

  const handlePageClick = (data) => {
    GetFee_GroupData(data.selected + 1);
  };

  useEffect(() => {
    GetFee_GroupData();
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
              Fee_Group Details
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
              Add Fee_Group
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>fee_group_code</th>
                  <th>fee_group_name</th>
                  <th>fee_group_detail</th>
                  <th>fee_group_detail2</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Fee_Group_data.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <th>{item.fee_group_code}</th>
                    <th>{item.fee_group_name}</th>
                    <th>{item.fee_group_detail}</th>
                    <th>{item.fee_group_detail2}</th>
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

export default Fee_Group_Master_Search_Screen;
