import React from 'react';
import { ResponsivePie } from '@nivo/pie'

export default function MyResponsivePie ({ data = [
  
  {
    "id": "18-30",
    "label": "18-30",
    "value": 281,
    "color": "hsl(57, 70%, 50%)"
  },
  {
    "id": "30+",
    "label": "30+",
    "value": 164,
    "color": "hsl(162, 70%, 50%)"
  }
] }) {
  return(
    <ResponsivePie
        data={data}
        margin={{ top: 20, right: 10, bottom: 20, left: 10 }}
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
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
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
        // legends={[
        //     {
        //         anchor: 'bottom',
        //         direction: 'row',
        //         translateY: 56,
        //         itemWidth: 100,
        //         itemHeight: 18,
        //         itemTextColor: '#999',
        //         symbolSize: 18,
        //         symbolShape: 'circle',
        //         effects: [
        //             {
        //                 on: 'hover',
        //                 style: {
        //                     itemTextColor: '#000'
        //                 }
        //             }
        //         ]
        //     }
        // ]}
    />
  )
}