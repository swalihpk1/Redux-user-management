import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUpdateUserMutation, useUpdateUserDataMutation } from "../slices/adminApiSlices";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null);

    const navigate = useNavigate();

    const [getUpdateUser] = useGetUpdateUserMutation();
    const [updateUserData, { isLoading }] = useUpdateUserDataMutation();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", image);

    useEffect(() => {
        async function fetchUser(id) {
            const res = await getUpdateUser(id);
            const data = res.data;
            setUserData(data);
            setName(data.name);
            setEmail(data.email);
        }
        fetchUser(id);
    }, [id, getUpdateUser]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
            toast.error("Invalid name!");
        }
        else if (password !== confirmPassword) {
            toast.error("Passwords doesn't match!");
        } else {
            try {
                await updateUserData(formData).unwrap("");
                toast.success('Profile updated!');
                navigate('/admin');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div>
            <FormContainer>
                <h1 className="text-center">Update User</h1>
                {userData && (
                    <Form onSubmit={submitHandler} >
                        <Form.Group className="my-2" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="my-2" controlId="imageUpload">
                            <Form.Label>Image Upload</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            >
                            </Form.Control>
                        </Form.Group>
                        {isLoading && <Loader />}
                        <Button type="submit" variant="primary" className="mt-3">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>

        </div>
    );
};

export default AdminUserUpdate;