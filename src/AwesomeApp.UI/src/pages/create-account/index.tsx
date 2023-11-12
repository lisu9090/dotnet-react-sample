import { useCallback, useEffect, useMemo, useState } from "react";
import { PageBox } from "@/frontend/components";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { 
  FormValidators, 
  SimpleFormValidation, 
  ValidatorFn, 
  emailValidator, 
  minLengthValidator, 
  requiredValidator, 
  positiveValueValidator, 
  strongPasswordValidator, 
  useSimpleFormValidation,
  apiService, 
} from "@/frontend/libs";
import { CreateAccountDto } from "@/shared/dtos/CreateAccountDto";
import { useRouter } from "next/router";
import { CustomerType } from "@/shared/types";

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

const initialFormValidation: SimpleFormValidation = {
  isValid: false,
  fieldErrors: {
    email: null,
    password: null,
    passwordRepeated: null,
    fullName: null,
    dateOfBirth: null,
    vechiclesNumber: null,
  }
}

function toCreateAccountDto(formValue: CreateAccountForm): CreateAccountDto {
  return {
    email: formValue.email,
    password: formValue.password,
    fullName: formValue.fullName,
    dateOfBirth: new Date(formValue.dateOfBirth),
    vechiclesNumber: Number.parseInt(formValue.vechiclesNumber),
    customerType: formValue.customerType
  }
}

export default function CreateAccount(): React.ReactElement {
  const router = useRouter()
  
  const [formValue, setFormValue] = useState<CreateAccountForm>(initialFormValue)

  const repeatPasswordValidator = useCallback<ValidatorFn>(
    (value: string) => value === formValue.password ? '' : 'Password does not match',
    [formValue.password]
  ) 

  const formValidators = useMemo<FormValidators>(
    () => ({
      email: [requiredValidator(), emailValidator()],
      password: [requiredValidator(), strongPasswordValidator()],
      passwordRepeated: [requiredValidator(), repeatPasswordValidator],
      fullName: [requiredValidator(), minLengthValidator()],
      dateOfBirth: [requiredValidator()],
      vechiclesNumber: [requiredValidator(), positiveValueValidator()]
    }),
    [repeatPasswordValidator]
  )

  const { 
    formValidation, 
    validateFormField, 
    setFormValidators 
  } = useSimpleFormValidation(initialFormValidation, formValidators)

  const createBlurHandler = (fieldName: string, fieldValue: string) => 
    () => validateFormField(fieldName, fieldValue)

  const createFormFieldChangeHandler = (formField: string) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      validateFormField(formField, event.target.value)
      setFormValue({ ...formValue, [formField]: event.target.value })
    }

  const submitForm = async () => {
    if (!formValidation.isValid) {
      return
    }

    const accountId = await apiService.createAccount(toCreateAccountDto(formValue))

    if (accountId) {
      router.push('/log-in')
    } else {
      window.alert('Error while create account')
    }
  }

  useEffect(() => setFormValidators(formValidators), [setFormValidators, formValidators])

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
            helperText={formValidation.fieldErrors.email}
            onBlur={createBlurHandler("email", formValue.email)}
            onChange={createFormFieldChangeHandler("email")}
          />
          <TextField 
            required
            className="mb-2"
            type="password"
            label="Password" 
            variant="standard"
            value={formValue.password}
            error={!!formValidation.fieldErrors.password}
            helperText={formValidation.fieldErrors.password}
            onBlur={createBlurHandler("password", formValue.password)}
            onChange={createFormFieldChangeHandler("password")}
          />
          <TextField 
            required
            className="mb-2"
            type="password"
            label="Repeat password" 
            variant="standard"
            value={formValue.passwordRepeated}
            error={!!formValidation.fieldErrors.passwordRepeated}
            helperText={formValidation.fieldErrors.passwordRepeated}
            onBlur={createBlurHandler("passwordRepeated", formValue.passwordRepeated)}
            onChange={createFormFieldChangeHandler("passwordRepeated")}
          />
          <TextField 
            required
            className="mb-2"
            type="text"
            label="Full name" 
            placeholder="Jane Doe"
            variant="standard"
            value={formValue.fullName}
            error={!!formValidation.fieldErrors.fullName}
            helperText={formValidation.fieldErrors.fullName}
            onBlur={createBlurHandler("fullName", formValue.fullName)}
            onChange={createFormFieldChangeHandler("fullName")}
          />
          <TextField 
            required
            className="mb-2"
            type="date"
            label="Date of birth" 
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={formValue.dateOfBirth}
            error={!!formValidation.fieldErrors.dateOfBirth}
            helperText={formValidation.fieldErrors.dateOfBirth}
            onBlur={createBlurHandler("dateOfBirth", formValue.dateOfBirth)}
            onChange={createFormFieldChangeHandler("dateOfBirth")}
          />
          <TextField 
            required
            className="mb-2"
            type="number"
            label="Number of owned vechicles" 
            placeholder="1"
            variant="standard"
            value={formValue.vechiclesNumber}
            error={!!formValidation.fieldErrors.vechiclesNumber}
            helperText={formValidation.fieldErrors.vechiclesNumber}
            onBlur={createBlurHandler("vechiclesNumber", formValue.vechiclesNumber)}
            onChange={createFormFieldChangeHandler("vechiclesNumber")}
          />
          <FormControl>
            <FormLabel id="customer-type">Customer type</FormLabel>
            <RadioGroup
              row
              name="customer-type-radio"
              value={formValue.customerType}
              onChange={createFormFieldChangeHandler("customerType")}
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
