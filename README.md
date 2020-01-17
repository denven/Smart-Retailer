## What's Smart-Retailer?

Smart-Retailer is a web application that uses Amazon Recognition APIs to extrapolate simple business analytics from videos for the day to day operations.

## How to use this APP?

1. Just hit that Upload button
2. Drag and drop mp4 files
3. Upload and drink a cup of coffee(The video analysis takes time, and the waiting time varies from duration, motions, persons, file sizes, resolutions of the video. It will awalys take several minutes to for a 20s video)

Note: You should have AWS credential keys to access the APIs, and be aware of your bills escpecially for the large size and compex videos. 


## What business analytics do we get from videos?
- Number of customers in the video
- age, sex, emotions (physical) 
- average time in video
- recurrences of previously analyzed people in videos
- average time before recurrences

## Screenshots
![Analysis for new comers](./docs/01-Analysis-LineChart.png#pic_center=960x500))

## What's is the stack
- Node.js
- Express
- Postgres
- AWS Rekognition, S3, SNS, SQS
- React
- Material UI
- Nivo Charts



