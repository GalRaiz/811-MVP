import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AssistanceFormRequest from './pages/AssistanceFormRequest';
import RequesterHomePage from './pages/Requester/RequesterHomePage';
import AdminHomePage from './pages/Admin/AdminHomePage';
import Loader from './components/storybook/Loader/Loader';
import '../src/styles/_variables.scss';
import { useDispatch } from 'react-redux';
import {
  setRequestsStart,
  setRequestsSuccess,
  setRequestsFailure,
} from './store/requestsSlice';
import { resetForm } from './store/assistanceFormSlice';
import './App.scss';
import RequestsPage from './pages/RequestsPage';
import { assistanceRequests } from './data/requestsData';
import NotFoundPage from './pages/NotFoundPage';
import FormFieldDemo from './pages/FormFieldDemo';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import PageFooterDemo from './pages/PageFooterDemo';

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset form on page refresh
    dispatch(resetForm());
    dispatch(setRequestsStart());
    try {
      setTimeout(() => {
        dispatch(setRequestsSuccess(assistanceRequests));
      }, 3000);
    } catch {
      dispatch(setRequestsFailure('Failed to load requests'));
    }
    setIsLoading(false);
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* <header className="App-header">
            <img src={mateLogoGreen} className="App-logo" alt="logo" />
          </header> */}

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/formDemo" element={<FormFieldDemo />} />
            <Route path="/footerDemo" element={<PageFooterDemo />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/requesterHomePage" element={
              <ProtectedRoute requiredRole="Requester">
                <RequesterHomePage />
              </ProtectedRoute>
            } />
            <Route
              path="/AssistanceFormRequest"
              element={
                <ProtectedRoute requiredRole="Requester">
                  <AssistanceFormRequest />
                </ProtectedRoute>
              }
            />
            <Route path="/RequestsPage" element={
              <ProtectedRoute>
                <RequestsPage />
              </ProtectedRoute>
            } />
            <Route path="/adminHomePage" element={
              <ProtectedRoute requiredRole="Admin">
                <AdminHomePage />
              </ProtectedRoute>
            } />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
