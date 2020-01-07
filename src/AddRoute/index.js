import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import './../App.css'

import Logo from "./image.svg";
class AddRoute extends React.Component {


	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.textRoute = React.createRef();
		this.map = React.createRef();

		this.deleteRoute = React.createRef();

		this.state = {
			value: null,
			Routes: [<option key={1} value="3">Three</option>]
		};

	}


	componentDidMount() {
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		var t = this;
		xhr.addEventListener("readystatechange", function () {

			if (this.readyState === 4) {
				let routes = JSON.parse(this.responseText)
				let keys = [];


				routes.map(key => keys.push(<option key={1} value={key.id}>{key.name}</option>))


				t.setState({
					Routes: keys
				});



			}
		});

		//Gets the select box information
		xhr.open("GET", "api/oBackEnd/webresources/generic");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.18.0");
		xhr.setRequestHeader("Accept", "*/*");
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.setRequestHeader("Postman-Token", "f73441d8-4e76-4279-88bf-b3b41f61c033,f08ded73-7f78-4202-a38f-4649b13fa2af");
		xhr.setRequestHeader("Host", "192.168.99.100");
		xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
		xhr.setRequestHeader("Content-Length", "38");
		xhr.setRequestHeader("Connection", "keep-alive");
		xhr.setRequestHeader("cache-control", "no-cache");

		xhr.send();

	}

	send(e) {

		alert(this.textRoute.current.value);
		var data = JSON.stringify({
			"name": this.textRoute.current.value,
			"city": this.textInput.current.value,
			"map": this.map.current.value

		});

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
			if (this.readyState === 4) {

				alert(this.responseText);
			}
		});

		xhr.open("PUT", "api/oBackEnd/webresources/generic");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("User-Agent", "PostmanRuntime/7.18.0");
		xhr.setRequestHeader("Accept", "*/*");
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.setRequestHeader("Postman-Token", "f73441d8-4e76-4279-88bf-b3b41f61c033,f08ded73-7f78-4202-a38f-4649b13fa2af");
		xhr.setRequestHeader("Host", "192.168.99.100");
		xhr.setRequestHeader("Accept-Encoding", "gzip, deflate");
		xhr.setRequestHeader("Content-Length", "38");
		xhr.setRequestHeader("Connection", "keep-alive");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.send(data);
	}


	render() {


		return (
			<div class="row">
				<div class="col-sm-4">
					<img
						src={Logo}
						style={{ height: 100, width: 100 }}
						alt="website logo"
					/>
				</div>
				<div class="col-sm-4">
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Label><b>Route name</b></Form.Label>
							<Form.Control id="name" type="text" placeholder="easy 2" ref={this.textRoute} />
							<Form.Text className="text-muted">
								<b>Add Route</b>
							</Form.Text>
							<hr />

							<Form.Label><b>City</b></Form.Label>
							<Form.Control type="text" placeholder="City" ref={this.textInput} />
							<Form.Text className="text-muted">
								<b>Add City</b>
								<hr />
							</Form.Text>


							<Form.Label><b>Map</b></Form.Label>
							<Form.Control type="text" placeholder="Map" ref={this.map} />
							<Form.Text className="text-muted">
								<b>Add City</b>
								<hr />
							</Form.Text>
						</Form.Group>
					</Form>
					<Button variant="primary" onClick={this.send.bind(this)} type="submit">
						Add routes
  </Button>
					<br />





				</div>
			</div>

		)
	}
}

export default AddRoute;
