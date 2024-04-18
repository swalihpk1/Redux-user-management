import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { useDeleteUserMutation, useGetUsersDataMutation } from "../slices/adminApiSlices";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const AdminHomeScreen = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [data, setData] = useState(true);

    const [getUsersData, { isLoading }] = useGetUsersDataMutation();
    const [deleteUser] = useDeleteUserMutation();

    const filteredUsers = users.filter(user => {
        const userName = user.name.toLowerCase();
        const searchValue = search.toLowerCase();
        return userName.includes(searchValue);
    });

    useEffect(() => {
        async function fetchUser() {
            const res = await getUsersData().unwrap("");
            setUsers(res.user);
        }
        fetchUser();
    }, [data, getUsersData]);

    const deleteHandler = async (id) => {
        setSelectedUserId(id);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteUser(selectedUserId).unwrap("");
            const prevUsers = [...users];
            const updatedUsers = prevUsers.filter((user) => user._id !== selectedUserId);
            setUsers(updatedUsers);
            setShowModal(false);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Container style={{ border: "1px solid #ccc", padding: "20px" }}>
            <Form.Group className="mt-3 mt-5 d-flex align-items-center" controlId="searchForm">
                <Form.Label className="me-3">Search:</Form.Label>
                <Form.Control
                    style={{ width: "30vw", marginBottom: "10px" }}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
                <Link to="/admin/users/add">
                    <Button className="btn-primary rounded-5">Add User</Button>
                </Link>
            </div>

            {isLoading && <Loader />}

            <div className="table-responsive">
                <Table striped bordered hover className="mt-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users &&
                            filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button className="btn-danger" onClick={() => deleteHandler(user._id)}>Delete</Button>
                                    </td>
                                    <td>
                                        <Link to={`/admin/users/update/${user._id}`}><Button className="btn-success">Update</Button></Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminHomeScreen;
