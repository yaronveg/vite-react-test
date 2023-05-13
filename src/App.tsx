import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import MainNavigation from "./shared/components/Navigation/MainHeader/MainNavigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks";
import { LoadingSpinner } from "./shared/components"

const Users = React.lazy(()=>import('./user/pages/Users'))
const UserPlaces = React.lazy(()=>import('./places/pages/UserPlaces'))
const NewPlace = React.lazy(()=>import('./places/pages/NewPlace/NewPlace'))
const UpdatePlace = React.lazy(()=>import('./places/pages/UpdatePlace/UpdatePlace'))
const Auth = React.lazy(()=>import('./user/pages/Auth/Auth'))

const App = () => {
  const { authProviderValue } = useAuth();
  let routes;
  if (authProviderValue.token) {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider value={authProviderValue}>
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={<div className="center"><LoadingSpinner/></div>}>
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
