import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import axios from "axios";
import { BASE_URL } from "../../url";

export default function OpenRoute({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
        // console.log("I am directly return");
        return; // If no token, just return

    }
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
          dispatch(setUser(res.data.data));
        } else {
          localStorage.clear();
        }
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.error("Error fetching user data:", error);
      }
    };

    if (!user) {
      getUser();
    }
  }, []);

  return children;
}
