import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';


const Hero = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  console.log(userInfo)
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center border-0 hero-card bg-light w-75'>
          {userInfo && (
            <>
              <div className='d-flex align-items-center'>
                {userInfo.imageUrl && <img src={userInfo.imageUrl} alt="userProfile" style={{ width: '150px', borderRadius: '50%',marginRight:'1rem' }} />}
                <h3 className='text-center  mb-4'>Welcome,  {userInfo.name}</h3>
              </div>
            </>
          )}

          {!userInfo && (
            <>
              <h1 className='text-center mb-4'>User Management</h1>
              <p className='text-center mb-4'>
                Login Or Signup
              </p>
              <div className='d-flex'>
                <LinkContainer to='/login'>
                  <Button variant='primary' href='/login' className='me-3'>
                    Sign In
                  </Button>
                </LinkContainer>

                <LinkContainer to='/register'>
                  <Button variant='secondary' href='/register'>
                    Sign up
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;