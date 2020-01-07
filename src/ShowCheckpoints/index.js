import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css'
import Map1 from './../Map';
import { Fetch } from 'react-data-fetching'

const uniqid = require('uniqid');
class MapData extends React.Component {
	data = {};
	constructor(props) {
		super(props);
		this.state = {
			x: this.props.url
		}
	}

	render() {
		return (
			<Fetch
				loader={<p>loading</p>}
				url={this.props.url}
				timeout={5000}
			>
				{({ data }) => (<Map1 key={uniqid()} route={this.props.route} Checkpoints={data} />)}
			</Fetch>)
	
	}

}

export default class ShowRoutes extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			marker: 'w',
			chooseRoute: 1
		};
	}


	show(e) {
		this.setState({ chooseRoute: e.target.value })
	}

	render() {

		if (this.state.marker === '-')
			return (<p>Loading .... </p>)

		const url1 = "api/oBackEnd/webresources/details/" + this.state.chooseRoute;

		return (
			<div class="row">
				<div class="col-sm-4">
					<div>
						<h3> Show Route checkpoints</h3>
						<MapData 
							url={url1} 
							key={uniqid()} 
							route={this.state.chooseRoutes}
						/>
						<select ref={this.routeRef} onChange={this.show.bind(this)} >

							<Fetch
								loader={<p>loader</p>} // Replace this with your lovely handcrafted loader
								url="api/oBackEnd/webresources/generic"
								timeout={5000}
							>
								{({ data }) => (	data.map(route=> <option value={route.id}>{route.name}</option>))}
							</Fetch>)
						</select>
					</div>
				</div>
			</div >

		)
	}
}

