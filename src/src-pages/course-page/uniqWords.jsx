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
    const ignoreList = JSON.parse(localStorage.getItem('ignore')) || [];

    for(const courseItem of courseItems) {
        if (!courseItem[lang]) continue ;
        const itCleared = courseItem[lang].replace(/[.,%?!1-9"]/g, '').trim().toLowerCase();
        const itArr = itCleared.split(' ');
        for(const it of itArr) {
            const isWordExist = words.includes(it);
            const isWordIgnore = ignoreList.includes(it);
            if (!isWordExist && !isWordIgnore) {
                uniqArr.push({
                    it,
                    source: itCleared,
                    transl: courseItem.transl
                });
            }
        }
    }
    return uniqArr;
}

export {
    uniqWords,
    uniqWordsStatistic as default
};
