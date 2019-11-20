const videoItems = {
    1100:{"id":"1","idVideoName":3,"start":"55.5","end":"57.7","eng":"Same stories get old","transl":"Те же истории стареют"},
    1101:{"id":"2","idVideoName":3,"start":"57.7","end":"60.38","eng":"Armor of bones and some gold","transl":"Броня из костей и немного золота"},
    1102:{"id":"3","idVideoName":3,"start":"60.38","end":"63.79","eng":"You will remember me","transl":"Ты будешь помнить меня"},
    1103:{"id":"4","idVideoName":3,"start":"63.8","end":"66.56","eng":"Remember me through history","transl":"Запомнить меня через историю"},
    1104:{"id":"5","idVideoName":3,"start":"66.6","end":"68.86","eng":"my world is at stake","transl":"мой мир поставлен на карту"},
    1105:{"id":"6","idVideoName":3,"start":"68.9","end":"71.34","eng":"with this sword i will take","transl":"с этим мечом я возьму"},
    1106:{"id":"7","idVideoName":3,"start":"71.4","end":"74.78","eng":"I will have Victory","transl":"Я одержу победу"},
    1108:{"id":"9","idVideoName":3,"start":"91.9","end":"94.","eng":"No war, all I want is peace","transl":"Нет войны, все, что я хочу, это мир"},
    1109:{"id":"10","idVideoName":3,"start":"94.1","end":"96.85","eng":"It just wasn't enough, no answer from above","transl":"Этого просто не хватило, ответа сверху нет"},
    1110:{"id":"11","idVideoName":3,"start":"96.9","end":"99.6","eng":"heaviness breaks my heart","transl":"тяжесть разбивает мое сердце"},
    1111:{"id":"12","idVideoName":3,"start":"99.8","end":"102","eng":"Thunder, Thunder, pain go with me","transl":"Гром, Гром, боль иди со мной"},
    1112:{"id":"13","idVideoName":3,"start":"102.1","end":"104.9","eng":"Rage in my eyes I still can see","transl":"Ярость в моих глазах я все еще вижу"},
    1113:{"id":"14","idVideoName":3,"start":"105","end":"106.2","eng":"You couldn’t let it go","transl":"Вы не могли отпустить это"},
    1114:{"id":"15","idVideoName":3,"start":"106.3","end":"107.66","eng":"This isn’t just a game","transl":"Это не просто игра"},
    1115:{"id":"16","idVideoName":3,"start":"107.7","end":"114.7","eng":"and now you can only blame yourself","transl":"и теперь ты можешь винить только себя"},
    1116:{"id":"17","idVideoName":3,"start":"148","end":"151.3","eng":"I will crush every single mob you bring","transl":" я раздавлю каждого моба, которого ты принесешь"},
    1117:{"id":"18","idVideoName":3,"start":"151.5","end":"153.9","eng":"all these evil dreams you made","transl":" все эти злые мечты, которые вы сделали"},
    1118:{"id":"19","idVideoName":3,"start":"154","end":"155.5","eng":"Your darkness is a lie","transl":"Твоя тьма - ложь"},
    1119:{"id":"20","idVideoName":3,"start":"155.6","end":"156.7","eng":"This is where it ends","transl":"This is where it ends"},
    1120:{"id":"21","idVideoName":3,"start":"156.8","end":"164.9","eng":"My power over you will always vanquish your most evil corruption","transl":"Моя власть над тобой всегда победит твою самую злую корупцию"},
    1121:{"id":"22","idVideoName":3,"start":"165","end":"166.3","eng":"Just like a creeper","transl":"Так же, как крипер"},
    1122:{"id":"23","idVideoName":3,"start":"167.6","end":"175.1","eng":"time to reap all the seeds you sow","transl":"время пожать все семена, которые вы сеете"},
    1123:{"id":"24","idVideoName":3,"start":"208.8","end":"213.6","eng":"We will stand together","transl":"Мы будем вместе"},
    1124:{"id":"25","idVideoName":3,"start":"214","end":"219.4","eng":"time will tell the few","transl":"время покажет мало"},
    1125:{"id":"26","idVideoName":3,"start":"219.5","end":"224.7","eng":"I will live forever","transl":"Я буду жить вечно"},
    1126:{"id":"27","idVideoName":3,"start":"224.8","end":"230","eng":"your days are now through","transl":"твои дни уже прошли"},
    1200:{"id":"1","idVideoName":5,"start":"36.6","end":"40.2","eng":"Awakened by the sun’s rays,","transl":"Проснувшись от солнечных лучей"},
    1201:{"id":"2","idVideoName":5,"start":"40.2","end":"44","eng":"up I rise for the new day.","transl":"Я поднимаюсь на новый день."},
    1202:{"id":"3","idVideoName":5,"start":"44.1","end":"47.6","eng":"The same routine but I have changed,","transl":"Та же рутина, но я изменился,"},
    1203:{"id":"4","idVideoName":5,"start":"47.6","end":"51.3","eng":"no longer will I stay the same.","transl":"Я больше не буду оставаться прежним."},
    1204:{"id":"5","idVideoName":5,"start":"51.2","end":"54.67","eng":"My doubts and weakness used to reign,","transl":"Мои сомнения и слабости царили,"},
    1205:{"id":"6","idVideoName":5,"start":"54.67","end":"58.6","eng":"but a new power I have now gained,","transl":"но новая сила, которую я теперь получил,"},
    1206:{"id":"7","idVideoName":5,"start":"58.6","end":"62","eng":"to face the day with a new light.","transl":"встретить день с новым светом"},
    1207:{"id":"8","idVideoName":5,"start":"62","end":"66","eng":"Worries fade away, and I’m ready to fight.","transl":"Беспокойство исчезает, и я готов к бою."},
    1208:{"id":"9","idVideoName":5,"start":"66","end":" 69.35","eng":"Continue on this winding road,","transl":"Продолжайте идти по этой извилистой дороге,"},
    1209:{"id":"10","idVideoName":5,"start":"70.4","end":"73","eng":" start to show.","transl":" начать показывать."},
    1210:{"id":"11","idVideoName":5,"start":"76.2","end":"80.4","eng":"gonna power up and it starts today.","transl":"собирается включиться, и это начинается сегодня."},
    1211:{"id":"12","idVideoName":5,"start":"80.4","end":"87.2","eng":"A change is due, a different view, we must go on.","transl":"Из-за изменений, другого взгляда, мы должны продолжать"},
    1212:{"id":"13","idVideoName":5,"start":"87.3","end":"95","eng":"I’ll find that key, inside of me, as we try to level up.","transl":"Я найду этот ключ внутри себя, когда мы попытаемся подняться."},
    1213:{"id":"16","idVideoName":5,"start":"109.5","end":"113","eng":"Beyond my home my journeys told,","transl":"За пределами моего дома мои путешествия рассказали,"},
    1214:{"id":"17","idVideoName":5,"start":"113.1","end":"116.7","eng":"thats full of life and love to behold.","transl":"это полно жизни и любви, чтобы созерцать."},
    1215:{"id":"18","idVideoName":5,"start":"116.8","end":"120.1","eng":"The skills I’ve learned shape how I’ve grown,","transl":"Навыки, которые я изучил, формируют то, как я вырос,"},
    1216:{"id":"19","idVideoName":5,"start":"120.1","end":"124","eng":"still so much of this world is unknown.","transl":"все еще так много в этом мире неизвестно."},
    1217:{"id":"20","idVideoName":5,"start":"124","end":"127.3","eng":"Through storm and drought I’ll travel far,","transl":"Через шторм и засуху я буду путешествовать далеко,"},
    1218:{"id":"21","idVideoName":5,"start":"127.4","end":"131","eng":"over mountain tops, to guide I’ll use the star.","transl":"над горными вершинами, чтобы вести, я буду использовать звезду."},
    1219:{"id":"22","idVideoName":5,"start":"131.1","end":"134.55","eng":"It lights the way through the darkest night, ","transl":"Он освещает путь самой темной ночью,"},
    1220:{"id":"23","idVideoName":5,"start":"134.7","end":"138.8","eng":"illuminating our path, the end is in sight.","transl":"освещая наш путь, конец виден"},
    1300:{"id":"6","idVideoName":1,"start":"7","end":"12.2","eng":"I see trees of green","transl":"Я вижу зеленые деревья"},
    1301:{"id":"17","idVideoName":1,"start":"12.5","end":"15.5","eng":"red roses too","transl":"красные розы"},
    1302:{"id":"18","idVideoName":1,"start":"15.5","end":"22","eng":"I see them bloom for me and you","transl":"Я вижу, как они цветут для нас"},
    1303:{"id":"20","idVideoName":1,"start":"27","end":"33.5","eng":"what a wonderful world","transl":"как же всё-таки чудесен мир"},
    1304:{"id":"22","idVideoName":1,"start":"41.5","end":"44.5","eng":"and clouds of white","transl":"и белые облака"},
    1305:{"id":"23","idVideoName":1,"start":"45","end":"48","eng":"The bright blessed day","transl":"Яркий радостный день"},
    1306:{"id":"24","idVideoName":1,"start":"48.5","end":"51","eng":"dark sacred nights","transl":"тёмной ночи покров"},
    1307:{"id":"25","idVideoName":1,"start":"66","end":"69","eng":"The colors of the rainbow","transl":"Всё многоцветье радуг"},
    1308:{"id":"26","idVideoName":1,"start":"69","end":"72.5","eng":"so pretty in the sky","transl":"что в небесах висят"},
    1309:{"id":"27","idVideoName":1,"start":"72.5","end":"79","eng":"Are also on the faces of people going by","transl":"Я также вижу в лицах людей вокруг меня"},
    1310:{"id":"28","idVideoName":1,"start":"79","end":"87","eng":"I see friends shaking hands saying how do you do","transl":"Вижу встречу друзей и пожатие руки"},
    1311:{"id":"29","idVideoName":1,"start":"87","end":"94","eng":"They're really saying I love you.","transl":"Это всё для меня как признание в любви"},
    1312:{"id":"30","idVideoName":1,"start":"94","end":"99.7","eng":"I hear babies cry,","transl":"Слышу плач детей"},
    1313:{"id":"31","idVideoName":1,"start":"99.7","end":"103","eng":"I watch them grow","transl":"я вижу как они растут"},
    1314:{"id":"32","idVideoName":1,"start":"103","end":"107","eng":"They'll learn much more ","transl":"Знать будут больше, "},
    1315:{"id":"33","idVideoName":1,"start":"107","end":"110","eng":"than I'll never know","transl":"чем мы сейчас"},

};
//[]
export {videoItems as default};
