import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Dashboard/Main";
import Login from "./components/Login/Login";
import Results from "./components/Dashboard/Results";
import FirstPage from "./components/FirstPage/FirstPage";
import SubjectWiseAttendance from "./components/Dashboard/SubjectWiseAttendance";
import OverallAttendance from "./components/Dashboard/OverallAttendance";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<FirstPage />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/subjectwise" element={<SubjectWiseAttendance/>}/>
        <Route path="/overall" element={<OverallAttendance />} />
        <Route path="/" element={<Login />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
