import courseItemsJson from "../dict/courseItems";

function getCourseItems(){
    return JSON.parse(localStorage.courseItems) || courseItemsJson;
}

export {getCourseItems as default};
