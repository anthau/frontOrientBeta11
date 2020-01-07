
import React from 'react';
import { Map, CircleMarker, TileLayer,Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './../App.css';
import L from 'leaflet';
import TextPath from 'react-leaflet-textpath';


delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


class DrawMapLines extends React.Component {
	point_x = 0;
	point_y = 0;


	render() {

		const pointData = this.props.data;
		try {
			let lat = pointData[0][4]
			let lon = pointData[0][5]

			return (
				pointData.slice(1).map(point =>
					<TextPath
						positions={[[lat, lon], [point[4], point[5]]]}
						center

						offset={10}

					>  {lat = point[4] }
						{ lon = point[5]}
					</TextPath>

				)
			)
		} catch (e) {

			return (<div></div>)
		}


	}
}






export default class Map1 extends React.Component {
	point_x = 0;
	point_y = 0;

	constructor(props) {
		super(props);
		let text = [];


		try {

			this.point_x = this.props.Checkpoints[0][4];
			this.point_y =this.props.Checkpoints[0][5];
		} catch (e) {
		}

		this.state = { points: text };
	}

	render() {
		const data1 = this.props.Checkpoints;
		let items1 = [];
		try {
			data1.map(point => items1.push(<CircleMarker key={1}  center={[point[4], point[5]]} >
					 <Tooltip>  { point[6]  }</Tooltip> 
				</CircleMarker>
				))
		} catch (e) {

		}


		const position = [this.point_x, this.point_y]

		try {
			return (
				<div>
					<Map center={position} opacity={0.7} zoom={13} >
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						/>
						{items1}
						<DrawMapLines data={data1} />
					</Map>
				</div >
			)
		} catch (e) {

		}
	}
}
