import Routers from "./Routers";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routers />
    </>
  );
}

export default App;
