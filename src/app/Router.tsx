import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/Root/RootLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { MainPage } from "../pages/Main/MainPage";
import { AccountPage } from "../pages/Account/AccountPage";
import { AccountManagementPage } from "../pages/AccountManagement/AccountManagementPage";
import { GetTests } from "../pages/Tests/Get/TestsPage";
import { RegistrationPage } from "../pages/Registration/RegistrationPage";
import { CreateTestWithAI } from "../pages/Tests/Create/CreateWithAIPage";
import { UpdateTest } from "../pages/Tests/Update/UpdatePage";
import { CreateTest } from "../pages/Tests/Create/CreatePage";
import { UpdateTask } from "../pages/Tasks/Update/UpdatePage";
import { CreateTask } from "../pages/Tasks/Create/CreatePage";
import { DecidePage } from "../pages/Tests/Get/DecidePage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <MainPage />
        },
        {
          path: "/tests",
          element: <GetTests />
        },
        {
          path: "/tests/update",
          element: <UpdateTest />
        },
        {
          path: "/tests/create",
          element: <CreateTest />
        },
        {
          path: "/tests/decide",
          element: <DecidePage />
        },
        {
          path: "/tests/createWithAI",
          element: <CreateTestWithAI />
        },
        {
          path: "/tasks/update",
          element: <UpdateTask />
        },
        {
          path: "/tasks/create",
          element: <CreateTask />
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
          path: "/register",
          element: <RegistrationPage />
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
  