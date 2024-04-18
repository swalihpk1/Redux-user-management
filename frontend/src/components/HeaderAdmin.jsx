import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../slices/authSlices';
import { useAdminLogoutMutation } from '../slices/adminApiSlices';

const HeaderAdmin = () => {
    const { adminInfo } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [adminLogoutApi] = useAdminLogoutMutation();

    const logoutHandler = async () => {
        try {
            await adminLogoutApi().unwrap();
            dispatch(adminLogout());
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/admin'>
                        <Navbar.Brand><h5>Admin</h5></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto d-flex align-items-lg-center'>
                            {adminInfo && (
                                <>
                                    <Button onClick={logoutHandler}>Logout</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
};
export default HeaderAdmin;