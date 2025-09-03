import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainApplication from "./components/pages/MainApplication";
import SettingsApplication from "./components/pages/SettingsAppliation";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App child={<MainApplication />} />
    },
    {
        path: '/settings',
        element: <App child={<SettingsApplication />} />
    }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)