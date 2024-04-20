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

const FeeHead = () => {
  const navigate = useNavigate();
  const [partyTable, setPartyTable] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandleAddFeeHead = () => {
    navigate('/addFeeHead');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetFeeHeadMaster(1, 10, value);
  };

  const onHandleEditParty = (id) => {
    let findArrayData = partyTable.find((e) => e.id === id);
    debugger;
    navigate('/addFeeHead', { state: { ...findArrayData } });
  };

  const onHandleDeleteFeeHeadMaster = async (id) => {
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
          `api/FeeHeadMaster/DeleteFeeHeadMaster?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetFeeHeadMaster();
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

  const GetFeeHeadMaster = async (page = 1, limit = 10, search = '') => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/FeeHeadMaster/GetFeeHeadMaster`,
        config
      );
      debugger;
      if (response.response && response.response.data.errors) {
        alert(response.response?.data?.errors);
      }

      if (response.status === true) {
        setPartyTable(response.multiFeeHeadData);
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
    GetFeeHeadMaster(data.selected + 1);
  };

  useEffect(() => {
    GetFeeHeadMaster();
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
              Fee Head Details
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

            <Button color='primary' size='bg' onClick={onHandleAddFeeHead}>
              Add Fee Head
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Head No</th>
                  <th>Head Name</th>
                  <th>Caltime</th>
                  <th>Headname Short</th>
                  <th>Fee Amt Default</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {partyTable.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{item.head_no}</td>
                    <td>{item.head_name}</td>
                    <td>{item.caltime}</td>
                    <td>{item.headname_Short}</td>
                    <td>{item.fee_amt_default}</td>
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
                        onClick={() => onHandleDeleteFeeHeadMaster(item.id)}
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

export default FeeHead;
