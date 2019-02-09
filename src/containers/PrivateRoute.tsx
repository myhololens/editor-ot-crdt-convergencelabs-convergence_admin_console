import {Redirect, Route, RouteProps} from "react-router";
import {ReactNode} from "react";
import React from "react";

export interface PrivateRouteProps extends RouteProps {
  loggedIn: boolean
}

export class PrivateRoute extends React.Component<PrivateRouteProps, {}> {

  public render(): ReactNode {
    const {loggedIn, component, ...rest} = this.props;
    const ComponentToRender: React.ComponentType<any> = component!;
    return (
      <Route
        {...rest}
        render={(props: RouteProps) => loggedIn ?
            <ComponentToRender {...props} /> : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {from: props.location}
                }}
              />
            )
        }
      />
    );
  }
}