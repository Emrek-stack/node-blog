import * as React from 'react'
import { render } from 'react-dom'
import * as $ from 'jquery'

export class Loading extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);
    }



    public render() {

        return <div>
            <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading...</span>
        </div>

    }
}