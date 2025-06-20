import GlobalRouter from "./routes";
import { Toaster } from "react-hot-toast";
import NotificationProvider from "./components/common/NotificationProvider";

const App = () => (
  <NotificationProvider>
    <GlobalRouter />
    <Toaster position="top-right" reverseOrder={false} />
  </NotificationProvider>
);

export default App;
