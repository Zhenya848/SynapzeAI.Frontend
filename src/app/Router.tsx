import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/RootLayout";
import { LoginPage } from "../pages/Login/LoginPage";
import { MainPage } from "../pages/Main/MainPage";
import { AccountPage } from "../pages/Account/AccountPage";
import { AccountManagementPage } from "../pages/AccountManagement/AccountManagementPage";
import { GetTests } from "../pages/Tests/TestsPage";
import { UpdateTest } from "../pages/Tests/UpdatePage";
import { CreateTest } from "../pages/Tests/CreatePage";
import { CreateTask } from "../pages/Tasks/CreatePage";
import { UpdateTask } from "../pages/Tasks/UpdatePage";
import { RegistrationPage } from "../pages/Registration/RegistrationPage";
import { CreateTestWithAI } from "../pages/Tests/CreateWithAIPage";
import { CreateIntervalTest } from "../pages/Tests/CreateTypeIntervalPage";

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
          path: "/tests/createWithAI",
          element: <CreateTestWithAI />
        },
        {
          path: "/tests/createInterval",
          element: <CreateIntervalTest />
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
  