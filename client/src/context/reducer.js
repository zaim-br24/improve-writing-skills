import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPLOAD_CONTENT_BEGIN,
  UPLOAD_CONTENT_SUCCESS,
  UPLOAD_CONTENT_ERROR,
  UPDATE_PASSWORD_BEGIN,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  GET_CONTENT_BEGIN,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_ERROR,
  CHECK_VALUES_BEGIN,
  CHECK_VALUES_SUCCESS,
  CHECK_VALUES_ERROR,
  GET_MISTAKES_BEGIN,
  GET_MISTAKES_SUCCESS,
  GET_MISTAKES_ERROR,
  TOGGLE_CATEGORY,
  TOGGLE_MISTAKES,
  CLEAR_USER_TEXT,
  USER_TEXT,
  LOGOUT_USER,
  GET_CUSTOM_TEXT_BEGIN,
  GET_CUSTOM_TEXT_SUCCESS,
  GET_CUSTOM_TEXT_ERROR,
  POST_CUSTOM_TEXT_BEGIN,
  POST_CUSTOM_TEXT_SUCCESS,
  POST_CUSTOM_TEXT_ERROR,
  DELETE_CUSTOM_TEXT_BEGIN,
  DELETE_CUSTOM_TEXT_SUCCESS,
  DELETE_CUSTOM_TEXT_ERROR,
  UPDATE_CUSTOM_TEXT_BEGIN,
  UPDATE_CUSTOM_TEXT_SUCCESS,
  UPDATE_CUSTOM_TEXT_ERROR,
  TOGGLE_CONTENT,
  NEXT_CUSTOM_TEXT,
  DELETE_MISTAKE_SUCCESS,
  DELETE_MISTAKE_BEGIN,
  DELETE_MISTAKE_ERROR,
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
      showCustomTexts: false,
      mistakeDeleted: false,
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
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "User Updated Successfully!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Update User Failed! Please try again.",
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      showAlert: true,
      alertType: "success",
      alertText: "Logged Out Successfully! See you soon!",
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
    };
  }
  if (action.type === CHECK_VALUES_ERROR) {
    return {
      ...state,
      isLoading: false,
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
  if (action.type === UPDATE_PASSWORD_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: "success",
      alertText: "Password Updated Successfully!",
    };
  }
  if (action.type === UPDATE_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: "Update Password Failed! Please try again.",
    };
  }
  if (action.type === GET_CUSTOM_TEXT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_CUSTOM_TEXT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      customTexts: action.payload.customTexts,
    };
  }
  if (action.type === GET_CUSTOM_TEXT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === POST_CUSTOM_TEXT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === POST_CUSTOM_TEXT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showCustomTexts: true,
      showAlert: true,
      alertType: "success",
      alertText: "Text uploaded successfully.",
    };
  }
  if (action.type === POST_CUSTOM_TEXT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === DELETE_CUSTOM_TEXT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_CUSTOM_TEXT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showCustomTexts: true,
      showAlert: true,
      alertType: "success",
      alertText: "Text deleted successfully.",
    };
  }
  if (action.type === DELETE_CUSTOM_TEXT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === UPDATE_CUSTOM_TEXT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === UPDATE_CUSTOM_TEXT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showCustomTexts: true,
      showAlert: true,
      alertType: "success",
      alertText: "Text updated successfully.",
    };
  }
  if (action.type === UPDATE_CUSTOM_TEXT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_CONTENT) {
    return {
      ...state,
      myCustomTexts: action.payload.myCustomTexts,
    };
  }
  if (action.type === NEXT_CUSTOM_TEXT) {
    return {
      ...state,
      currentCustomText: action.payload.currentCustomText,
      showMistakes: false,
    };
  }
  if (action.type === GET_MISTAKES_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === GET_MISTAKES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allMistakes: action.payload.mistakes,
      allMistakesCount: action.payload.count,
    };
  }
  if (action.type === GET_MISTAKES_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === DELETE_MISTAKE_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === DELETE_MISTAKE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      mistakeDeleted: true,
    };
  }
  if (action.type === DELETE_MISTAKE_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
};

export default reducer;
