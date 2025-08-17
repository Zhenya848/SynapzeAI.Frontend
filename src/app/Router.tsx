import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../components/Root/RootLayout";
import { LoginPage } from "../pages/Login/LoginPage";
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
import { DecideWithIntervalPage } from "../pages/Tests/Get/DecideWithIntervalPage";
import { VerdictPage } from "../pages/VerdictPage";
import { VerdictIntervalPage } from "../pages/VerdictIntervalPage";
import { GetSolvingHistories } from "../pages/SolvingHistories/SolvingHistoriesPage";
import { GlobalTests } from "../pages/Global/GlobalPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/global",
          element: <GlobalTests />
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
          path: "/tests/decide/:testId",
          element: <DecidePage />
        },
        {
          path: "/tests/decideWithInterval",
          element: <DecideWithIntervalPage />
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
          path: "/tests/verdict",
          element: <VerdictPage />
        },
        {
          path: '/tests/verdictInterval',
          element: <VerdictIntervalPage />
        },
        {
          path: '/tests/solvingHistories',
          element: <GetSolvingHistories />
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
  