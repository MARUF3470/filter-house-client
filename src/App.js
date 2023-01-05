import { RouterProvider } from "react-router-dom";
import Main from "./layout/Main";
import router from "./router/Routes";


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
