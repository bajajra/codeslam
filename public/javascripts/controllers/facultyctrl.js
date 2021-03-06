var app = angular.module('facultyctrl', ['facultyservice']);


app.controller('facultyloginController', ['facAuth', '$location', function (facAuth, $location) {
	var vm = this;
	vm.login = function (faculty) {
		loading = true;
		console.log(faculty);
		facAuth.login(faculty).then(function (status) {
			if (status.data.success) {
				loading = false;
				$location.path('/faculty/home');
			}
			else {
				vm.error = true;
				loading = false;
				$location.path('/error');
			}
		});
	};
}]);

app.controller('facultyHomeCtrl', ['$location', 'facAuth', function ($location, facAuth) {
	var vm = this;
}]);

app.controller('challengeCreateCtrl', ['$location', 'facChallenge', function ($location, facChallenge) {
	var vm = this;
	vm.submitQuestion = function () {
		loading = true;
		var data = CKEDITOR.instances.cke.getData();
		vm.question.data = data;

		//the select box is to be taken using [0] as the index
		var question = vm.question;
		facChallenge.create(question).then(function (data) {
			if (data.success) {
				loading = false;
				//alert(data.message);
				$location.path('/faculty/review')
			}
			else {
				loading = false;
				alert(data.message);
			}
		}, function (err) {
			console.log(err);
		})
	};
}]);

app.controller('facReviewController', ['$location', 'facChallenge', function ($location, facChallenge) {
	var vm = this;
	var none = true;
	vm.init = function () {
		facChallenge.get().then(function (data) {
			vm.questions = data.questions;
			if (vm.questions.length === 0) {
				none = true;
			}
			else {
				none = false;
			}
			console.log(vm.questions.length);
		}, function (err) {
			console.log(err);
		});
	};
	vm.nothing = function () {
		return none;
	}

	vm.fetchQuestions = function () {
		vm.init();
	}

	vm.delete = function (obj) {
		var id = obj.question._id;
		//console.log(id);
		facChallenge.remove(id).then(function (data) {
			//console.log(data);
			vm.init();
			if (vm.questions.length === 0) {
				none = true;
			}
			else {
				none = false;
			}
			//console.log(none);
			vm.nothing();
		}, function (err) {
			//console.log(err);
		});
	};
}]);

app.controller('submissionsController', ['$location', 'challSubmissions', function ($location, challSubmissions) {
	var vm = this;
	var arr = [];
	vm.init = function () {
		challSubmissions.get().then(function (data) {
			console.log(data);
			data.forEach(function(question){
				question.submissions.forEach(function(value){
					console.log(value);
					arr.push(value);
				});
			});
			console.log(arr);
			vm.submissions = arr;
		},function(err){
			console.log(err);
		});
	}
}]);