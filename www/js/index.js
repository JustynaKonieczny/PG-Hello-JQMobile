

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function inputTimetoMinutes(time){
    return (time[0]*10+time[1]*1)*60+(time[3]*10+time[4]*1);
}
function minutesToInputTime(time){
    var hours = '';
    var minutes = '';
    
    if(time<60){
        return '00:'+time;
    }else{
        hours = Math.floor(time/60);
        if(hours<10) hours = '0'+hours;
        minutes = time - hours*60;
        if(minutes<10) minutes = '0'+minutes;
    }
    
    return hours+':'+minutes;
}



var iloscDniPracy = -1;
var iloscGodzinPracy = -1;


function daysInThisMonth(){
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

$(document).on("pagebeforeshow", "#DayPlan", function(){
    if(iloscDniPracy===-1 || iloscGodzinPracy===-1){
        $('.DayPlanMonthWork').html('<p style="color:red;">Ustaw, ile masz godzin pracy w tym miesiacu.</p>');
    }else{
        $('.DayPlanMonthWork').html('W tym miesiacu masz '+iloscDniPracy+' dni pracy.<br>Musisz przepracowac '+(iloscDniPracy*iloscGodzinPracy)+' godzin.');
    }
    countWorkDays();
    
});

function countWorkDays(){
    var dataOd = $('input[name=DayPlandataOd]').val();
    var dataDo = $('input[name=DayPlandataDo]').val();
    dataOd = inputTimetoMinutes(dataOd);
    dataDo = inputTimetoMinutes(dataDo);
    
    $('.DayPlandDataWynik').html('');
    if(isNaN(dataOd) || isNaN(dataDo)){
        if(isNaN(dataOd)) $('.DayPlandDataWynik').append('Uzupelnij czas rozpoczecia pracy.<br>');
        if(isNaN(dataDo)) $('.DayPlandDataWynik').append('Uzupelnij czas zakonczenia pracy.<br>');
    }else{
        if(dataOd>(24*60) || dataOd>(24*60)){
            if(dataOd>(24*60)) $('.DayPlandDataWynik').append('Czas rozpoczecia pracy jest niepoprawna.<br>');
            if(dataOd>(24*60)) $('.DayPlandDataWynik').append('Czas zakonczenia pracy jest niepoprawna.<br>');
        }else{
            if(dataOd>dataDo){
                $('.DayPlandDataWynik').append('Czas rozpoczecia pracy nie moze byc wieksza od czasu zakonczenia pracy.<br>');
            }else{
                $('.DayPlandDataWynik').append('Czas pracy wynosi '+minutesToInputTime(dataDo-dataOd)+'.<br>');
            }
        }
    }
    
    
}

$(document).ready(function(){
        $.mobile.changePage("#MainMenu2");
        
        console.log(daysInThisMonth());
    
    
        $('body').on('change','.input_date',function(){
                $('.input_date_text').html("Date = "+$(this).val());
        });
    
        $('body').on('change','input[name=iloscDniPracy]',function(){
                $('.iloscDniPracyText').html("iloscDniPracy = "+$(this).val());
                iloscDniPracy = $(this).val()*1;
        });
    
        $('body').on('change','input[name=iloscGodzinPracy]',function(){
                $('.iloscGodzinPracyText').html("iloscGodzinPracy = "+$(this).val());
                iloscGodzinPracy = $(this).val()*1;
        });
    
        $('body').on('change','input[name=DayPlandataOd],input[name=DayPlandataDo]',function(){
            countWorkDays();
        });
        
        
        
        
        console.log('ready');
});