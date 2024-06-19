import { PAGE_ACCOUNT } from "@/common/consts"
import { Account, CustomerType, AccountRole } from "@/common/types/account"
import { PageBox } from "@/frontend/components"
import { FormValidators, SimpleFormValidation, emailValidator, minLengthValidator, positiveValueValidator, requiredValidator, strongPasswordValidator, useSimpleFormValidation } from "@/frontend/libs"
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

type Props = {
  account: Account
}

type UpdateAccountForm = {
  email: string;
  password: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: string;
  customerType: string;
  accountRole: string;
}

const initialFormValidation: SimpleFormValidation = {
  isValid: true,
  fieldErrors: {
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    vehiclesNumber: '',
  }
}

const formValidators: FormValidators = {
  email: [requiredValidator(), emailValidator()],
  password: [],
  fullName: [requiredValidator(), minLengthValidator()],
  dateOfBirth: [requiredValidator()],
  vehiclesNumber: [requiredValidator(), positiveValueValidator()]
}

const getIsoDateSubstring = (isoDateTimeString: string) => isoDateTimeString.substring(0, 'yyyy-MM-dd'.length)

export default function EditAccountPage({ account }: Readonly<Props>) {
  const [ initialFormValue ] = useState<UpdateAccountForm>({
    email: account.email,
    password: '',
    fullName: account.fullName,
    dateOfBirth: getIsoDateSubstring(account.dateOfBirth),
    vehiclesNumber: account.vehiclesNumber.toString(),
    customerType: account.customerType.toString(),
    accountRole: account.accountRole.toString(),
  })

  const {
    formValue,
    formValidation,
    setFormValue,
    validateFormField
  } = useSimpleFormValidation(
    initialFormValue, 
    initialFormValidation, 
    formValidators
  )

  const createBlurHandler = (fieldName: string, fieldValue: string) =>
    () => validateFormField(fieldName, fieldValue)

  const createFormFieldChangeHandler = (formField: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      validateFormField(formField, event.target.value)
      setFormValue({ ...formValue, [formField]: event.target.value })
    }

  const updateAccont = () => { }
  
  return (
    <PageBox>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Typography variant="h5">Edit Account</Typography>
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
            value={formValue.vehiclesNumber}
            error={!!formValidation.fieldErrors.vehiclesNumber}
            helperText={formValidation.fieldErrors.vehiclesNumber}
            onBlur={createBlurHandler("vehiclesNumber", formValue.vehiclesNumber)}
            onChange={createFormFieldChangeHandler("vehiclesNumber")}
          />
          <FormControl>
            <FormLabel id="customer-type">Customer type</FormLabel>
            <RadioGroup
              row
              name="customer-type-radio"
              value={formValue.customerType}
              onChange={createFormFieldChangeHandler("customerType")}
            >
              <FormControlLabel value={CustomerType.Private} control={<Radio />} label="Private" />
              <FormControlLabel value={CustomerType.Company} control={<Radio />} label="Company" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="account-role">Account role</FormLabel>
            <RadioGroup
              row
              name="account-role-radio"
              value={formValue.accountRole}
              onChange={createFormFieldChangeHandler("accountRole")}
            >
              <FormControlLabel value={AccountRole.User} control={<Radio />} label="User" />
              <FormControlLabel value={AccountRole.Admin} control={<Radio />} label="Admin" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <Link href={PAGE_ACCOUNT}>
              <Button
                className="w-full"
                variant="outlined"
                color="secondary"
              >
                Cancel
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Button
              className="w-full"
              variant="outlined"
              disabled={!formValidation.isValid}
              onClick={updateAccont}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageBox>
  )
}