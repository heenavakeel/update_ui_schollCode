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
    Alert
} from "reactstrap";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import { apiService } from '../../constants/ApiService';


const Party = () => {

    const navigate = useNavigate();
    const [partyTable, setPartyTable] = useState([]);
    const [totalPage, setTotalPage] = useState(); // Current page for pagination

    const onHandleAddParty = () => {
        navigate("/addparty")
    }

    const onHandleSearchKeyItem = (e) => {
        const value = e.target.value; 
        getPartyData(1, 10, value)
    }

    const onHandleEditParty = (id) => {
        let findArrayData = partyTable.find(e => e.id === id)
        navigate('/editparty', { state: {...findArrayData} });
    }

    const onHandleDeleteParty = async (id) => {

        const isDeleteConfirmed = window.confirm('Are you sure you want to delete this item?');
        if (isDeleteConfirmed) {
            try {
                let config = {
                    headers: {
                        'Content-Type': 'application/json', // Important for file upload//s
                        'accept': 'application/json'
                    }
                };

                const response = await apiService.delete(`/api/PartyMaster/delete?partyId=${id}`, config)
                if (response.response && response.response.data.errors) {
                    alert(response.response?.data?.errors)
                }

                if (response.status === true) {
                    alert(response.message);
                    getPartyData()
                }
                else {
                    alert(response.message);
                }
            } catch (error) {
                console.log(error)
                alert('SomeThing went wrong!!');
            }
        } else {
            console.log('Deletion canceled.');
        }
    };

    const getPartyData = async (page = 1, limit = 10, search = "") => {
        try {
            let config = {
                headers: {
                    'Content-Type': 'application/json', // Important for file upload//s
                    'accept': 'application/json'
                }
            };

            const response = await apiService.get(`/api/PartyMaster/allparty?pageNo=${page}&limit=${limit}&searchKey=${search}`, config)
            if (response.response && response.response.data.errors) {
                alert(response.response?.data?.errors)
            }

            if (response.status === true) {
                setPartyTable(response.partyMasterDetailData)
                setTotalPage(response.totalPages)

            }
            else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error)
            alert('SomeThing went wrong!!');
        }
    };

    const handlePageClick = (data) => {
        getPartyData(data.selected + 1)
    };

    useEffect(() => {
        getPartyData();
    }, [!partyTable]);

    return (
        <>

            <Col lg="12">
                <Card>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <i className="bi bi-card-text me-2"></i>
                            Party Details
                        </div>

                        <Row className="align-items-center" style={{ marginRight: '10px', width: '300px' }}>
                        <Input id="search" name="search" placeholder="Search..." type="text" onChange={(e) => { onHandleSearchKeyItem(e) }} />
                        </Row>

                        <Button color="primary" size="bg" onClick={onHandleAddParty}>Add Party</Button>

                    </CardTitle>

                    <CardBody className="">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Party Name</th>
                                    <th>Email</th>
                                    <th>Mobile No.</th>
                                    <th>Address</th>
                                    <th>Pincode</th>
                                    <th>Edit</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@twitter</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>

                                    <td ><Button color="success" size="bg" onClick={onHandleEditParty} >Edit</Button></td>
                                    <td ><Button color="danger" size="bg" onClick={handleDelete}>Delete</Button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@twitter</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>

                                    <td ><Button color="success" size="bg" >Edit</Button></td>
                                    <td ><Button color="danger" size="bg" onClick={handleDelete}>Delete</Button></td>
                                </tr>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@twitter</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>

                                    <td ><Button color="success" size="bg" >Edit</Button></td>
                                    <td ><Button color="danger" size="bg" onClick={handleDelete}>Delete</Button></td>
                                </tr> */}

                                {partyTable.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile_number}</td>
                                        <td>{item.address}</td>
                                        <td>{item.pincode}</td>
                                        <td>
                                            <Button color="success" size="bg" onClick={() => onHandleEditParty(item.id)}>
                                                Edit
                                            </Button>
                                        </td>
                                        <td>
                                            <Button color="danger" size="bg" onClick={() => onHandleDeleteParty(item.id)}>
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
    )

}


export default Party