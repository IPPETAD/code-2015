$(".title").attr('data-step', 1);
$(".title").attr('data-intro',
      "<p>Yer a wizard, 'Arry!</p>");


if (RegExp('tour', 'gi').test(window.location.search)) {
    introJs().setOption('doneLabel', 'Growth!').start().oncomplete(function() {
        window.location.href = "growth?tour=true";
    });
}

