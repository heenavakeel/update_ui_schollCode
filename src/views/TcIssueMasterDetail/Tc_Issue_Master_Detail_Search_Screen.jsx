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
          `api/Transporter_NameX/DeleteTransporter_Name?id=${id}`,
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
        `api/Transporter_Name/GetTransporter_Name?searchItem=${search}`,
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
              Transporter_Name Details
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
              Add Transporter_Name
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>tc_no_manual</th>
                  <th>entry_date_time</th>
                  <th>issue_date</th>
                  <th>photo_image</th>
                  <th>adm_sch_id</th>
                  <th>admit_no</th>
                  <th>sname</th>
                  <th>sex_mf</th>
                  <th>d_o_b</th>
                  <th>adm_date</th>
                  <th>f_name</th>
                  <th>m_name</th>
                  <th>tc_for_current</th>
                  <th>tc_for_end</th>
                  <th>curr_class</th>
                  <th>curr_class_in_roman</th>
                  <th>curr_class_in_word</th>
                  <th>promted_class</th>
                  <th>promoted_class_in_roman</th>
                  <th>promoted_class_in_word</th>
                  <th>date_numric</th>
                  <th>month_no</th>
                  <th>year_no</th>
                  <th>from_year</th>
                  <th>to_year</th>
                  <th>possible_attend_days</th>
                  <th>attendance_days</th>
                  <th>leave_taken_days</th>
                  <th>result_detail</th>
                  <th>promot_yn</th>
                  <th>certificate_type</th>
                  <th>file_no_1</th>
                  <th>file_no_2</th>
                  <th>last_attended_date</th>
                  <th>withdraw_date</th>
                  <th>narr_remark</th>
                  <th>sch_session</th>
                  <th>sys_remark</th>
                  <th>fee_remark</th>
                  <th>tc_no_auto_id</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Transporter_Name_data.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <th>{item.tc_no_manual}</th>
                    <th>{item.entry_date_time}</th>
                    <th>{item.issue_date}</th>
                    <th>{item.photo_image}</th>
                    <th>{item.adm_sch_id}</th>
                    <th>{item.admit_no}</th>
                    <th>{item.sname}</th>
                    <th>{item.sex_mf}</th>
                    <th>{item.d_o_b}</th>
                    <th>{item.adm_date}</th>
                    <th>{item.f_name}</th>
                    <th>{item.m_name}</th>
                    <th>{item.tc_for_current}</th>
                    <th>{item.tc_for_end}</th>
                    <th>{item.curr_class}</th>
                    <th>{item.curr_class_in_roman}</th>
                    <th>{item.curr_class_in_word}</th>
                    <th>{item.promted_class}</th>
                    <th>{item.promoted_class_in_roman}</th>
                    <th>{item.promoted_class_in_word}</th>
                    <th>{item.date_numric}</th>
                    <th>{item.month_no}</th>
                    <th>{item.year_no}</th>
                    <th>{item.from_year}</th>
                    <th>{item.to_year}</th>
                    <th>{item.possible_attend_days}</th>
                    <th>{item.attendance_days}</th>
                    <th>{item.leave_taken_days}</th>
                    <th>{item.result_detail}</th>
                    <th>{item.promot_yn}</th>
                    <th>{item.certificate_type}</th>
                    <th>{item.file_no_1}</th>
                    <th>{item.file_no_2}</th>
                    <th>{item.last_attended_date}</th>
                    <th>{item.withdraw_date}</th>
                    <th>{item.narr_remark}</th>
                    <th>{item.sch_session}</th>
                    <th>{item.sys_remark}</th>
                    <th>{item.fee_remark}</th>
                    <th>{item.tc_no_auto_id}</th>
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
