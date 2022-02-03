import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    Stepper,
    Step,
    StepLabel,
    Box,
    Button,
    Paper,
    TextField,
    Alert,
    MenuItem,
    Select,
    InputLabel, FormControl
} from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import {useState} from "react";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import {useFormik} from "formik";
import * as yup from "yup";
import userRegistrationSchema from "../../Validations/UserRegistrationSchema.js";


import './RegistrationPage.css';
import * as Yup from 'yup';

const Connector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                ' #033b4c',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor:
                ' #033b4c',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const StepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor:
            '#033b4c',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundColor:
            '#033b4c',
    }),

}));

function StepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <MarkEmailReadRoundedIcon fontSize="large" className={"email-icon"}/>,
        2: <AssignmentRoundedIcon fontSize="large" className={"email-icon"}/>,
        3: <VpnKeyRoundedIcon fontSize="large" className={"email-icon"}/>,
    }

    return (
        <StepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </StepIconRoot>
    );
}

StepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['EMAIL', 'PERSONAL INFORMATION', 'PASSWORD'];

export default function RegistrationPage() {
    const [activeState, setActiveState] = useState(0);
    const maxSteps = 2;
    const minSteps = 1;

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [emailConfirmError, setConfirmEmailError] = useState();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [residentialAddress, setResidentialAddress] = useState('');
    const sexes = ['Male', 'Female', 'Other'];
    const [sex, setSex] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: email,
            confirmEmail: confirmEmail,
            firstName: firstName,
            lastName: lastName,
            residentialAddress: residentialAddress,
            sex: sex,
            password: password,
            confirmPassword: confirmPassword
        },
        validationSchema: userRegistrationSchema,
        validateOnBlur: true
    });

    const handleEmailChange = (event) => {
        formik.handleChange(event);
        setEmail(event.target.value);
    }

    const handleConfirmEmailChange = (event) => {
        formik.handleChange(event);
        setConfirmEmail(event.target.value);
    }

    const handleFirstNameChange = (event) => {
        formik.handleChange(event);
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        formik.handleChange(event);
        setLastName(event.target.value);
    }

    const handleResidentialAddressChange = (event) => {
        formik.handleChange(event);
        setResidentialAddress(event.target.value);
    }

    const handleSexChange = (event) => {
        formik.handleChange(event);
        setSex(event.target.value);
    }

    const handleEmailsEquals = () => {
        if(email !== confirmEmail){
            setConfirmEmailError("Emails should be equals");
            return false;
        }
        setConfirmEmailError(null);
        return true;
    }

    const checkIsNotNull = (object) => {
            return !!object;
    }

    const handlePasswordsEquals = () => {
        if(password !== confirmPassword){
            setConfirmPasswordError("Password should be equals");
            return false;
        }
        setConfirmPasswordError(null);
        return true;
    }

    const handlePasswordChange = (event) => {
        formik.handleChange(event);
        setPassword(event.target.value);
    }

    const handleConfirmPasswordChange = (event) => {
        formik.handleChange(event)
        setConfirmPassword(event.target.value);
    }



    const getAppropriateStep = (step) => {
        switch (step) {
            case 0:
                return (
                 <>
                    <TextField
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Email"
                        variant="outlined" />
                    <TextField
                        name="confirmEmail"
                        type = "email"
                        value={confirmEmail}
                        onChange={handleConfirmEmailChange}
                        onBlur={handleEmailsEquals}
                        className="inputs"
                        label="Confirm email"
                        variant="outlined" />
                     {emailConfirmError ? <Alert severity="error">{emailConfirmError}</Alert> : null}
                </>)

            case 1: return (
                <>
                    <TextField
                        name="firstName"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="First name"
                        variant="outlined" />
                    <TextField
                        name="lastName"
                        value={lastName}
                        onChange={handleLastNameChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Last name"
                        variant="outlined" />
                    <TextField
                        name="residentialAddress"
                        value={residentialAddress}
                        onChange={handleResidentialAddressChange}
                        error={formik.touched.residentialAddress && Boolean(formik.errors.residentialAddress)}
                        helperText={formik.touched.residentialAddress && formik.errors.residentialAddress}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Residential address"
                        variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel id="sex-select-label">Sex</InputLabel>
                        <Select
                            labelId="sex-select-label"
                            id="sex-select-label"
                            helperText="Sex"
                            name="sex"
                            variant="outlined"
                            value={sex}
                            label="Sex"
                            onChange={handleSexChange}
                        >

                            {
                                sexes.map(sex => <MenuItem id={sex} value={sex}>{sex}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </>

            );
            case 2: return (
                <>
                    <TextField
                        name="password"
                        value={password}
                        type="password"
                        onChange={handlePasswordChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        onBlur={formik.handleBlur}
                        className="inputs"
                        label="Password"
                        variant="outlined" />
                    <TextField
                        name="confirmPassword"
                        type = "password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        onBlur={handlePasswordsEquals}
                        className="inputs"
                        label="Confirm password"
                        variant="outlined" />
                    {confirmPasswordError ? <Alert severity="error">{confirmPasswordError}</Alert> : null}
                </>);
        }
    }

    const handleNext = () => {
        if(activeState < maxSteps) {
            switch (activeState) {
                case 0: {
                    if(!handleEmailsEquals()) {
                        return;
                    }
                    if(checkIsNotNull(email)
                        && !Boolean(formik.errors.email)
                        && !emailConfirmError) {
                        setActiveState(activeState + 1);
                        return;
                    }
                    return;
                }
                case 1: {
                    formik.submitForm();
                    if(checkIsNotNull(firstName)
                        && checkIsNotNull(lastName)
                        && checkIsNotNull(residentialAddress)
                        && !Boolean(formik.errors.firstName)
                        && !Boolean(formik.errors.lastName)
                        && !Boolean(formik.errors.resedentialAdress)
                        && !Boolean(formik.errors.sex)){
                        setActiveState(activeState + 1);
                        return;
                    }
                }
            }

        }
    }

    const handlePrev = () => {
        if(activeState >= minSteps) {
            setActiveState(activeState - 1);
        }
    }

    return (
        <>
            <Box sx={{ width: '80%', m: "5rem auto" }} spacing={4}>
                <Paper sx={{padding: '2rem', display: "flex", flexDirection: "column"}} elevation={12} >
                    <Stepper alternativeLabel activeStep={activeState} connector={<Connector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        <Box sx={{width : '80%', m : "2rem auto", flexDirection: "column"}}>
                            <Paper sx={{width : '80%', padding: '1rem', m : "0.5rem auto", display: "flex", flexDirection: "column"}} elevation={1} >
                                {getAppropriateStep(activeState)}
                                <Box sx={{display:"flex", flexDirection:"row", justifyContent: "flex-end", mt: "1rem"}}>
                                    {activeState === 0 ?
                                        null :
                                        <Button
                                        className="reg-button"
                                        sx={{mr:"0.6rem"}}
                                        variant="contained"
                                        onClick={handlePrev}
                                        startIcon={<ArrowBackIosIcon />}
                                        >
                                            Prev
                                        </Button>}
                                    {activeState === 2 ?
                                        <Button className="reg-button" variant="contained" endIcon={<SendIcon />}>
                                            Send
                                        </Button> :
                                        <Button
                                            className="reg-button"
                                            variant="contained"
                                            onClick={handleNext}
                                            endIcon={<ArrowForwardIosIcon />}
                                        >
                                            Next
                                        </Button>}

                                </Box>

                            </Paper>
                        </Box>
                    </Paper>
            </Box>
        </>
    );
}
