import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Addjob from './components/AddJob/Addjob';
import Home from './components/Home/Home';
import JobEdit from './components/JobEdit/JobEdit';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import ViewJob from './components/ViewJob/ViewJob';
import AuthProvider from './contexts/AuthProvider';
import Main from './layout/Main';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: async () => {
            return fetch('http://localhost:5000/jobs')
          },
          element: <PrivateRoute><Home></Home></PrivateRoute>
        },
        {
          path: '/home',
          loader: async () => {
            return fetch('http://localhost:5000/jobs')
          },
          element: <PrivateRoute><Home></Home></PrivateRoute>
        },
        {
          path: '/addJob',
          loader: async () => {
            return fetch('http://localhost:5000/categories')
          },
          element: <PrivateRoute><Addjob></Addjob></PrivateRoute>
        },
        {
          path: '/viewJob',
          element: <PrivateRoute><ViewJob></ViewJob></PrivateRoute>
        },
        {
          path: '/viewJob/:editId',
          element: <PrivateRoute><JobEdit></JobEdit></PrivateRoute>
        },
      ]
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/registration',
      element: <Registration></Registration>
    },
  ])
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
