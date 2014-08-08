$(function(){
	
	function hasSupport(properties, operator) {
	  return properties in document.createElement(operator);
	}

	function setHolder() {
		if( hasSupport('placeholder', 'input') ) {
			$('.form-group>.holder').remove();
		} else {
			var inputLen = $('.form-group').find('input').length;
			for( var i = 0; i < inputLen; i++ ){
				if( $('.form-group').find('input').eq(i).val() ) {

					$('.form-group').find('input').eq(i)
									.prev().css({display: 'none'});
				}
			}

			$('.form-group').find('input')
							.on('focus', function(){
								$(this).prev().css({display: 'none'});
							})
							.on('blur', function(){
								if($(this).val()){
									$(this).prev().css({display: 'none'});
								} else {
									$(this).prev().css({display: 'block'});
								}
							});
		}
	}


	// function regExpTest( patten, tester) {
	// 	// tester.on('blur', function () {
 //      		var testValue = tester.val();
 //      		if( patten.test(testValue) ) {
 //      			// console.log('a');
	// 			return true;
	// 		} else {
	// 			// console.log('b');
	// 			return false;
	// 			// event.preventDefault();
	// 		}
 //    	// });

	// }
	function regExpTest( patten, tester) {
  		var testValue = tester.val();
  		return patten.test(testValue);
	}

	function formTest() {

		// var emailPatten = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

		var usernamePatten = new RegExp(/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)|([A-Za-z0-9]{3,20})$/);
		var passwordPatten = new RegExp(/^[A-Za-z0-9]{3,20}$/);
		var vcodePatten = new RegExp(/^[A-Za-z0-9]{4}$/);
		var patten = null;

		function changeInputState(){
			// 正则匹配
			switch ( $(this).attr('name') ) {
				case 'username' :
					patten = usernamePatten;
					break;
				case 'password' :
					patten = passwordPatten;
					break;
				case 'vcode' :
					patten = vcodePatten;
					break;
				default:
					patten = new RegExp(/^[A-Za-z0-9]{3,20}$/);
					break;
			}
			if( regExpTest( patten, $(this) ) ) {
				// 状态符号
				if( $(this).next('.glyphicon').length ) {

					$(this).next('.glyphicon').removeClass('glyphicon-remove')
													.addClass('glyphicon-ok');
				} else {
					$(this).after('<span class="glyphicon form-control-feedback glyphicon-ok" style="top:0px;right:10px;"></span>');
				}
				$(this).next('.glyphicon').css({color: 'green'});
			} else {
				// 状态符号
				if( $(this).next('.glyphicon').length ) {
					
					$(this).next('.glyphicon').removeClass('glyphicon-ok')
													.addClass('glyphicon-remove');
					
				} else {
					$(this).after('<span class="glyphicon form-control-feedback glyphicon-remove" style="top:0px;right:10px;"></span>');

				}
				$(this).next('.glyphicon').css({color: 'red'});

				// 提醒信息
				$(this).val('');
				if( hasSupport('placeholder', 'input') ){
					// var message = $(this).attr('placeholder');
					$(this).attr('placeholder', '请输入' + $(this).attr('alt') + '！');
					// setTimeout(function(){
					// 	$('#username').attr('placeholder', message);
					// }, 2000);
				} else {
					// var holderText = $(this).prev('.holder').text();
					$(this).prev('.holder').text('请输入' + $(this).attr('alt') + '！');
				}

			}
		}

		$('#username').on('blur', changeInputState);
		$('#password').on('blur', changeInputState);
		$('#vcode').on('blur', changeInputState);


		$('#email').on('blur', changeInputState);
		$('#input-password').on('blur', changeInputState);
		$('#confirm-password').on('blur', changeInputState);
	}

	
// 	function formConfirm() {
// 		console.log(isEmail);
		
// 	}
formTest();


	setHolder();
});
