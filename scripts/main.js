var projectSwiper = new Swiper('.hero__swiper', {
slidesPerView: 1,
spaceBetween: 50,
effect: 'fade',
keyboard: {
	enabled: true,
},
navigation: {
	prevEl: '.hero__swiper-button-prev',
	nextEl: '.hero__swiper-button-next',
},
})

var projectSwiper = new Swiper('.booking__steps-swiper', {
slidesPerView: "auto",
spaceBetween: 15,
freeMode: true,
mousewheel: true,
breakpoints: {
	768: {
		spaceBetween: 5,
	},
},
})

var activitiesSwiper = new Swiper('.hero__bottom-swiper', {
loop: true,
slidesPerView: 1,
spaceBetween: 15,
freeMode: true,
speed: 6000,
centeredSlides: true,
// allowTouchMove: false,
autoplay: {
	delay: 0,
	disableOnInteraction: false,
	pauseOnMouseEnter: true,
},

breakpoints: {
	520: {
		slidesPerView: 2,
		spaceBetween: 10,
	},
	768: {
		slidesPerView: 'auto',
		spaceBetween: 15,
	},
},
})

jQuery(document).ready(function ($) {
	// modal
	MicroModal.init({
		openTrigger: 'data-micromodal-trigger',
		closeTrigger: 'data-micromodal-close',
		disableFocus: false,
		disableScroll: true,
		awaitOpenAnimation: true,
		awaitCloseAnimation: true
	});

	$('.js-modal-callback').on('click', function(e) {
		e.preventDefault();
		MicroModal.show('modal-callback');
	});

	// mobile menu
	$('.js-burger').on('click', function () {
		$(this).toggleClass('is-active')
		$('.js-mobile-menu').toggleClass('is-open')
		$('body').toggleClass('no-scroll')
	})

	$('.header__mobile-menu-nav-link').on('click', function () {
		$('.js-burger').removeClass('is-active')
		$('.js-mobile-menu').removeClass('is-open')
		$('body').removeClass('no-scroll')
	})

	// copy address to clipboard
	$('.js-copy-clipboard').on('click', function(e) {
		e.preventDefault();
		
		const textToCopy = $(this).data('copy');
		const $this = $(this);
		
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				const $notification = $('<div class="copy-notification">Скопировано!</div>');
				$notification.css({
					'position': 'absolute',
					'background': 'rgba(0, 0, 0, 0.4)',
					'color': '#fff',
					'padding': '5px 10px',
					'font-size': '14px',
					'z-index': '12',
					'top': $this.offset().top - 30 + 'px',
					'left': $this.offset().left + ($this.width() / 2) - 50 + 'px'
				});
				
				$('body').append($notification);
				
				setTimeout(() => {
					$notification.fadeOut(200, function() {
						$(this).remove();
					});
				}, 1500);
			})
			.catch(err => {
				console.error('Ошибка при копировании: ', err);
			});
	});

	// form validation
	$("input[type='tel']").mask('+7 (999) 999-99-99')

	$('.booking__form').on('submit', function(e) {
		e.preventDefault();
		
		let isValid = true;
		
		const arrivalDate = $('#date-arrival').val();
		if (!arrivalDate) {
			$('#date-arrival').addClass('error');
			isValid = false;
		} else {
			$('#date-arrival').removeClass('error');
		}
		
		const departureDate = $('#date-departure').val();
		if (!departureDate) {
			$('#date-departure').addClass('error');
			isValid = false;
		} else {
			$('#date-departure').removeClass('error');
		}
		
		const guests = $('#guests').val();
		if (!guests || guests < 1 || guests > 6) {
			$('#guests').addClass('error');
			isValid = false;
		} else {
			$('#guests').removeClass('error');
		}
		
		const house = $('#house').val();
		if (!house) {
			$('.form__custom-select-trigger').addClass('error');
			isValid = false;
		} else {
			$('.form__custom-select-trigger').removeClass('error');
		}
		
		const name = $('#name').val();
		if (!name) {
			$('#name').addClass('error');
			isValid = false;
		} else {
			$('#name').removeClass('error');
		}
		
		const phone = $('#phone').val();
		if (!phone || phone.length < 18) { 
			$('#phone').addClass('error');
			isValid = false;
		} else {
			$('#phone').removeClass('error');
		}
		
		const privacy = $('#privacy').is(':checked');
		if (!privacy) {
			$('label[for="privacy"]').addClass('error');
			isValid = false;
		} else {
			$('label[for="privacy"]').removeClass('error');
		}

		if (isValid) {			
			const formData = {
				arrivalDate: arrivalDate,
				departureDate: departureDate,
				guests: guests,
				house: house,
				name: $('#name').val(),
				phone: $('#phone').val(),
				email: $('#email').val(),
				animal: $('#animal').is(':checked'),
				comment: $('#comment').val()
			};
			
			console.log('Данные формы:', formData);
			
			alert('Спасибо! Мы свяжемся с вами в ближайшее время.');

			$('.booking__form')[0].reset();
		}
	});
		
	$('#callback-form').on('submit', function(e) {
		e.preventDefault();
		
		let isValid = true;
		
		const name = $('#callback-name').val();
		if (!name) {
			$('#callback-name').addClass('error');
			isValid = false;
		} else {
			$('#callback-name').removeClass('error');
		}
		
		const phone = $('#callback-phone').val();
		if (!phone || phone.length < 18) { 
			$('#callback-phone').addClass('error');
			isValid = false;
		} else {
			$('#callback-phone').removeClass('error');
		}

		if (isValid) {
			const formData = {
				name: name,
				phone: phone
			};
			
			console.log('Данные формы заказа звонка:', formData);
			
			MicroModal.close('modal-callback');
			alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
			
			$('#callback-form')[0].reset();
		}
	});

	$('.footer__form').on('submit', function(e) {
		e.preventDefault();
		
		let isValid = true;
		
		const name = $('#footer-name').val();
		if (!name) {
			$('#footer-name').addClass('error');
			isValid = false;
		} else {
			$('#footer-name').removeClass('error');
		}
		
		const phone = $('#footer-phone').val();
		if (!phone || phone.length < 18) { 
			$('#footer-phone').addClass('error');
			isValid = false;
		} else {
			$('#footer-phone').removeClass('error');
		}

		if (isValid) {
			const formData = {
				name: name,
				phone: phone
			};
			
			console.log('Данные формы футера:', formData);
			alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
			
			$('.footer__form')[0].reset();
		}
	});

	// fixed header on scroll
	const header = $('.header')
	const heroHeight = $('.hero').outerHeight()
	const headerHeight = $('.header').innerHeight()
	
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > heroHeight) {
			header.addClass('is-fixed')
		} else {
			header.removeClass('is-fixed')
		}
	})
	
	// datepicker arrow 
	$('input[type="date"]').on('focus', function() {
		$(this).addClass('is-active');
	});
	
	$('input[type="date"]').on('blur change', function() {
		$(this).removeClass('is-active');
	});
	
	$(document).on('click', function(e) {
		if (!$(e.target).closest('input[type="date"]').length) {
			$('input[type="date"]').removeClass('is-active');
		}
	});
	
	// form custom select 
	$('.form__custom-select-trigger').on('click', function() {
		const parent = $(this).closest('.form__custom-select');
		parent.find('.form__custom-select-dropdown').toggleClass('is-active');
		$(this).toggleClass('is-active');
	});
	
	$('.form__custom-select-option').on('click', function() {
		const value = $(this).data('value');
		const text = $(this).text();
		const parent = $(this).closest('.form__custom-select');
		
		parent.find('.form__custom-select-trigger').text(text);
		
		// Создаем или обновляем скрытый input для хранения значения
		if (parent.find('input[type="hidden"]').length === 0) {
			parent.append('<input type="hidden" name="house" id="house" value="' + value + '">');
		} else {
			parent.find('input[type="hidden"]').val(value);
		}
		
		parent.find('.form__custom-select-option').removeClass('is-selected');
		$(this).addClass('is-selected');
		
		parent.find('.form__custom-select-trigger').removeClass('error');
		
		parent.find('.form__custom-select-dropdown').removeClass('is-active');
		parent.find('.form__custom-select-trigger').removeClass('is-active');
	});
	
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.form__custom-select').length) {
			$('.form__custom-select-dropdown').removeClass('is-active');
			$('.form__custom-select-trigger').removeClass('is-active');
		}
	});
	


})

