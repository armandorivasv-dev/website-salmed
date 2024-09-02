import { useState, useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  useMediaQuery,
  Button,
  TextField,
  Stack,
  IconButton,
  Checkbox,
  FormControlLabel,
  Input,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
const dataValidate = [
  {
    id: 0,
    operation: '1 + 2',
    result: '3',
  },
  {
    id: 1,
    operation: '2 + 3',
    result: '5',
  },
  {
    id: 2,
    operation: '1 + 4',
    result: '5',
  },
  {
    id: 3,
    operation: '3 + 1',
    result: '4',
  },
  {
    id: 4,
    operation: '5 + 1',
    result: '6',
  },
  {
    id: 5,
    operation: '1 + 1',
    result: '2',
  },
];

export const ContactForm = (props) => {
  const { open, handleClose } = props;
  const [submitState, setSubmitState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [randomOperation, setRandomOperation] = useState('');
  const [validateOperation, setValidateOperation] = useState(false);
  const [resultOperation, setResultOperation] = useState('');

  const getRandomOperation = () => {
    const randomIndex = Math.floor(Math.random() * dataValidate.length);
    setRandomOperation(dataValidate[randomIndex]);
  };
  useEffect(() => {
    getRandomOperation();
    setChecked(false);
    setValidateOperation(true);
  }, [open]);

  const handleChangeCheckbox = (event) => {
    setChecked(event.target.checked);
    getRandomOperation();
    setValidateOperation(true);
    setResultOperation('');
  };

  const handleValidateOperation = (event) => {
    setResultOperation(event.target.value);
    if (event.target.value === randomOperation.result) {
      setValidateOperation(true);
    } else {
      setValidateOperation(false);
    }
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: 'primary.light',
            width: '80%',
          },
        }}
      >
        <Typography
          variant='h5'
          color='white'
          sx={{ m: 0, p: 2 }}
        >
          Formulario de Contacto
        </Typography>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 12,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        {submitState ? (
          <DialogContent dividers>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
                pb: 5,
              }}
            >
              <Box
                sx={{
                  py: 2,
                }}
              />
              <Typography
                variant='h5'
                textAlign='center'
                sx={{ textTransform: 'uppercase' }}
              >
                Formulario enviado con éxito
              </Typography>
              <Typography
                variant='subtitle1'
                textAlign='center'
                sx={{ mt: 2 }}
              >
                Hemos recibido su mensaje con éxito, nuestro equipo revisará sus datos para ser contactado.
              </Typography>
            </Box>
          </DialogContent>
        ) : (
          <DialogContent dividers>
            <Formik
              initialValues={{
                fullname: '',
                email: '',
                phone: '',
                message: '',
              }}
              validationSchema={Yup.object({
                fullname: Yup.string().max(255).required('Requerido'),
                email: Yup.string().max(255).email().required('Requerido'),
                phone: Yup.string().max(255),
                message: Yup.string().max(500),
              })}
              onSubmit={async (values, helpers) => {
                try {
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  });

                  if (response.ok) {
                    setSubmitState(true);
                    helpers.setStatus({ success: true });
                    helpers.setSubmitting(false);
                  } else {
                    throw new Error('Error sending email');
                  }
                } catch (err) {
                  console.error(err);
                  helpers.setStatus({ success: false });
                  helpers.setErrors({ submit: err.message });
                  helpers.setSubmitting(false);
                }
              }}
            >
              {({
                resetForm,
                handleChange,
                handleSubmit,
                handleReset,
                handleBlur,
                setFieldValue,
                values,
                field,
                touched,
                errors,
                isValid,
                isSubmitting,
              }) => (
                <Form>
                  <Stack
                    direction='column'
                    spacing={2}
                    sx={{ overflowY: 'auto' }}
                  >
                    <Box></Box>
                    <TextField
                      id='fullname'
                      name='fullname'
                      label='Nombre y Apellido'
                      variant='outlined'
                      size='small'
                      error={Boolean(touched.fullname && errors.fullname)}
                      fullWidth
                      helperText={touched.fullname && errors.fullname}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fullname}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        marginTop: '50px',
                      }}
                    />

                    <TextField
                      id='email'
                      name='email'
                      label='Email'
                      variant='outlined'
                      size='small'
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                      }}
                    />

                    <TextField
                      id='phone'
                      name='phone'
                      label='Teléfono'
                      variant='outlined'
                      size='small'
                      error={Boolean(touched.phone && errors.phone)}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                      }}
                    />

                    <TextField
                      id='message'
                      name='message'
                      label='Mensaje'
                      variant='outlined'
                      size='small'
                      error={Boolean(touched.message && errors.message)}
                      fullWidth
                      helperText={touched.message && errors.message}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.message}
                      multiline
                      rows={8}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px',
                      }}
                    />
                  </Stack>
                  <FormControlLabel
                    //required
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={handleChangeCheckbox}
                      />
                    }
                    label='Acepto la política de privacidad'
                  />

                  {checked && (
                    <Stack
                      direction='row'
                      justifyContent='flex-start'
                      alignItems='center'
                      spacing={2}
                      sx={{ pt: 2 }}
                    >
                      <Typography
                        variant='subtitle1'
                        textAlign='center'
                        sx={{ mt: 2 }}
                      >
                        Resuelva:
                      </Typography>

                      <Typography
                        variant='h6'
                        textAlign='center'
                        sx={{ mt: 2 }}
                      >
                        {randomOperation.operation}
                      </Typography>

                      <Box sx={{ '& .MuiTextField-root': { width: '5ch' } }}>
                        <TextField
                          id='operation'
                          name='operation'
                          variant='outlined'
                          type='number'
                          onChange={handleValidateOperation}
                          sx={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            overflow: 'hidden',
                          }}
                        />
                      </Box>
                      {resultOperation === randomOperation.result && (
                        <CheckIcon sx={{ color: 'green', fontSize: '30px' }} />
                      )}

                      {validateOperation === false && <ClearIcon sx={{ color: 'red', fontSize: '30px' }} />}
                    </Stack>
                  )}

                  <Stack
                    direction='row'
                    justifyContent='center'
                    spacing={2}
                    sx={{ pt: 4, pb: 5 }}
                  >
                    <Button
                      variant='contained'
                      size='large'
                      onClick={handleSubmit}
                      color='primary'
                      disabled={!checked || resultOperation !== randomOperation.result}
                    >
                      ENVIAR
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};
