import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { setUser } from '../../redux/features/userSlice';
import { BASE_URL } from "../../url";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(`${BASE_URL}/getUserData`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(hideLoading());

      if (res.data.success) {
        // console.log("res.data.data is: ",res.data.data);
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        return <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []); // Add user as a dependency

  if (localStorage.getItem("token")) {
    return children; // Render children if user is present
  } else{
    return <Navigate to="/login" />;
  }
}
