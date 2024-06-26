import { DATETIME_ISO_DATE_FORMAT, PAGE_ACCOUNT } from "@/common/consts"
import { Account, CustomerType, PatchUpdateAccount } from "@/common/types/account"
import { PageBox } from "@/frontend/components"
import { FormValidators, SimpleFormValidation, minLengthValidator, patchUpdateAccount, positiveValueValidator, useSimpleFormValidation } from "@/frontend/libs"
import { useFetchWithErrorHandling, useSnackbar } from "@/pages/_hooks"
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

type Props = {
  account: Account
}

type UpdateAccountForm = {
  fullName: string;
  dateOfBirth: string;
  vehiclesNumber: string;
  customerType: string;
}

const initialFormValue: UpdateAccountForm = {
  fullName: '',
  dateOfBirth: '',
  vehiclesNumber: '',
  customerType: ''
}

const initialFormValidation: SimpleFormValidation = {
  isValid: true,
  fieldErrors: {
    fullName: '',
    vehiclesNumber: ''
  }
}

const formValidators: FormValidators = {
  fullName: [minLengthValidator()],
  vehiclesNumber: [positiveValueValidator()]
}

const getIsoDateSubstring = (isoDateTimeString: string) => isoDateTimeString.substring(0, DATETIME_ISO_DATE_FORMAT.length)

const mapAccountToForm = (account: Account) => ({
  fullName: account.fullName,
  dateOfBirth: getIsoDateSubstring(account.dateOfBirth),
  vehiclesNumber: account.vehiclesNumber.toString(),
  customerType: CustomerType[account.customerType]
} as UpdateAccountForm)

const mapFormToPatchUpdateAccount = (formValue: UpdateAccountForm) => ({
  fullName: formValue.fullName || undefined,
  dateOfBirth: formValue.dateOfBirth || undefined,
  vehiclesNumber: Number.parseInt(formValue.vehiclesNumber) || undefined,
  customerType: Number.parseInt(formValue.customerType) as CustomerType || undefined,
} as PatchUpdateAccount)

const useUpdateAccountWithErrorHandling = () => useFetchWithErrorHandling(patchUpdateAccount)

export default function EditAccountPage({ account }: Readonly<Props>) {
  const tryUpdateAccount = useUpdateAccountWithErrorHandling()
  const { success } = useSnackbar()

  const [ formLabels, setFormLabels ] = useState<UpdateAccountForm>(mapAccountToForm(account))

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

  const updateAccontAndRefreshForm = async () => {
    if (!formValidation.isValid || !formHasChanged()) {
      return
    }

    const updatedAccount = await tryUpdateAccount(mapFormToPatchUpdateAccount(formValue))

    if (!updatedAccount) {
      return
    }

    setFormLabels(mapAccountToForm(updatedAccount))
    setFormValue(initialFormValue)
    success('Saved')
   }
  
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
            className="mb-2"
            type="text"
            variant="standard"
            label={`Full name: ${formLabels.fullName}`}
            value={formValue.fullName}
            error={!!formValidation.fieldErrors.fullName}
            helperText={formValidation.fieldErrors.fullName}
            onBlur={createBlurHandler("fullName", formValue.fullName)}
            onChange={createFormFieldChangeHandler("fullName")}
          />
          <TextField
            className="mb-2"
            type="date"
            label={`Date of birth: ${formLabels.dateOfBirth}`}
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={formValue.dateOfBirth}
            onBlur={createBlurHandler("dateOfBirth", formValue.dateOfBirth)}
            onChange={createFormFieldChangeHandler("dateOfBirth")}
          />
          <TextField
            className="mb-2"
            type="number"
            label={`Number of owned vechicles: ${formLabels.vehiclesNumber}`}
            placeholder="1"
            variant="standard"
            value={formValue.vehiclesNumber}
            error={!!formValidation.fieldErrors.vehiclesNumber}
            helperText={formValidation.fieldErrors.vehiclesNumber}
            onBlur={createBlurHandler("vehiclesNumber", formValue.vehiclesNumber)}
            onChange={createFormFieldChangeHandler("vehiclesNumber")}
          />
          <FormControl>
            <FormLabel id="customer-type">Customer type: {formLabels.customerType}</FormLabel>
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
              disabled={!formValidation.isValid || !formHasChanged()}
              onClick={updateAccontAndRefreshForm}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageBox>
  )
}