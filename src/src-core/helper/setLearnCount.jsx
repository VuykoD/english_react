export default function setLearnCount(reduxFunc, count) {
    reduxFunc(count);
    const heartbeat = document.getElementById('heartbeat');
    heartbeat.classList.add('heartbeat');
    setTimeout(() => {
        heartbeat.classList.remove('heartbeat')
    }, 1500);
}
