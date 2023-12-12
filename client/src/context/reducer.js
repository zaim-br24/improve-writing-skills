import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPLOAD_CONTENT_BEGIN,
  UPLOAD_CONTENT_SUCCESS,
  UPLOAD_CONTENT_ERROR,
  GET_CONTENT_BEGIN,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_ERROR,
  CHECK_VALUES_BEGIN,
  CHECK_VALUES_SUCCESS,
  CHECK_VALUES_ERROR,
  TOGGLE_CATEGORY,
  TOGGLE_MISTAKES,
  CLEAR_USER_TEXT,
  USER_TEXT,
  LOGOUT_USER,
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
      isLoading: true,
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
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
    if (action.type === LOGOUT_USER) {
      return {
        ...initialState,
        user: null,
        token: null,
        showAlert: true,
        alertType: "success",
        alertText: "Logged out! See you soon!",
      };
  }
  
  if (action.type === UPLOAD_CONTENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPLOAD_CONTENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
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
  if (action.type === GET_CONTENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_CONTENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      generatedText: action.payload.generatedText,
      activeCategory: action.payload.activeCategory,
      audioUrl: action.payload.audioUrl,
     
    };
  }
  if (action.type === GET_CONTENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === CHECK_VALUES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === CHECK_VALUES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      mistakes: action.payload.mistakes,
      mistakesCount: action.payload.count,
      showAlert: true,
      alertType: "success",
      alertText: "values ckecked successfully!",
    };
  }
  if (action.type === CHECK_VALUES_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Something went wrong while checking! please try again.",
    };
  }
  if (action.type === TOGGLE_CATEGORY) {
    return {
      ...state,
      activeCategory: action.payload.activeCategory,
    };
  }
    if (action.type === TOGGLE_MISTAKES) {
      return {
        ...state,
        showMistakes: action.payload.showMistakes,
      };
  }
     if (action.type === USER_TEXT) {
       return {
         ...state,
         userText: action.payload.userText,
       };
  }
   if (action.type === CLEAR_USER_TEXT) {
     return {
       ...state,
       userText: "",
     };
   }
};

export default reducer;
