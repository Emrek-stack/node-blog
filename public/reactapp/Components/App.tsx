import * as React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'
import { Table, Checkbox } from 'react-bootstrap'
import * as $ from 'jquery'

import { Loading } from './Loading';
import { Create } from './Create';
import { Item } from '../model/Item';

export class App extends React.Component<any, { isModalOpen?: boolean, data?: any, filter?: any, item?: Item }>
{
    constructor(props: any) {
        super(props);
        this.state = (this.state = this.props);

        let filter = {
            AllowBack: false,
            IsConfirmed: false,
            StatusId: true,
            IsFavorite: false,
            IsTrans: false
        };
        this.state = { isModalOpen: false, data: null, filter: filter }
        this.fillData();

    }


    private fillData() {
        let tmpFilter = this.state.filter;
        this.setState({ data: null, filter: tmpFilter, isModalOpen: false });
        $.getJSON("/list", this.state.filter, cs => {
            let data = [];
            data = cs;
            this.setState({ data: data, filter: tmpFilter });
        });
    }

    public getById(item: any) {
        $.getJSON("/getById", { id: item._id }, cs => {
            this.setState({ item: cs });
            this.handleToggle();
        });
    }

    public handleToggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    private changeAllowBack() {
        let tmpAllowBack = !this.state.filter.AllowBack;
        let tmpFilter = this.state.filter;
        tmpFilter.AllowBack = tmpAllowBack;

        this.setState({ filter: tmpFilter })
        this.fillData();
    }

    private changeConfirmed() {
        let tmpConfirmed = !this.state.filter.IsConfirmed;
        let tmpFilter = this.state.filter;
        tmpFilter.IsConfirmed = tmpConfirmed;

        this.setState({ filter: tmpFilter })
        this.fillData();
    }

    private changeStatusId() {
        let tmpStatusId = !this.state.filter.StatusId;
        let tmpFilter = this.state.filter;
        tmpFilter.StatusId = tmpStatusId;

        this.setState({ filter: tmpFilter })
        this.fillData();
    }

    private changeFavorite() {
        let tmpFavorite = !this.state.filter.IsFavorite;
        let tmpFilter = this.state.filter;
        tmpFilter.IsFavorite = tmpFavorite;

        this.setState({ filter: tmpFilter });
        this.fillData();
    }


    private changeTran() {
        let tmpIsTran = !this.state.filter.IsTrans;
        let tmpFilter = this.state.filter;
        tmpFilter.IsTrans = tmpIsTran;

        this.setState({ filter: tmpFilter });
        this.fillData();
    }

    private classSelector(item: any): string {
        if (item.StatusId != false) {
            if (item.IsConfirmed == 1)
                return "success";
        }
        else {
            return "danger";
        }


        if (item.IsConf)
            return "error";


    }

    private create(data: Item) {
        $.post("/create", data, d => {
            console.log(d);
            let tmpState = this.state.data;
            tmpState.unshift(data);
            this.setState({ data: tmpState });
            this.handleToggle();

        });
    }

    private updateCallCount(item: Item) {
        var self = this;

        $.get('/updateCallInfo', { itemId: item._id, callCount: item.CallCount }, () => {
            self.callNumber(item.Gsm);
            item.CallCount = item.CallCount + 1;
            item.LastCallDate = new Date();


            let tmpState = this.state.data;
            var index = tmpState.findIndex((x: Item) => {
                return x._id == item._id;
            });
            tmpState[index] = item;
            this.setState({ data: tmpState });
        });
    }

    private callNumber(number: any) {
        var link = "tel:" + number;
        window.location.href = link;
    }


    public update(data: any) {
        $.post("/update", data, d => {
            let tmpState = this.state.data;
            var index = tmpState.findIndex((x: Item) => {
                return x._id == data._id;
            });
            tmpState[index] = data;
            this.setState({ data: tmpState });
            this.handleToggle();
            //this.fillData();
        });

    }

    private IsBackUpdate(item:any, e:any) {
        console.log(e.target.value);
        console.log(item);
        
        $.getJSON("/getById", { id: item._id }, cs => {
            
            
        });
    }

    private renderItem(item: any) {
        {
            return <tr key={item._id} className={this.classSelector(item)}>
                <td><a href={item.Url} target={item._id}>{item.Title}</a></td>
                <td><span onClick={(e) => this.updateCallCount(item)} className="btn btn-lg btn-success" title={item.Gsm}><i className="fa fa-whatsapp"></i></span></td>
                <td>{item.Location}</td>
                <td>{item.LastCallDate}</td>
                <td>{item.CallCount}</td>
                <td>
                    <div className="checkbox checkbox-success checkbox-inline">
                        <input type="checkbox" defaultChecked={item.AllowBack} />
                        <label></label>
                    </div>
                </td>
                <td>
                    <div className="checkbox checkbox-danger checkbox-inline">
                        <input type="checkbox" defaultChecked={item.IsTrans} />
                        <label></label>
                    </div>
                </td>
                <td><input type="text" className="form-control input-xs" value={item.Price} /></td>
                <td>
                    <div className="checkbox checkbox-primary checkbox-inline">
                        <input type="checkbox" defaultChecked={item.IsFavorite} onClick={(e)=> this.IsBackUpdate(item,e)}/>
                        <label></label>
                    </div>
                </td>
                <td>
                    <button onClick={() => this.getById(item)} className="btn btn-lg btn-success"><i className="fa fa-arrow-circle-up"></i></button>
                    {/*<a className="btn btn-xs btn-danger"><i className="fa fa-remove"></i></a>
                    <a className="btn btn-xs btn-success"><i className="fa fa-check"></i></a>*/}
                </td>
            </tr>;

        }
    }

    public render() {
        if (this.state.data) {

            let items = [];

            for (let entry of this.state.data) {
                items.push(this.renderItem(entry));
            }

            return <div>
                <div className="form-inline">
                    <Link className="btn btn-primary btn-xs" to="/create">create</Link>
                    <a onClick={() => this.handleToggle()} className="btn btn-primary btn-xs">create</a>
                    <Checkbox onClick={() => this.changeAllowBack()} defaultChecked={this.state.filter.AllowBack}>A.B.</Checkbox>
                    <span className="label label-default">&nbsp;</span>
                    <Checkbox onClick={() => this.changeConfirmed()} defaultChecked={this.state.filter.IsConfirmed}>Conf.</Checkbox>
                    <Checkbox onClick={() => this.changeFavorite()} defaultChecked={this.state.filter.IsFavorite}>Fav.</Checkbox>
                    <Checkbox onClick={() => this.changeStatusId()} defaultChecked={this.state.filter.StatusId}>Del.</Checkbox>
                    <Checkbox onClick={() => this.changeTran()} defaultChecked={this.state.filter.IsTrans}>Trn.</Checkbox>
                </div>


                <Table responsive>
                    <thead>
                        <th>
                            url
                    </th>
                        <th>
                            gsm
                    </th>
                             <th>
                            loc.
                    </th>
                        <th>
                            l.c.
                    </th>
                        <th>
                            c.c.
                    </th>
                        <th>
                            bck
                    </th>
                        <th>
                            tr.
                    </th>
                        <th>
                            pri.
                    </th>
                        <th>
                            fav.
                    </th>
                        <th>

                        </th>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>

                </Table>

                {this.state.isModalOpen ? <Create createFunc={this.create.bind(this)} updateFunc={this.update.bind(this)} show={this.state.isModalOpen} Item={this.state.item} closeFunc={this.handleToggle.bind(this)} fillDataFunc={() => this.fillData()} /> : null}
            </div>




        }
        return <Loading />;;
    }
}