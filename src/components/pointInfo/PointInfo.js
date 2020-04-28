import React from 'react';
import {Table, Button, FormControl} from 'react-bootstrap';
import i18n from "../../i18n";
class PointInfo extends React.Component {

    constructor(props) {
        super(props);
        this.map = props.map;
        this.state = {point: undefined, disabled:true};
        this.nameForm = React.createRef();
        this.descriptionForm = React.createRef();
    }

    setPoint(newPoint){
        this.setState({point: newPoint});
        if(newPoint!==undefined) {
            this.nameForm.current.value = newPoint.name === undefined ? "" : newPoint.name;
            this.descriptionForm.current.value = newPoint.description === undefined ? "" : newPoint.description;
        }
    }

    remove = () => {
        this.map.current.remove(this.state.point);
    };


    save = () => {
        let name = this.nameForm.current.value;
        let desc = this.descriptionForm.current.value;
        this.map.current.updatePointNameDescription(this.state.point,name,desc);
        this.disable();
    };

    disable = () => {
        this.setState({disabled:true});
    };

    enable = () => {
        this.setState({disabled:false});
    };



    isEditing(){
            return(<tr>
                <td><p style={{margin:"1.5vh"}}>{this.state.point.lat.toFixed(3)}</p></td>
                <td><p style={{margin:"1.5vh"}}>{this.state.point.lng.toFixed(3)}</p></td>
                <td><FormControl style={{margin:"1.5vh 0%"}} ref={this.nameForm} onChange={this.enable}></FormControl></td>
                <td><FormControl style={{margin:"1.5vh 0%"}} ref={this.descriptionForm} onChange={this.enable}></FormControl></td>
                <td >
                    <Button style={{margin:"1.5vh"}}
                             onClick={this.save}
                             disabled={this.state.disabled}><i className="fa fa-floppy-o" aria-hidden="true"></i></Button>
                    <Button style={{backgroundColor:"red", borderColor:"white", margin:"1.5vh"}}
                            onClick={this.remove}><i className="fa fa-trash-o fa-fw"></i></Button>
                </td>
            </tr>);
    }

    printPoint(){
        if(this.state.point===undefined){
            return <tr><td colSpan={5}>{i18n.t('editMessage')}</td></tr>;
        }
        else {
         return(this.isEditing());
        }
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>{i18n.t('latitude')}</th>
                            <th>{i18n.t('longitude')}</th>
                            <th>{i18n.t('name')}</th>
                            <th>{i18n.t('description')}</th>
                            <th>{i18n.t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printPoint()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
export default PointInfo;
