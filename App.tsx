import "antd/dist/antd.css";
import "./style.css";
import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { JobList } from "./src/pages/job-list";
import { UserList } from "./src/pages/user-list";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/jobs" element={<JobList />} />
          <Route path="/users/:userId" element={<UserList />} />
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
