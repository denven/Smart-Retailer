import React from 'react';
import { ResponsiveBar } from '@nivo/bar'


export default function MyResponsiveBar ({ data = 
  [
  {
    "Time": "4",
    "customers": 100,
    "customersColor": "hsl(19, 70%, 50%)",
    "male": 65,
    "maleColor": "hsl(60, 70%, 50%)",
    "female": 35,
    "femaleColor": "hsl(249, 70%, 50%)",
    "recurringCustomer": 20,
    "recurringCustomerColor": "hsl(114, 70%, 50%)",
  },
  {
    "Time": "8",
    "customers": 93,
    "customersColor": "hsl(122, 70%, 50%)",
    "male": 33,
    "maleColor": "hsl(129, 70%, 50%)",
    "female": 60,
    "femaleColor": "hsl(39, 70%, 50%)",
    "recurringCustomer": 33,
    "recurringCustomerColor": "hsl(19, 70%, 50%)",
  },
  {
    "Time": "12",
    "customers": 159,
    "customersColor": "hsl(17, 70%, 50%)",
    "male": 120,
    "maleColor": "hsl(189, 70%, 50%)",
    "female": 39,
    "femaleColor": "hsl(199, 70%, 50%)",
    "recurringCustomer": 50,
    "recurringCustomerColor": "hsl(360, 70%, 50%)",
  },
  {
    "Time": "16",
    "customers": 73,
    "customersColor": "hsl(229, 70%, 50%)",
    "male": 42,
    "maleColor": "hsl(295, 70%, 50%)",
    "female": 31,
    "femaleColor": "hsl(32, 70%, 50%)",
    "recurringCustomer": 12,
    "recurringCustomerColor": "hsl(229, 70%, 50%)",
  },
  {
    "Time": "20",
    "customers": 129,
    "customersColor": "hsl(259, 70%, 50%)",
    "male": 9,
    "maleColor": "hsl(280, 70%, 50%)",
    "female": 120,
    "femaleColor": "hsl(209, 70%, 50%)",
    "recurringCustomer": 100,
    "recurringCustomerColor": "hsl(344, 70%, 50%)",
  },
  {
    "Time": "24",
    "customers": 94,
    "customersColor": "hsl(307, 70%, 50%)",
    "male": 60,
    "maleColor": "hsl(219, 70%, 50%)",
    "female": 20,
    "femaleColor": "hsl(61, 70%, 50%)",
    "recurringCustomer": 35,
    "recurringCustomerColor": "hsl(183, 70%, 50%)",
  }
] }) {
  return (<ResponsiveBar
      data={data}
      keys={
        ['male', 
        'female', 
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