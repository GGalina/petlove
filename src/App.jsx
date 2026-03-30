import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MainLayout from "@/layouts/MainLayout";
import HomeLayout from "@/layouts/HomeLayout/HomeLayout";

import HomePage from "@/features/home/pages/HomePage";
import NewsPage from "@/features/news/pages/NewsPage";
import NoticesPage from "@/features/notices/pages/NoticesPage";
import FriendsPage from "@/features/friends/pages/FriendsPage";

import LoginPage from "@/features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage/RegisterPage";

import ProfilePage from "@/features/profile/pages/ProfilePage";
import AddPetPage from "@/features/pets/pages/AddPetPage";

import NotFoundPage from "@/features/notfound/pages/NotFoundPage";

export default function App() {
  return (
    <>
    <Routes>

      <Route element={<HomeLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route element={<MainLayout />}>

        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/friends" element={<FriendsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-pet" element={<AddPetPage />} />

        <Route path="*" element={<NotFoundPage />} />

      </Route>
    
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
  );
}
