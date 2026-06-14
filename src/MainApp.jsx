import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavBarWithRouter from './components/NavBar';
import FallbackSpinner from './components/FallbackSpinner';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(() => { });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="MainApp">
      <NavBarWithRouter />

      <main className="main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          {data &&
            data.sections.map((route) => {
              const SectionComponent = React.lazy(() =>
                import('./components/' + route.component)
              );

              return (
                <Route
                  key={route.headerTitle}
                  path={route.path}
                  render={() => <SectionComponent header={route.headerTitle} />}
                />
              );
            })}

          {/* 🔥 THIS FIXES AUTO LANDING + INVALID ROUTES */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;