const INITIAL_STATE = {
  isSignedIn: false,
  userId: null,
  Authorization: "null",
  userName: "",
  userType: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        Authorization: action.payload.token,
        userName: action.payload.username,
        userType: action.payload.user_type,
      };
    case "SET_USER_AUTH":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        Authorization: action.payload.Authorization,
        userName: action.payload.userName,
        userType: action.payload.user_type,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        Authorization: "",
        userName: "",
        userType: "",
      };
    default:
      return state;
  }
};
