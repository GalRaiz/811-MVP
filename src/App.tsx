import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssistanceFormRequest from './pages/AssistanceFormRequest';
import RequesterHomePage from './pages/RequesterHomePage';
import Loader from './components/Loader';
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
import ComponetsTests from './pages/ComponetsTests';

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
            <Route path="/components" element={<ComponetsTests />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/requesterHomePage" element={<RequesterHomePage />} />
            <Route
              path="/AssistanceFormRequest"
              element={<AssistanceFormRequest />}
            />
            <Route path="/RequestsPage" element={<RequestsPage />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
