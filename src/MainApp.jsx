import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes)
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

        {/* 🔥 IMPORTANT: Suspense must wrap EVERYTHING */}
        <Suspense fallback={<FallbackSpinner />}>
          <Switch>
            <Route exact path="/" component={Home} />

            {data &&
              data.sections.map((route) => {
                const SectionComponent = React.lazy(() =>
                  import('./components/' + route.component)
                );

                return (
                  <Route
                    key={route.headerTitle}
                    path={route.path}
                    render={() => (
                      <SectionComponent header={route.headerTitle} />
                    )}
                  />
                );
              })}

            <Route component={Home} />
          </Switch>
        </Suspense>

      </main>
    </div>
  );
}

export default MainApp;