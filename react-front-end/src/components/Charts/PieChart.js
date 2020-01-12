import React from 'react';
import { ResponsivePie } from '@nivo/pie'

export default function MyResponsivePie (props) {
  if (props.emotions) {
    let data = [
      {
        "id": "Disgusted",
        "label": "Disgusted",
        "value": 27,
        "color": "hsl(57, 70%, 50%)"
      },
      {
        "id": "Happy",
        "label": "Happy",
        "value": 60,
        "color": "hsl(162, 70%, 50%)"
      },
      {
        "id": "Calm",
        "label": "Calm",
        "value": 45,
        "color": "hsl(92, 50%, 70%)"
      },
      {
        "id": "Anger",
        "label": "Anger",
        "value": 34,
        "color": "hsl(62, 50%, 70%)"
      },
      {
        "id": "confused",
        "label": "confused",
        "value": 23,
        "color": "hsl(157, 60%, 20%)"
      },
      {
        "id": "sad",
        "label": "sad",
        "value": 25,
        "color": "hsl(122, 30%, 70%)"
      },
      {
        "id": "fear",
        "label": "fear",
        "value": 32,
        "color": "hsl(71, 50%, 50%)"
      },
      {
        "id": "Surprised",
        "label": "Surprised",
        "value": 164,
        "color": "hsl(122, 10%, 90%)"
      }
    ]
    return(
      <ResponsivePie
          data={data}
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          innerRadius={0.4}
          padAngle={0}
          cornerRadius={0}
          colors={{ scheme: 'nivo' }}
          borderWidth={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={10}
          radialLabelsLinkHorizontalLength={15}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={0}
          motionDamping={0}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: '18-30'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: '30+'
                  },
                  id: 'lines'
              }
          ]}
      />
    )
  } else {
    let data = [
      {
        "id": "0-12",
        "label": "0-12",
        "value": 45,
        "color": "hsl(57, 70%, 50%)"
      },
      {
        "id": "13-17",
        "label": "13-17",
        "value": 87,
        "color": "hsl(162, 70%, 50%)"
      },
      {
        "id": "18-20",
        "label": "18-20",
        "value": 349,
        "color": "hsl(92, 50%, 70%)"
      },
      {
        "id": "21-25",
        "label": "21-25",
        "value": 102,
        "color": "hsl(62, 50%, 70%)"
      },
      {
        "id": "26-35",
        "label": "26-35",
        "value": 54,
        "color": "hsl(157, 60%, 20%)"
      },
      {
        "id": "36-45",
        "label": "36-45",
        "value": 82,
        "color": "hsl(122, 30%, 70%)"
      },
      {
        "id": "46+",
        "label": "46+",
        "value": 47,
        "color": "hsl(71, 50%, 50%)"
      }
    ]
    
    return(
      <ResponsivePie
          data={data}
          margin={{ top: 25, right: 25, bottom: 25, left: 25 }}
          innerRadius={0.4}
          padAngle={0}
          cornerRadius={0}
          colors={{ scheme: 'nivo' }}
          borderWidth={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={10}
          radialLabelsLinkHorizontalLength={15}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: 'color' }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={0}
          motionDamping={0}
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: '18-30'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: '30+'
                  },
                  id: 'lines'
              }
          ]}
      />
    )
  }
}