import { createSlice } from "@reduxjs/toolkit";

const userState = {
   users: [] as any,
};
const userSlice = createSlice({
   name: "todo",
   initialState: userState,
   reducers: {
      deleteUser: (state, { payload }) => {
         state.users = state.users.filter((user: any) => user.id !== payload);
      },
      addUser: (state, { payload }: any) => {
         state.users = [...state.users, payload];
      },
   },
});
export const { deleteUser, addUser } = userSlice.actions;
export default userSlice.reducer;
