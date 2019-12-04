import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ROOT_URL from '../../constants'
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  {
    name: 'Page A', e: 24
  },
  {
    name: 'Page B', e: 13
  },
  {
    name: 'Page C',  e: 98
  },
  {
    name: 'Page D', e: 39
  },
  {
    name: 'Page E',  e: 48
  },
  {
    name: 'Page F',  e: 38
  },
  {
    name: 'Page G',  e: 43
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
      tweets: [],
      data: []
    }

    //this.onPieEnter = this.onPieEnter.bind(this);
  }

 

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
        let check=[]
        for(let i=1;i<=31;i++){
            check.push({ name: i, value: 0})
        }
        //console.log(check)
        this.state.tweets.forEach(info =>{
            check.forEach(vals =>{
              // console.log(info.time)
              //  console.log(vals.name)
              //  console.log(info.time.slice(8,10))
                
                if(vals.name<10){
                  if(info.time.slice(8,10)==='0'+vals.name.toString() && info.time.slice(5,7)==='12'){
                    vals.value = vals.value+1;
                }
              }else{
                if(info.time.slice(8,10)===vals.name.toString() && info.time.slice(5,7)==='12'){
                  vals.value = vals.value+1;
              }
              }
            })
        })
        //console.log(check)
        this.setState({
            data : check
          });
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

export default graph




// import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
// import {
//   BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeCategory10).range();

// const data = [
//   {
//     name: 'Page A', uv: 4000, female: 2400, male: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, female: 1398, male: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, female: 9800, male: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, female: 3908, male: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, female: 4800, male: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, female: 3800, male: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, female: 4300, male: 2100,
//   },
// ];

// const getPath = (x, y, width, height) => `M${x},${y + height}
//           C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
//           C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
//           Z`;

// const TriangleBar = (props) => {
//   const {
//     fill, x, y, width, height,
//   } = props;

//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };

// TriangleBar.propTypes = {
//   fill: PropTypes.string,
//   x: PropTypes.number,
//   y: PropTypes.number,
//   width: PropTypes.number,
//   height: PropTypes.number,
// };

// export default class Example extends PureComponent {
//   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/rnywhbu8/';

//   render() {
//     return (
//       <BarChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 20, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
//           {
//             data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={colors[index % 20]} />
//             ))
//           }
//         </Bar>
//       </BarChart>
//     );
//   }
// }
