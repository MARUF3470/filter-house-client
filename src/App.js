import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import router from "./router/Routes";


function App() {
  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
