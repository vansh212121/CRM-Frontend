import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectAccessToken } from "@/features/authSlice";
import { useRefreshTokenMutation } from "@/features/api/authApi";

const PersistLogin = () => {
  const accessToken = useSelector(selectAccessToken);
  const [isLoading, setIsLoading] = useState(true);

  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refreshToken().unwrap();
      } catch (err) {
        console.error("Session expired or invalid. Please log in again.", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (!accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <p>Loading session...</p>;
  }

  return <Outlet />;
};

export default PersistLogin;
