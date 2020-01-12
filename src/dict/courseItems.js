const courseItems = [
    //unit 1
    {"id": 1, "unitId": 1, "eng": "She is driving now, at the moment of speaking", "transl": "Она едет сейчас, в момент разговора"},
    {"id": 2, "unitId": 1, "eng": "The action is not finished", "transl": "Действие не закончено"},
    {"id": 3, "unitId": 1, "eng": "She's driving to work", "transl": "Она едет на работу"},
    {"id": 4, "unitId": 1, "eng": "I am doing something", "transl": "Я делаю что-то"},
    {"id": 5, "unitId": 1, "eng": "I'm in the middle of doing it", "transl": "Я в процессе делания"},
    {"id": 6, "unitId": 1, "eng": "I've started doing it and I haven't finished", "transl": "Я начал делать это, и я еще не закончил"},
    {"id": 7, "unitId": 1, "eng": "Please don't make so much noise, I'm working", "transl": "Пожалуйста, не шумите, я работаю"},
    {"id": 8, "unitId": 1, "eng": "She's taking a bath.", "transl": "Она принимает ванну"},
    {"id": 9, "unitId": 1, "eng": "Let's go out now, It isn't raining any more.", "transl": "Давай выйдем сейчас, дождя больше нет"},
    {"id": 10, "unitId": 1, "eng": "Steve is talking to a friend on the phone.", "transl": "Стив разговаривает с другом по телефону"},
    {"id": 11, "unitId": 1, "eng": " I'm reading a really good book at the moment.", "transl": "Я сейчас читаю действительно хорошую книгу"},
    {"id": 12, "unitId": 1, "eng": "Steve is not reading the book at the time of speaking.", "transl": "Стив не читает книгу во время разговора"},
    {"id": 13, "unitId": 1, "eng": "He means that he has started it, but has not finished it yet.", "transl": "Он имеет в виду, что он начал это, но еще не закончил"},
    {"id": 14, "unitId": 1, "eng": "Some friends of mine are building their own house.", "transl": "Некоторые мои друзья строят свой собственный дом"},
    {"id": 15, "unitId": 1, "eng": "They hope to finish it next summer", "transl": "Они надеются закончить это следующим летом"},
    {"id": 17, "unitId": 1, "eng": "You're working hard today! Yes, I have a lot to do.", "transl": "Ты сегодня усердно работаешь! Да, у меня много дел."},
    {"id": 18, "unitId": 1, "eng": "Is Sarah working this week?", "transl": "Сара работает на этой неделе?"},
    {"id": 19, "unitId": 1, "eng": "We use the present continuous when we talk about changes happening around now", "transl": "Мы используем present continuous, когда говорим об изменениях, происходящих сейчас"},
    {"id": 20, "unitId": 1, "eng": "Is your English getting better?", "transl": "Твой английский улучшается?"},
    {"id": 21, "unitId": 1, "eng": "The population of the world is rising very fast.", "transl": "Население мира растет очень быстро"},
    {"id": 22, "unitId": 1, "eng": "It's getting late.", "transl": "Становится поздно."},
    {"id": 23, "unitId": 1, "eng": "They're lying.", "transl": "Они лгут"},
    {"id": 24, "unitId": 1, "eng": "It's starting to rain", "transl": "Начинается дождь"},
    {"id": 25, "unitId": 1, "eng": "I'm getting hungry", "transl": "Я проголодался"},
    {"id": 26, "unitId": 1, "eng": "I'm looking for an apartment.", "transl": "Я ищу квартиру."},
    {"id": 27, "unitId": 1, "eng": "The company is losing money.", "transl": "Компания теряет деньги."},
    //
    {"id": 101, "unitId": 2, "eng": "We use the present simple to talk about things in general", "transl": "Мы используем present simple, чтобы говорить о вещах в целом"},
    {"id": 102, "unitId": 2, "eng": "Nurses look after patients in hospitals.", "transl": "Медсестры ухаживают за пациентами в больницах."},
    {"id": 103, "unitId": 2, "eng": "I usually go away at weekends", "transl": "Я обычно ухожу на выходные"},
    {"id": 104, "unitId": 2, "eng": "The earth goes round the sun", "transl": "Земля вращается вокруг Солнца"},
    {"id": 105, "unitId": 2, "eng": "The cafe opens at 7.30 in the morning.", "transl": "Кафе открывается в 7.30 утра."},
    {"id": 106, "unitId": 2, "eng": "Where do you come from?", "transl": "Откуда ты?"},
    {"id": 107, "unitId": 2, "eng": "I don't go away very often", "transl": "Я не ухожу очень часто"},
    {"id": 108, "unitId": 2, "eng": "What does this word mean?", "transl": "Что значит это слово?"},
    {"id": 109, "unitId": 2, "eng": "Rice doesn't grow in cold climates.", "transl": "Рис не растет в холодном климате."},
    {"id": 110, "unitId": 2, "eng": "I work in a shop.", "transl": "Я работаю в магазине."},
    {"id": 111, "unitId": 2, "eng": "What do you do?", "transl": "Чем ты занимаешься?"},
    {"id": 112, "unitId": 2, "eng": "He's always so lazy", "transl": "Он всегда такой ленивый"},
    {"id": 113, "unitId": 2, "eng": "He doesn't do anything to help.", "transl": "Он не делает ничего, чтобы помочь."},
    {"id": 114, "unitId": 2, "eng": "I get up at 8 o'clock every morning.", "transl": "Я встаю в 8 часов каждое утро."},
    {"id": 115, "unitId": 2, "eng": "How often do you go to the dentist?", "transl": "Как часто вы ходите к стоматологу?"},
    {"id": 116, "unitId": 2, "eng": "Julie doesn't drink tea very often.", "transl": "Джули не пьет чай очень часто."},
    {"id": 117, "unitId": 2, "eng": "Robert usually goes away two or three times a year.", "transl": "Роберт обычно уходит два или три раза в год."},
    {"id": 118, "unitId": 2, "eng": "I promise I won't be late.", "transl": "Я обещаю, что не опоздаю."},
    {"id": 119, "unitId": 2, "eng": "Sometimes we do things by saying something.", "transl": "Иногда мы делаем что-то, говоря что-то."},
    {"id": 120, "unitId": 2, "eng": "What do you suggest I do?", "transl": "Что вы предлагаете мне сделать?"},
    {"id": 121, "unitId": 2, "eng": "Tanya speaks German very well.", "transl": "Таня очень хорошо говорит по-немецки."},
    {"id": 122, "unitId": 2, "eng": "I don't often drink coffee", "transl": "Я не часто пью кофе"},
    {"id": 123, "unitId": 2, "eng": "The swimming pool opens at 7.30 every morning.", "transl": "Бассейн открывается в 7.30 каждое утро."},
    {"id": 124, "unitId": 2, "eng": "Bad driving causes many accidents.", "transl": "Неумелое вождение становится причиной многих аварий."},
    {"id": 125, "unitId": 2, "eng": "My parents live in a very small flat", "transl": "Мои родители живут в очень маленькой квартире"},
    {"id": 126, "unitId": 2, "eng": "The Olympic Games take place every four years.", "transl": "Олимпийские игры проводятся каждые четыре года."},
    {"id": 127, "unitId": 2, "eng": "The Panama Canal connects the Atlantic and Pacific Oceans", "transl": "Панамский канал соединяет Атлантический и Тихий океаны"},
    {"id": 128, "unitId": 2, "eng": "What time do the banks close here?", "transl": "Во сколько здесь закрываются банки?"},
    {"id": 129, "unitId": 2, "eng": "I've got a car, but I don't use it much.", "transl": "У меня есть машина, но я ею не пользуюсь."},
    {"id": 130, "unitId": 2, "eng": "Where does Ricardo come from?", "transl": "Откуда Рикардо?"},
    //
    {"id": 200, "unitId": 3, "eng": "I'm always losing things", "transl": "Я всегда теряю вещи"},
    {"id": 201, "unitId": 3, "eng": "I lose things very often, perhaps too often, or more often than normal.", "transl": "Я теряю вещи очень часто, возможно, слишком часто или чаще, чем обычно."},
    {"id": 202, "unitId": 3, "eng": "You're always playing computer games. You should do something more active.", "transl": "Ты всегда играешь в компьютерные игры. Вы должны сделать что-то более активное."},
    {"id": 203, "unitId": 3, "eng": " The water is boiling. Water boils at 100 degrees Celsius.", "transl": " Вода кипит. Вода кипит при 100 градусах Цельсия."},
    {"id": 204, "unitId": 3, "eng": "Tim is never satisfied. He's always complaining.", "transl": "Тим никогда не доволен. Он всегда жалуется."},
    {"id": 205, "unitId": 3, "eng": "We use the present continuous for things happening at or around the time of speaking.", "transl": "Мы используем present continuous для вещей, происходящих во время разговора или около него."},
    {"id": 206, "unitId": 3, "eng": "We use the present simple for things in general or things that happen repeatedly.", "transl": "Мы используем present simple для вещей вообще или вещей, которые происходят неоднократно."},
    {"id": 207, "unitId": 3, "eng": "What language are they speaking? Excuse me, do you speak English?", "transl": "На каком языке они говорят? Извините, вы говорите по-английски?"},
    {"id": 208, "unitId": 3, "eng": "It isn't raining now. It doesn't rain very much in summer.", "transl": "Сейчас не идет дождь. Летом дождя не очень много."},
    {"id": 209, "unitId": 3, "eng": "What are you doing? What do you USUALLY do at weekends?", "transl": "Что делаешь? Что вы обычно делаете в выходные дни?"},
    {"id": 210, "unitId": 3, "eng": "I'm getting hungry. I always get hungry in the afternoon.", "transl": "Я проголодался. Я всегда голоден во второй половине дня."},
    {"id": 211, "unitId": 3, "eng": "You're working hard today. He works hard most of the time.", "transl": "Вы усердно работаете сегодня. Он много работает большую часть времени."},
    {"id": 212, "unitId": 3, "eng": "How are you getting on?", "transl": "Как поживаешь?"},
    {"id": 213, "unitId": 3, "eng": "Are you listening to the radio? Do you listen to the radio every day?", "transl": "Ты слушаешь радио? Ты слушаешь радио каждый день?"},
    {"id": 214, "unitId": 3, "eng": "We usually grow vegetables in our garden, but this year we are not growing any.", "transl": "Мы обычно выращиваем овощи в нашем саду, но в этом году мы не выращиваем."},
    {"id": 215, "unitId": 3, "eng": "She's staying at the Park Hotel. She always stays there when she's in New York.", "transl": "Она остановилась в Парк-отеле. Она всегда остается там, когда она в Нью-Йорке."},
    {"id": 216, "unitId": 3, "eng": "Normally I finish work at five, but this week I'm working until six to earn a little more money.", "transl": "Обычно я заканчиваю работу в пять, но на этой неделе я работаю до шести, чтобы заработать немного больше денег."},
    {"id": 217, "unitId": 3, "eng": "I usually enjoy parties, but I'm not enjoying this one very much.", "transl": "Мне обычно нравятся вечеринки, но я не получаю от этого особого удовольствия."},
    {"id": 218, "unitId": 3, "eng": "You've made the same mistake again. I'm always making the same mistake.", "transl": "Вы сделали ту же ошибку снова. Я всегда делаю одну и ту же ошибку."},
    {"id": 219, "unitId": 3, "eng": "I've forgotten my glasses again. You're always forgetting your glasses.", "transl": "Я снова забыл свои очки. Ты всегда забываешь свои очки."},
    {"id": 220, "unitId": 3, "eng": "We use continuous forms for actions and happenings that have started but not finished", "transl": "Мы используем continuous формы для действий и событий, которые начались, но не завершены"},
    {"id": 221, "unitId": 3, "eng": "The following verbs are not normally used in the present continuous: like, want, need, prefer, " +
            "know, realise, suppose, mean, understand, believe, remember, " +
            "belong, fit, contain, consist, seem", "transl": "Следующие глаголы обычно не используются в present continuous: как, хотеть, нуждаться, предпочитать, знать, понимать, предполагать, подразумевать, понимать, верить, помнить, принадлежать, соответствовать, содержать, состоять, казаться"},
    {"id": 222, "unitId": 3, "eng": "I want something to eat.", "transl": "Я хочу что-нибудь поесть."},
    {"id": 223, "unitId": 3, "eng": "Do you understand what I mean?", "transl": "Вы понимаете, что я имею в виду?"},
    {"id": 224, "unitId": 3, "eng": "Anna doesn't seem very happy at the moment.", "transl": "Анна сейчас не очень счастлива."},
//
    {"id": 300, "unitId": 4, "eng": "We don't say: I am knowing or they are liking", "transl": "Мы не говорим: я знаю, или они нравятся"},
    {"id": 301, "unitId": 4, "eng": "When think means believe or have an opinion, we do not use the continuous", "transl": "Когда think значит верить или иметь мнение, мы не используем continuous"},
    {"id": 302, "unitId": 4, "eng": "I think Mary is Canadian, but I'm not sure.", "transl": "Я думаю, что Мэри - канадец, но я не уверен."},
    {"id": 303, "unitId": 4, "eng": "What do you think of my plan?", "transl": "Что вы думаете о моем плане?"},
    {"id": 304, "unitId": 4, "eng": "When think means consider, the continuous is possible:", "transl": "Когда think значит считать, возможно continuous:"},
    {"id": 305, "unitId": 4, "eng": "Nicky is thinking of giving up her job", "transl": "Ники думает бросить свою работу"},
    {"id": 306, "unitId": 4, "eng": "See, hear, smell, taste. We normally use the present simple (not continuous) with these verbs", "transl": "Видеть, слышать, нюхать, пробовать на вкус. Мы обычно используем present simple (не continuous) с этими глаголами"},
    {"id": 307, "unitId": 4, "eng": "Do you see that man over there? This room smells.", "transl": "Ты видишь этого человека там? Эта комната пахнет."},
    {"id": 308, "unitId": 4, "eng": "You can use the present simple or continuous to say how somebody looks or feels now:", "transl": "Вы можете использовать present simple или continuous, чтобы сказать, как кто-то выглядит или чувствует себя сейчас"},
    {"id": 309, "unitId": 4, "eng": "You look well today. You're looking well today.", "transl": "Ты хорошо выглядишь сегодня."},
    {"id": 310, "unitId": 4, "eng": "How do you feel now? How are you feeling now?", "transl": "как ты сейчас себя чувствуешь?"},
    {"id": 311, "unitId": 4, "eng": "I usually feel tired in the morning.", "transl": "Я обычно чувствую усталость по утрам."},
    {"id": 312, "unitId": 4, "eng": "He is selfish and he is being selfish", "transl": "Он эгоистичен и он ведет себя егоистично"},
    {"id": 313, "unitId": 4, "eng": "He's being means He's behaving or He's acting", "transl": " He's being означает, что Он ведет себя... или Он действует..."},
    {"id": 314, "unitId": 4, "eng": "I can't understand why he's being so selfish.", "transl": "Я не могу понять, почему он ведет себя так эгоистично."},
    {"id": 315, "unitId": 4, "eng": "He never thinks about other people. He is very selfish", "transl": "Он никогда не думает о других людях. Он очень эгоистичный"},
    {"id": 316, "unitId": 4, "eng": "I'm using it. I need it", "transl": "Я использую это. мне это нужно"},
    {"id": 317, "unitId": 4, "eng": "What does she want? Why is he looking at us?", "transl": "Что она хочет? Почему он смотрит на нас?"},
    {"id": 318, "unitId": 4, "eng": "Alan says he's 80 years old, but nobody believes him.", "transl": "Алан говорит, что ему 80 лет, но ему никто не верит."},
    {"id": 319, "unitId": 4, "eng": "She told me her name, but I don't remember it now", "transl": "Она сказала мне свое имя, но я не помню его сейчас"},
    {"id": 320, "unitId": 4, "eng": "I'm thinking of selling my car. I think this is your key.", "transl": "Я думаю о продаже своей машины. Я думаю, что это твой ключ."},
    {"id": 321, "unitId": 4, "eng": "Be quiet! I'm thinking.", "transl": "Тише! Я думаю."},
    {"id": 322, "unitId": 4, "eng": "The dinner smells good. Is anybody sitting here?", "transl": "Ужин хорошо пахнет. Кто-нибудь тут сидит?"},
    {"id": 323, "unitId": 4, "eng": "These gloves don't fit me. Do you believe in God?", "transl": "Эти перчатки мне не подходят. Ты веришь в Бога?"},
    {"id": 324, "unitId": 4, "eng": "Sarah is being very nice to me at the moment", "transl": "Сара сейчас очень мила со мной"},
//
    {"id": 401, "unitId": 5, "eng": "Very often the past simple ends in -ed", "transl": "Очень часто past simple заканчивается в -ed"},
    {"id": 402, "unitId": 5, "eng": "The police stopped me for speeding.", "transl": "Полиция остановила меня за превышение скорости."},
    {"id": 403, "unitId": 5, "eng": "She passed her exam because she studied very hard.", "transl": "Она сдала экзамен, потому что очень усердно училась."},
    {"id": 404, "unitId": 5, "eng": "Many verbs are irregular. The past simple does not end in -ed", "transl": "Многие глаголы неправильные. past simple не заканчивается в -ед"},
    {"id": 405, "unitId": 5, "eng": "We saw Rosa in town a few days ago.", "transl": "Мы видели Розу в городе несколько дней назад."},
    {"id": 406, "unitId": 5, "eng": "It was cold, so I shut the window.", "transl": "Было холодно, поэтому я закрыл окно."},
    {"id": 407, "unitId": 5, "eng": "Did you go out last night? Yes, I went to the movies, but I didn't enjoy the film much.", "transl": "Вы выходили вчера вечером? Да, я ходил в кино, но мне не очень понравился фильм."},
    {"id": 409, "unitId": 5, "eng": "In the following example, do is the main verb in the sentence", "transl": "В следующем примере do является основным глаголом в предложении"},
    {"id": 410, "unitId": 5, "eng": "What did you do at the weekend? I didn't do anything.", "transl": "Что ты делал на выходных? Я ничего не делал."},
    {"id": 411, "unitId": 5, "eng": "The past of be", "transl": "Прошлое be"},
    {"id": 412, "unitId": 5, "eng": "I was angry because they were late.", "transl": "Я был зол, потому что они опоздали."},
    {"id": 413, "unitId": 5, "eng": "Note that we do not use did in negatives and questions with was or were", "transl": "Обратите внимание, что мы не используем, сделал отрицательные и вопросы с был или были"},
    {"id": 414, "unitId": 5, "eng": "Was the weather good when you were on vacation?", "transl": "Была ли хорошая погода, когда вы были в отпуске?"},
    {"id": 415, "unitId": 5, "eng": "They weren't able to come because they were so busy.", "transl": "Они не смогли прийти, потому что были очень заняты."},
    {"id": 416, "unitId": 5, "eng": "Did you go out last night or were you too tired?", "transl": "Вы выходили прошлой ночью или вы слишком устали?"},
    {"id": 417, "unitId": 5, "eng": "She had a big breakfast.", "transl": "У нее был большой завтрак."},
    {"id": 418, "unitId": 5, "eng": "It took her about half an hour to get to work.", "transl": "Ей понадобилось около получаса, чтобы добраться до работы."},
    {"id": 420, "unitId": 5, "eng": "She cooked a meal yesterday. She didn't go out yesterday evening", "transl": "Вчера она приготовила еду. Она не выходила вчера вечером"},
    {"id": 421, "unitId": 5, "eng": "She went to bed at 11 o'clock. She slept well last night.", "transl": "Она легла спать в 11 часов. Она хорошо спала прошлой ночью."},
    {"id": 422, "unitId": 5, "eng": "We couldn't afford to keep our car, so we sold it", "transl": "Мы не могли позволить себе оставить нашу машину, поэтому мы продали ее"},
    {"id": 423, "unitId": 5, "eng": "Dave fell down the stairs this morning and hurt his leg.", "transl": "Дэйв упал с лестницы сегодня утром и повредил ногу."},
    {"id": 424, "unitId": 5, "eng": "Ann spent a lot of money yesterday.", "transl": "Энн потратила много денег вчера."},
    {"id": 425, "unitId": 5, "eng": "How long did it take you to get to Denver?", "transl": "Как долго вы добирались до Денвера?"},
    {"id": 426, "unitId": 5, "eng": "It was warm, so I took off my coat.", "transl": "Было тепло, поэтому я снял пальто."},
    {"id": 427, "unitId": 5, "eng": "I knew Sarah was busy, so I didn't disturb her.", "transl": "Я знал, что Сара была занята, поэтому я не беспокоил ее."},
    {"id": 428, "unitId": 5, "eng": "We were very tired, so we left the party early", "transl": "Мы очень устали, поэтому мы рано ушли с вечеринки"},
    {"id": 429, "unitId": 5, "eng": "The window was open and a bird flew into the room.", "transl": "Окно было открыто, и в комнату влетела птица."},
    {"id": 430, "unitId": 5, "eng": "I was in a hurry, so I didn't have time to phone you", "transl": "Я спешил, поэтому у меня не было времени позвонить тебе"},
    //
    {"id": 500, "unitId": 6, "eng": "So, at 10.30 they were playing tennis. They were in the middle of playing, they had not finished", "transl": "Итак, в 10.30 они играли в теннис. Они были в середине игры, они еще не закончили"},
    {"id": 501, "unitId": 6, "eng": "I was doing something, I was in the middle of doing it at a certain time.", "transl": "Я что-то делал, я занимался этим в определенное время."},
    {"id": 502, "unitId": 6, "eng": "This time last year I was living in Hong Kong.", "transl": "На этот раз в прошлом году я жил в Гонконге."},
    {"id": 503, "unitId": 6, "eng": "What were you doing at 10 o'clock last night?", "transl": "Что ты делал в 10 часов прошлой ночью?"},
    {"id": 504, "unitId": 6, "eng": "I waved to Helen, but she wasn't looking.", "transl": "Я помахал Хелен, но она не вмдела."},
    {"id": 505, "unitId": 6, "eng": "We were walking home when I met Dan.", "transl": "Мы шли домой, когда я встретил Дэна."},
    {"id": 506, "unitId": 6, "eng": "Kate was watching TV when we arrived.", "transl": "Кейт смотрела телевизор, когда мы приехали."},
    {"id": 507, "unitId": 6, "eng": "Matt phoned while we were having dinner.", "transl": "Мэтт позвонил, пока мы ужинали."},
    {"id": 508, "unitId": 6, "eng": "It was raining when I got up", "transl": "Когда я встал, шел дождь"},
    {"id": 509, "unitId": 6, "eng": "I saw you in the park yesterday. You were sitting on the grass and reading a book", "transl": "Я видел тебя в парке вчера. Вы сидели на траве и читали книгу"},
    {"id": 510, "unitId": 6, "eng": "I hurt my back while I was working in the garden", "transl": "Я повредил спину, когда работал в саду"},
    {"id": 511, "unitId": 6, "eng": "I was walking along the road when I saw Dan. So I stopped, and we talked for a while", "transl": "Я шел по дороге, когда увидел Дэна. Поэтому я остановился, и мы немного поговорили"},
    {"id": 512, "unitId": 6, "eng": "When Karen arrived, we were having dinner", "transl": "Когда Карен приехала, мы ужинали"},
    {"id": 513, "unitId": 6, "eng": "Some verbs are not normally used in continuous forms. For example, know and want", "transl": "Некоторые глаголы обычно не используются в continuous формах. Например, знать и хотеть"},
    {"id": 514, "unitId": 6, "eng": "We were good friends. We knew each other well.", "transl": "Мы были хорошими друзьями. Мы хорошо знали друг друга."},
    {"id": 515, "unitId": 6, "eng": "I was enjoying the party, but Chris wanted to go home.", "transl": "Я наслаждался вечеринкой, но Крис хотел пойти домой."},
    {"id": 516, "unitId": 6, "eng": "Today Helen is wearing a skirt. Yesterday she was wearing trousers", "transl": "Сегодня Елена носит юбку. Вчера на ней были брюки"},
    {"id": 517, "unitId": 6, "eng": "When I got to the cafe my friends were waiting for me.", "transl": "Когда я добрался до кафе, мои друзья ждали меня"},
//
    {"id": 600, "unitId": 7, "eng": "He’s lost his key. He lost it and he doesn’t have it now", "transl": "Он потерял свой ключ. Он потерял это, и у него нет его сейчас"},
    {"id": 601, "unitId": 7, "eng": "The road is closed. There’s been an accident.", "transl": "Дорога закрыта. Там был несчастный случай."},
    {"id": 602, "unitId": 7, "eng": "Police have arrested two men in connection with the robbery", "transl": "Полиция арестовала двух мужчин в связи с ограблением"},
    {"id": 603, "unitId": 7, "eng": "When we use the present perfect, there is a connection with now. The action in the past has a result now", "transl": "Когда мы используем present perfect, есть связь с сейчас. Действие в прошлом имеет результат сейчас"},
    {"id": 604, "unitId": 7, "eng": "Tom has lost his key. He doesn’t have it now", "transl": "Том потерял свой ключ. У него его сейчас нет"},
    {"id": 605, "unitId": 7, "eng": "He told me his name, but I’ve forgotten it. I can’t remember it now", "transl": "Он сказал мне свое имя, но я забыл его. Я не могу вспомнить это сейчас"},
    {"id": 606, "unitId": 7, "eng": "Sally is still here. She hasn’t gone out. She is here now", "transl": "Салли все еще здесь. Она не вышла. Она сейчас здесь"},
    {"id": 607, "unitId": 7, "eng": "I can’t find my bag. Have you seen it? Do you know where it is now?", "transl": "Я не могу найти свою сумку. Вы видели это? Ты знаешь где это сейчас?"},
    {"id": 608, "unitId": 7, "eng": "You can use the present perfect with just, already and yet.", "transl": "Вы можете использовать настоящее совершенное с просто, уже и пока."},
    {"id": 609, "unitId": 7, "eng": "Are you hungry? No, I’ve just had lunch.", "transl": "Вы голодны? Нет, я только что пообедал."},
    {"id": 610, "unitId": 7, "eng": "Don’t forget to pay the bill. I’ve already paid it.", "transl": "Не забудьте оплатить счет. Я уже заплатил."},
    {"id": 611, "unitId": 7, "eng": "I’ve written the email, but I haven’t sent it yet", "transl": "Я написал письмо, но еще не отправил"},
    {"id": 612, "unitId": 7, "eng": "You can also use the past simple", "transl": "Вы также можете использовать прошлое простое"},
    {"id": 613, "unitId": 7, "eng": "Ben isn’t here. He’s gone out. Or he went out.", "transl": "Бена здесь нет. Он вышел. Или он вышел."},
    {"id": 614, "unitId": 7, "eng": "Are you hungry? No, I’ve just had lunch. Or no, I just had lunch.", "transl": "Вы голодны? Нет, я только что пообедал. Или нет, я только что пообедал."},
    {"id": 615, "unitId": 7, "eng": "My parents are on holiday. They’ve gone to Italy", "transl": "Мои родители в отпуске. Они уехали в италию"},
    {"id": 616, "unitId": 7, "eng": "Sally is still here. She hasn’t gone", "transl": "Салли все еще здесь. Она не ушла"},
//
    {"id": 701, "unitId": 8, "eng": "Have you travelled a lot, Jane? Yes, I’ve been to lots of places", "transl": "Вы много путешествовали, Джейн? Да, я был во многих местах"},
    {"id": 702, "unitId": 8, "eng": "Really? Have you ever been to China? Yes, I’ve been to China twice.", "transl": "В самом деле? Ты когда-нибудь был в Китае? Да, я был в Китае дважды."},
    {"id": 703, "unitId": 8, "eng": "What about India? No, I haven’t been to India.", "transl": "А как насчет Индии? Нет, я не был в Индии."},
    {"id": 704, "unitId": 8, "eng": "When we talk about a period of time that continues from the past until now, we use the present perfect", "transl": "Когда мы говорим о периоде времени, который продолжается от прошлого до настоящего времени, мы используем настоящее совершенное"},
    {"id": 705, "unitId": 8, "eng": "Have you ever eaten caviar?", "transl": "Вы когда-нибудь ели икру?"},
    {"id": 706, "unitId": 8, "eng": "We’ve never had a car", "transl": "У нас никогда не было машины"},
    {"id": 707, "unitId": 8, "eng": "I don’t know what the film is about. I haven’t seen it.", "transl": "Я не знаю, о чем фильм. Я не видел это."},
    {"id": 708, "unitId": 8, "eng": "I’ve never been to Canada. Have you been there?", "transl": "Я никогда не был в Канаде. Ты был там?"},
    {"id": 709, "unitId": 8, "eng": "Have you heard anything from Ben recently?", "transl": "Ты что-нибудь слышал от Бена в последнее время?"},
    {"id": 710, "unitId": 8, "eng": "I’ve met a lot of people in the last few days", "transl": "Я встречал много людей за последние несколько дней"},
    {"id": 711, "unitId": 8, "eng": "We haven’t seen each other for a long time", "transl": "Мы давно не виделись"},
    {"id": 712, "unitId": 8, "eng": "In the same way we use the present perfect with today, this evening, this year", "transl": "Точно так же мы используем настоящее совершенное с сегодняшним вечером, этим вечером"},
    {"id": 713, "unitId": 8, "eng": "I’ve drunk four cups of coffee ee today", "transl": "Я выпил четыре чашки кофе сегодня"},
    {"id": 714, "unitId": 8, "eng": "Have you had a holiday this year?", "transl": "У вас был отпуск в этом году?"},
    {"id": 715, "unitId": 8, "eng": "I haven’t seen Tom this morning. Have you?", "transl": "Я не видел Тома этим утром. У тебя есть?"},
    {"id": 716, "unitId": 8, "eng": "It’s the first time he has driven a car", "transl": "Это первый раз, когда он водил машину"},
    {"id": 717, "unitId": 8, "eng": "This is the second time this has happened", "transl": "Это второй раз, когда это произошло"},
    {"id": 718, "unitId": 8, "eng": "It’s the third time he’s phoned her this evening", "transl": "Это третий раз, когда он звонил ей сегодня вечером"},
    {"id": 719, "unitId": 8, "eng": "Have you ever ridden a horse?", "transl": "Вы когда-нибудь ездили на лошади?"},
    {"id": 720, "unitId": 8, "eng": "I haven’t used a computer today.", "transl": "Я сегодня не пользовался компьютером."},
];

export {courseItems as default};
