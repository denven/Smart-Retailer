import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { msTohhmmss } from '../../helpers/helpers'

export default function MyResponsiveBar (props) {

  let data = [];

  // for (let i = 0; i < props.graph.timestamp.length; i++) {
  //   data.push( {"Time": props.graph.timestamp[i], "customers": props.graph.count[i], "customersColor": "hsl(307, 70%, 50%)"})
  // }

  // props.graph.timestamp.forEach( (timestamp, index) => {  
  //   if(index === 0 && timestamp !== 0) {
  //     data.push( { "Time": msTohhmmss(0), "customers": 0, "customersColor": "hsl(307, 70%, 50%)" });        
  //   }  
  //   data.push( {
  //     "Time": msTohhmmss(timestamp), 
  //     "customers": props.graph.count[index], 
  //     "customersColor": "hsl(307, 70%, 50%)"
  //   });
  // });

  let points = [];
  props.graph.timestamp.forEach( (timestamp, index) => {  
    if(index === 0 && timestamp !== 0) {
      points.push( { "Time": msTohhmmss(0), "customers": 0, "customersColor": "hsl(307, 70%, 50%)" });      
    }  
    points.push( {
      "Time": msTohhmmss(timestamp), 
      "customers": props.graph.count[index], 
      "customersColor": "hsl(307, 70%, 50%)"
    });
  });

  if(points.length > 0) {
    let delta = 1;
    if(points.length > 20){
      delta = parseInt(points.length / 10);
    }

    for(let i = 0; i < points.length - delta; i = i + delta) {
      // if(points[i].x !== points[i + delta].x) {
        data.push(points[i]);
      // } else {
        // points[i + delta].y = Math.max(points[i].y, points[i + delta].y);
      // }
    }
    data.push(points[points.length - delta]);
    console.log(`barchart data`, data);
  }


  return (<ResponsiveBar
      data={data}
      keys={
        ['customers'
        ]}
      indexBy="Time"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      groupMode="stacked"
      colors={{ scheme: 'nivo' }}
      defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
          }
      ]}
      fill={[
          {
              match: {
                  id: 'fries'
              },
              id: 'dots'
          },
          {
              match: {
                  id: 'female'
              },
              id: 'lines'
          }
      ]}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Time',
          legendPosition: 'middle',
          legendOffset: 32
      }}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Number of Customers',
          legendPosition: 'middle',
          legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      legends={[
          {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
  />)
}