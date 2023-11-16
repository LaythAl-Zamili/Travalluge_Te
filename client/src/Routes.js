import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostFormModal from './components/PostFormModal';
import PostList from './components/PostList';
import PostCommentsPage from './components/PostCommentsPage';
import UserPage from './components/UserPage';
import SubPage from './components/SubPage';
import TopSubsPanel from './components/TopSubsPanel';
import SearchResults from './components/SearchResults';
import NotFoundPage from './components/NotFoundPage';

import { Container } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';

const Routes = () => {
  const classes = useMainPaperStyles();

  return (
    <Switch>
      {/* Route for the home page */}
      <Route exact path="/">
        <Container disableGutters className={classes.homepage}>
          {/* Container for the post form and post list */}
          <div className={classes.postsPanel}>
            <PostFormModal /> {/* Post form modal */}
            <PostList /> {/* Post list */}
          </div>
          <TopSubsPanel /> {/* Top subreddits panel */}
        </Container>
      </Route>
      {/* Route for the post comments page */}
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      {/* Route for the user page */}
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
      {/* Route for the subreddit page */}
      <Route exact path="/r/:sub">
        <SubPage />
      </Route>
      {/* Route for search results */}
      <Route exact path="/search/:query">
        <SearchResults />
      </Route>
      {/* Route for the not found page */}
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default Routes;
