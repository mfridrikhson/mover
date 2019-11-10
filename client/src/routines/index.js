import { createRoutine } from 'redux-saga-routines';

export const fetchUser = createRoutine('USER');
export const addVehicle = createRoutine('ADD_VEHICLE');
export const submitOrder = createRoutine('SUBMIT_ORDER');
export const updateDriver = createRoutine('UPDATE_DRIVER');
