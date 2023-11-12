import { useMemo, useState } from "react";

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strongPasswordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/

export type ValidatorFn = (value: string) => string
export type ValidateFormFieldFn = (fieldName: string, fieldValue: string) => void

export interface SimpleFormValidation {
  isValid: boolean;
  fieldErrors: {
    [ fieldName: string ]: string | null;
  };
}

export interface FormValidators {
  [fieldName: string]: ValidatorFn[];
}

export const requiredValidator: (message?: string) => ValidatorFn = 
  (message: string = "Value is required") => 
    (value: string) => value?.trim().length > 0 ? '' : message

export const minLengthValidator: (message?: string, minLength?: number) => ValidatorFn = 
  (message: string = "Value must have more then 3 characters", minLength: number = 3) => 
    (value: string) => value?.trim().length >= minLength ? '' : message

export const positiveValueValidator: (message?: string) => ValidatorFn = 
  (message: string = "Value must be positive number") => 
    (value: string) => Number.parseFloat(value) >= 0 ? '' : message

export const emailValidator: (message?: string) => ValidatorFn = 
  (message: string = "Value must be valid email") => 
    (value: string) => emailRegExp.test(value) ? '' : message

export const strongPasswordValidator: (message?: string) => ValidatorFn = 
  (message: string = "Value must contain capital letter, small letter, number, special character and be between 8 and 20 characters long") => 
    (value: string) => strongPasswordRegExp.test(value) ? '' : message

export function useSimpleFormValidation(initialValue: SimpleFormValidation, validators: FormValidators): {
  formValidation: SimpleFormValidation;
  validateFormField: ValidateFormFieldFn;
  setFormValidators: (value: FormValidators) => void;
} {
  const [formValidation, setFormValidation] = useState<SimpleFormValidation>(initialValue)
  const [formValidators, setFormValidators] = useState<FormValidators>(validators)

  const validateFormField = useMemo<ValidateFormFieldFn>(
    () => (fieldName: string, fieldValue: string) => {
      const validationError = formValidators[fieldName]
        ?.map(validator => validator(fieldValue))
        .filter(errorMessage => !!errorMessage)
        [0] ?? ''

      const fieldErrors = {
        ...formValidation.fieldErrors,
        [fieldName]: validationError
      }

      setFormValidation({
        isValid: Object.keys(fieldErrors).every(fieldName => fieldErrors[fieldName] === ''),
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

