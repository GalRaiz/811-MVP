import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AssistanceFormRequest from './pages/AssistanceFormRequest';
import RequesterHomePage from './pages/RequesterHomePage';
import Loader from './components/Loader';
import '../src/styles/_variables.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
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

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.requests.loading);

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
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* <header className="App-header">
            <img src={mateLogoGreen} className="App-logo" alt="logo" />
          </header> */}

          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/requesterHomePage' element={<RequesterHomePage />} />
            <Route
              path='/AssistanceFormRequest'
              element={<AssistanceFormRequest />}
            />
            <Route path='/RequestsPage' element={<RequestsPage />} />

            {/* 404 Page */}
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
