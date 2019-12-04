import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ROOT_URL from '../../constants'
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Field, reduxForm } from 'redux-form'
import { getProfile } from '../../actions'
import { connect } from 'react-redux'
const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  {
    name: 'Page A', e: 24
  },
  {
    name: 'Page B', e: 13
  },
  {
    name: 'Page C', e: 98
  },
  {
    name: 'Page D', e: 39
  },
  {
    name: 'Page E', e: 48
  },
  {
    name: 'Page F', e: 38
  },
  {
    name: 'Page G', e: 43
  },
];

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};



class graph extends Component {

  constructor(props) {
    super(props);
    this.state = {


      data: []
    }

    //this.onPieEnter = this.onPieEnter.bind(this);
  }



  componentWillMount() {

    let email = sessionStorage.getItem('email');
    let data = { email: email }
    // alert(data.email)
    this.props.getProfile({ params: data }, (response) => {
      // console.log(this.props.user)
      // alert(response.data);
      console.log('Response user' + response.data)
      sessionStorage.setItem('userDtls', JSON.stringify(response.data))
    });
    //console.log(temp)
    let temp = JSON.parse(sessionStorage.getItem('userDtls'))

    let check = []
    for (let i = 1; i <= 31; i++) {
      check.push({ name: i, value: 0 })
    }
    //console.log(check)
    temp.profileviews.forEach(info => {

      check.forEach(vals => {
        if (vals.name < 10) {
          if (info.slice(8) === '0' + vals.name.toString() && info.slice(5, 7) === '12') {
            vals.value = vals.value + 1;
          }
        } else {
          if (info.slice(8) === vals.name.toString() && info.slice(5, 7) === '12') {
            vals.value = vals.value + 1;
          }
        }

      })
    })
    //console.log(check)
    this.setState({
      data: check
    });

  }



  render() {

    return (
      <div>

        <BarChart
          width={800}
          height={300}
          data={this.state.data}
          margin={{
            top: 20, right: 30, left: 10, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))
            }
          </Bar>
        </BarChart>
      </div>

    )
  }
}

// export default graph

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  { getProfile }
)(
  reduxForm({
    form: 'streamLogin',
  })(graph)
)