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

const Circle = () => {
  const navigate = useNavigate();
  const [partyTable, setPartyTable] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandleAddCircleMaster = () => {
    navigate('/addCircleMaster');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetCircleMaster(1, 10, value);
  };

  const onHandleEditParty = (id) => {
    let findArrayData = partyTable.find((e) => e.id === id);
    navigate('/addCircleMaster', { state: { ...findArrayData } });
  };

  const onHandleDeleteCircleMaster = async (id) => {
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
          `api/CircleMaster/DeleteCircleMaster?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetCircleMaster();
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

  const GetCircleMaster = async (page = 1, limit = 10, search = '') => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/CircleMaster/GetCircleMaster?search=${search}`,
        config
      );
      debugger;
      if (response && response.data) {
        if (response.status === true) {
          setPartyTable(response.data);
          // setTotalPage(responseData.totalPages);
        } else {
          alert(response.message);
        }
      } else {
        // Handle response structure errors
        alert('Invalid response structure');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const handlePageClick = (data) => {
    GetCircleMaster(data.selected + 1);
  };

  useEffect(() => {
    GetCircleMaster();
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
              Circle master Details
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

            <Button color='primary' size='bg' onClick={onHandleAddCircleMaster}>
              Add Circle Master
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Circle Name</th>
                  <th>Circle Name Description</th>
                  <th>Calculate Month</th>
                  <th>Calc Month Detail</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {partyTable.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.circle_name}</td>
                    <td>{item.circle_name_description}</td>
                    <td>{item.calculate_month}</td>
                    <td>{item.calc_month_detail}</td>

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
                        onClick={() => onHandleDeleteCircleMaster(item.id)}
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

export default Circle;
