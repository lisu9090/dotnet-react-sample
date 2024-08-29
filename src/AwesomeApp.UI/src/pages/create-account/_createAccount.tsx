import { ReactElement } from 'react'
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import Link from 'next/link'
import {
  FormValidators,
  SimpleFormValidation,
  emailValidator,
  minLengthValidator,
  requiredValidator,
  positiveValueValidator,
  strongPasswordValidator,
  useSimpleFormValidation,
  createAccount,
  fieldEqualityValidator,
  loginUser,
} from '@/frontend/libs'
import { CreateAccount } from '@/common/types/account/CreateAccount'
import { useRouter } from 'next/router'
import { AuthenticateAccount, CustomerType } from '@/common/types/account'
import { PAGE_ACCOUNT, PAGE_HOME } from '@/common/consts'
import { getCsrfToken } from 'next-auth/react'
import { useCallWithErrorHandling, useSendWithErrorHandling } from '@/frontend/hooks'
import { AppPage, AppPageTitle } from '@/frontend/views'

type CreateAccountForm = {
  email: string;
  password: string;
  passwordRepeated: string;
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: string;
  customerType: string;
}

const initialFormValue: CreateAccountForm = {
  email: '',
  password: '',
  passwordRepeated: '',
  fullName: '',
  dateOfBirth: '',
  vehiclesNumber: '',
  customerType: CustomerType.Private.toString()
}

const initialFormValidation: SimpleFormValidation = {
  isValid: false,
  fieldErrors: {
    email: null,
    password: null,
    passwordRepeated: null,
    fullName: null,
    dateOfBirth: null,
    vehiclesNumber: null,
  }
}

const formValidators: FormValidators = {
  email: [requiredValidator(), emailValidator()],
  password: [requiredValidator(), strongPasswordValidator()],
  passwordRepeated: [requiredValidator(), fieldEqualityValidator('password', 'Password does not match')],
  fullName: [requiredValidator(), minLengthValidator()],
  dateOfBirth: [requiredValidator()],
  vehiclesNumber: [requiredValidator(), positiveValueValidator()]
}

const toCreateAccount = (formValue: CreateAccountForm) => ({
  email: formValue.email,
  password: formValue.password,
  fullName: formValue.fullName,
  dateOfBirth: new Date(formValue.dateOfBirth).toISOString(),
  vehiclesNumber: Number.parseInt(formValue.vehiclesNumber),
  customerType: Number.parseInt(formValue.customerType) as CustomerType
} as CreateAccount)

const useCreateAccountWithErrorHandling = () => useSendWithErrorHandling(createAccount)

const useLoginUserWithErrorHandling = () => useCallWithErrorHandling(loginUser)

/**
 * Create Account Page Component
 * @returns Page Component
 */
export default function CreateAccountPage(): ReactElement {
  const router = useRouter()
  const tryCreateAccount = useCreateAccountWithErrorHandling()
  const tryLoginUser = useLoginUserWithErrorHandling()

  const {
    formValue,
    formValidation,
    setFormValue,
    validateFormField
  } = useSimpleFormValidation(initialFormValue, initialFormValidation, formValidators)

  const createBlurHandler = (fieldName: string, fieldValue: string) =>
    () => validateFormField(fieldName, fieldValue)

  const createFormFieldChangeHandler = (formField: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      validateFormField(formField, event.target.value)
      setFormValue({ ...formValue, [formField]: event.target.value })
    }

  const login = async (authenticateAccount: AuthenticateAccount) => {
    const authCsrfToken = await getCsrfToken()
    const result = await tryLoginUser(authenticateAccount, authCsrfToken)

    if (!result) {
      return
    }

    router.replace(PAGE_ACCOUNT)
  }

  const createAccontAndLogin = async () => {
    if (!formValidation.isValid) {
      return
    }

    const createAccountEntry = toCreateAccount(formValue)
    const accountId = await tryCreateAccount(toCreateAccount(formValue))

    if (!accountId) {
      return
    }

    await login({
      email: createAccountEntry.email,
      password: createAccountEntry.password,
    })
  }

  return (
    <AppPage>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <AppPageTitle>Create account</AppPageTitle>
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
        </Grid>
        <Grid
          item
          container
          justifyContent="space-between"
        >
          <Grid item xs={4}>
            <Link href={PAGE_HOME}>
              <Button
                className="w-full"
                variant="outlined"
                color="secondary"
              >
                Return to home
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Button
              className="w-full"
              variant="outlined"
              disabled={!formValidation.isValid}
              onClick={createAccontAndLogin}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </AppPage>
  )
}
