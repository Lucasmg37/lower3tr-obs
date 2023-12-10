import { createBrowserRouter } from "react-router-dom";
import ViewerLower3Th from "./pages/lower3th/viewer";
import FormLower3Th from "./pages/lower3th/form";


export const routes = () =>
  createBrowserRouter([
    {
      path: `iframe/:key/*`,
      children: [
        {
          path: `viewer`,
          element: <ViewerLower3Th />,
        },
        {
          path: `form`,
          element: <FormLower3Th />,
        },
      ],
    },
    {
      path: `unauthorized`,
      element: (
        <div>
          <h1>Chave de acesso inválida.</h1>
        </div>
      ),
    },
    {
      path: `*`,
      element: (
        <div>
          <h1>404</h1>
        </div>
      ),
    },
  ]);