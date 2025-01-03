import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import React from "react";
import { googleLogin, login } from "../services/userService";
import { useAuth } from "../Context/AuthContext";

const clientId =
  "797530137615-n0qiu7me2mrsg99defe9ltcbgoo4qb1t.apps.googleusercontent.com";

const LoginPanel: React.FC = () => {
  const { isAuthenticatedWithGoogle, setAuthenticatedWithGoogle } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const onFailure = (result: unknown): void => {
    console.error("Login Failed! Result:", result);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleLogin = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ): Promise<void> => {
    if ("tokenId" in response) {
      const { tokenId } = response;
      dispatch(googleLogin(tokenId) as any);
      setAuthenticatedWithGoogle(true);
    } else {
      console.error("Received offline response instead of token.");
    }
  };

  return (
    <div className="signInButton">
      <GoogleLogin
        buttonText="Google Login"
        clientId={clientId}
          onFailure={onFailure}
        onSuccess={handleLogin}
      />
    </div>
  );
};

export default LoginPanel;
