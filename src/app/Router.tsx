import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/RootLayout";
import '../index.css';
import { LoginPage } from "../pages/Login/LoginPage";
import { MainPage } from "../pages/Main/MainPage";
import { AccountPage } from "../pages/Account/AccountPage";
import { AccountManagementPage } from "../pages/AccountManagement/AccountManagementPage";
import { PetsPage } from "../pages/Pets/PetsPage";
import { UpdatePage } from "../pages/Pets/UpdatePage";
import { CreatePage } from "../pages/Pets/CreatePage";
import { GetPage } from "../pages/Pets/GetPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/main",
          element: <MainPage />
        },
        {
          path: "/pets",
          element: <PetsPage />
        },
        {
          path: "/pets/update",
          element: <UpdatePage />
        },
        {
          path: "/pets/create",
          element: <CreatePage />
        },
        {
          path: "/pets/get",
          element: <GetPage />
        },
        {
          path: "/registration",
          element: <div>Регистрация</div>
        },
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/accountInfo",
          element: <AccountPage />
        },
        {
            path:"/volunteerManagement",
            element: <AccountManagementPage />
        }
      ],
      errorElement: <div>404 Страница не найдена!</div>
    }
  ])
  