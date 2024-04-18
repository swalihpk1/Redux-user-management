import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from "../components/formContainer";
import { useAdminLoginMutation } from "../slices/adminApiSlices";
import { setAdminCredentials } from "../slices/authSlices";
import { toast } from 'react-toastify';
import Loader from "../components/Loader";


const AdminLoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [adminLogin, { isLoading }] = useAdminLoginMutation();

    const { adminInfo } = useSelector(state => state.auth);
    
    useEffect(() => {
        if (adminInfo) {
            navigate('/admin');
        }
    }, [navigate, adminInfo]);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
            dispatch(setAdminCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    return (
        <FormContainer >
            <h1 className="text-center">Admin Login</h1>

            <Form onSubmit={submitHandler}>
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
                {isLoading && <Loader />}
                <Button type="submit" variant="primary" className="mt-3">
                    Sign In
                </Button>
            </Form>
        </FormContainer>
    );
};

export default AdminLoginScreen;