export const Routes = () => {
    return (  
      <Router>
          <Switch>
        <div>
          <Route exact path="/" component={App} />
          <PrivateRoute path="/CTForm" component={CTForm} />
          <Route path="/CLForm" component={CLForm} />
          <Route path="/CUForm" component={CUForm} />
          <Route path="/SIForm" component={SIForm} />
        </div>
        </Switch>
      </Router>
    )
  }
  