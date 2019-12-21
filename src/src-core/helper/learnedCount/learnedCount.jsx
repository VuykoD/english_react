import filter from 'lodash/filter';

export default function learnedCount() {
    const localProgress = localStorage.progress ? JSON.parse(localStorage.progress) : null;
    const learnedCount = filter(localProgress, item => {return +item.quantity >= 3;});
    return {
        learnedCount: learnedCount.length,
        totalCount: localProgress? localProgress.length: 0
    }
}