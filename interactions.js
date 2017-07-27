/*function changeClass(theClass) {
    var w = document.getElementById(theClass);
    var bar = document.getElementsByClassName('notactive');
    for (var i = 0; i < 4; i++) {
      bar[i].style.color = "black";
    }
    w.style.color = 'white';
}*/
/*$(document).load(function() {
  $(".info").each(function() {
  var height = $(this).height();
  $("this .rotation").width(height);
  });
});*/

function myFunction(param) {
    var popup = document.getElementById(param);
    popup.classList.toggle("show");
}

/*function scrolling() {
$('li a').each(function(){
  var x = 'div#about';
  if(this.id == 'Resume') {
    x = 'div#resume';
  } else if(this.id == 'Projects') {
    x = 'div#projects';
  } else if(this.id == 'Contact') {
    x = 'div#contact';
  }
  $(this).addClass();
  var distance = $(x).offset().top;
    $window = $(window);
  if($window.scrollTop() >= distance) {
      $(this).toggleClass('active');
  }
});
}*/
