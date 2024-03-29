import React, { useReducer, useContext } from "react";
import { Navigate } from "react-router-dom";
import reducer from "./reducer";
import axios from "axios";
import { _apiUrl } from "../utils";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
  CHECK_VALUES_BEGIN,
  CHECK_VALUES_SUCCESS,
  CHECK_VALUES_ERROR,
  TOGGLE_CATEGORY,
  TOGGLE_MISTAKES,
  CLEAR_USER_TEXT,
  USER_TEXT,
  LOGOUT_USER,
  TOGGLE_CONTENT,
  NEXT_CUSTOM_TEXT,
  GET_MISTAKES_BEGIN,
  GET_MISTAKES_SUCCESS,
  GET_MISTAKES_ERROR,
  DELETE_MISTAKE_SUCCESS,
  DELETE_MISTAKE_BEGIN,
  DELETE_MISTAKE_ERROR,
  TOGGLE_PLAYING,
  TOGGLE_AUDIO_SPEED,
} from "./action";
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const level = localStorage.getItem("level");
// const myCustomTexts = localStorage.getItem("myCustomTexts");
const production = true;
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  category: "",
  content: "",
  activeCategory: level || "beginner",
  generatedText: "",
  audioUrl: "",
  mistakes: null,
  allMistakes: null,
  allMistakesCount: 0,
  mistakesCount: 0,
  showMistakes: false,
  userText: "",
  customTexts: null,
  showCustomTexts: false,
  myCustomTexts: false,
  currentCustomText: 0,
  mistakeDeleted: false,
  isPlaying: false,
  activeSpeed: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = state.token;

  const authFetch = axios.create({
    baseURL: production ? `${_apiUrl}/api/v1` : `/api/v1`,
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        console.log("AUTH ERROR");
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    // localStorage.setItem("level", level);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  // ------------ CHECK VALUES ------
  const checkValues = async () => {
    const originalSentence = state.generatedText;
    const userSentence = state.userText;

    dispatch({ type: CHECK_VALUES_BEGIN });
    try {
      const { data } = await authFetch.post("/content/checkValues", {
        originalSentence,
        userSentence,
      });
      if (state.myCustomTexts && data.mistakes) {
        const result = data.mistakes;
        await authFetch.post("/content/mistakes/addMistakes", {
          result,
        });
      }

      dispatch({
        type: CHECK_VALUES_SUCCESS,
        payload: {
          mistakes: data.mistakes,
          count: data.count,
        },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CHECK_VALUES_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  // ------------ GET CONTENT ---------
  const getContent = async () => {
    dispatch({ type: GET_CONTENT_BEGIN });
    try {
      const { data } = await authFetch.get(
        `/content/getText?category=${state.activeCategory}`
      );
      dispatch({
        type: GET_CONTENT_SUCCESS,
        payload: {
          activeCategory: data.category,
          generatedText: data.generatedText,
          audioUrl: data.audioUrl,
        },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: GET_CONTENT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const practiceMyText = async (id) => {
    if (state.customTexts === null) {
      toggleContent(false);
    }
    if (id) {
      const targetedIndex = state.customTexts.findIndex(
        (item) => item._id === id
      );
      dispatch({
        type: NEXT_CUSTOM_TEXT,
        payload: {
          currentCustomText: targetedIndex,
        },
      });
    }
    const myText = state.customTexts[state.currentCustomText];
    dispatch({
      type: GET_CONTENT_SUCCESS,
      payload: {
        activeCategory: state.activeCategory,
        generatedText: myText.content,
        audioUrl: myText.audioUrl,
      },
    });
    toggleContent(true);
    clearAlert();
  };
  const nextCustomText = async () => {
    if (state.userText) {
      checkValues();
    }
    let current = state.currentCustomText;
    const length = state.customTexts.length - 1;
    if (current >= length) {
      current = 0;
    } else {
      current++;
    }
    dispatch({
      type: NEXT_CUSTOM_TEXT,
      payload: {
        currentCustomText: current,
      },
    });

    clearUserText();
  };
  const getAllMistakes = async () => {
    dispatch({ type: GET_MISTAKES_BEGIN });
    try {
      const { data } = await authFetch.get("/content/mistakes/getMistakes");
      dispatch({
        type: GET_MISTAKES_SUCCESS,
        payload: {
          mistakes: data.mistakes,
          count: data.count,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_MISTAKES_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const deleteMistake = async (id) => {
    dispatch({ type: DELETE_MISTAKE_BEGIN });
    try {
      await authFetch.delete(`/content/mistakes/${id}`);
      dispatch({
        type: DELETE_MISTAKE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MISTAKE_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const getCustomTexts = async () => {
    dispatch({ type: GET_CUSTOM_TEXT_BEGIN });
    try {
      const { data } = await authFetch.get(`/content/getCustomTexts`);
      dispatch({
        type: GET_CUSTOM_TEXT_SUCCESS,
        payload: {
          customTexts: data.customTexts,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_CUSTOM_TEXT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const addCustomText = async (userCustomText) => {
    dispatch({ type: POST_CUSTOM_TEXT_BEGIN });
    const customText = userCustomText;
    try {
      const { data } = await authFetch.post(`/content/addCustomText`, {
        customText,
      });
      dispatch({
        type: POST_CUSTOM_TEXT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: POST_CUSTOM_TEXT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const deleteCustomText = async (id) => {
    dispatch({ type: DELETE_CUSTOM_TEXT_BEGIN });
    try {
      const { data } = await authFetch.delete(`/content/${id}`);
      dispatch({
        type: DELETE_CUSTOM_TEXT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DELETE_CUSTOM_TEXT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const updateCustomText = async ({ userCustomText, targetedId }) => {
    const customText = userCustomText;
    const id = targetedId;

    dispatch({ type: UPDATE_CUSTOM_TEXT_BEGIN });
    try {
      const { data } = await authFetch.patch(`/content/${id}`, { customText });
      dispatch({
        type: UPDATE_CUSTOM_TEXT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_CUSTOM_TEXT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  // ------------ UPLOAD CONTENT ------
  const uploadContent = async (currentPost) => {
    dispatch({ type: UPLOAD_CONTENT_BEGIN });
    try {
      const { data } = await authFetch.post("/content/addText", currentPost);
      const { content, category } = data;
      dispatch({
        type: UPLOAD_CONTENT_SUCCESS,
        payload: {
          category,
          content,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) return;
      dispatch({
        type: UPLOAD_CONTENT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };

  // ------- SINUP & SINGIN -------
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    const baseUrl = production
      ? `${_apiUrl}/api/v1/auth/${endPoint}`
      : `/api/v1/auth/${endPoint}`;
    try {
      const { data } = await axios.post(baseUrl, currentUser);
      const { user, token } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          alertText: alertText,
          user,
          token,
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      displayAlert();
      console.log(error);
      dispatch({
        type: SETUP_USER_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
    clearAlert();
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    <Navigate to="/register" />;

    removeUserFromLocalStorage();
    clearAlert();
  };
  const toggleCategory = (activeCategory) => {
    dispatch({
      type: TOGGLE_CATEGORY,
      payload: {
        activeCategory: activeCategory,
      },
    });
  };
  const togglePlaying = (isPlaying) => {
    dispatch({
      type: TOGGLE_PLAYING,
      payload: {
        isPlaying,
      },
    });
  };
  const toggleContent = (isCustomText) => {
    dispatch({
      type: TOGGLE_CONTENT,
      payload: {
        myCustomTexts: isCustomText,
      },
    });
    // localStorage.setItem("myCustomTexts", isCustomText);
  };
  const toggleMistakes = (mistake) => {
    dispatch({
      type: TOGGLE_MISTAKES,
      payload: {
        showMistakes: mistake,
      },
    });
  };
  const togglePlaySpeed = (activeSpeed) => {
    dispatch({
      type: TOGGLE_AUDIO_SPEED,
      payload: {
        activeSpeed: activeSpeed,
      },
    });
  };
  const addUserText = (text) => {
    dispatch({
      type: USER_TEXT,
      payload: {
        userText: text,
      },
    });
    clearAlert();
  };
  const clearUserText = () => {
    dispatch({
      type: CLEAR_USER_TEXT,
    });
  };
  // -------- UPDATE USER -------
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const updatePassword = async (userPassword) => {
    dispatch({ type: UPDATE_PASSWORD_BEGIN });

    try {
      const { data } = await authFetch.patch(
        "/auth/updatePassword",
        userPassword
      );
      const { user, token } = data;
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: UPDATE_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    logoutUser();
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        updateUser,
        displayAlert,
        uploadContent,
        getContent,
        toggleCategory,
        checkValues,
        toggleMistakes,
        clearUserText,
        addUserText,
        logoutUser,
        updatePassword,
        getCustomTexts,
        addCustomText,
        deleteCustomText,
        updateCustomText,
        toggleContent,
        practiceMyText,
        nextCustomText,
        getAllMistakes,
        deleteMistake,
        togglePlaying,
        clearAlert,
        togglePlaySpeed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
