import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      image: "",
      authUser: "",
    },
    message: "Welcome to our online store",
  },
  reducers: {
    login: (state, action) => {
      const userId = action.payload;
      const userValidation = /^[A-Za-z]{4,10}$/i.test(userId.name);
      const passwordValidation =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_\-+={[}\]\\|;:'"<,>.?/`~])[a-zA-Z0-9!@#$%^&*()_\-+={[}\]\\|;:'"<,>.?/`~]{4,16}$/i.test(
          userId.password
        );
      state.user = userId;
      if (!userValidation) {
        alert("User name must be 4-10 alphabetic characters.");
        state.user.authUser = false;
      } else if (!passwordValidation) {
        alert(
          "Password must be 4-16 characters long, include at least one number, one letter, and one special character."
        );
        state.user.authUser = false;
      } else {
        state.user.authUser = true;
        const saveState = JSON.stringify(userId);
        sessionStorage.setItem("authUser", saveState);
      }
    },
    logout: (state) => {
      state.user = {
        name: "",
        password: "",
        image: "",
        authUser: false,
      };
      // action.asyncDispatch(clearAll());
      sessionStorage.clear();
    },
    farewellMessage: (state, action) => {
      state.message = `Farewell ${action.payload}, visit again`;
    },
  },
});

export const { login, logout, farewellMessage } = authSlice.actions;
export default authSlice.reducer;
