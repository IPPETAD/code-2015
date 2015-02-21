$("#search").click(function() {
    var bar = $('input.form-control');
    window.location.replace("/browse?q=" + bar.val());
});