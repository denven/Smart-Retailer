aws rekognition index-faces \
    --image '{"S3Object":{"Bucket":"chengwen-frames","Name":"frame00517.png"}}' \
    --collection-id "frames" \
    --max-faces 10 \
    --quality-filter "AUTO" \
    --detection-attributes "ALL"
    


aws rekognition index-faces \
    --image '{"S3Object":{"Bucket":"chengwen-frames","Name":"frame01017.png"}}' \
    --collection-id "frames" \
    --max-faces 10 \
    --quality-filter "AUTO" \
    --detection-attributes "ALL
   
