//////////////////////////////////////////SLIDER///////////////////////////
const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    nav: true,
    responsive: {
        768: {
            nav: false
        }
      }
  });

document.querySelector('.slide-prev').addEventListener('click', function () {
    slider.goTo('prev');
}); 
document.querySelector('.slide-next').addEventListener('click', function () {
    slider.goTo('next');
}); 
/////////////////////////////////////////END SLIDER////////////////////////////////

///////JQUERY///////
(function($) {
    ////TABS///
    $(function() {
      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
      });
    ////END TABS///
    ///MODAL///
    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });
    ///END MODAL///
    ///VALIDATION FORMS////
    function validateForms(form){
        $(form).validate({
            rules: {
              name: "required",
              phone:"required",
              email: {
                required: true,
                email: true
              }
            },
            messages: {
              name: "Please enter your name",
              phone:"Please enter your phone number",
              email: {
                required: "We need your email address to contact you",
                email: "Your email address must be in the format of name@domain.com"
              }
            }
          });
    }
    validateForms("#consultation_form");
    validateForms("#consultation form");
    validateForms("#order form");
    ///END VALIDATION FORMS///
    $("input[name=phone]").mask("+39(999) 999-9999");
    ///SEND FORM/////

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()){
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    ///END SEND FORM

    ///SCROLL PAGE///
    $(window).scroll(function() {
        if($(this).scrollTop() > 185 && $(this).scrollTop() < 950){
            $('.advantages__icon').eq(1).addClass('advantages__icon_animated');
        }
        else{
            $('.advantages__icon').eq(1).removeClass('advantages__icon_animated');
        }
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
    ////END SCROLL PAGE/////
    })(jQuery);

let catalogItem =  document.querySelectorAll('.catalog-item');
for(let i=0; i<catalogItem.length; i++){
    catalogItem[i].addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.classList.contains('catalog-item__link'))
            {
                const general = this.querySelector('.catalog-item__general');
                const details = this.querySelector('.catalog-item__details');

                if(general.classList.contains('catalog-item__general_active')){
                    general.classList.remove('catalog-item__general_active');
                    details.classList.add('catalog-item__details_active');
                }
                else{
                    general.classList.add('catalog-item__general_active');
                    details.classList.remove('catalog-item__details_active');
                }
            }
    });
}
    




