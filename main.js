$(function () {
    var $nav = $('.navbar');
    var $dropmenu = $('.dropdown-menu');
    var $dropitem = $('.dropdown-item');
    var $navbarcollapse = $('.navbar-collapse');
    var $darkenmain = $('.darken-overlaymain');
    var $aboutheader = $('.aboutheader');
    var topOffset = $nav.offset().top;
    var windowHeight = $(window).height();
    //Do I need to reinitialize these upon window resize?
    var flagTopOffset = $(window).scrollTop() > topOffset ? 1 : 2;
    var flagWindowHeight = $(window).scrollTop() > windowHeight * .9 ? 1 : 2;

    //initial logic in case window is not scrolled to top
    var scrollValue = $(window).scrollTop();
        $nav
            .toggleClass('affix', scrollValue > topOffset)
            .toggleClass('bg-dark', scrollValue > windowHeight);

    //these values depend on window size, so they have to be reset if someone resizes the window
    $(window).on('resize', function() {
        topOffset = $nav.offset().top;
        windowHeight = $(window).height();
    });

    //hook the scrolling so we can add/remove css classes on the navbar
    $(window).on('scroll', function (event) {
        //fix the navbar if we scroll past the original position
        //add background color if we are scrolled past the image
        var scrollValue = $(window).scrollTop();
        $nav
           .toggleClass('affix', scrollValue > topOffset)
           .toggleClass('bg-dark', scrollValue > windowHeight * .9);
        $dropmenu
           .toggleClass('bgtrans', scrollValue <= windowHeight * .9);
        $dropitem
           .toggleClass('bgtrans', scrollValue <= windowHeight * .9);
        if (scrollValue > windowHeight * .9 && flagWindowHeight != 1) {
            $("#navbarResponsive:visible").collapse('toggle');
            flagWindowHeight = 1;
        } else if (scrollValue <= windowHeight * .9 && flagWindowHeight != 2) {
            $("#navbarResponsive:visible").collapse('toggle');
            flagWindowHeight = 2;
        }
    });


    //handle nav anchors with fragment identifier (<url>#something)
    $('.navbar a').click(function (event) {
        var url = $(this).attr('href'),
            idx = url.indexOf("#"),
            $hash = $(url.substring(idx)),
            top = $hash.length ? $hash.offset().top - 60 : 0;
        if (idx >= 0) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: top }, 500);
            $(".navbar-collapse").collapse('hide'); //Not sure why this was necessary, but original Bootstrap collapse-on-click seems to be inactive
        }
    });

    //toggle darken everything behind transparent navbar
    //$('.navbar-toggler').click(function (event) {
    $("#navbarResponsive").on("show.bs.collapse", function () {
        $darkenmain.toggleClass('zlayer2');
        $aboutheader.toggleClass('fadewhite-header');
        $aboutheader.toggleClass('darken-overlaysub');
    });

    $("#navbarResponsive").on("hide.bs.collapse", function () {
        $darkenmain.toggleClass('zlayer2');
        $aboutheader.toggleClass('fadewhite-header');
        $aboutheader.toggleClass('darken-overlaysub');
    });

    //collapse navbar on click
    $(document).click(function (event) {
        $(".navbar-collapse").collapse('hide'); 
    });
});
