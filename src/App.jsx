import "./App.css";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./context/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
