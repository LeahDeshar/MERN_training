import { userLogin, userRegister } from "../redux/Features/auth/authAction";
import store from "../redux/store";

export const handleLogin = (e, email, password) => {
  e.preventDefault();
  try {
    if (!email || !password) {
      return alert("Please Provide All Information");
    }
    store.dispatch(userLogin({ email, password }));
    console.log("login", e, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (e, userName, email, password) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        userName,
        email,
        password,
      })
    );
    console.log("Register => ", userName, email, password);
  } catch (error) {
    console.log(error);
  }
};
