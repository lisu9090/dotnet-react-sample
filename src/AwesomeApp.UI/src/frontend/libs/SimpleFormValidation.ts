import { useMemo, useState } from 'react'

const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const strongPasswordRegExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,20})/

/**
 * Type of function to validate form field
 */
export type ValidatorFn = (fieldValue: string, formValue: any) => string

/**
 * Type of function that allows programmatically validate particular form field
 */
export type ValidateFormFieldFn = (fieldName: string, fieldValue: string) => void

/**
 * Form validation metadata
 */
export interface SimpleFormValidation {
  /**
   * Indicates if form state is valid
   */
  isValid: boolean;
  /**
   * Key-value object of field names and corresponding errors;

   */
  fieldErrors: {
    /**
    * Form field name: field validation state;
    * contains empty string if field value is valid;
    * contains error message if field value is invalid;
    * is null if field has not been validated yet (initial state)
     */
    [ fieldName: string ]: string | null;
  };
}

/**
 * Defines validation functions for form fields
 */
export interface FormValidators {
  /**
   * Form field name: array of validator functions
   */
  [fieldName: string]: ValidatorFn[];
}

/**
 * Creates validator function which checks if value is not empty (is required)
 * @param message Optional error message
 * @returns Validator function
 */
export const requiredValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value is required') => 
    (fieldValue: string) => fieldValue?.trim().length > 0 ? '' : message

/**
 * Creates validator function which checks if value is at least n characters long
 * @param message Optional error message
 * @param minLength Optional minimal string length used to validate value; default is 3
 * @returns Validator function
 */  
export const minLengthValidator: (message?: string, minLength?: number) => ValidatorFn = 
  (customMessage: string = '', minLength: number = 3) => 
    (fieldValue: string) => !fieldValue || fieldValue.trim().length >= minLength ? '' : (customMessage ?? `Value must consists of at least ${minLength} characters`)

/**
 * Creates validator function which checks if value is positive integer
 * @param message Optional error message
 * @returns Validator function
 */ 
export const positiveValueValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must be positive number') => 
    (fieldValue: string) => !fieldValue || Number.parseFloat(fieldValue) >= 0 ? '' : message

/**
 * Creates validator function which checks if value is a valid email address
 * @param message Optional error message
 * @returns Validator function
 */ 
export const emailValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must be valid email') => 
    (fieldValue: string) => !fieldValue || emailRegExp.test(fieldValue) ? '' : message

/**
 * Creates validator function which checks if value is a strong password 
 * @param message Optional error message
 * @returns Validator function
 */   
export const strongPasswordValidator: (message?: string) => ValidatorFn = 
  (message: string = 'Value must contain capital letter, small letter, number, special character and be between 8 and 20 characters long') => 
    (fieldValue: string) => !fieldValue || strongPasswordRegExp.test(fieldValue) ? '' : message

/**
 * Creates validator function which checks if value is the same as in other form field
 * @param otherFieldName Other filed name to check value against
 * @param message Optional error message
 * @returns Validator function
 */   
export const fieldEqualityValidator: (otherFieldName: string, message?: string) => ValidatorFn = 
  (otherFieldName: string, message: string = 'Value must be equal to value in field ' + otherFieldName) => 
    (fieldValue: string, formValue: any) => !fieldValue || fieldValue === formValue[otherFieldName] ? '' : message

/**
 * Hook which creates form state, form validation metadata state and form validators state
 * @param initialFormValue initial from state
 * @param initialFormValidationValue initial form validation metadata state
 * @param validators initial from validators
 * @returns from value, form validation metadata, function to set form value, function to validate form field, function to set validators
 */
export function useSimpleFormValidation<T> (
  initialFormValue: T, 
  initialFormValidationValue: SimpleFormValidation, 
  validators: FormValidators
): {
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
