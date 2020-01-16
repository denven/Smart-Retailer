import React, {useState} from 'react';
import { ResponsivePie } from '@nivo/pie'
import SexEmotionsToggle from './SexEmotionToggle';

export default function MyResponsivePie (props) {
  const [toggle, setToggle] = useState('sex');

  if (props.ages){
    let data = [
      {
        "id": "Pre-Teen",
        "label": "9-12",
        "value": props.ages["Pre-Teen"],
        "color": "hsl(57, 70%, 50%)"
      },
      {
        "id": "Teen",
        "label": "13-19",
        "value": props.ages["Teen"],
        "color": "hsl(162, 70%, 50%)"
      },
      {
        "id": "Young Adult",
        "label": "20-35",
        "value": props.ages["Young Adult"],
        "color": "hsl(92, 50%, 70%)"
      },
      {
        "id": "Middle Aged",
        "label": "36-55",
        "value": props.ages["Middle Aged"],
        "color": "hsl(62, 50%, 70%)"
      },
      {
        "id": "Senior",
        "label": "55+",
        "value": props.ages["55+"],
        "color": "hsl(157, 60%, 20%)"
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
          borderWidth={0}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={5}
          radialLabelsLinkHorizontalLength={2}
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
  } else if (props.sex && toggle === 'sex') {
    const data = [
      {
        "id": "Male",
        "label": "Male",
        "value": props.sex.Male,
        "color": "hsl(57, 70%, 50%)"
      },
      {
        "id": "Female",
        "label": "Female",
        "value": props.sex.Female,
        "color": "hsl(57, 70%, 50%)"
      }
    ];

    return(
      <>
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
            radialLabelsLinkHorizontalLength={10}
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
        <SexEmotionsToggle
        setToggle={setToggle}
        />
      </>
    )

  } else if (props.emotions && toggle === 'emotions') {

    let data = [
      {
        "id": "Disgusted",
        "label": "Disgusted",
        "value": props.emotions.DISGUSTED,
        "color": "hsl(57, 70%, 50%)"
      },
      {
        "id": "Happy",
        "label": "Happy",
        "value": props.emotions.HAPPY,
        "color": "hsl(162, 70%, 50%)"
      },
      {
        "id": "Calm",
        "label": "Calm",
        "value": props.emotions.CALM,
        "color": "hsl(92, 50%, 70%)"
      },
      {
        "id": "Angry",
        "label": "Angry",
        "value": props.emotions.ANGRY,
        "color": "hsl(62, 50%, 70%)"
      },
      {
        "id": "confused",
        "label": "confused",
        "value": props.emotions.CONFUSED,
        "color": "hsl(157, 60%, 20%)"
      },
      {
        "id": "sad",
        "label": "sad",
        "value": props.emotions.SAD,
        "color": "hsl(122, 30%, 70%)"
      },
      {
        "id": "fear",
        "label": "fear",
        "value": props.emotions.FEAR,
        "color": "hsl(71, 50%, 50%)"
      },
      {
        "id": "Surprised",
        "label": "Surprised",
        "value": props.emotions.SURPRISED,
        "color": "hsl(122, 10%, 90%)"
      }
    ]

    return(
      <>
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
            radialLabelsLinkHorizontalLength={10}
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
         <SexEmotionsToggle
          setToggle={setToggle}
        />
      </>
    )
  }
}