import React from 'react';
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {search} from "nominatim";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.map=props.map;
        this.search=React.createRef();
    }


    handleEnter = (event) => {

        if (event.charCode === 13) {
            this.lookFor(this.search.current.value);
        }
    };

    lookFor(text){

        document.getElementById("destination").innerText = "searching...";

        search({q: text}, function (err,opts,results) {
            if(results.length>0) {
                let firstFound = results[0];

                this.map.current.setState({editablePosition: [firstFound.lat, firstFound.lon]});
                this.map.current.setState({boundingbox: firstFound.boundingBox});

                document.getElementById("destination").innerText = firstFound.display_name;
            }
            else {
                document.getElementById("destination").innerText = "Not found. Search for another place";
            }

        }.bind(this));
    }


    render() {
        return (
            <div>
                <InputGroup className="mb-3" style={{ width: "50vw" }}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        id="txtSearch"
                        onKeyPress={this.handleEnter}
                        ref={this.search}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button id= "btnSearch" variant="primary" onClick={() => this.lookFor(this.search.current.value)} style={{ margin: "1.5vh" }}>Search</Button>
                <p id={"destination"}></p>
            </div>
        );
    }
}

export default SearchBar;

