import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider, signInWithGooglePopup } from '../firebase';

const Login = () => {

    const signIn = () => {
        signInWithGooglePopup(auth, provider)
            .then(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo
                    src='https://i.ibb.co/qm0JQvt/photo-1614680376739-414d95ff43df-ixlib-rb-4-0.jpg'
                    alt='Logo'
                />
                <Button
                    variant='outlined'
                    onClick={signIn}
                >
                    Sign in with Google
                </Button>
            </LoginContainer>
        </Container>
    );
}

export default Login;

const Container = styled.div`
display: grid;
place-items: center;
height: 100vh;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
display: flex;
flex-direction: column;
padding: 100px;
align-items: center;
background-color: white;
border-radius: 5px;
box-shadow: 8px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
height: 180px;
width: 200px;
margin-bottom: 50px;
`;
