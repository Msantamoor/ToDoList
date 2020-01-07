import React from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'
import CTForm from '../CreateTaskForm'
import CLForm from '../CreateListForm'
import CUForm from '../CreateUserForm'
import SIForm from '../SignInForm'
import SelectList from '../SelectList'
import EditTask from '../EditTask'
import EditList from '../EditList'

export const Routes = () => {
    return (  
          
        <div>
          <Switch>
          <Route exact path="/">
            <SIForm/>
          </Route>
          <PrivateRoute path="/CTForm">
            <CTForm />
          </PrivateRoute>
          <PrivateRoute path="/CLForm">
            <CLForm />
          </PrivateRoute>
          <Route path="/CUForm">
            <CUForm />
          </Route>
          <PrivateRoute path="/Select">
            <SelectList />
          </PrivateRoute>
          <PrivateRoute path="/ETask">
            <EditTask />
          </PrivateRoute>
          <PrivateRoute path="/EList">
            <EditList />
          </PrivateRoute>
          </Switch>
        </div>
    )
  }
  