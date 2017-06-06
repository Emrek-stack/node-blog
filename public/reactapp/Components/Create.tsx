import * as React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { Modal, FormControl, Button, FormGroup, ControlLabel, Checkbox, Carousel, CarouselItem } from 'react-bootstrap'
import * as $ from 'jquery'
import * as JQuery from 'jquery'


import { Guid } from '../Helper/Guid'
import { Item } from '../model/Item';

export class Create extends React.Component<{ Item?: Item, show: boolean, closeFunc: any, fillDataFunc: any, createFunc: any, updateFunc: any }, { item: Item }>
{


    constructor(props: any) {
        super(props);

        let item: Item = {
            Title: '',
            Url: '',
            Gsm: '',
            Price: null,
            AllowBack: false,
            StatusId: true,
            IsTrans: false,
            IsConfirmed: false,
            IsFavorite: false,
            CallCount: 0,
            LastCallDate: null,
            Location: null,
            CreateDate: new Date(),
            _id: null,
            Files: new Array()
        };

        if (this.props.Item)
            this.state = { item: this.props.Item };
        else
            this.state = { item: item };

    }

    private Save() {
        //event.preventDefault();

        let data = {
            Title: this.state.item.Title,
            Url: this.state.item.Url,
            Gsm: this.state.item.Gsm,
            Price: this.state.item.Price,
            AllowBack: this.state.item.AllowBack,
            StatusId: this.state.item.StatusId,
            IsTrans: this.state.item.IsTrans,
            IsFavorite: this.state.item.IsFavorite,
            CallCount: this.state.item.CallCount,
            LastCallDate: this.state.item.LastCallDate,
            CreateDate: this.state.item.CreateDate,
            Location: this.state.item.Location,
            IsConfirmed: this.state.item.IsConfirmed,            
            _id: this.state.item._id

        }
        if (data._id) {
            this.props.updateFunc(data);
        }
        else {
            this.props.createFunc(data);
        }
    }

    private changeTitle(e: any) {
        var tmpState = this.state.item;
        tmpState.Title = e.target.value;
        this.setState({ item: tmpState });
    }


    private changeUrl(e: any) {
        var tmpState = this.state.item;
        tmpState.Url = e.target.value;
        this.setState({ item: tmpState });
    }

    private changeGsm(e: any) {
        var tmpState = this.state.item;
        tmpState.Gsm = e.target.value;
        this.setState({ item: tmpState });
    }

    private changePrice(e: any) {
        var tmpState = this.state.item;
        tmpState.Price = e.target.value;
        this.setState({ item: tmpState });
    }

    private changeLocation(e: any) {
        var tmpState = this.state.item;
        tmpState.Location = e.target.value;
        this.setState({ item: tmpState });
    }

    private changeAllowBack(e: any) {
        var tmpState = this.state.item;
        tmpState.AllowBack = e.target.checked;
        this.setState({ item: tmpState });
    }

    private changeStatusId(e: any) {
        var tmpState = this.state.item;
        tmpState.StatusId = e.target.checked;
        this.setState({ item: tmpState });
    }

    private changeIsConfirmed(e: any) {
        var tmpState = this.state.item;
        tmpState.IsConfirmed = e.target.checked;
        this.setState({ item: tmpState });
    }

    private changeIsTrans(e: any) {
        var tmpState = this.state.item;
        tmpState.IsTrans = e.target.checked;
        this.setState({ item: tmpState });
    }


    private changeIsFavorite(e: any) {
        var tmpState = this.state.item;
        tmpState.IsFavorite = e.target.checked;
        this.setState({ item: tmpState });
    }

    private onofftoBool(e: any): boolean {
        //console.log(e);
        if (e == "on")
            return true;
        if (e == "off")
            return false;

    }


    public render() {

        return <Modal show={this.props.show}
            bsSize="large"
            onHide={this.props.closeFunc}>
            <Modal.Body>
                <FormGroup controlId="Title">
                    <FormControl type="text" className="input-md" placeholder="Title" name="Title" value={this.state.item.Title} onChange={(e) => this.changeTitle(e)} />
                </FormGroup>
                <FormGroup controlId="Url">
                    <FormControl type="text" placeholder="Url" name="Url" value={this.state.item.Url} onChange={(e) => this.changeUrl(e)} />
                </FormGroup>
                <FormGroup controlId="Gsm">
                    <FormControl type="text" placeholder="Gsm" value={this.state.item.Gsm} onChange={(e) => this.changeGsm(e)} />
                </FormGroup>
                <FormGroup>

                    <FormControl type="text" placeholder="Price" value={this.state.item.Price} onChange={(e) => this.changePrice(e)} />
                </FormGroup>
                <FormGroup>
                    <FormControl type="text" placeholder="Location" value={this.state.item.Location} onChange={(e) => this.changeLocation(e)} />
                </FormGroup>
                <FormGroup>
                    <input type="checkbox" defaultChecked={this.state.item.AllowBack} onClick={(e) => this.changeAllowBack(e)} />AllowBack
                </FormGroup>
                <FormGroup>
                    <input type="checkbox" defaultChecked={this.state.item.StatusId} onClick={(e) => this.changeStatusId(e)} />StatusId
                </FormGroup>
                <FormGroup>
                    <input type="checkbox" defaultChecked={this.state.item.IsConfirmed} onClick={(e) => this.changeIsConfirmed(e)} />IsConfirmed
                </FormGroup>
                <FormGroup>
                    <input type="checkbox" defaultChecked={this.state.item.IsTrans} onClick={(e) => this.changeIsTrans(e)} />IsTrns
                </FormGroup>
                <FormGroup>
                    <input type="checkbox" defaultChecked={this.state.item.IsFavorite} onClick={(e) => this.changeIsFavorite(e)} />IsFavorite
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.closeFunc}>Close</Button>
                <Button type="Button" onClick={(e) => this.Save()} bsStyle="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>


    }
}