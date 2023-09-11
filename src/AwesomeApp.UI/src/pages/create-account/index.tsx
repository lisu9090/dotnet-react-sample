"use client"

import { useState } from "react";
import { PageBox } from "@/components/page-box";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { CustomerType } from "@/types/models";
import Link from "next/link";

type CreateAccountForm = {
  email: string;
  password: string;
  passwordRepeated: string;
  fullName: string;
  dateOfBirth: string;
  vechiclesNumber: string;
  customerType: CustomerType;
}

const initialFormValue: CreateAccountForm = {
  email: '',
  password: '',
  passwordRepeated: '',
  fullName: '',
  dateOfBirth: '',
  vechiclesNumber: '',
  customerType: CustomerType.private
}

type FormValidation = {
  isValid: boolean;
  fieldErrors: { [fieldName: string]: string }
}

const initialFormValidation: FormValidation = {
  isValid: false,
  fieldErrors: {
    email: '',
    password: '',
    passwordRepeated: '',
    fullName: '',
    dateOfBirth: '',
    vechiclesNumber: '',
    customerType: ''
  }
}

export default function CreateAccount(): React.ReactElement {
  const [formValue, setFormValue] = useState<CreateAccountForm>(initialFormValue)
  const [formValidation, setFormValidation] = useState<FormValidation>(initialFormValidation)

  const createPropertyChangeHandler = (formField: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidation(validateFormField(formField, event.target.value, formValidation))
    setFormValue({
      ...formValue,
      [formField]: event.target.value
    })
  }

  const submitForm = () => {
    console.log(formValue)
  }

  return (
    <PageBox>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h5">Create Account</Typography>
        </Grid>
        <Grid 
          item 
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
        >
          <TextField 
            required
            className="mb-2"
            type="email"
            label="Email" 
            placeholder="you@inbox.com"
            variant="standard"
            value={formValue.email}
            error={!!formValidation.fieldErrors.email}
            onChange={createPropertyChangeHandler("email")}
          />
          <TextField 
            required
            className="mb-2"
            type="password"
            label="Password" 
            variant="standard"
            value={formValue.password}
            onChange={createPropertyChangeHandler("password")}
          />
          <TextField 
            required
            className="mb-2"
            type="password"
            label="Repeat password" 
            variant="standard"
            value={formValue.passwordRepeated}
            onChange={createPropertyChangeHandler("passwordRepeated")}
          />
          <TextField 
            required
            className="mb-2"
            type="text"
            label="Full name" 
            placeholder="Jane Doe"
            variant="standard"
            value={formValue.fullName}
            onChange={createPropertyChangeHandler("fullName")}
          />
          <TextField 
            required
            className="mb-2"
            type="date"
            label="Date of birth" 
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={formValue.dateOfBirth}
            onChange={createPropertyChangeHandler("dateOfBirth")}
          />
          <TextField 
            required
            className="mb-2"
            type="number"
            label="Number of owned vechicles" 
            placeholder="1"
            variant="standard"
            value={formValue.vechiclesNumber}
            onChange={createPropertyChangeHandler("vechiclesNumber")}
          />
          <FormControl>
            <FormLabel id="customer-type">Customer type</FormLabel>
            <RadioGroup
              row
              name="customer-type-radio"
              value={formValue.customerType}
              onChange={createPropertyChangeHandler("customerType")}
            >
              <FormControlLabel value={CustomerType.private} control={<Radio />} label="Private" />
              <FormControlLabel value={CustomerType.company} control={<Radio />} label="Company" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          justifyContent="end"
        >
          <Link className="mr-2" href="/">
            <Button color="warning">Go Back</Button>
          </Link>
          <Button disabled={!formValidation.isValid} onClick={submitForm}>Submit</Button>
        </Grid>
      </Grid>
    </PageBox>
  )
}

function validateFormField(fieldName: string, fieldValue: string, formValidation: FormValidation): FormValidation {
  const notEmptyValidator = (message: string) => (value: string) => value?.trim().length === 0 ? message : ''

  const formValidators = {
    email: [
      notEmptyValidator('Value cannot be empty')
    ]
  } as { [name: string]: ((value: string) => string)[] }
  
  const fieldErrors = {
    ...formValidation.fieldErrors,
    [fieldName]: formValidators[fieldName]
      .map(validator => validator(fieldValue))
      .filter(errorMessage => errorMessage)
      [0] ?? ''
  }

  return {
    isValid: !Object.keys(fieldErrors).some(fieldName => Boolean(fieldErrors[fieldName])),
    fieldErrors: fieldErrors
  }
}