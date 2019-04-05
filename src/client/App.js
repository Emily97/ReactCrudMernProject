import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import LecturerList from './LecturerList';
import ModuleList from './ModuleList';
import CreateRecipe from './CreateRecipe';
import EditRecipe from './EditRecipe';

// 'main' Component. Sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        <Route exact path="/" component={LecturerList}/>
        <Route path="/module/:id" component={ModuleList}/>
        <Route path="/create-recipe" component={CreateRecipe}/>
        <Route path="/edit-recipe/:id" component={EditRecipe}/>
      </div>
    </HashRouter>
  );
};

export default App;
