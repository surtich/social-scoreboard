
function defaultAjaxErrorHandler(xhr, err, desc) {
	console.log(xhr, err, desc);
	var errorToast = document.querySelector('#toast');
	errorToast.text = '[' + xhr.status + '] ' + desc + ': ' + xhr.response;
	errorToast.show();
}


function showMsg(msg) {
	var toast = document.querySelector('#toast');
	toast.text = msg;
	toast.show();
}

function doAjax(options, success, error) {
	var deferred = $.Deferred();
	options.type = options.type || 'GET';
	options.url = options.url || '';
	if (socket.id()) {
		options.url += '?socketId=' + socket.id();
	}
	options.dataType = options.dataType || 'json';
	options.contentType = options.contentType || 'application/json; charset=UTF-8';
	options.success = success;
	options.error = (typeof error === 'function') ? error : defaultAjaxErrorHandler;
	options.cache = false;
	options.async = true;

	options.beforeSend = function(xhr) {
		xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
	};

	$.ajax(options).done(function(data) {
		deferred.resolve(data);
	}).fail(function(jqXHR, textStatus, errorThrown) {
		var err = '[doAjax] ERROR[' + jqXHR.status + '] textStatus[' + textStatus + '] errorThrown[' + errorThrown + ']';
		console.log(err);
		deferred.reject(err);
	});

	return deferred.promise();
}

var socket = (function() {
	var sock;
	var events = [];
	return {
		connect: function(token) {
			if (!sock) {
				sock = io.connect(':8000/', {
					query: 'token=' + token
				});
				sock.on('connect', function() {
					console.log('authenticated');
					events.forEach(function(fn) {
						fn.call(sock);
					});
				}).on('disconnect', function() {
					console.log('disconnected');
				});
			} else {
				sock.connect();
			}
		},
		disconnect: function() {
			sock.disconnect();
		},
		id: function() {
			if (sock) {
				return sock.io.engine.id;
			}
		},
		addEvent: function(fn) {
			events.push(fn);
		}
	};
}());

var getProfile = (function() {
	
	var profile = null;

	return function() {
		var deferred = $.Deferred();
		if (profile) {
			return deferred.resolve(profile);
		} else {
			doAjax({url: '/user/profile'}).done(function(user) {
				profile = user;
				deferred.resolve(profile);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				var err = '[doAjax] ERROR[' + jqXHR.status + '] textStatus[' + textStatus + '] errorThrown[' + errorThrown + ']';
				console.log(err);
				deferred.reject(err);
			});
		}
		return deferred.promise();
	};
}());