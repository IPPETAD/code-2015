$("#search").click(function() {
    var bar = $('input.form-control');
    window.location.replace("/browse?q=" + encodeURI(bar.val()));
});

$("input.form-control").keypress(function(event) {
    if(event.keyCode == 13) {
        $("#search").click();
    }
});