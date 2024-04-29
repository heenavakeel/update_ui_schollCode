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

const Admission = () => {
  const navigate = useNavigate();
  const [partyTable, setPartyTable] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandleAddAdmission = () => {
    navigate('/addAdmission');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetAdmission(1, 10, value);
  };

  const onHandleEditParty = (id) => {
    let findArrayData = partyTable.find((e) => e.id === id);
    navigate('/addAdmission', { state: { ...findArrayData } });
  };

  const onHandleDeleteAdmission = async (id) => {
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
          `api/Admission/DeleteAdmission?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetAdmission();
        } else {
          alert(response.message);
        }
      } catch (error) {
        console.log(error);
        alert('SomeThing went wrong!!');
      }
    } else {
      console.log('Deletion canceled.');
    }
  };

  const GetAdmission = async (page = 1, limit = 10, search = '') => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      let apiUrl = `api/Admission/GetAdmission?search=${search}&page=${page}&limit=${limit}`;

      // If search is not empty, get all records and then slice the last 10
      if (search !== '') {
        apiUrl = `api/Admission/GetAdmission?search=${search}`;
      }

      const response = await apiService.get(apiUrl, config);

      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        let admissionData = response.data;

        // If search is not empty, slice the last 10 records
        if (search !== '') {
          admissionData = admissionData.slice(-10);
        }

        setPartyTable(admissionData);
        setTotalPage(response.totalPages); // Update the totalPage state
        console.log(admissionData);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!!');
    }
  };

  const handlePageClick = (data) => {
    GetAdmission(data.selected + 1);
  };

  useEffect(() => {
    GetAdmission();
  }, [!partyTable]);

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
              Admission master Details
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

            <Button color='primary' size='bg' onClick={onHandleAddAdmission}>
              Add Admission Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Adm sch id</th>
                  <th>admit No</th>
                  <th>Student Name</th>
                  <th>class Admit</th>
                  <th>Roll No</th>
                  <th>DOB</th>
                  <th>Adm Date</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {partyTable.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.adm_sch_id}</td>
                    <td>{item.admit_no}</td>
                    <td>{item.stud_name}</td>
                    <td>{item.class_admit}</td>
                    <td>{item.roll_no}</td>
                    <td>{item.d_o_b}</td>
                    <td>{item.adm_date}</td>
                    <td>
                      <Button
                        color='success'
                        size='bg'
                        onClick={() => onHandleEditParty(item.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        color='danger'
                        size='bg'
                        onClick={() => onHandleDeleteAdmission(item.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <CardBody>
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Admission;
