import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Profile,
  AddJob,
  AllJobs,
  SharedLayout,
} from "./pages/dashboard";
import { Landing, Error, Register, ProtectedRoute } from './pages';
function App() {
  return (
   <BrowserRouter>
     <Routes>
     <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
     </Routes>
     <ToastContainer position="top-center" />
   </BrowserRouter>
  );
}

export default App;
