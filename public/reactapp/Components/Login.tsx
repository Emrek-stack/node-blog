import * as React from 'react'
import { render } from 'react-dom'
import * as $ from 'jquery'

export class Login extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
    }



    public render() {

        return <div className="top-content">
            <div className="inner-bg">
                <div className="container">

                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3 form-box">
                            <div className="form-top">
                                <div className="form-top-left">
                                    <h3>Login to our site</h3>
                                    <p>Enter your username and password to log on:</p>
                                </div>
                                <div className="form-top-right">
                                    <i className="fa fa-lock" />
                                </div>
                            </div>
                            <div className="form-bottom">
                                <form role="form" action="/users/login" method="post" className="login-form">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-username">Username</label>
                                        <input type="text" name="user" placeholder="Username..." className="form-username form-control" id="user" />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="form-password">Password</label>
                                        <input type="password" name="pass" placeholder="Password..." className="pass form-control" id="form-password" />
                                    </div>
                                    <button type="submit" className="btn">Sign in!</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}