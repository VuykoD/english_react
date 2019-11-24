import get from 'lodash/get';

const content = {
    inProgress: {
        ru: "Данный раздел находится на стадии разработки",
        ukr: "Данний розділ знаходиться на стадії розробки",
    },
};

export default function warn(siteLang, key) {
    const txt = get(content, `${key}[${siteLang}]`);
    return alert(txt)
}