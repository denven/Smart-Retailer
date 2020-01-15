import { ResponsiveLine } from '@nivo/line'
import React from 'react';
import { msTohhmmss } from '../../helpers/helpers'
import { orderBy, uniq } from 'lodash';

export default function MyResponsiveLine (props){
  let data = []

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  if (props.all) {
    for (let video in props.graph.multiGraph) {
      data.push(
        {
          "id": `${video}`,
          "color": `hsl(${getRandomInt(180)}, ${getRandomInt(100)}%, ${getRandomInt(100)}%)`,
          "data": []
        }
      )
    }    

    const dataTest = [
      {
        "id": "asdfasf",
        "color": `hsl(${getRandomInt(180)}, ${getRandomInt(100)}%, ${getRandomInt(100)}%)`,
        "data": [{"x": "0", "y": 8},{"x": "17", "y": 23},{"x": "18", "y": 38},{"x": "19", "y": 150}]
      },
      {
        "id": "asdfadsfasdf",
        "color": `hsl(${getRandomInt(180)}, ${getRandomInt(100)}%, ${getRandomInt(100)}%)`,
        "data": [{"x": "0", "y": 30},{"x": "18", "y": 22},{"x": "24", "y": 50},{"x": "50", "y": 30}]
      },
      {
        "id": "asdfasfasdfasdfasdf",
        "color": `hsl(${getRandomInt(180)}, ${getRandomInt(100)}%, ${getRandomInt(100)}%)`,
        "data": [{"x": "0", "y": 10},{"x": "7", "y": 7},{"x": "17", "y": 55},{"x": "18", "y": 10},{"x": "20", "y": 30}]
      },
      {
        "id": "akljsdafjsla",
        "color": `hsl(${getRandomInt(180)}, ${getRandomInt(100)}%, ${getRandomInt(100)}%)`,
        "data": [{"x": "0", "y": 5},{"x": "10", "y": 16},{"x": "15", "y": 132},{"x": 18, "y": 50},{"x": 20, "y": 30}, {"x": 20, "y": 30}]
      }
    ]

    for (let i = 0; i < data.length; i++) {
      for(let video in props.graph.multiGraph) {
        if (data[i].id === video) {
          for (let j = 0; j < props.graph.multiGraph[video].timestamp.length; j++) {
            data[i].data.push({
              "x": msTohhmmss(props.graph.multiGraph[video].timestamp[j]), 
              "y": props.graph.multiGraph[video].count[j]}) 
          }
        }
      }
    }

    console.log('DAAAAAAAAAAAAAATAAA LINE CHART ALL', data);
    return(
      <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: 'linear' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickValues: 10,
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: `Time (S)`,
              legendOffset: 36,
              legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Number of Customers',
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          colors={{ scheme: 'nivo' }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
    );
  } else {
    for (let i = 0; i < props.graph.timestamp.length; i++) {
      if (!data[0]){
        data.push({
          "id": "Customers",
          "color": "hsl(168, 70%, 50%)",
          "data": []
        });
      }
    }
  }

  // for (let i = 0; i < props.graph.timestamp.length; i++) {  
  let points = [];
  props.graph.timestamp.forEach( (timestamp, index) => {  
    if(index === 0 && timestamp !== 0) {
      points.push( {"x": msTohhmmss(0), "y": 0});
    }  
    points.push( {"x": msTohhmmss(timestamp), "y": props.graph.count[index]});
  });

  if(points.length > 0) {
    console.log('points', points, props.graph.timestamp.length);
    for(let i = 0; i < points.length - 1; i++) {
      if(points[i].x !== points[i+1].x) {
        data[0].data.push(points[i]);
      } else {
        points[i+1].y = Math.max(points[i].y, points[i+1].y);
      }
    }
    console.log(data[0].data.length);
    data[0].data.push(points[points.length - 1]);
  }

  // props.graph.timestamp.forEach( (timestamp, index) => {  
  //   if(index === 0 && timestamp !== 0) {
  //     data[0].data.push( {"x": msTohhmmss(0), "y": 0});
  //   }  
  //   data[0].data.push( {"x": msTohhmmss(timestamp), "y": props.graph.count[index]});
  // });

  console.log(data);
  return(
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `Time (S)`,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Customers',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  );
  
}
