import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import ResumeBuilder from "./pages/resumebuilder";
import Preview from "./pages/preview";
import { useDispatch } from "react-redux";
import api from "./configs/api";

// ✅ Correct file name: authSlice.js (NOT userSlice)
import { login, setLoading} from "./app/features/authSlice";
import { Toaster } from "react-hot-toast"


const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token"); // ✅ FIXED

  const getUserData = async () => {
    try {
      dispatch(setLoading(true)); // show loader

      if (token) {
        const { data } = await api.get("/api/users/data", {
          headers: { Authorization: token },
        });

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="/preview/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
};

export default App;
