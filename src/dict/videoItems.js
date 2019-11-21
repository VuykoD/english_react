const videoItems = {
    1100:{"id":"1100","idVideoName":3,"start":"55.5","end":"57.7","eng":"Same stories get old","transl":"Те же истории стареют"},
    1101:{"id":"1101","idVideoName":3,"start":"57.7","end":"60.38","eng":"Armor of bones and some gold","transl":"Броня из костей и немного золота"},
    1102:{"id":"1102","idVideoName":3,"start":"60.38","end":"63.79","eng":"You will remember me","transl":"Ты будешь помнить меня"},
    1103:{"id":"1103","idVideoName":3,"start":"63.8","end":"66.56","eng":"Remember me through history","transl":"Запомнить меня через историю"},
    1104:{"id":"1104","idVideoName":3,"start":"66.6","end":"68.86","eng":"my world is at stake","transl":"мой мир поставлен на карту"},
    1105:{"id":"1105","idVideoName":3,"start":"68.9","end":"71.34","eng":"with this sword i will take","transl":"с этим мечом я возьму"},
    1106:{"id":"1106","idVideoName":3,"start":"71.4","end":"74.78","eng":"I will have Victory","transl":"Я одержу победу"},
    1108:{"id":"1108","idVideoName":3,"start":"91.9","end":"94.","eng":"No war, all I want is peace","transl":"Нет войны, все, что я хочу, это мир"},
    1109:{"id":"1109","idVideoName":3,"start":"94.1","end":"96.85","eng":"It just wasn't enough, no answer from above","transl":"Этого просто не хватило, ответа сверху нет"},
    1110:{"id":"1110","idVideoName":3,"start":"96.9","end":"99.6","eng":"heaviness breaks my heart","transl":"тяжесть разбивает мое сердце"},
    1111:{"id":"1111","idVideoName":3,"start":"99.8","end":"102","eng":"Thunder, Thunder, pain go with me","transl":"Гром, Гром, боль иди со мной"},
    1112:{"id":"1112","idVideoName":3,"start":"102.1","end":"104.9","eng":"Rage in my eyes I still can see","transl":"Ярость в моих глазах я все еще вижу"},
    1113:{"id":"1113","idVideoName":3,"start":"105","end":"106.2","eng":"You couldn’t let it go","transl":"Вы не могли отпустить это"},
    1114:{"id":"1114","idVideoName":3,"start":"106.3","end":"107.66","eng":"This isn’t just a game","transl":"Это не просто игра"},
    1115:{"id":"1115","idVideoName":3,"start":"107.7","end":"114.7","eng":"and now you can only blame yourself","transl":"и теперь ты можешь винить только себя"},
    1116:{"id":"1116","idVideoName":3,"start":"148","end":"151.3","eng":"I will crush every single mob you bring","transl":" я раздавлю каждого моба, которого ты принесешь"},
    1117:{"id":"1117","idVideoName":3,"start":"151.5","end":"153.9","eng":"all these evil dreams you made","transl":" все эти злые мечты, которые вы сделали"},
    1118:{"id":"1118","idVideoName":3,"start":"154","end":"155.5","eng":"Your darkness is a lie","transl":"Твоя тьма - ложь"},
    1119:{"id":"1119","idVideoName":3,"start":"155.6","end":"156.7","eng":"This is where it ends","transl":"This is where it ends"},
    1120:{"id":"1120","idVideoName":3,"start":"156.8","end":"164.9","eng":"My power over you will always vanquish your most evil corruption","transl":"Моя власть над тобой всегда победит твою самую злую корупцию"},
    1121:{"id":"1121","idVideoName":3,"start":"165","end":"166.3","eng":"Just like a creeper","transl":"Так же, как крипер"},
    1122:{"id":"1122","idVideoName":3,"start":"167.6","end":"175.1","eng":"time to reap all the seeds you sow","transl":"время пожать все семена, которые вы сеете"},
    1123:{"id":"1123","idVideoName":3,"start":"208.8","end":"213.6","eng":"We will stand together","transl":"Мы будем вместе"},
    1124:{"id":"1124","idVideoName":3,"start":"214","end":"219.4","eng":"time will tell the few","transl":"время покажет мало"},
    1125:{"id":"1125","idVideoName":3,"start":"219.5","end":"224.7","eng":"I will live forever","transl":"Я буду жить вечно"},
    1126:{"id":"1126","idVideoName":3,"start":"224.8","end":"230","eng":"your days are now through","transl":"твои дни уже прошли"},
    1200:{"id":"1200","idVideoName":5,"start":"36.6","end":"40.2","eng":"Awakened by the sun’s rays,","transl":"Проснувшись от солнечных лучей"},
    1201:{"id":"1201","idVideoName":5,"start":"40.2","end":"44","eng":"up I rise for the new day.","transl":"Я поднимаюсь на новый день."},
    1202:{"id":"1202","idVideoName":5,"start":"44.1","end":"47.6","eng":"The same routine but I have changed,","transl":"Та же рутина, но я изменился,"},
    1203:{"id":"4","idVideoName":5,"start":"47.6","end":"51.3","eng":"no longer will I stay the same.","transl":"Я больше не буду оставаться прежним."},
    1204:{"id":"1203","idVideoName":5,"start":"51.2","end":"54.67","eng":"My doubts and weakness used to reign,","transl":"Мои сомнения и слабости царили,"},
    1205:{"id":"1205","idVideoName":5,"start":"54.67","end":"58.6","eng":"but a new power I have now gained,","transl":"но новая сила, которую я теперь получил,"},
    1206:{"id":"1206","idVideoName":5,"start":"58.6","end":"62","eng":"to face the day with a new light.","transl":"встретить день с новым светом"},
    1207:{"id":"1207","idVideoName":5,"start":"62","end":"66","eng":"Worries fade away, and I’m ready to fight.","transl":"Беспокойство исчезает, и я готов к бою."},
    1208:{"id":"1208","idVideoName":5,"start":"66","end":" 69.35","eng":"Continue on this winding road,","transl":"Продолжайте идти по этой извилистой дороге,"},
    1209:{"id":"1209","idVideoName":5,"start":"70.4","end":"73","eng":" start to show.","transl":" начать показывать."},
    1210:{"id":"1210","idVideoName":5,"start":"76.2","end":"80.4","eng":"gonna power up and it starts today.","transl":"собирается включиться, и это начинается сегодня."},
    1211:{"id":"1211","idVideoName":5,"start":"80.4","end":"87.2","eng":"A change is due, a different view, we must go on.","transl":"Из-за изменений, другого взгляда, мы должны продолжать"},
    1212:{"id":"1212","idVideoName":5,"start":"87.3","end":"95","eng":"I’ll find that key, inside of me, as we try to level up.","transl":"Я найду этот ключ внутри себя, когда мы попытаемся подняться."},
    1213:{"id":"1213","idVideoName":5,"start":"109.5","end":"113","eng":"Beyond my home my journeys told,","transl":"За пределами моего дома мои путешествия рассказали,"},
    1214:{"id":"1214","idVideoName":5,"start":"113.1","end":"116.7","eng":"thats full of life and love to behold.","transl":"это полно жизни и любви, чтобы созерцать."},
    1215:{"id":"1215","idVideoName":5,"start":"116.8","end":"120.1","eng":"The skills I’ve learned shape how I’ve grown,","transl":"Навыки, которые я изучил, формируют то, как я вырос,"},
    1216:{"id":"1216","idVideoName":5,"start":"120.1","end":"124","eng":"still so much of this world is unknown.","transl":"все еще так много в этом мире неизвестно."},
    1217:{"id":"1217","idVideoName":5,"start":"124","end":"127.3","eng":"Through storm and drought I’ll travel far,","transl":"Через шторм и засуху я буду путешествовать далеко,"},
    1218:{"id":"1218","idVideoName":5,"start":"127.4","end":"131","eng":"over mountain tops, to guide I’ll use the star.","transl":"над горными вершинами, чтобы вести, я буду использовать звезду."},
    1219:{"id":"1219","idVideoName":5,"start":"131.1","end":"134.55","eng":"It lights the way through the darkest night, ","transl":"Он освещает путь самой темной ночью,"},
    1220:{"id":"1220","idVideoName":5,"start":"134.7","end":"138.8","eng":"illuminating our path, the end is in sight.","transl":"освещая наш путь, конец виден"},
    1300:{"id":"1300","idVideoName":1,"start":"7","end":"12.2","eng":"I see trees of green","transl":"Я вижу зеленые деревья"},
    1301:{"id":"1301","idVideoName":1,"start":"12.5","end":"15.5","eng":"red roses too","transl":"красные розы"},
    1302:{"id":"1302","idVideoName":1,"start":"15.5","end":"22","eng":"I see them bloom for me and you","transl":"Я вижу, как они цветут для нас"},
    1303:{"id":"1303","idVideoName":1,"start":"27","end":"33.5","eng":"what a wonderful world","transl":"как же всё-таки чудесен мир"},
    1304:{"id":"1304","idVideoName":1,"start":"41.5","end":"44.5","eng":"and clouds of white","transl":"и белые облака"},
    1305:{"id":"1305","idVideoName":1,"start":"45","end":"48","eng":"The bright blessed day","transl":"Яркий радостный день"},
    1306:{"id":"1306","idVideoName":1,"start":"48.5","end":"51","eng":"dark sacred nights","transl":"тёмной ночи покров"},
    1307:{"id":"1307","idVideoName":1,"start":"66","end":"69","eng":"The colors of the rainbow","transl":"Всё многоцветье радуг"},
    1308:{"id":"1308","idVideoName":1,"start":"69","end":"72.5","eng":"so pretty in the sky","transl":"что в небесах висят"},
    1309:{"id":"1309","idVideoName":1,"start":"72.5","end":"79","eng":"Are also on the faces of people going by","transl":"Я также вижу в лицах людей вокруг меня"},
    1310:{"id":"1310","idVideoName":1,"start":"79","end":"87","eng":"I see friends shaking hands saying how do you do","transl":"Вижу встречу друзей и пожатие руки"},
    1311:{"id":"1311","idVideoName":1,"start":"87","end":"94","eng":"They're really saying I love you.","transl":"Это всё для меня как признание в любви"},
    1312:{"id":"1312","idVideoName":1,"start":"94","end":"99.7","eng":"I hear babies cry,","transl":"Слышу плач детей"},
    1313:{"id":"1313","idVideoName":1,"start":"99.7","end":"103","eng":"I watch them grow","transl":"я вижу как они растут"},
    1314:{"id":"1314","idVideoName":1,"start":"103","end":"107","eng":"They'll learn much more ","transl":"Знать будут больше, "},
    1315:{"id":"1315","idVideoName":1,"start":"107","end":"110","eng":"than I'll never know","transl":"чем мы сейчас"},
    1400:{"id":"1400","idVideoName":4,"start":"17.9","end":"20.77","eng":"Buddy, you're a boy, make a big noise","transl":"Приятель, ты – мальчик, наделай шума"},
    1401:{"id":"1401","idVideoName":4,"start":"20.77","end":"23.85","eng":"Playing in the street, gonna be a big man someday","transl":"Играешь на улице, однажды станешь большим человеком"},
    1402:{"id":"1402","idVideoName":4,"start":"23.85","end":"25.5","eng":"You got mud on your face","transl":"У тебя на лице грязь,"},
    1403:{"id":"1403","idVideoName":4,"start":"25.5","end":"27","eng":"You big disgrace","transl":"Ты - сплошное разочарование"},
    1404:{"id":"1404","idVideoName":4,"start":"27","end":"29.8","eng":"Kicking your can all over the place","transl":"Пинаешь банку повсюду"},
    1405:{"id":"1405","idVideoName":4,"start":"29.8","end":"34.5","eng":"Singing We will, we will rock you","transl":"Поешь Мы, мы вас раскачаем"},
    1406:{"id":"1406","idVideoName":4,"start":"42","end":"44.15","eng":"Buddy, you're a young man, hard man","transl":"Приятель, ты – молодой мужчина, крутой парень"},
    1407:{"id":"1407","idVideoName":4,"start":"44.15","end":"47.4","eng":"Shouting in the street, gonna take on the world some day","transl":"Кричишь на улице, однажды завоюешь мир"},
    1408:{"id":"1408","idVideoName":4,"start":"50.6","end":"53.6","eng":"Waving your banner all over the place","transl":"Размахиваешь своим флагом повсюду"},
    1409:{"id":"1409","idVideoName":4,"start":"65","end":"67.8","eng":"Buddy, you're an old man, poor man","transl":"Приятель, ты – старик, бедняк"},
    1410:{"id":"1410","idVideoName":4,"start":"65","end":"67.8","eng":"Buddy, you're an old man, poor man","transl":"Приятель, ты – старик, бедняк"},
    1411:{"id":"1411","idVideoName":4,"start":"67.8","end":"70","eng":"Pleading with your eyes, gonna make you some peace someday","transl":"Умоляешь взглядом, однажды обретешь покой"},
    1412:{"id":"1412","idVideoName":4,"start":"74","end":"77","eng":"Somebody better put you back into your place","transl":"Лучше кому-нибудь вернуть тебя на место"},
    1413:{"id":"1413","idVideoName":4,"start":"99","end":"101","eng":"Alright","transl":"Хорошо"},
    1500:{"id":"1500","idVideoName":2,"start":"14.5","end":"22.5","eng":"You think that I can’t live without your love","transl":"Вы думаете, что я не могу жить без вашей любви"},
    1501:{"id":"1501","idVideoName":2,"start":"22.5","end":"25","eng":"You’ll see,","transl":"Вот увидишь,"},
    1502:{"id":"1502","idVideoName":2,"start":"26","end":"33.5","eng":"You think I can’t go on another day.","transl":"Думаешь, я не смогу пойти на другой день."},
    1503:{"id":"1503","idVideoName":2,"start":"34","end":"39.9","eng":"You think I have nothing","transl":"Ты думаешь, у меня ничего нет"},
    1504:{"id":"1504","idVideoName":2,"start":"40","end":"45.7","eng":"Without you by my side,","transl":"Потеряв тебя,"},
    1505:{"id":"1505","idVideoName":2,"start":"47","end":"52.5","eng":"Somehow, some way","transl":" Как-нибудь..."},
    1506:{"id":"1506","idVideoName":2,"start":"57","end":"65","eng":"You think that I can never laugh again","transl":"Ты думаешь, я никогда вновь не засмеюсь,"},
    1507:{"id":"1507","idVideoName":2,"start":"69","end":"75.5","eng":"You think that you destroyed my faith in love.","transl":"Ты думаешь, что ты разрушил мою веру в любовь."},
    1508:{"id":"1508","idVideoName":2,"start":"77","end":"82","eng":"You think after all you've done","transl":" Ты думаешь, после всего, что ты сделал,"},
    1509:{"id":"1509","idVideoName":2,"start":"82","end":"88","eng":"I'll never find my way back home,","transl":" Я никогда не стану прежней."},
    1510:{"id":"1510","idVideoName":2,"start":"89.7","end":"96","eng":"Somehow, someday","transl":" Как-нибудь однажды..."},
    1511:{"id":"1511","idVideoName":2,"start":"100","end":"104","eng":"All by myself","transl":"В полном одиночестве,"},
    1512:{"id":"1512","idVideoName":2,"start":"104","end":"110","eng":"I don't need anyone at all","transl":"Мне никто не нужен."},
    1513:{"id":"1513","idVideoName":2,"start":"110","end":"113.2","eng":"I know I'll survive","transl":"Я знаю, что выживу,"},
    1514:{"id":"1514","idVideoName":2,"start":"113.2","end":"118","eng":"I know I'll stay alive,","transl":"Знаю, что останусь в живых."},
    1515:{"id":"1515","idVideoName":2,"start":"120","end":"126","eng":"All on my own","transl":"Совсем одна,"},
    1516:{"id":"1516","idVideoName":2,"start":"126","end":"132","eng":"I don't need anyone this time","transl":" Теперь мне никто не нужен."},
    1517:{"id":"1517","idVideoName":2,"start":"132","end":"134.7","eng":"It will be mine","transl":"Это время лишь для меня,"},
    1518:{"id":"1518","idVideoName":2,"start":"134.7","end":"140","eng":"No one can take it from me","transl":"И никто не сможет его у меня отнять,"},
    1519:{"id":"1519","idVideoName":2,"start":"151.7","end":"158.5","eng":"You think that you are strong, but you are weak","transl":" Ты думаешь, что ты сильный, но ты слабый,"},
    1520:{"id":"1520","idVideoName":2,"start":"161.7","end":"170","eng":"It takes more strength to cry, admit defeat.","transl":"Чтобы плакать и признавать поражения, нужно быть сильнее."},
    1521:{"id":"1521","idVideoName":2,"start":"170.7","end":"177","eng":"I have truth on my side,","transl":"На моей стороне правда,"},
    1522:{"id":"1522","idVideoName":2,"start":"177","end":"181.5","eng":"You only have deceit","transl":"На твоей - лишь обман."},
    1523:{"id":"1523","idVideoName":2,"start":"181.5","end":"190","eng":"You'll see, somehow, someday","transl":"Ты увидишь, как-нибудь, однажды..."}

};
//
export {videoItems as default};
