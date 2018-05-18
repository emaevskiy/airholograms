//Работа с формой

var form = {
  data: {
    firstname: {
      pattern: /^[a-zA-Zа-яА-Я]{2,20}$/,
      required: true,
      value: ""
    },
    lastname: {
      pattern: /^[a-zA-Zа-яА-Я]{2,20}$/,
      required: true,
      value: ""
    },
    company: {
      pattern: /^[a-zA-Zа-яА-Я0-9-\s]{2,40}$/,
      required: true,
      value: ""
    },
    site: {
      pattern:  /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,10}\.?)(\/[\w\.]*)*\/?$/,
      required: true,
      value: ""
    },
    email: {
      pattern: /^([a-zA-Z0-9_.-])+\@([a-zA-Z0-9_.-])+\.([a-zA-Z]{2,10})/,
      required: true,
      value: ""
    },
    city: {
      pattern: /^[a-zA-Zа-яА-Я-\s]{2,30}$/,
      required: true,
      value: ""
    },
    application: {
      // pattern: /^[a-zA-Zа-яА-Я-\s]{2,30}$/,
      // required: true,
      value: ""
    },
    count: {
      pattern: /^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^999$/,
      required: true,
      value: ""
    },
    comment: {
      pattern: /^[^`]{1,1024}$/,
      required: true,
      value: ""
    }
  }
};


$('.form').find('button[type=submit]').click(function(e){

  e.preventDefault();

  let thisForm  =  $(this).closest('form');

  thisForm.find('.form-input, .form-area').each(function(){
    let type  =  $(this).attr('name'),
       value  =  $(this).val(),
        data  =  form.data[type];

    if (data.required && value == '') {
       $(this).removeClass('success').addClass('error').next().html('Это поле обязательно к заполнению.');
    } else if (!data.pattern.test(value)) {
      $(this).removeClass('success').addClass('error').next().html('Поле заполнено некорректно.');
    } else {
      $(this).removeClass('error').addClass('success').next().html('');
      data.value = value;
    }

  });

  let success  =  thisForm.find('.success').length,
        error  =  thisForm.find('.error').length;

  if (error == 0 && success >= 1) {

    let data = thisForm.serialize();

    thisForm.find('.form-body').prepend('<div class="loader"><div class="loader-spinner loader-spinner-32"></div></div>'); // Показываем loader во время ожидания ответа от сервера

    $.ajax ({ // Формируем ajax-запрос
      url: 'send.php',
      type: 'POST',
      data: data,
      success: function(){
        thisForm.find('.form-body').find('.loader').remove();
        thisForm.closest('.form').find('.form-message-success').text('Сообщение успешно отправлено!');
        thisForm.remove();
      },
      error: function(){
        thisForm.find('.form-body').find('.loader').remove();
        thisForm.closest('.form').find('.form-message-error').text('Ошибка! Не удалось отправить сообщение, попробуйте снова.');
      }
    });
  }
});


$(".form-tabs").find('.btn').click(function(e){

  e.preventDefault();

  let btnClass  =  'btn-primary',
          form  =  $(this).closest('.form'),
          type  =  $(this).data('type');

  form.find('.form-content').hide();
  form.find('.js-' + type +'').show();
  form.find('.form-btn').show();
  form.find('.' + btnClass).removeClass(btnClass + '-active');
  $(this).addClass(btnClass + '-active');

  form.find('.form-content').find('.textinput > input, .textinput > textarea').val("");
  form.find('.form-content').find('select > options:eq(0)').prop('selected', true);
  form.find('.dropdown-header').text('Выберите область');

});


//Dropdowns

$('.form').each(function(){

  $(this).find(".dropdown-list").html('');

  $(this).find(".textinput > select > option").each(function(){

    let value = $(this).val();

    $(this).closest('.textinput').find('.dropdown-list').append('<li><a href="#">'+ value +'</a></li>');

  });

});


$(".dropdown-header, .dropdown a").click(function(e){

  e.preventDefault();

  $(this).closest('.dropdown').toggleClass('dropdown-opened');

});


$(".dropdown a").click(function(e){

  e.preventDefault();

  let index = $(this).parent().index();
  let value = $(this).closest('.textinput').find('select > option:eq('+ index +')').text();

  $(this).closest('.textinput').find('select > option:eq('+ index +')').prop('selected', true);
  $(this).closest('.dropdown').find('.dropdown-header').text(value);

});


$(document).click(function(event){

    if ($(event.target).closest(".dropdown-opened").length) return;
    $(".dropdown-opened").removeClass('dropdown-opened');
    event.stopPropagation();

});


// function initReview(Id) { // Id блока отзывов
//
//   var        block  =  $('#' + Id),
//       reviewsCount  =  block.find('.review-item').length,
//         slideIndex  =  0,
//                  i  =  0;
//
//   block.find('.review-dots').html('');
//
//   for (i = 0; i < reviewsCount; i++) {
//     block.find('.review-dots').append('<li><button class="review-ctrl"></button></li>');
//   }
//
//   block.find('.review-ctrl:eq('+ slideIndex +')').addClass('review-ctrl-active');
//
//
//   function changeReview() {
//
//     block.find('.review-ctrl').removeClass('review-ctrl-active');
//     block.find('.review-ctrl:eq('+ slideIndex +')').addClass('review-ctrl-active');
//     block.find('.review-item').hide();
//     block.find('.review-item:eq('+ slideIndex +')').fadeIn(400);
//
//   };
//
//
//   block.find('.review-ctrl').click(function(){
//
//     slideIndex = $(this).parent().index();
//
//     changeReview();
//
//   })
//
//
//   block.find('.review-arrow').click(function(){
//
//     if ($(this).hasClass('js-prew')) {
//
//       slideIndex--;
//       if (slideIndex < 0) slideIndex = block.find('.review-item').length - 1;
//
//     } else if ($(this).hasClass('js-next')) {
//
//       slideIndex++;
//       if (slideIndex >= block.find('.review-item').length) slideIndex = 0;
//
//     }
//
//     changeReview();
//
//   })
//
// };



$('.hypervsn-plus').click(function(){

  let type  =  $(this).data('type');

  $('.js-' + type).fadeIn(400);
  $('body, html').css('overflow', 'hidden');

});



$('.popup-bg, .popup-close').click(function(){

  $(this).closest('.popup').fadeOut(200);
  $('body, html').css('overflow', 'auto');

});



$('.gallery-item').hover(function(){

    $('.gallery-item').css('opacity', '.4');
    $(this).css('opacity', '1').css('z-index', '2');

  }, function() {

    $('.gallery-item').css('opacity', '1').css('z-index', '1');

});



$(window).scroll(function() {

  let scrollPosition = $(window).scrollTop(),
              height = $('.main-screen').height();

  if (scrollPosition > height - 100) {
    $('.header').addClass('header-fixed');
  } else {
    $('.header').removeClass('header-fixed');
  }

});


var navSelector = ".header-nav";

function onScroll(){

  var scrollTop = $(document).scrollTop();

  $(navSelector + " a.link").each(function(){
    var hash = $(this).attr("href");
    var target = $(hash);
    if (target.position().top <= scrollTop + 80) {
      $(navSelector + " a.link").removeClass("link-active");
      $(this).addClass("link-active");
    } else {
      $(this).removeClass("link-active");
    }
  });

}

$(document).ready(function () {
  $(document).on("scroll", onScroll);
  $("a.link[href^=\\#]").click(function(e){
    e.preventDefault();
    $(document).off("scroll");
    $(navSelector + " a.link").removeClass("link-active");
    $(this).addClass("link-active");
    var hash = $(this).attr("href");
    var target = $(hash);
    $("html, body").animate({
        scrollTop: target.offset().top
    }, 1000, function(){
      window.location.hash = hash;
      $(document).on("scroll", onScroll);
    });
  });

  $(".main-screen button").click(function(e){
    e.preventDefault();
    $(document).off("scroll");
    var hash = $(this).data("href");
    var target = $(hash);
    $("html, body").animate({
        scrollTop: target.offset().top - 70
    }, 1000, function(){
      // window.location.hash = hash;
      $(document).on("scroll", onScroll);
    });
  });
});
