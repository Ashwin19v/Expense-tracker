const API_URL = "http://localhost:5000";

export const loginRoute = `${API_URL}/auth/login`;
export const registerRoute = `${API_URL}/auth/register`;
export const getCurrentUser = `${API_URL}/auth/getcurrentuser`;
export const getAllUsers = `${API_URL}/auth/getallusers`;

export const getExpenses = `${API_URL}/expense/getexpense`;
export const addExpenses = `${API_URL}/expense/addexpense`;
export const deleteExpenses = `${API_URL}/expense/deleteexpense`;
export const updateExpenses = `${API_URL}/expense/updateexpense`;
