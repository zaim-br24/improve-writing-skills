import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
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
} from "./action";
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const level = localStorage.getItem("level");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  category: "",
  content: "",
  activeCategory: level || "beginner",
  generatedText: "",
  audioUrl: "",
  mistakes: null,
  mistakesCount: 0,
  showMistakes: false,
  userText: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const authFetch = axios.create({
    baseURL: "/api/v1",
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  });
  authFetch.interceptors.request.use(
    (config) => {
      // config.headers.common['Authorization'] = `Bearer ${state.token}`
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
    }, 5000);
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
  const checkValues = async (values) => {
    const { generatedText: originalSentence, userValue: userSentence } = values;
    dispatch({ type: CHECK_VALUES_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/content/checkValues", {
        originalSentence,
        userSentence,
      });
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
  };

  // ------------ GET CONTENT ---------
  const getContent = async () => {
    dispatch({ type: GET_CONTENT_BEGIN });
    try {
      const { data } = await axios.get(
        `/api/v1/content/getText?category=${state.activeCategory}`
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
  };
  // ------------ UPLOAD CONTENT ------
  const uploadContent = async (currentPost) => {
    dispatch({ type: UPLOAD_CONTENT_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/content/addText", currentPost);
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
  };

  // ------- SINUP & SINGIN -------
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });

    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { user, token } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          alertText: alertText,
          user,
          token,
        },
      });
      //add {user, token} to localStorage
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

  const toggleCategory = (activeCategory) => {
    dispatch({
      type: TOGGLE_CATEGORY,
      payload: {
        activeCategory: activeCategory,
      },
    });
  };
  const toggleMistakes = (mistake) => {
    dispatch({
      type: TOGGLE_MISTAKES,
      payload: {
        showMistakes: mistake,
      },
    });
  };
  const clearUserText = (text) => {
    dispatch({
      type: CLEAR_USER_TEXT,
      payload: {
        userText: text,
      },
    });
  };
  // -------- UPDATE USER -------
  // const updateUser = async (currentUser) => {
  //   dispatch({ type: UPDATE_USER_BEGIN });

  //   try {
  //     const { data } = await authFetch.patch("/auth/updateUser", currentUser);

  //     // no token
  //     const { user, token } = data;

  //     dispatch({
  //       type: UPDATE_USER_SUCCESS,
  //       payload: { user, location, token },
  //     });

  //     addUserToLocalStorage({ user, location, token });
  //   } catch (error) {
  //     dispatch({
  //       type: UPDATE_USER_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        displayAlert,
        uploadContent,
        getContent,
        toggleCategory,
        checkValues,
        toggleMistakes,
        clearUserText,
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
