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
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    setSearch(value);
  };
  const onHandleFromDateItem = (e) => {
    const value = e.target.value;
    setFromDate(value);
  };
  const onHandleToDateItem = (e) => {
    const value = e.target.value;
    setToDate(value);
  };

  const GetAdmission = async (
    page = 1,
    limit = 10,
    search = '',
    fromDate = '',
    toDate = ''
  ) => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };
      const response = await apiService.get(
        `api/Admission/GetAdmissionReport?search=${search}&fromData=${fromDate}&toDate=${toDate}`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setPartyTable(response.data);
        // setTotalPage(response.totalPages);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
      alert('SomeThing went wrong!!');
    }
  };

  const handlePageClick = (data) => {
    GetAdmission(data.selected + 1);
  };
  const onHandleSeachAdimission = () => {
    GetAdmission(1, 10, search, fromDate, toDate);
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
              Admission Report
            </div>

            <Row
              className='align-items-center'
              style={{ marginRight: '10px', width: '300px' }}
            ></Row>
            <Row>
              <Col>
                {' '}
                <Input
                  id='search'
                  name='search'
                  placeholder='Search...'
                  type='text'
                  onChange={(e) => {
                    onHandleSearchKeyItem(e);
                  }}
                />
              </Col>
              <Col>
                {' '}
                <Input
                  name='toDate'
                  type='date'
                  onChange={(e) => {
                    onHandleFromDateItem(e);
                  }}
                />
              </Col>
              <Col>
                {' '}
                <Input
                  name='fromDate'
                  type='date'
                  onChange={(e) => {
                    onHandleToDateItem(e);
                  }}
                />
              </Col>
              <Col>
                {' '}
                <Button
                  color='primary'
                  size='bg'
                  onClick={onHandleSeachAdimission}
                >
                  Search
                </Button>
              </Col>
            </Row>
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
