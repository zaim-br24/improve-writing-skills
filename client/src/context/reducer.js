import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPLOAD_CONTENT_BEGIN,
  UPLOAD_CONTENT_SUCCESS,
  UPLOAD_CONTENT_ERROR,
} from "./action";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "please provide all the values!",
    };
  } else if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === UPLOAD_CONTENT_BEGIN) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === UPLOAD_CONTENT_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      content: action.payload.content,
      category: action.payload.category,
      showAlert: true,
      alertType: "success",
      alertText: "Post uploaded successfully!",
    };
  }
  if (action.type === UPLOAD_CONTENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Something went wrong! please try again.",
    };
  }
};

export default reducer;
