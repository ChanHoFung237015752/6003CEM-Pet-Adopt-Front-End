import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../../resources/images/login.jpg';
import { authedRequest } from '../../http';
import toast from 'react-hot-toast';
import { User, useAuth } from '../../contexts/Auth';
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                const result = await authedRequest.post(`/auth/login`, {
                    email: values.email,
                    password: values.password
                });
                toast.success('Successfully logged in!');
                const { jwt, user } = result.data;
                login(user as User, jwt);
                navigate('/');
            } catch (error:any) {
                toast.error(error.response.data);
                console.log(error);
            }
        },
    });

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${LoginImage})`,
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            paddingTop: '10vh'
        }}>

            <Container style={{
                    padding: '20px',
                    background: 'white'
                }} component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Typography variant="body2" color="textSecondary" align="center">
                            Don't have an account? <Link to="/register">Sign up</Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
