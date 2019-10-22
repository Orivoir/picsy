import React from 'react';
import collections from './core/firebase/firebase';
import routes from './core/routes';
import {Switch,Route} from 'react-router-dom';

function App() {

  return (
    <>
      <Switch>
        {
          routes.map( route => (
            <Route 
              key={route.id}
              path={route.path}
              exact={route.exact}
              render={() => (
                <route.render
                  {...route.props}
                  db={collections}
                />
              )}
            />
          ) )
        }
      </Switch>
    </>
  );
}

export default App;
