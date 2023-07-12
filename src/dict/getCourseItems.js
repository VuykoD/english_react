import courseItemsJson from "../dict/courseItems";

function getCourseItems(){
    return localStorage.courseItems ? JSON.parse(localStorage.courseItems) : courseItemsJson;
}

export {getCourseItems as default};
