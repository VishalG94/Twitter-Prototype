import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ROOT_URL from '../../constants'

import {
    PieChart, Pie, Sector, Cell,
  } from 'recharts';

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.disp}</text>
      <text x={cx} y={cy+20} dy={8} textAnchor="middle" fill={fill}>{"Retweet: "}{value}</text>
      <text x={cx} y={cy-120} dy={8} textAnchor="middle" fill={fill}>{"Top 5 Retweeted Tweets"}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Retweet`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

class graph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      data : [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
      ],
      activeIndex: 0
    }

    this.onPieEnter = this.onPieEnter.bind(this);
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  componentWillMount() {
    var email = sessionStorage.getItem("email")
    //console.log(email);
    axios.get(ROOT_URL + '/fetchusertweets', {
      params: {
        email: email
      }
    })
      .then((response) => {
        //console.log("Received response")
        //console.log(response.data)
        //update the state with the response data
        this.setState({

          tweets: this.state.tweets.concat(response.data)
        });
        //console.log(this.state.tweets)
        let check =[]
        this.state.tweets.forEach(info =>{
            //console.log(info)
            //console.log(info.time.slice(8,10))
            check.push({ name: info.retweet.length, value: info.retweet.length , disp : info.text})
        })
        //console.log(check)
        check.sort((a, b) => parseInt(a.value) - parseInt(b.value)).reverse();        
        let ch=check.slice(0,5)
        this.setState({
            data : ch
          });
      });
  }



  render() {  
    
    return (
        <div>
      
          <PieChart width={500} height={300}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.state.data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        >
          {
          	this.state.data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
          </Pie>
      </PieChart>        
        </div>
  
      )
  }
}

export default graph

