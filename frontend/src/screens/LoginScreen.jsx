import { useState,useEffect} from "react";
import { Link,useNavigate} from "react-router-dom";
import { Form,Button,Row,Col, FormLabel, FormControl } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/formContainer";
import {useLoginMutation} from '../slices/usersApiSlice';
import { setCredntials } from "../slices/authSlices";
import {toast} from 'react-toastify';
import Loader from "../components/Loader";

const LoginScreen=()=>{
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    
    const navigate= useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}]= useLoginMutation();

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[navigate,userInfo])
    
    const submitHandler= async(e)=>{
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log("res",res);
            dispatch(setCredntials({...res}))
            navigate('/')
        } catch (error) {
             toast.error(error?.data?.message || error.error);
        }
    }
    return (
       <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        {isLoading && <Loader/>}
        <Button type='submit' variant="primary" className='mt-3'>Sign In</Button>
        <Row className='py-3'>
        <Col>
        New Here ? <Link to='/register'>Sign Up</Link>
        </Col>
        </Row>
        </Form>
       </FormContainer>
    )
}

export default LoginScreen