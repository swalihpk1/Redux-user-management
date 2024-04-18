import { useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { Form,Button} from "react-bootstrap";
import FormContainer from "../components/formContainer";
import { setCredntials } from "../slices/authSlices";
import {useDispatch,useSelector} from 'react-redux'
import {toast} from 'react-toastify';
import Loader from "../components/Loader";
import { useUpdateMutation } from "../slices/usersApiSlice";

const ProfileScreen=()=>{
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('');
    const [image, setImage] = useState(null);
 

        const navigate= useNavigate();
    const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth)
  console.log("userInfo", userInfo);
   const [updateProfile,{isLoading}]= useUpdateMutation();

   useEffect(()=>{
    setName(userInfo.name);
    setEmail(userInfo.email)    
   }, [userInfo.setName, userInfo.setEmail])
  
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);
    
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
      toast.error("Invalid name!");
    }
    else if (password !== confirmPassword) {
      toast.error("Passwords doesn't match!");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("file", image);

        const res = await updateProfile(formData).unwrap("");
        console.log('res',res);
        dispatch(setCredntials({ ...res }));
        console.log(res);
        toast.success('Profile updated!');
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

  };
    return (
       <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder='Enter Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
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
        {isLoading && <Loader/>}
        <Button type='submit' variant="primary" className='mt-3'>Update</Button>
        </Form>
       </FormContainer>
    )
}

export default ProfileScreen