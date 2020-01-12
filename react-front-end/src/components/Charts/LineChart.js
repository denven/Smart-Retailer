import { ResponsiveLine } from '@nivo/line'
import React from 'react';

export default function MyResponsiveLine ({ data = 
  [
    {
      "id": "Smile",
      "color": "hsl(168, 70%, 50%)",
      "data": [
        {
          "x": "2",
          "y": 102
        },
        {
          "x": "4",
          "y": 130
        },
        {
          "x": "6",
          "y": 130
        },
        {
          "x": "8",
          "y": 108
        },
        {
          "x": "10",
          "y": 13
        },
        {
          "x": "12",
          "y": 254
        },
        {
          "x": "14",
          "y": 13
        },
        {
          "x": "16",
          "y": 214
        },
        {
          "x": "18",
          "y": 97
        },
        {
          "x": "20",
          "y": 50
        },
        {
          "x": "22",
          "y": 252
        },
        {
          "x": "24",
          "y": 29
        }
      ]
    },
    {
      "id": "Calm",
      "color": "hsl(347, 70%, 50%)",
      "data": [
        {
          "x": "2",
          "y": 239
        },
        {
          "x": "4",
          "y": 248
        },
        {
          "x": "6",
          "y": 143
        },
        {
          "x": "8",
          "y": 84
        },
        {
          "x": "10",
          "y": 213
        },
        {
          "x": "12",
          "y": 19
        },
        {
          "x": "14",
          "y": 233
        },
        {
          "x": "16",
          "y": 160
        },
        {
          "x": "18",
          "y": 36
        },
        {
          "x": "20",
          "y": 170
        },
        {
          "x": "22",
          "y": 40
        },
        {
          "x": "24",
          "y": 91
        }
      ]
    },
    {
      "id": "Annoyed",
      "color": "hsl(310, 70%, 50%)",
      "data": [
        {
          "x": "2",
          "y": 60
        },
        {
          "x": "4",
          "y": 235
        },
        {
          "x": "6",
          "y": 52
        },
        {
          "x": "8",
          "y": 234
        },
        {
          "x": "10",
          "y": 289
        },
        {
          "x": "12",
          "y": 225
        },
        {
          "x": "14",
          "y": 217
        },
        {
          "x": "16",
          "y": 113
        },
        {
          "x": "18",
          "y": 102
        },
        {
          "x": "20",
          "y": 80
        },
        {
          "x": "22",
          "y": 13
        },
        {
          "x": "24",
          "y": 111
        }
      ]
    },
    {
      "id": "Sad",
      "color": "hsl(65, 70%, 50%)",
      "data": [
        {
          "x": "2",
          "y": 15
        },
        {
          "x": "4",
          "y": 295
        },
        {
          "x": "6",
          "y": 163
        },
        {
          "x": "8",
          "y": 273
        },
        {
          "x": "10",
          "y": 252
        },
        {
          "x": "12",
          "y": 290
        },
        {
          "x": "14",
          "y": 85
        },
        {
          "x": "16",
          "y": 104
        },
        {
          "x": "18",
          "y": 87
        },
        {
          "x": "20",
          "y": 221
        },
        {
          "x": "22",
          "y": 49
        },
        {
          "x": "24",
          "y": 214
        }
      ]
    },
    {
      "id": "Anger",
      "color": "hsl(34, 70%, 50%)",
      "data": [
        {
          "x": "2",
          "y": 251
        },
        {
          "x": "4",
          "y": 221
        },
        {
          "x": "6",
          "y": 263
        },
        {
          "x": "8",
          "y": 143
        },
        {
          "x": "10",
          "y": 258
        },
        {
          "x": "12",
          "y": 247
        },
        {
          "x": "14",
          "y": 152
        },
        {
          "x": "16",
          "y": 276
        },
        {
          "x": "18",
          "y": 221
        },
        {
          "x": "20",
          "y": 138
        },
        {
          "x": "22",
          "y": 199
        },
        {
          "x": "24",
          "y": 140
        }
      ]
    }
  ]
  
}){
  return(
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: `Duration \b Filmed at 11:30 \b`,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Number of Emotions',
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
