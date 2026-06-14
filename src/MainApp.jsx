import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

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
          <Route exact path="/" component={Home} />

          <Suspense fallback={<FallbackSpinner />}>
            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() =>
                  import('./components/' + route.component)
                );

                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    component={() => (
                      <SectionComponent header={route.headerTitle} />
                    )}
                  />
                );
              })}
          </Suspense>

          {/* fallback route */}
          <Route component={Home} />
        </Switch>
      </main>
    </div>
  );
}

export default MainApp;