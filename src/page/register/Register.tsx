import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText,  Box, Typography, Container } from '@mui/material';
import RegisterImage from '../../resources/images/register.jpg';
import { Link } from 'react-router-dom';
interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    registerCode?: string;
}

const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
};

const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords must match').required('Required'),
    role: Yup.string().required('Required'),
    registerCode: Yup.string().when('role', {
        is: 'charity_worker',
        then: item => item.required('Register code is required for charity workers'),
    }),
});

const RegisterPage: React.FC = () => {
    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        console.log(values);
        setSubmitting(false);
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${RegisterImage})`,
            backgroundSize: 'cover',
            boxSizing: 'border-box',
            paddingTop: '10vh'
        }}>
            <Container
                style={{
                    padding: '20px',
                    background: 'white'
                }}
                component="main" maxWidth="xs">
                <Typography component="h1" variant="h5" align="center">
                    Register Account
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ values, handleChange, isSubmitting }) => (
                            <Form>
                                <Field as={TextField} label="Username" name="username" fullWidth margin="normal" />
                                <ErrorMessage name="username" component={FormHelperText} />

                                <Field as={TextField} label="Email" name="email" type="email" fullWidth margin="normal" />
                                <ErrorMessage name="email" component={FormHelperText} />

                                <Field as={TextField} label="Password" name="password" type="password" fullWidth margin="normal" />
                                <ErrorMessage name="password" component={FormHelperText} />

                                <Field as={TextField} label="Confirm Password" name="confirmPassword" type="password" fullWidth margin="normal" />
                                <ErrorMessage name="confirmPassword" component={FormHelperText} />

                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Role</InputLabel>
                                    <Field as={Select} name="role" value={values.role} onChange={handleChange}>
                                        <MenuItem value="charity_worker">Charity Worker</MenuItem>
                                        <MenuItem value="public">Public</MenuItem>
                                    </Field>
                                    <ErrorMessage name="role" component={FormHelperText} />
                                </FormControl>

                                {values.role === 'charity_worker' && (
                                    <Field as={TextField} label="Register Code" name="registerCode" required fullWidth margin="normal" />
                                )}
                                <ErrorMessage name="registerCode" component={FormHelperText} />

                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                                    Register
                                </Button>

                                <Box marginTop={2}>
                                    <Typography variant="body2">
                                        Already have an account? <Link to="/login">Login here</Link>
                                    </Typography>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </div>
    );
};

export default RegisterPage;
