import { useMemo, useState } from 'react';

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strongPasswordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/

export type ValidatorFn = (fieldValue: string, formValue: any) => string
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
  (message: string = 'Value is required') => 
    (fieldValue: string) => fieldValue?.trim().length > 0 ? '' : message

export const minLengthValidator: (message?: string, minLength?: number) => ValidatorFn = 
  (message: string = 'Value must have more then 3 characters', minLength: number = 3) => 
    (fieldValue: string) => fieldValue?.trim().length >= minLength ? '' : message

export const positiveValueValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must be positive number') => 
    (fieldValue: string) => Number.parseFloat(fieldValue) >= 0 ? '' : message

export const emailValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must be valid email') => 
    (fieldValue: string) => emailRegExp.test(fieldValue) ? '' : message

export const strongPasswordValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must contain capital letter, small letter, number, special character and be between 8 and 20 characters long') => 
    (fieldValue: string) => strongPasswordRegExp.test(fieldValue) ? '' : message

export const fieldEqualityValidator: (otherFieldName: string, message?: string) => ValidatorFn = 
  (otherFieldName: string, message: string = 'Value must be equal to value in field ' + otherFieldName) => 
    (fieldValue: string, formValue: any) => fieldValue === formValue[otherFieldName] ? '' : message

export function useSimpleFormValidation<T> (
  initialFormValue: T, 
  initialFormValidationValue: SimpleFormValidation, 
  validators: FormValidators): {
  formValue: T;
  formValidation: SimpleFormValidation;
  setFormValue: (value: T) => void;
  validateFormField: ValidateFormFieldFn;
  setFormValidators: (value: FormValidators) => void;
} {
  const [formValue, setFormValue] = useState<T>(initialFormValue)
  const [formValidation, setFormValidation] = useState<SimpleFormValidation>(initialFormValidationValue)
  const [formValidators, setFormValidators] = useState<FormValidators>(validators)

  const validateFormField = useMemo<ValidateFormFieldFn>(
    () => (fieldName: string, fieldValue: string) => {
      const validationError = formValidators[fieldName]
        ?.map(validator => validator(fieldValue, formValue))
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
    [formValue, formValidation, formValidators, setFormValidation]
  )

  return useMemo(
    () => ({
      formValue,
      formValidation,
      setFormValue,
      validateFormField,
      setFormValidators
    }),
    [formValue, formValidation, setFormValue, validateFormField, setFormValidators]
  )
}

