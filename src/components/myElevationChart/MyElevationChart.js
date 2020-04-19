import React from 'react';
import { Line } from 'react-chartjs-2';


class MyElevationChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            points: props.route.getPoints()
        };
        this.init(this.state.points);
    }

    init(points) {
        let index = 1;
        this.data = {
            labels: points.map((p) => `P${index++}`),
            datasets: [
                {
                    label: 'Elevation',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: points.map((p) => p.getElevation()),
                }
            ]
        };
        this.lineOptions = {
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                    },
                }],
                yAxes: [{
                    // stacked: true,
                    gridLines: {
                        display: true,
                    },
                    ticks: {
                        beginAtZero: true,

                    },
                }],
            },
            legend: {
                display: false,
            },
            tooltips: {
                enabled: true,
            },
        };
    }

    update(newPoints) {
        this.init(newPoints);
        this.setState({ points: this.state.points });
    }

    render() {
        return (
            <div style={this.props.style}>
                <Line
                    data={this.data}
                    options={this.lineOptions}
                />
            </div>
        );
    }
}

export default MyElevationChart;
