import { createBrowserRouter } from "react-router-dom";
import ViewerLower3Th from "./pages/lower3th/viewer";
import FormLower3Th from "./pages/lower3th/form";
import Presentation from "./pages/lower3th/presentation";
import Painel from "./pages/lower3th/painel";
import FormLower3ThFull from "./pages/lower3th/formFull";


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
          path: `presentation`,
          element: <Presentation />,
        },
        {
          path: `form`,
          element: <FormLower3Th />,
        },
        {
          path: `form-full`,
          element: <FormLower3ThFull />,
        },
        {
          path: `painel`,
          element: <Painel />,
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