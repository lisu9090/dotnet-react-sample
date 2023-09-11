import { useMemo, useState } from "react";

export type ValidatorFn = (value: string) => string
export type ValidateFormFieldFn = (fieldName: string, fieldValue: string) => void

export interface SimpleFormValidation {
  isValid: boolean;
  fieldErrors: {
    [ fieldName: string ]: string;
  };
}

export interface FormValidators {
  [fieldName: string]: ValidatorFn[];
}

export const notEmptyValidator: (message: string) => ValidatorFn = 
  (message: string) => (value: string) => value?.trim().length === 0 ? message : ''


export function useSimpleFormValidation(initialValue: SimpleFormValidation, validators: FormValidators): any {
  const [formValidation, setFormValidation] = useState<SimpleFormValidation>(initialValue)
  const [formValidators, setFormValidators] = useState<FormValidators>(validators)

  const validateFormField = useMemo<ValidateFormFieldFn>(
    () => (fieldName: string, fieldValue: string) => {
      const validationError = formValidators[fieldName]
        ?.map(validator => validator(fieldValue))
        .filter(errorMessage => Boolean(errorMessage))
        [0] ?? ''

      const fieldErrors = {
        ...formValidation.fieldErrors,
        [fieldName]: validationError
      }

      setFormValidation({
        isValid: !Object.keys(fieldErrors).some(fieldName => Boolean(fieldErrors[fieldName])),
        fieldErrors: fieldErrors
      })
    },
    [formValidation, formValidators, setFormValidation]
  )

  return useMemo(
    () => ({
      formValidation,
      validateFormField,
      setFormValidators
    }),
    [formValidation, validateFormField, setFormValidators]
  )
}

