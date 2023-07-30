import { useState } from "react";
import { Box, useTheme, useMediaQuery, TextField, Typography } from "@mui/material";
import  EditOutlinedIcon  from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";


const registerSchemea = yup.object().shape({
    firstName:yup.string().required("required"),
    lastName:yup.string().required("required"),
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required"),
    location:yup.string().required("required"),
    occuption:yup.string().required("required"),
    picture:yup.string().required("required"),
})

const loginSchema= yup.object().shape({
    email:yup.string().email("invalid email").required("required"),
    password:yup.string().required("required")
})

const initialValuesRegister={
    firstName:'',
    lastName:'',
    email:"",
    password:'',
    location:'',
    occuption:'',
    picture:''
}
const initialValuesLogin={
    email:'',
    password:'',
}

const Form=()=>{
    const [pageType, setPageType]= useState("login");
    const {palette}= useTheme()
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const isNonMobile= useMediaQuery("(min-width:600px)");
    const isLogin= pageType === "login";
    const isRegister= pageType ==="register";

    const handleFormSubmit = async(value,onSubmitProps)=>{};

    return(
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchemea}

        >
        {({
            values, 
            error,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
        })=>(
            <form onSubmit={handleSubmit}>
            <Box
            display="grid"
            gap='30px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{
                '&> div':{ gridCloumn: isNonMobile ? undefined : "span 4"},

            }} 
            >
            {isRegister && (
                <>
                <TextField 
                    lable='First Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name='firstName'
                    error={Boolean(touched.firstName) && Boolean(error.firstName)}
                    helperText={touched.firstName && error.firstName}
                    sx={{gridColumn:'span 2'}}

                    />

                <TextField 
                    lable='Last Name'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name='lastName'
                    error={Boolean(touched.lastName) && Boolean(error.lastName)}
                    helperText={touched.lastName && error.lastName}
                    sx={{gridColumn:'span 2'}}

                    />

                <TextField 
                    lable='Location'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name='location'
                    error={Boolean(touched.location) && Boolean(error.location)}
                    helperText={touched.location && error.location}
                    sx={{gridColumn:'span 4'}}

                    />

                <TextField 
                    lable='Occupation'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name='occupation'
                    error={Boolean(touched.occupation) && Boolean(error.occupation)}
                    helperText={touched.occupation && error.occupation}
                    sx={{gridColumn:'span 4'}}

                    />

                    <Box
                    gridColumn='span 4'
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius='5px'
                    p='1rem'
                    >
                    <Dropzone
                    onDropAccepted='.jpg,.jpeg,.png'
                    multiple={false}
                    onDrop={(acceptedFiles)=>
                    setFieldValue('picture', acceptedFiles[0])
                    }
                    >
                    {({getRootProps, getInputProps})=>(
                        <Box 
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p='1rem'
                        sx={{
                            "&:hover" :{cursor:"pointer"}
                        }}
                        >

                        <input {...getInputProps()}/>
                        {!values.picture ? (
                            <p>Add Picture Here</p>
                        ) : (
                            <FlexBetween>
                                <Typography>
                                    {values.picture.name}
                                </Typography>
                                <EditOutlinedIcon/>
                            </FlexBetween>           
                           )}
                        </Box>
                       )}
                    </Dropzone>
                  </Box>     
                 </>
                )}
   


             </Box>
          </form>
        )}
     </Formik>
    )}

export default Form;
