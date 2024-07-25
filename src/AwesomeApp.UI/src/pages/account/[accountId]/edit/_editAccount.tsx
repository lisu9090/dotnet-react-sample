import { DATETIME_ISO_DATE_FORMAT } from '@/common/consts'
import { CsrfToken } from '@/common/types'
import { Account, CustomerType, AccountRole, PutUpdateAccount } from '@/common/types/account'
import { useAppSnackbar, useSendWithErrorHandling } from '@/frontend/hooks'
import { FormValidators, SimpleFormValidation, emailValidator, minLengthValidator, positiveValueValidator, putUpdateAccount, requiredValidator, strongPasswordValidator, useSimpleFormValidation } from '@/frontend/libs'
import { AppPage, AppPageTitle } from '@/frontend/views'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

type Props = {
  account: Account;
  accountToEdit: Account | null;
} & CsrfToken

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
  password: [strongPasswordValidator()],
  fullName: [requiredValidator(), minLengthValidator()],
  dateOfBirth: [requiredValidator()],
  vehiclesNumber: [requiredValidator(), positiveValueValidator()]
}

const getIsoDateSubstring = (isoDateTimeString: string) => isoDateTimeString.substring(0, DATETIME_ISO_DATE_FORMAT.length)

const mapAccountToForm = (account: Account | null) => (account ? {
  email: account.email,
  password: '',
  fullName: account.fullName,
  dateOfBirth: getIsoDateSubstring(account.dateOfBirth),
  vehiclesNumber: account.vehiclesNumber.toString(),
  customerType: account.customerType.toString(),
  accountRole: account.accountRole.toString(),
} as UpdateAccountForm : {
  email: '',
  password: '',
  fullName: '',
  dateOfBirth: '',
  vehiclesNumber: '',
  customerType: '',
  accountRole: '',
} as UpdateAccountForm)

const mapFormToPutUpdateAccount = (accontId: number, formValue: UpdateAccountForm) => ({
  id: accontId,
  email: formValue.email,
  password: formValue.password || undefined,
  fullName: formValue.fullName,
  dateOfBirth: formValue.dateOfBirth,
  vehiclesNumber: Number.parseInt(formValue.vehiclesNumber),
  customerType: Number.parseInt(formValue.customerType) as CustomerType,
  accountRole: Number.parseInt(formValue.accountRole) as AccountRole,
} as PutUpdateAccount)

const useUpdateWithErrorHandling = () => useSendWithErrorHandling(putUpdateAccount)

export default function EditAccountPage({ account, accountToEdit, csrfToken }: Readonly<Props>) {
  const router = useRouter()
  const tryUpdateAccount = useUpdateWithErrorHandling()
  const { success } = useAppSnackbar()

  const [ initialFormValue, setInitialFormValue ] = useState<UpdateAccountForm>(mapAccountToForm(accountToEdit))

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

  const formHasChanged = () => JSON.stringify(initialFormValue) !== JSON.stringify(formValue)

  const updateAccont = async () => {
    const accountId = Number.parseInt(router.query.accountId as string)

    if (!formValidation.isValid || !formHasChanged() || !accountId) {
      return
    }

    const updatedAccount = await tryUpdateAccount(mapFormToPutUpdateAccount(accountId, formValue), csrfToken)

    if (!updatedAccount) {
      return
    }

    const updatedFormValue = mapAccountToForm(updatedAccount)
    
    setInitialFormValue(updatedFormValue)
    setFormValue(updatedFormValue)
    success('Saved')
  }
  
  return (
    <AppPage account={account}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <AppPageTitle>Edit account (Admin)</AppPageTitle>
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
            <Button
              className="w-full"
              variant="outlined"
              color="secondary"
              onClick={router.back}
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              className="w-full"
              variant="outlined"
              disabled={!formValidation.isValid || !formHasChanged()}
              onClick={updateAccont}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </AppPage>
  )
}