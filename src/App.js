import EventMain from "./Components/Pages/EventsDashboard/Events.components";
import JobsMain from "./Components/Pages/Jobs/UI/JobsMain";
import LoginPage from "./Components/Pages/Auth/Login/UI/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./Auth/authContext";
import TutorsMain from "./Components/Pages/Tutors/UI/TutorsMain";
import TutorRequests from "./Components/Pages/Tutors/UI/TutorRequests.jsx";
import CourseRequests from "./Components/Pages/Tutors/UI/CourseRequests.jsx";
import Error404 from "./Components/404";
import PermitLogs from "./Components/Pages/Permit/PermitLogs";
import AdminMain from "./Components/Pages/SuperAdmin/UI/AdminMain";
import ClubMain from "./Components/Pages/ClubsDashboard/UI/ClubMain.components";
import Bus from "./Components/Pages/Bus/Bus";
import Permit from "./Components/Pages/Permit/Permit";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />

        <Route
          exact
          path="/Admin"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "SUPERUSER" ? (
              <AdminMain />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/EventMain"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "EventsAdmin" ? (
              <EventMain />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/ClubPage"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "ClubsAdmin" ? (
              <ClubMain />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/JobsPage"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "JobsAdmin" ? (
              <JobsMain />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          exact
          path="/TutorsPage"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "TutorsAdmin" ? (
              <TutorsMain />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/TutorRequests"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "TutorsAdmin" ? (
              <TutorRequests />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path="/CourseRequests"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "TutorsAdmin" ? (
              <CourseRequests />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          exact
          path="/BusPage"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "BusAdmin" ? (
              <Bus />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          exact
          path="/PermitsPage"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "PermitsAdmin" ? (
              <Permit />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          exact
          path="/PermitsLog"
          element={
            authCtx.isLoggedIn && authCtx.admin_role === "PermitsAdmin" ? (
              <PermitLogs />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route exact path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
