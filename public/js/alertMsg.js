function alertMsg(msg, type) {
    let color = 'rgb(43, 207, 98)'
    if (type == 'wrongColor') {
        color = 'rgb(240, 81, 81)'
    }
    const alert_msg = document.getElementById("alert_msg")
        alert_msg.innerHTML = msg;
        alert_msg.style.backgroundColor = color
        alert_msg.style.animationName = 'showRight'
        alert_msg.addEventListener('animationend', () => {
        setTimeout(() => {
            alert_msg.style.animationName = 'hideRight'
        }, 2000)
    }
    )
}