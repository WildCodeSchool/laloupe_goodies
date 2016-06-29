function notificationsController($scope, userFactory,$rootScope, $location,userService,notificationService) {
    $rootScope.$on('userFactoryUpdate', function() {
        var nbEvents = 0;
        var nbFriend = 0;
        if (userFactory.user.eventInvit) {
            $scope.eventInvit = userFactory.user.eventInvit;
            nbEvents = userFactory.user.eventInvit.length;
        }
        if (userFactory.user.friendsInvit) {
          $scope.friendsInvit = userFactory.user.friendsInvit;
          nbFriend = userFactory.user.friendsInvit.length;
        }
        $scope.nbNotifications = nbEvents + nbFriend;
    });

    $scope.accept = function (id, option) {
      if (option == 'event') {
        $location.path('/events/'+id);
      }else {
        $scope.data = {};
        $scope.data.userId = $rootScope.userId;
        $scope.data.friendId = id;
        userService.createFriend($scope.data).then(function() {});
        notificationService.delete($scope.data).then(function() {});
        userService.findOne($rootScope.userId).then(function(res) {
            userFactory.user = res.data;
            $rootScope.$emit('userFactoryUpdate');
        });
      }
    }

}