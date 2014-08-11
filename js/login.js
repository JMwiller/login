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

	function regExpTest( patten, tester) {
  		var testValue = tester.val();
  		return patten.test(testValue);
	}

	function formTest() {


		var emailPatten = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		var accountPatten = /^[A-Za-z0-9]{3,20}$/;
		var usernamePatten = /^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)|([A-Za-z0-9]{3,20})$/;
		var passwordPatten = /^[A-Za-z0-9]{3,20}$/;
		var vcodePatten = /^[A-Za-z0-9]{4}$/;
		var patten = null;

		function changeInputState(){
			// 正则匹配
			switch ( $(this).attr('name') ) {
				case 'email' :
					patten = emailPatten;
					break;
				case 'username' :
					patten = usernamePatten;
					break;
				case 'account' :
					patten = accountPatten;
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


		// 绑定验证input
		$('#account').on('blur', changeInputState);
		$('#password').on('blur', changeInputState);
		$('#vcode').on('blur', changeInputState);

		$('#username').on('blur', changeInputState);
		$('#email').on('blur', changeInputState);
		$('#new-password').on('blur', changeInputState);
		$('#confirm-password').on('blur', changeInputState);
	}

	function comfirmCheck() {
		
		$('#login').on('click', function(event){
			var e = event || window.event;
			var isFormed = ( $('#account').val() || $('#password').val() || $('#vcode').val() );
			
			$(this).parent().find('.login-alert').hide();
			if (isFormed) {
				// 调用ajax上传
				e.preventDefault();
			} else {
				
				$(this).parent().find('.login-alert').show();
				e.preventDefault();
				return false;
			}
		});
		
		$('#sign-in').on('click', function(event){
			var e = event || window.event;
			var isFormed = ( $('#username').val() || $('#email').val() || $('#confirm-password').val() || $('#new-password').val() || $('#vcode').val() );
			
			$(this).parent().find('.login-alert').hide();
			if( $('#new-password').val() != $('#confirm-password').val() ) 
			{
				$(this).parent().find('.login-alert').show();
				$(this).parent().find('.login-alert').text('请输入相同密码！');
			}
			if (isFormed) {
				// 调用ajax上传
				e.preventDefault();
			} else {
				$(this).parent().find('.login-alert').show();
				$(this).parent().find('.login-alert').text('请完整填写！');
				
				e.preventDefault();
				return false;
			}
		});
	}	

formTest();
comfirmCheck();

	setHolder();
});
