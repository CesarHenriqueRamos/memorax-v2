import { AuthGoogleProvider } from "./hooks/authGoogle"
import { AppRoutes } from "./routes/routes"
import './App.css';

function App() {
  return (
    <AuthGoogleProvider>
      <AppRoutes />
    </AuthGoogleProvider>
  );
}

export default App;
