import GlobalRouter from "./routes";
import { Toaster } from "react-hot-toast";
import NotificationProvider from "./components/common/NotificationProvider"; // ✅ Add this

const App = () => {
  return (
    <div>
      <NotificationProvider /> {/* ✅ Enable real-time notifications */}
      <GlobalRouter />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;
