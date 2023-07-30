import courseItemsJson from './courseItems';
import courseNamesJson from './courseNames';
import courseUnitsJson from "./courseUnits";

function getCourseItems(){
    return localStorage.courseItems ? JSON.parse(localStorage.courseItems) : courseItemsJson;
}

function getCourseNames(){
    return localStorage.courseNames ? JSON.parse(localStorage.courseNames) : courseNamesJson;
}

function getCourseUnits(){
    return localStorage.courseUnits ? JSON.parse(localStorage.courseUnits) : courseUnitsJson;
}

export {
    getCourseItems as default,
    getCourseNames,
    getCourseUnits
};
