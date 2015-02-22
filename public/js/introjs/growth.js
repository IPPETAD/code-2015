$(".title").attr('data-step', 1);
$(".title").attr('data-intro',
      "<p>This page shows industry growth!</p>");


if (RegExp('tour', 'gi').test(window.location.search)) {
    introJs().start();
}

