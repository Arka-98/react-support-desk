import React, { useReducer } from 'react'

export type Status = 'new' | 'closed' | 'open'

export type Product = 'iPhone' | 'Macbook Pro' | 'iMac' | 'iPad' | 'Watch'

export interface Input { name?: string, email?: string, product?: Product, description?: string, password?: string, confPassword?: string, type?: 'customer' | 'staff' | 'admin', is_staff?: boolean, is_admin?: boolean }

export interface Errors { name?: boolean | null, email?: boolean | null, product?: boolean | null, description?: boolean | null, password?: boolean | null, confPassword?: boolean | null }

interface State {
    input: Input
    errors: Errors
    isError: boolean
}

export enum FORM_ACTIONS {
    SET_INPUT,
    SET_BOOLEAN_INPUT,
    SET_ERRORS,
    SET_CUSTOM_INPUT,
    TRIM_INPUT,
    TOGGLE_LOADING,
    SET_INPUT_AND_ERRORS,
    CHECK_PASSWORDS,
    CHECK_ERROR,
    VALIDATE_INPUT
}

export type Action = 
| { type: FORM_ACTIONS.SET_INPUT, payload: { name: string, value: string } }
| { type: FORM_ACTIONS.SET_ERRORS, payload: { name: string, value: boolean } }
| { type: FORM_ACTIONS.SET_CUSTOM_INPUT, payload: Input }
| { type: FORM_ACTIONS.TRIM_INPUT, payload: { name: string, value: string } }
| { type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name: string, value: string } }
| { type: FORM_ACTIONS.CHECK_PASSWORDS, payload: { name: string, value: string } }
| { type: FORM_ACTIONS.CHECK_ERROR }
| { type: FORM_ACTIONS.VALIDATE_INPUT, payload: { name: string, value: string } }

function reducer(state: State, action: Action): State {
    let emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    let passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    switch(action.type) {
        case FORM_ACTIONS.SET_INPUT:
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.value } }
        case FORM_ACTIONS.SET_ERRORS:
            return { ...state, errors: { ...state.errors, [action.payload.name]: !Boolean(action.payload.value) } }
        case FORM_ACTIONS.SET_CUSTOM_INPUT:
            let customInput: Input = {email: '', password: ''}
            let i: keyof Input
            for(i in state.input) {
                customInput = { ...customInput, [i]: action.payload[i] }
            }
            return { ...state, input: customInput }
        case FORM_ACTIONS.TRIM_INPUT:
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.name === 'image' ? action.payload.value : action.payload.value.trim() } }
        case FORM_ACTIONS.SET_INPUT_AND_ERRORS:
            return { ...state, input: { ...state.input, [action.payload.name]: action.payload.value }, errors: { ...state.errors, [action.payload.name]: !Boolean(action.payload.value)  } }
        case FORM_ACTIONS.CHECK_PASSWORDS:
            return { ...state, errors: { ...state.errors, confPassword: state.errors.confPassword === null ? null : action.payload.name === 'password' ? (action.payload.value === state.input.confPassword ? false : true ) : action.payload.value === state.input.password ? !Boolean(action.payload.value) : true } }
        case FORM_ACTIONS.CHECK_ERROR:
            let j: keyof Errors
            for(j in state.errors) {
                if(state.errors[j] || state.errors[j] === null) {
                    return { ...state, isError: true }
                }
            }
            return { ...state, isError: false }
        case FORM_ACTIONS.VALIDATE_INPUT:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.name]:
                        action.payload.name === 'contact' ? (action.payload.value.length !== 10 ? true : !Boolean(action.payload.value)) :
                        action.payload.name === 'email' ? !emailRegex.test(action.payload.value) :
                        (action.payload.name === 'password' || action.payload.name === 'confPassword') ? !passwordRegex.test(action.payload.value) :
                        action.payload.name === 'image' ? !Boolean(action.payload.value) :
                        !Boolean(action.payload.value.trim())
                }
            }
        default:
            return state
    }
}

function useForm(initialState: State): [State, React.Dispatch<Action>] {
    const [state, dispatch] = useReducer(reducer, initialState)

    return [state, dispatch]
}

export default useForm