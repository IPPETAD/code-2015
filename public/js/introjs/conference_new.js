$("#wizard").attr('data-step', 1);
$("#wizard").attr('data-intro',
      "<p>Yer a wizard, 'Arry!</p>");


var startTour = function() {
	introJs().setOption('doneLabel', 'Growth!').start().oncomplete(function() {
        window.location.href = "growth?tour=true";
    });
};

if (RegExp('tour', 'gi').test(window.location.search)) {
    startTour();
}

