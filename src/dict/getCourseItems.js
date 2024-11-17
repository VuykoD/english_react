import courseItemsJson from './courseItems';
import courseNamesJson from './courseNames';
import courseUnitsJson from './courseUnits';
import { map } from 'lodash';
import langType from './langType';

function getCourseItems(){
    let AI = localStorage.AI ? JSON.parse(localStorage.AI) : null;
    if (AI) return AI;
    return localStorage.courseItems ? JSON.parse(localStorage.courseItems) : [...courseItemsJson];
}

function getCourseNames(){
    return localStorage.courseNames ? JSON.parse(localStorage.courseNames) : courseNamesJson;
}

function getCourseUnits(){
    return localStorage.courseUnits ? JSON.parse(localStorage.courseUnits) : courseUnitsJson;
}

function getDefaultProgress() {
    const defaultProgress = {};
    map(langType, (lang, key) => {
        if (lang.learnedLang) {
            defaultProgress[key] = [];
        }
    });
    return defaultProgress
}

export {
    getCourseItems as default,
    getCourseNames,
    getCourseUnits,
    getDefaultProgress
};
