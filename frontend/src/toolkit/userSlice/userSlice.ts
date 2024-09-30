import { createSlice } from "@reduxjs/toolkit";
const user = localStorage.getItem("user");
const userState = {
   user: user ? JSON.parse(user) : null,
};
const userSlice = createSlice({
   name: "user",
   initialState: userState,
   reducers: {
      setUser: (state, { payload }: any) => {
         state.user = payload;
      },
   },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
