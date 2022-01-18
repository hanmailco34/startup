$.fn.createCalendar = function(obj) {
    const days = ['일','월','화','수','목','금','토'];
    var _html = `
    <div class="calendar_th">
        ${days.map(e => {
            return `<div>${e}</div>`;
        }).join("")}
    </div>
    `;
    $(this).append(_html);
}