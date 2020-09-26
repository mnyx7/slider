$().ready(() => {
    let n = 0;
    let timer;
    start();

    async function show(file) {
        
        let json = JSON.parse(file);
        let obj = await json;

        if (n == obj.slider.length) n = 0;
        if (n < 0) n = obj.slider.length - 1;

        $(".slide").fadeOut(100, function () {
            $(this).css('background-image', 'url("img/' + obj.slider[n].image + '")');
            $(this).fadeIn(700);
        });
        $('.title h1').html(obj.slider[n].text.h1);
        $('.title p').html(obj.slider[n].text.p);
        $('.title a').attr('href', obj.slider[n].url);
    }

    $('.slider').on({
        "swiperight": function (event) { n--; start(); },
        "swipeleft": function (event) { n++; start(); },
    });

    $('.dots>div').click(function () { n = this.innerHTML - 1; start(); });

    function start() {
        stop();
        loadSlide();
        timer = setInterval(() => { n++; loadSlide(); show(); }, 3000);
    }

    function stop() {
        clearInterval(timer);
    }

    function loadSlide() {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "slider.json");
        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                show(this.responseText);
            }
        };
    }
});