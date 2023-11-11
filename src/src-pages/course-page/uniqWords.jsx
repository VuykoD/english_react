import { map } from 'lodash';

function uniqWordsStatistic(courseItems){
    const courseItemsIds = [];
    const uniqueWords = [];
    const phraseWithUniqueWords = [];
    const arrWithNewWords = [];
    const arrWithoutNewWords = [];
    map(courseItems, it => {
        const isIdExist = courseItemsIds.find(element => element === it.id);
        if (!isIdExist) {
            courseItemsIds.push(it.id)
        } else {
            alert('there is duplicate id' + it.id)
        }
        const polCleared = it.pol.replace(/[.,%?!1-9"]/g, '').trim().toLowerCase();
        const words = polCleared.split(' ');
        let noOneNewWords = true;
        map(words, word => {
            let wordCleared = word.replace(/[\s.,%?!1-9"]/g, '').toLowerCase();
            const isWordExist = uniqueWords.find(element => element === wordCleared);
            if (!isWordExist) {
                noOneNewWords = false;
                uniqueWords.push(wordCleared);
                arrWithNewWords.push({id: it.id, word: wordCleared});
            }
            const ispPhraseWithUniqueWordsExist = phraseWithUniqueWords.find(element => element === it.id);
            if (!ispPhraseWithUniqueWordsExist) phraseWithUniqueWords.push(it.id)
        });
        if (noOneNewWords) arrWithoutNewWords.push(it.id)
    })
    return {
        arrWithNewWords,
        arrWithoutNewWords
    }
}

function uniqWords(courseItems, phrase, lang){
    const phraseCleared = phrase.replace(/[.,%?!1-9"]/g, '').trim().toLowerCase();
    const words = phraseCleared.split(' ');
    const uniqArr = [];

    for(const word of words) {
        let wordUnique = true;
        for(const it of courseItems) {
            if (!it[lang]) continue ;
            const itCleared = it[lang].replace(/[.,%?!1-9"]/g, '').trim().toLowerCase();
            const itArr = itCleared.split(' ');
            const isWordExist = itArr.find(element => element === word);
            if (isWordExist) {
                wordUnique = false;
                uniqArr.push({
                    word,
                    source: it[lang]
                });
                break;
            }
        }
        if (wordUnique){
            uniqArr.push({
                word,
                source: 'unique'
            });
        }
    }
    return uniqArr;
}

export {
    uniqWords,
    uniqWordsStatistic as default
};
