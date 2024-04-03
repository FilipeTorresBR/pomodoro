var state = "";
var mode = "pomodoro";  
var timer;
function startTimer() {
    minutes = $('#span_pomodoro_minutes');
    seconds = $('#span_pomodoro_seconds');
    button = $('#button');
    state = state == "playing" ? 'pause' : "playing"
    button.val = button.val == "Play" ? 'Pause' : "Play"
    
    let totalTime = parseInt(minutes.text()) * 60 + parseInt(seconds.text());
    if(!timer){
        timer = setInterval(function() {
            if(state == "playing"){
                totalTime--;
            }
                let minutesLeft = Math.floor(totalTime / 60);
                let secondsLeft = totalTime % 60;
                
                let formattedMinutes = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
                let formattedSeconds = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
                
                minutes.text(formattedMinutes);
                seconds.text(formattedSeconds);
        
                if (totalTime <= 0 ) {
                    clearInterval(timer); // Parar o timer
                }
            
        }, 1000);
    }
}
function setMode(mode){
    if(mode == "pomodoro"){
        $('#pomodoro-mode').addClass('active');
        $('#break-mode').removeClass('active');
        $('#span_break_minutes').attr('id', 'span_pomodoro_minutes')
        $('#span_break_seconds').attr('id', 'span_pomodoro_seconds')
        getDefaultTimer('pomodoro_minutes', 'span')
        getDefaultTimer('pomodoro_seconds', 'span')
    }
    if(mode == "break"){
        $('#break-mode').addClass('active');
        $('#pomodoro-mode').removeClass('active');
        $('#span_pomodoro_minutes').attr('id', 'span_break_minutes')
        $('#span_pomodoro_seconds').attr('id', 'span_break_seconds')
        getDefaultTimer('break_minutes', 'span')
        getDefaultTimer('break_seconds', 'span')
    }
}
function setDefaultTimer(key, value){
    switch(key){
        case 'pomodoro_minutes':
            value = value == -1 ? 25 : value;
            localStorage.setItem("pomodoro_minutes", value);
            break;
        case 'pomodoro_seconds':
            value = value == -1 ? 0 : value;
            localStorage.setItem("pomodoro_seconds", value);
            break;
        case 'break_minutes':
            value = value == -1 ? 5 : value;
            localStorage.setItem("break_minutes", value);
            break;
        case 'break_seconds':
            value = value == -1 ? 0 : value;
            localStorage.setItem("break_seconds", value);
            break;
    }
    return value;
}
function getDefaultTimer(key, origin){
    if (localStorage.getItem(key) == null) {
        applyChanges(key, setDefaultTimer(key, -1), origin);
    } else {
        applyChanges(key, localStorage.getItem(key), origin);
    }
}
function applyChanges(key, value, origin){
    if(origin == 'input'){
        $('#'+key).val(value);
    }
    if(origin == 'span'){
        value = value < 10 ? "0"+value : value;
        console.log($('#span_'+key))
        $('#span_'+key).text(value);
    }
}

$('[data-onload]').each(function() {
    getDefaultTimer($(this).attr('data-onload'), $(this).prop('tagName').toLowerCase());
});
  
$(document).ready(function(){
    $('#minutes').mask('00');
    $('#seconds').mask('00');
});
$("#settings").submit(function(){
    $('[data-onload]').each(function() {
        setDefaultTimer($(this).attr('data-onload'), $(this)[0].value);
    });
});