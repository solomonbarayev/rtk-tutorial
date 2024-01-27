import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
