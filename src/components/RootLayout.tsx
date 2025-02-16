import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import '../index.css';
import { ContentBolck } from "./ContentBlock";
import { Bounce, ToastContainer } from "react-toastify";

export type Props = {
  children: React.ReactNode;
}

export function RootLayout() {
    return (
    <div className="h-screen flex flex-col"> 
      <Header />
      <main className="flex flex-col h-full px-2 sm:px-8 py-2 sm:py-5">
        <ContentBolck>
          <Outlet />
        </ContentBolck>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </main>
    </div>
    );
  }