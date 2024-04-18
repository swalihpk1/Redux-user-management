import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useAddNewUserMutation } from "../slices/adminApiSlices";
import { useNavigate } from "react-router-dom";

const AdminAddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const [addNewUser, { isLoading }] = useAddNewUserMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
            toast.error("Input fields can't be empty!");
        } else if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
            toast.error("Invalid name!");
        }
        else if (password !== confirmPassword) {
            toast.error("Passwords doesn't match!");
        } else {
            try {
                await addNewUser({ name, email, password }).unwrap();
                toast.success('User added!');
                navigate('/admin');
            } catch (err) {
                toast.error(err?.data?.message || err.error);

            }
        }
    };

    return (
        <FormContainer>
            <h1 className="text-center">Add User</h1>

            <Form onSubmit={submitHandler}>
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

                {isLoading && <Loader />}

                <Button type="submit" variant="primary" className="mt-3">
                    Add User
                </Button>

            </Form>
        </FormContainer>
    );
};

export default AdminAddUser;