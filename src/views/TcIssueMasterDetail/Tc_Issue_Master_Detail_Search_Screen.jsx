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

const Tc_Issue_Master_Detail_Search_Screen = () => {
  const navigate = useNavigate();
  const [Transporter_Name_data, setTransporter_Name_data] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandle_AddDesired_Redirect = () => {
    navigate('/Tc_Issue_Master_Detail_Add_Edit_Screen');
  };

  const onHandleSearchKeyItem = (e) => {
    console.log('sss');
    const value = e.target.value;
    GetTransporter_NameData(value);
  };

  const onHandleEdit = (id) => {
    let findArrayData = Transporter_Name_data.find((e) => e.id === id);
    navigate('/Tc_Issue_Master_Detail_Add_Edit_Screen', {
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
          `api/TcIssueMasterDetail/DeleteTc_Issue_Master_Detail?id=${id}`,
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
        alert('SomeThing went wrong ');
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  const GetTransporter_NameData = async (search) => {
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
        `api/TcIssueMasterDetail/GetTc_Issue_Master_Detail?searchItem=${search}`,
        config
      );

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setTransporter_Name_data(response.data);
        console.log(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong ');
    }
  };

  const handlePageClick = (data) => {
    GetTransporter_NameData(data.selected + 1);
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
              TC Details
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
              Add TC
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>tc_no_manual</th>
                  <th>issue_date</th>
                  <th>admit_no</th>
                  <th>sname</th>
                  <th>sex_mf</th>
                  <th>d_o_b</th>
                  <th>tc_for_current</th>
                  <th>tc_for_end</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Transporter_Name_data.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <th>{item.tc_no_manual}</th>
                    <th>{item.issue_date}</th>
                    <th>{item.admit_no}</th>
                    <th>{item.sname}</th>
                    <th>{item.sex_mf}</th>
                    <th>{item.d_o_b}</th>
                    <th>{item.tc_for_current}</th>
                    <th>{item.tc_for_end}</th>

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

export default Tc_Issue_Master_Detail_Search_Screen;
