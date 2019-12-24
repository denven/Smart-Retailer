#!/bin/bash
sample.mp4 -ss 00:00:0.05 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame00050.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame00050.png -vf "crop=76:92:562:121" ./faces/frame000501.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:0.517 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame00517.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:1.017 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame01017.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame00517.png -vf "crop=76:94:556:146" ./faces/frame005171.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame00517.png -vf "crop=48:107:1029:342" ./faces/frame005172.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame01017.png -vf "crop=77:91:561:177" ./faces/frame010171.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:1.518 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame01518.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame01518.png -vf "crop=75:85:543:173" ./faces/frame015181.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:2.018 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame02018.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:2.519 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame02519.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame02018.png -vf "crop=75:84:534:157" ./faces/frame020181.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame02519.png -vf "crop=77:88:554:145" ./faces/frame025191.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame02519.png -vf "crop=52:92:457:207" ./faces/frame025192.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:3.019 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame03019.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame03019.png -vf "crop=76:87:577:137" ./faces/frame030191.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:3.52 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame03520.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame03520.png -vf "crop=72:88:609:133" ./faces/frame035201.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:4.02 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame04020.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame04020.png -vf "crop=74:87:619:134" ./faces/frame040201.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:4.521 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame04521.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame04521.png -vf "crop=73:89:572:135" ./faces/frame045211.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:5.522 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame05522.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame05522.png -vf "crop=76:96:332:144" ./faces/frame055221.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame05522.png -vf "crop=51:102:956:298" ./faces/frame055222.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:6.022 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame06022.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame06022.png -vf "crop=69:96:251:214" ./faces/frame060221.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame06022.png -vf "crop=84:103:496:200" ./faces/frame060222.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:6.523 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame06523.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame07023.png -vf "crop=86:105:483:175" ./faces/frame070231.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame06523.png -vf "crop=88:107:481:191" ./faces/frame065231.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:7.023 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame07023.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:7.524 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame07524.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame07524.png -vf "crop=91:111:497:156" ./faces/frame075241.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:8.024 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame08024.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:8.525 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame08525.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame08024.png -vf "crop=98:101:530:175" ./faces/frame080241.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame08525.png -vf "crop=88:108:538:166" ./faces/frame085251.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:9.025 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame09025.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame09025.png -vf "crop=86:122:548:148" ./faces/frame090251.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:9.526 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame09526.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame09526.png -vf "crop=81:128:562:145" ./faces/frame095261.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:10.026 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame10026.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame10026.png -vf "crop=87:119:565:137" ./faces/frame100261.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:10.527 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame10527.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame10527.png -vf "crop=91:127:552:141" ./faces/frame105271.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:11.027 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame11027.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame11027.png -vf "crop=107:133:527:123" ./faces/frame110271.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:11.528 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame11528.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame11528.png -vf "crop=118:147:489:142" ./faces/frame115281.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:12.028 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame12028.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame12028.png -vf "crop=172:222:547:61" ./faces/frame120281.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:12.529 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame12529.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame12529.png -vf "crop=173:213:603:77" ./faces/frame125291.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame12529.png -vf "crop=86:122:236:478" ./faces/frame125292.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:13.029 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame13029.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame13029.png -vf "crop=145:213:544:129" ./faces/frame130291.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame13029.png -vf "crop=77:129:256:521" ./faces/frame130292.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:13.53 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame13530.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame13530.png -vf "crop=125:203:463:149" ./faces/frame135301.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame13530.png -vf "crop=66:100:286:546" ./faces/frame135302.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:14.03 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame14030.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame14030.png -vf "crop=127:199:423:162" ./faces/frame140301.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:14.531 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame14531.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame14531.png -vf "crop=122:202:414:139" ./faces/frame145311.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:15.031 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame15031.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame15031.png -vf "crop=141:217:401:131" ./faces/frame150311.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:15.532 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame15532.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame15532.png -vf "crop=185:191:381:209" ./faces/frame155321.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:16.032 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame16032.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame16032.png -vf "crop=171:191:359:227" ./faces/frame160321.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:16.533 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame16533.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame16533.png -vf "crop=162:189:349:223" ./faces/frame165331.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:17.033 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame17033.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame17033.png -vf "crop=170:204:307:186" ./faces/frame170331.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:17.5 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame17500.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame17500.png -vf "crop=176:222:327:147" ./faces/frame175001.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:17.534 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame17534.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame17534.png -vf "crop=178:224:329:144" ./faces/frame175341.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:18.001 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame18001.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame18001.png -vf "crop=183:217:390:136" ./faces/frame180011.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:18.034 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame18034.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame18034.png -vf "crop=186:219:391:132" ./faces/frame180341.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:18.501 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame18501.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame18501.png -vf "crop=174:203:473:139" ./faces/frame185011.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:18.535 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame18535.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame18535.png -vf "crop=172:203:477:138" ./faces/frame185351.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:19.002 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame19002.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame19002.png -vf "crop=165:225:564:122" ./faces/frame190021.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:19.035 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame19035.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame19035.png -vf "crop=166:227:566:123" ./faces/frame190351.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:19.502 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame19502.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame19502.png -vf "crop=172:220:587:135" ./faces/frame195021.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:19.536 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame19536.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame19536.png -vf "crop=172:217:589:135" ./faces/frame195361.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:20.503 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame20503.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame20503.png -vf "crop=177:202:601:136" ./faces/frame205031.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:21.004 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame21004.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame21004.png -vf "crop=174:233:555:106" ./faces/frame210041.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:21.504 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame21504.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame21504.png -vf "crop=175:203:447:170" ./faces/frame215041.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:22.005 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame22005.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame22005.png -vf "crop=172:202:370:223" ./faces/frame220051.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:20.003 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame20003.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:22.505 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame22505.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame22505.png -vf "crop=177:201:288:198" ./faces/frame225051.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:23.006 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame23006.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame23006.png -vf "crop=173:213:197:161" ./faces/frame230061.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:23.506 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame23506.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame23506.png -vf "crop=175:252:346:70" ./faces/frame235061.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:24.007 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame24007.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame24007.png -vf "crop=155:243:403:96" ./faces/frame240071.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:24.507 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame24507.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame24507.png -vf "crop=117:248:518:96" ./faces/frame245071.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:25.008 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame25008.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame25008.png -vf "crop=114:219:622:138" ./faces/frame250081.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:25.508 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame25508.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame25508.png -vf "crop=96:223:628:110" ./faces/frame255081.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:26.509 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame26509.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame26509.png -vf "crop=176:246:200:119" ./faces/frame265091.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame20003.png -vf "crop=167:209:609:120" ./faces/frame200031.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame26509.png -vf "crop=149:231:60:144" ./faces/frame265092.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:27.01 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame27010.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame27010.png -vf "crop=142:229:526:49" ./faces/frame270101.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:27.51 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame27510.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:28.011 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame28011.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:28.511 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame28511.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame27510.png -vf "crop=144:247:730:23" ./faces/frame275101.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame28011.png -vf "crop=107:161:650:121" ./faces/frame280111.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame28511.png -vf "crop=105:153:703:133" ./faces/frame285111.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:29.012 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame29012.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame29012.png -vf "crop=108:147:580:141" ./faces/frame290121.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame29512.png -vf "crop=127:134:411:154" ./faces/frame295121.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:29.512 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame29512.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:30.013 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame30013.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame30013.png -vf "crop=119:151:482:134" ./faces/frame300131.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:30.513 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame30513.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame30513.png -vf "crop=124:150:618:133" ./faces/frame305131.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:31.014 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame31014.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame31014.png -vf "crop=136:143:639:157" ./faces/frame310141.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:31.514 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame31514.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame31514.png -vf "crop=156:144:624:167" ./faces/frame315141.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:32.015 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame32015.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame32015.png -vf "crop=160:138:590:147" ./faces/frame320151.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:32.515 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame32515.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame32515.png -vf "crop=152:204:597:49" ./faces/frame325151.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:33.016 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame33016.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame33016.png -vf "crop=160:222:582:33" ./faces/frame330161.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:33.516 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame33516.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame33516.png -vf "crop=157:151:576:155" ./faces/frame335161.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:34.017 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame34017.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame34017.png -vf "crop=144:224:571:76" ./faces/frame340171.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:35.018 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame35018.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame35018.png -vf "crop=199:192:155:123" ./faces/frame350181.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:35.518 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame35518.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame35518.png -vf "crop=180:243:341:50" ./faces/frame355181.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:36.019 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame36019.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:36.519 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame36519.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame36019.png -vf "crop=170:258:431:47" ./faces/frame360191.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame36519.png -vf "crop=177:265:650:73" ./faces/frame365191.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:37.02 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame37020.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame37020.png -vf "crop=174:248:745:16" ./faces/frame370201.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:37.52 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame37520.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame37520.png -vf "crop=196:262:655:33" ./faces/frame375201.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:38.021 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame38021.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame38021.png -vf "crop=200:225:562:190" ./faces/frame380211.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:38.488 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame38488.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame38488.png -vf "crop=190:228:383:204" ./faces/frame384881.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:38.521 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame38521.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame38521.png -vf "crop=194:233:442:201" ./faces/frame385211.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:38.955 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame38955.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame38955.png -vf "crop=198:226:423:199" ./faces/frame389551.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame39022.png -vf "crop=195:227:426:196" ./faces/frame390221.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:39.022 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame39022.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:39.456 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame39456.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame39456.png -vf "crop=199:253:429:230" ./faces/frame394561.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:39.522 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame39522.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame39522.png -vf "crop=196:248:446:239" ./faces/frame395221.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:39.956 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame39956.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame39956.png -vf "crop=209:245:658:306" ./faces/frame399561.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:40.023 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame40023.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame40023.png -vf "crop=206:259:712:309" ./faces/frame400231.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:40.457 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame40457.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame40457.png -vf "crop=128:225:624:80" ./faces/frame404571.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:41.458 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame41458.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame41458.png -vf "crop=148:143:235:212" ./faces/frame414581.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame41458.png -vf "crop=148:150:823:-61" ./faces/frame414582.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:41.958 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame41958.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame41958.png -vf "crop=134:165:218:183" ./faces/frame419581.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame41958.png -vf "crop=151:151:848:-30" ./faces/frame419582.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:42.459 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame42459.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame42459.png -vf "crop=152:140:845:-20" ./faces/frame424592.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame42459.png -vf "crop=133:170:213:183" ./faces/frame424591.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:42.959 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame42959.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame42959.png -vf "crop=131:179:242:174" ./faces/frame429591.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame42959.png -vf "crop=153:141:859:-23" ./faces/frame429592.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:43.46 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame43460.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame43460.png -vf "crop=133:176:249:173" ./faces/frame434601.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame43460.png -vf "crop=152:141:893:-12" ./faces/frame434602.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:43.96 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame43960.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame43960.png -vf "crop=136:169:246:154" ./faces/frame439601.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame43960.png -vf "crop=154:138:897:-22" ./faces/frame439602.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:44.461 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame44461.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame44461.png -vf "crop=153:149:746:-14" ./faces/frame444612.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame44461.png -vf "crop=138:150:267:156" ./faces/frame444611.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:44.961 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame44961.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame44961.png -vf "crop=158:165:506:3" ./faces/frame449611.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:45.462 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame45462.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame45462.png -vf "crop=160:216:654:127" ./faces/frame454621.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame45462.png -vf "crop=137:173:178:86" ./faces/frame454622.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:45.962 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame45962.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame45962.png -vf "crop=140:136:331:133" ./faces/frame459621.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame45962.png -vf "crop=155:221:756:59" ./faces/frame459622.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:46.463 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame46463.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame46463.png -vf "crop=158:220:766:75" ./faces/frame464631.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame46463.png -vf "crop=141:142:328:146" ./faces/frame464632.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:46.963 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame46963.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame46963.png -vf "crop=161:211:752:95" ./faces/frame469631.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame46963.png -vf "crop=141:132:323:170" ./faces/frame469632.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:47.464 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame47464.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame47464.png -vf "crop=159:215:710:91" ./faces/frame474641.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame47464.png -vf "crop=144:134:294:161" ./faces/frame474642.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:47.964 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame47964.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame47964.png -vf "crop=142:224:734:69" ./faces/frame479641.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame47964.png -vf "crop=148:136:255:158" ./faces/frame479642.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:48.465 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame48465.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame48465.png -vf "crop=138:174:174:111" ./faces/frame484651.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame48465.png -vf "crop=123:225:717:68" ./faces/frame484652.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:48.965 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame48965.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame48965.png -vf "crop=143:146:184:147" ./faces/frame489651.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:49.466 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame49466.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame48965.png -vf "crop=117:223:691:75" ./faces/frame489652.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame49466.png -vf "crop=143:138:177:188" ./faces/frame494661.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:49.966 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame49966.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame49966.png -vf "crop=140:131:164:206" ./faces/frame499661.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame49966.png -vf "crop=111:216:653:95" ./faces/frame499662.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:50.967 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame50967.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame50967.png -vf "crop=161:233:567:96" ./faces/frame509671.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame50967.png -vf "crop=146:134:158:191" ./faces/frame509672.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:50.467 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame50467.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:51.468 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame51468.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame51468.png -vf "crop=167:231:532:92" ./faces/frame514681.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame51468.png -vf "crop=143:121:157:197" ./faces/frame514682.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:51.968 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame51968.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame50467.png -vf "crop=163:230:556:103" ./faces/frame504671.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:52.469 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame52469.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame52469.png -vf "crop=145:228:634:134" ./faces/frame524691.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:52.969 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame52969.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame51968.png -vf "crop=150:225:645:115" ./faces/frame519681.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame52969.png -vf "crop=138:234:634:131" ./faces/frame529691.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame50467.png -vf "crop=141:129:159:194" ./faces/frame504672.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:53.47 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame53470.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:53.97 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame53970.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame53470.png -vf "crop=132:236:642:135" ./faces/frame534701.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:54.971 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame54971.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame53970.png -vf "crop=146:225:635:115" ./faces/frame539701.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame54971.png -vf "crop=161:225:680:122" ./faces/frame549711.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:55.472 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame55472.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame55472.png -vf "crop=159:220:678:112" ./faces/frame554721.png > /dev/null 2>&1
ffmpeg -i ./sample.mp4 -ss 00:00:55.972 -qmin 1 -q:v 1 -frames:v 1 ./pictures/frame55972.png > /dev/null 2>&1
ffmpeg -i ./pictures/frame55972.png -vf "crop=159:240:639:97" ./faces/frame559721.png > /dev/null 2>&1
