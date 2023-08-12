import {
  handleFulfilledUser,
  handleFulfilledUserLogOut,
  handleFulfilledUserTheme,
  handleFulfilledUserUpdate,
  handlePendingUser,
  handleRejectedUser,
} from './hundleReducerAuth';

import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  login,
  register,
  logOut,
  updateTheme,
  updateUser,
} from './operationAuth';

const initialState = {
  user: { name: null, email: null, avatarUrl: null, theme: 'dark' },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
};

const defaultStatus = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};
const customArr = [register, login, logOut, updateTheme, updateUser];
const customArrStatusActions = status => customArr.map(el => el[status]);

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, handleFulfilledUser)
      .addCase(login.fulfilled, handleFulfilledUser)
      .addCase(updateTheme.fulfilled, handleFulfilledUserTheme)
      .addCase(updateUser.fulfilled, handleFulfilledUserUpdate)
      .addCase(logOut.fulfilled, handleFulfilledUserLogOut)
      .addMatcher(
        isAnyOf(...customArrStatusActions(defaultStatus.pending)),
        handlePendingUser
      )
      .addMatcher(
        isAnyOf(...customArrStatusActions(defaultStatus.rejected)),
        handleRejectedUser
      );
  },
});

export const userReducer = userSlice.reducer;
