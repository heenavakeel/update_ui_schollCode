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

const Slab = () => {
  const navigate = useNavigate();
  const [partyTable, setPartyTable] = useState([]);
  const [totalPage, setTotalPage] = useState(); // Current page for pagination

  const onHandleAddSlabMaster = () => {
    navigate('/addSlabMaster');
  };

  const onHandleSearchKeyItem = (e) => {
    const value = e.target.value;
    GetSlabMaster(1, 10, value);
  };

  const onHandleEditParty = (id) => {
    let findArrayData = partyTable.find((e) => e.id === id);
    debugger;
    navigate('/addSlabMaster', { state: { ...findArrayData } });
  };

  const onHandleDeletSlabMaster = async (id) => {
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
          `api/SlabMaster/DeletSlabMaster?id=${id}`,
          config
        );
        if (response.response && response.response.data.errors) {
          alert(response.response?.data?.errors);
        }

        if (response.status === true) {
          alert(response.message);
          GetSlabMaster();
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

  const GetSlabMaster = async (page = 1, limit = 10, search = '') => {
    try {
      let config = {
        headers: {
          'Content-Type': 'application/json', // Important for file upload//s
          accept: 'application/json',
        },
      };

      const response = await apiService.get(
        `api/SlabMaster/GetSlabMaster`,
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
    GetSlabMaster(data.selected + 1);
  };

  useEffect(() => {
    GetSlabMaster();
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
              Fee Slab Details
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

            <Button color='primary' size='bg' onClick={onHandleAddSlabMaster}>
              Add Fee Slab
            </Button>
          </CardTitle>

          <CardBody className=''>
            <Table bordered>
              <thead>
                <tr>
                  <th>id</th>
                  <th>Slab Name</th>
                  <th>Fee Group Name</th>
                  <th>State Name</th>
                  <th>Slab Detail</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {partyTable.map((item, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>

                    <td>{item.slab_name}</td>
                    <td>{item.fee_group_name}</td>
                    <td>{item.state_name}</td>
                    <td>{item.slab_detail}</td>
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
                        onClick={() => onHandleDeletSlabMaster(item.id)}
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

export default Slab;
