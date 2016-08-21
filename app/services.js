/**************************
 App ui Services

 loggit - Creates a logit type message for all logging

 **************************/

angular.module("app.ui.services", []).factory("loggit", [
    function () {
        var logIt;
        return toastr.options = {
            closeButton: !0,
            positionClass: "toast-top-right",
            timeOut: "3000"
        }, logIt = function (message, type) {
            return toastr[type](message);
        }, {
            log: function (message) {
                logIt(message, "info");
            },
            logWarning: function (message) {
                logIt(message, "warning");
            },
            logSuccess: function (message) {
                logIt(message, "success");
            },
            logError: function (message) {
                logIt(message, "error");
            }
        };
    }
])
    .factory("ArtistListingSrv", function ($http) {
        //Gets artists list with image url and name from the Server
        var ArtistListingObj = {},
            artists = [];
        //Get data from the .json files (Replace by your own webserver)
        ArtistListingObj.getArtists = function (callback) {
            $http.get(apiUrl + '/api/artists').success(function (data) {
                artists = data;
                ArtistListingObj.artists = artists;
                callback(data);

            });
        };
        return ArtistListingObj;
    })
    .factory("AlbumsListingSrv",
    function ($http) {

        /**************************
         Gets artists list with image url and name from the Server
         **************************/

        var AlbumListingObj = {},
            albums = [];

        /**************************
         Get data from the .json files (Replace by your own webserver)
         **************************/

        AlbumListingObj.getAlbums = function (callback) {

            $http.get('data/albums.json').success(function (data) {

                albums = data;

                AlbumListingObj.albums = albums;
                callback(data);

            });

        };

        return AlbumListingObj;

    })
    .factory("GenresListingSrv",
    function ($http) {

        /**************************
         Gets genres list with image url and name from the Server
         **************************/

        var GenresListingObj = {},
            genres = [];

        /**************************
         Get data from the .json files (Replace by your own webserver)
         **************************/

        GenresListingObj.getGenres = function (callback) {

            $http.get('data/genres.json').success(function (data) {

                genres = data;

                GenresListingObj.genres = genres;
                callback(data);

            });

        };

        return GenresListingObj;


    }).factory("AlbumSrv",
    function ($http) {

        /**************************
         Gets artists with all songs from the "Server"
         **************************/

        var PlayListObj = {},
            albums = [];

        /**************************
         Get data from the .json files (Replace by your own webserver)
         **************************/

        PlayListObj.getSongs = function (callback) {

            $http.get('data/albumsMusic.json').success(function (data) {

                albums = data;

                PlayListObj.albums = albums;
                callback(data);

            });

        };

        PlayListObj.getAlbum = function (title, callback) {

            PlayListObj.getSongs(function (data) {

                _.map(PlayListObj.albums, function (albumSongs) {

                    if (albumSongs.url_name == title) {
                        return callback(albumSongs);
                    }
                });

            });

        };

        return PlayListObj;

    })
    .factory("ArtistSrv", function ($http) {
        //Gets artists with all songs from the "Server"
        var self = {},
            artists = [];
        //Get data from the .json files (Replace by your own webserver)

        self.getSongs = function (callback) {
            $http.get('data/artistsMusic.json').success(function (data) {
                artists = data;
                PlayListObj.artists = artists;
                callback(data);
            });
        };

        self.getArtist = function (title, callback) {
            $http.get(apiUrl + '/api/artists/' + title).success(function (data) {
                callback(data);
            })
        };

        self.followArtist = function (Artist, successCallBack, failCallBack) {
            $http.get(apiUrl + '/api/artists/' + Artist.artist_id + '/follow').success(function (data) {
                successCallBack(data);
            }).error(function () {
                failCallBack(data);
            });
        };
        self.unfollowArtist = function (Artist, successCallBack, failCallBack) {
            $http.get(apiUrl + '/api/artists/' + Artist.artist_id + '/unfollow').success(function (data) {
                successCallBack(data);
            }).error(function () {
                failCallBack(data);
            });
        };

        self.getFollowers = function (artistId, successCallBack, failCallBack) {
            $http.get(apiUrl + '/api/artists/' + artistId + '/get-followers').success(function (data) {
                successCallBack(data);
            }).error(function () {
                failCallBack(data);
            });
        }
        return self;
    })
    .service(
    "SongSrv",
    ["$http",
        function ($http) {
            var self = {
                updatePlayedSong: function (track, callback) {
                    console.log('sending ', apiUrl + '/api/songs/' + track.id + '/played');
                    $http.get(apiUrl + '/api/songs/' + track.id + '/played').success(function (data) {
                        callback(data);
                    });
                }
            }
            return self;

        }])
    .factory(
    "PlayListSrv",
    ["$http", "$localStorage",
        function ($http, $localStorage) {
            var PlayListObj = {},
                playlists = {
                    list: $localStorage.playlists
                };


            var storage_id = "playlists_local_list";


            PlayListObj.get = function () {
                return JSON.parse(localStorage.getItem(storage_id) || JSON.stringify(playlists));
            };

            PlayListObj.put = function (playlist, callback) {

                PlayListObj.playlists.push(playlist);

                localStorage.setItem(storage_id, JSON.stringify(PlayListObj.playlistsObj));

                setTimeout(function () {
                    callback(localStorage.getItem(storage_id));
                }, 500);
            };

            PlayListObj.update = function (playlists) {

                PlayListObj.playlists = playlists;

                return localStorage.setItem(storage_id, JSON.stringify(PlayListObj.playlistsObj));
            };

            //Replace with get from localStorage
            PlayListObj.playlistsObj = PlayListObj.get();
            //PlayListObj.playlistsObj = playlists;

            PlayListObj.playlists = PlayListObj.playlistsObj.list;

            PlayListObj.getPlaylist = function (title, callback) {
                $http.get(apiUrl + '/api/playlists/' + title).success(function (data) {
                    callback(data);
                });
            };

            PlayListObj.getPlaylists = function (callback) {
                $http.get(apiUrl + '/api/playlists').success(function (data) {
                    callback(data);
                });
            };

            PlayListObj.addSongToPlaylist = function (song, playList, callback) {
                //here send the update to server and update the localstorage as well
                $http.post(
                    apiUrl + '/api/playlists/' + playList.playlist_id + '/add-song',
                    {songs: [song.id]}
                )
                    .success(function (data) {
                        if (callback) {
                            callback(data);

                        }
                        //update the localstodrage
                    })
                ;

            };

            PlayListObj.removeSongFromPlaylist = function (song, playListName) {
                _.map(PlayListObj.playlists, function (playlist) {
                    if (playlist.name == playListName) {

                        _.map(playlist.songs, function (songOnList) {
                            if (songOnList.url == song.url) {
                                playlist.songs = _.without(playlist.songs, songOnList);
                                PlayListObj.update(PlayListObj.playlists);
                            }
                        });
                    }
                });
            };
            PlayListObj.mediaPlayer = null;
            return PlayListObj;

        }])
    .factory("navigationMenuService",
    function () {

        /**************************
         Provides a way to toggle the menu scope
         **************************/

        var MENU_STATES = {
            menu: true,
            playing: false
        };

        return MENU_STATES;


    }).
    factory(
    "CreatePlaylistSrv",
    ['$modal', '$log', 'PlayListSrv', '$location', "$http",
        function ($modal, $log, PlayListSrv, $location, $http) {

            var CreatePlayListSrvObj = {};

            CreatePlayListSrvObj.openCreateModal = function (song) {

                var modalInstance = $modal.open({
                    templateUrl: 'app/views/forms/create_playlist.html',
                    controller: 'CreatePlaylistInstanceCtrl',
                    resolve: {
                        playlistName: function () {
                            return '';
                        },
                        song: function () {
                            return song;
                        }
                    }
                });

                modalInstance.result.then(function (response) {
                    var songs = [], playlistName;

                    if (typeof response.song != "undefined") {
                        songs.push(response.song);
                    }
                    playlistName = response.playlistName;

                    $http
                        .post(apiUrl + '/api/playlists', {name: playlistName, songs: [song]})
                        .success(function (data) {
                            CreatePlayListSrvObj.playList = data;
                            window.location = "#/playlist/" + CreatePlayListSrvObj.playList.playlist_id;
                        });
                    //Callback for a Okay on Save new playlist
                    /*var url_name = playlistName.toLowerCase().replace(" ","-"),
                     new_playlist = {
                     url_name: url_name,
                     name: playlistName,
                     banner: 'dist/images/playlists/playlistbanner.jpg',
                     image: 'dist/images/songs/song17.jpg',
                     genre: [],
                     songs: songs
                     };*/

                    /*PlayListSrv.put(new_playlist,function(response){
                     window.location = "#/playlist/" + url_name;
                     });*/

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            };

            return CreatePlayListSrvObj;
        }])
    .service(
    'UserService',
    ["$q", "User", "$http", "toastr",
        function ($q, User, $http, toastr) {

            var self = {
                get: function (id) {
                    return User.get({
                        "id": id
                    });
                },
                register: function ($scope) {
                    console.log('userservice.register', apiUrl);
                    $http
                        .post(apiUrl + '/api/register', $scope.user)
                        .success(function (data) {
                            if (data.success) {
                                toastr.success('Registered!');
                                //$state.go('login');
                            }
                            else {
                                toastr.error('Register Error! Please fill the form correctly');
                            }

                            $scope.registering = false
                        })
                        .error(function () {
                            toastr.error('Register Error!');
                            $scope.registering = false
                        });
                    ;
                },
                login: function ($scope) {
                    $http
                        .post(apiUrl + '/api/login', {username: $scope.username, password: $scope.password})
                        .success(function (data) {
                            if (data.success) {
                                $scope.logging = false;
                                $scope.$storage.token = data.access_token;
                                $scope.$storage.user = data.user;
                                $http.defaults.headers.common['Authentication'] = $scope.$storage.token.access_token;
                                toastr.success('Logged in!');
                                window.location.hash = '/dashboard';
                            }
                            else {
                                toastr.error('Login Failed!');
                            }
                            //$state.go('home');
                            $scope.logging = false;
                        })
                        .error(function (error) {
                            toastr.error('Something went wrong. Please try again!');
                            $scope.logging = false;
                        })
                    ;
                },
                save: function ($scope) {
                    return User.update({id: $scope.user.id}, $scope.user, function (d) {
                        $scope.updating = false;
                        toastr.success('Profile info updated');
                    }, function () {
                        $scope.updating = false;
                        toastr.error('Something went wrong. Please try again');
                    });
                },
                getFollowingArtists : function(id){

                    return User.query({
                        "id": id,
                        "action" : 'get-following-artists'
                    });
                }
            }
            return self;
        }])
    .service('Helper', [function () {
        var self = {
            uniquePush: function (elem, target, callback) {
                var pushable = true, pos = target.length;
                //pre-check
                angular.forEach(target, function (value, key) {
                    if (value.id == elem.id) {
                        pushable = false;
                        pos = key + 1;
                    }
                });
                if (pushable) {
                    target.push(elem); pos +=1;
                }
                if (callback) {
                    callback()
                }
                return pos
            },
        };

        return self;
    }])
    .service('UtilService', [
        "$q", "$http",
        function ($q, $http) {
        var self = {
            result : [],
            loadSearchResult : function(query){
                var deferred = $q.defer();
                deferred.resolve(self.result);

                $http.get(apiUrl + '/api/search?q=' + query).success(function(data){
                    self.result = [];
                    angular.forEach(data.data, function(result){
                        self.result.push({
                            "id" : result.id,
                            "text" : result.name
                        });
                    });
                });
                return deferred.promise;
            },
        }
        return self;
    }])
    .factory(
        'User',
        ["$resource",
            function ($resource) {
                return $resource(apiUrl + '/api/user/:id/:action',
                    {
                        id: '@id',
                        action: '@action'
                    },
                    {
                        'update': {
                            method: 'PUT'
                        }
                    }
                );
            }
        ]
    )
;