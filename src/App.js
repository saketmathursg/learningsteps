import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./views/LoginPage";
//import PostPageHome from "./views/PostPageHome";
import SignUpPage from "./views/SignUpPage";
import LandingPage from "./views/LandingPage";
import StudentAdd from "./views/StudentAdd";
import StudentDetails from "./views/StudentDetails";
import StudentUpdate from "./views/StudentUpdate";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add" element={<StudentAdd />} />
        <Route path="/student/:id" element={<StudentDetails />} />
        <Route path="/update/:id" element={<StudentUpdate />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


