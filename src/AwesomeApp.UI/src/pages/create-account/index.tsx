import { ReactElement } from "react";
import { PageBox } from "@/frontend/components";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import Link from "next/link";
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
} from "@/frontend/libs";
import { CreateAccount } from "@/shared/types/account/CreateAccount";
import { useRouter } from "next/router";
import { CustomerType } from "@/shared/types";
import { useFetchWithErrorHandling } from "@/pages/_hooks";

const redirecUrl = '/login'

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

const formValidators: FormValidators = {
  email: [requiredValidator(), emailValidator()],
  password: [requiredValidator(), strongPasswordValidator()],
  passwordRepeated: [requiredValidator(), fieldEqualityValidator('password', 'Password does not match')],
  fullName: [requiredValidator(), minLengthValidator()],
  dateOfBirth: [requiredValidator()],
  vechiclesNumber: [requiredValidator(), positiveValueValidator()]
}

function toCreateAccountEntry(formValue: CreateAccountForm): CreateAccount {
  return {
    email: formValue.email,
    password: formValue.password,
    fullName: formValue.fullName,
    dateOfBirth: new Date(formValue.dateOfBirth),
    vechiclesNumber: Number.parseInt(formValue.vechiclesNumber),
    customerType: formValue.customerType
  }
}

function useCreateAccount() {
  return useFetchWithErrorHandling(createAccount)
}

export default function CreateAccountComponent(): ReactElement {
  const router = useRouter()
  const createAccount = useCreateAccount()

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

  const submitForm = async () => {
    if (!formValidation.isValid) {
      return
    }

    const accountId = await createAccount(toCreateAccountEntry(formValue))

    if (accountId) {
      router.push(redirecUrl)
    }
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
            <Button 
              variant="outlined" 
              color="warning"
            >
              Return to home
            </Button>
          </Link>
          <Button 
            variant="outlined" 
            disabled={!formValidation.isValid} 
            onClick={submitForm}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </PageBox>
  )
}
