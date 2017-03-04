
/**************************
 Initialize the Angular App
 **************************/

var app = angular
        .module("app", ["ngRoute", "ngAnimate","ngResource","toastr", "app.config","ngStorage", "angular-ladda", "ui.bootstrap", "mgo-angular-wizard", "ui.tree", "ngMap", "ngTagsInput", "app.ui.ctrls", "app.ui.services", "app.controllers", "app.directives", "app.form.validation", "app.ui.form.ctrls", "app.ui.form.directives", "app.tables", "mediaPlayer","ngDragDrop", "app.music","socialLogin"])
        .run(
            ["$rootScope", "$location","loggit", "$http",
            function ($rootScope, $location, loggit, $http) {
                $(document).ready(function(){
                    setTimeout(function(){
                        $('.page-loading-overlay').addClass("loaded");
                        $('.load_circle_wrapper').addClass("loaded");
                        //loggit.logSuccess("Welcome to Groovy! Navigate and add songs to your playlists.");
                    },1000);
                });
                $rootScope.$on('$routeChangeStart', function(event, next, current) {
                    $rootScope.$broadcast('closeSearchBox', next, current);
                });

            }])
        .config(
            ["$routeProvider", "socialProvider",
            function($routeProvider, socialProvider) {
                socialProvider.setFbKey({appId: FB_APP_ID, apiVersion: "v2.8"});
                return $routeProvider.when("/", {
                    redirectTo: "/dashboard"
                }).when("/dashboard", {
                    templateUrl: "views/dashboards/dashboard.html"
                }).when("/logout", {
                    templateUrl: "views/pages/logout.html"
                }).when("/dashboard/dashboard", {
                    templateUrl: "views/dashboards/dashboard.html"
                }).when("/ui/typography", {
                    templateUrl: "views/ui_elements/typography.html"
                }).when("/ui/buttons", {
                    templateUrl: "views/ui_elements/buttons.html"
                }).when("/ui/icons", {
                    templateUrl: "views/ui_elements/icons.html"
                }).when("/ui/grids", {
                    templateUrl: "views/ui_elements/grids.html"
                }).when("/ui/widgets", {
                    templateUrl: "views/ui_elements/widgets.html"
                }).when("/ui/components", {
                    templateUrl: "views/ui_elements/components.html"
                }).when("/ui/timeline", {
                    templateUrl: "views/ui_elements/timeline.html"
                }).when("/ui/nested-lists", {
                    templateUrl: "views/ui_elements/nested-lists.html"
                }).when("/playlist/sample", {
                    templateUrl: "views/playlist/sample.html"
                }).when("/artist/:title", {
                  templateUrl: "views/playlist/artist.html"
                }).when("/playlist/:title", {
                  templateUrl: "views/playlist/playlist.html"
                }).when("/artist-list", {
                  templateUrl: "views/playlist/artists-list.html"
                }).when("/albums", {
                  templateUrl: "views/playlist/albums.html"
                }).when("/album/:title", {
                  templateUrl: "views/playlist/album.html"
                }).when("/genres", {
                  templateUrl: "views/playlist/genres.html"
                }).when("/forms/elements", {
                    templateUrl: "views/forms/elements.html"
                }).when("/forms/layouts", {
                    templateUrl: "views/forms/layouts.html"
                }).when("/forms/validation", {
                    templateUrl: "views/forms/validation.html"
                }).when("/forms/wizard", {
                    templateUrl: "views/forms/wizard.html"
                }).when("/maps/gmap", {
                    templateUrl: "views/maps/gmap.html"
                }).when("/maps/jqvmap", {
                    templateUrl: "views/maps/jqvmap.html"
                }).when("/tables/static", {
                    templateUrl: "views/tables/static.html"
                }).when("/tables/responsive", {
                    templateUrl: "tables/responsive.html"
                }).when("/tables/dynamic", {
                    templateUrl: "views/tables/dynamic.html"
                }).when("/mail/inbox", {
                    templateUrl: "views/mail/inbox.html"
                }).when("/mail/compose", {
                    templateUrl: "views/mail/compose.html"
                }).when("/mail/single", {
                    templateUrl: "views/mail/single.html"
                }).when("/pages/features", {
                    templateUrl: "views/pages/features.html"
                }).when("/front", {
                  templateUrl: "views/pages/frontpage.html"
                }).when("/pages/signin", {
                    templateUrl: "views/pages/signin.html"
                }).when("/pages/signup", {
                    templateUrl: "views/pages/signup.html"
                }).when("/pages/forgot", {
                    templateUrl: "views/pages/forgot-password.html"
                }).when("/pages/profile", {
                    templateUrl: "views/pages/profile.html"
                }).when("/404", {
                    templateUrl: "views/pages/404.html"
                }).when("/pages/500", {
                    templateUrl: "views/pages/500.html"
                }).when("/pages/blank", {
                    templateUrl: "views/pages/blank.html"
                }).when("/pages/contact", {
                    templateUrl: "views/pages/contact.html"
                }).otherwise({
                    redirectTo: "/404"
                });
            }])
        .config(
            ["$routeProvider", "$localStorageProvider", "$httpProvider",
            function($routeProvider, $localStorageProvider, $httpProvider) {
                if ($localStorageProvider.get('token')) {
                    $httpProvider.defaults.headers.common['Authentication'] = $localStorageProvider.get('token').access_token;
                }

                $httpProvider.interceptors.push(function ($q) {
                    return {
                        'responseError': function (responseError) {
                            if (responseError.status == 403 || responseError.status == 401) {
                                location.hash = '#/pages/signin';
                            }
                        }
                    };
                });
            }
        ])
;


/**************************
 App Map
 **************************/
/*

angular.module("app.map", []).directive("uiJqvmap", [
        function() {
            return {
                restrict: "A",
                scope: {
                    options: "="
                },
                link: function(scope, ele) {
                    var options;
                    return options = scope.options, ele.vectorMap(options);
                }
            };
        }
    ]).controller("jqvmapCtrl", ["$scope",
        function($scope) {
            var sample_data;
            return sample_data = {
                af: "16.63",
                al: "11.58",
                dz: "158.97",
                ao: "85.81",
                ag: "1.1",
                ar: "351.02",
                am: "8.83",
                au: "1219.72",
                at: "366.26",
                az: "52.17",
                bs: "7.54",
                bh: "21.73",
                bd: "105.4",
                bb: "3.96",
                by: "52.89",
                be: "461.33",
                bz: "1.43",
                bj: "6.49",
                bt: "1.4",
                bo: "19.18",
                ba: "16.2",
                bw: "12.5",
                br: "2023.53",
                bn: "11.96",
                bg: "44.84",
                bf: "8.67",
                bi: "1.47",
                kh: "11.36",
                cm: "21.88",
                ca: "1563.66",
                cv: "1.57",
                cf: "2.11",
                td: "7.59",
                cl: "199.18",
                cn: "5745.13",
                co: "283.11",
                km: "0.56",
                cd: "12.6",
                cg: "11.88",
                cr: "35.02",
                ci: "22.38",
                hr: "59.92",
                cy: "22.75",
                cz: "195.23",
                dk: "304.56",
                dj: "1.14",
                dm: "0.38",
                "do": "50.87",
                ec: "61.49",
                eg: "216.83",
                sv: "21.8",
                gq: "14.55",
                er: "2.25",
                ee: "19.22",
                et: "30.94",
                fj: "3.15",
                fi: "231.98",
                fr: "2555.44",
                ga: "12.56",
                gm: "1.04",
                ge: "11.23",
                de: "3305.9",
                gh: "18.06",
                gr: "305.01",
                gd: "0.65",
                gt: "40.77",
                gn: "4.34",
                gw: "0.83",
                gy: "2.2",
                ht: "6.5",
                hn: "15.34",
                hk: "226.49",
                hu: "132.28",
                is: "12.77",
                "in": "1430.02",
                id: "695.06",
                ir: "337.9",
                iq: "84.14",
                ie: "204.14",
                il: "201.25",
                it: "2036.69",
                jm: "13.74",
                jp: "5390.9",
                jo: "27.13",
                kz: "129.76",
                ke: "32.42",
                ki: "0.15",
                kr: "986.26",
                undefined: "5.73",
                kw: "117.32",
                kg: "4.44",
                la: "6.34",
                lv: "23.39",
                lb: "39.15",
                ls: "1.8",
                lr: "0.98",
                ly: "77.91",
                lt: "35.73",
                lu: "52.43",
                mk: "9.58",
                mg: "8.33",
                mw: "5.04",
                my: "218.95",
                mv: "1.43",
                ml: "9.08",
                mt: "7.8",
                mr: "3.49",
                mu: "9.43",
                mx: "1004.04",
                md: "5.36",
                mn: "5.81",
                me: "3.88",
                ma: "91.7",
                mz: "10.21",
                mm: "35.65",
                na: "11.45",
                np: "15.11",
                nl: "770.31",
                nz: "138",
                ni: "6.38",
                ne: "5.6",
                ng: "206.66",
                no: "413.51",
                om: "53.78",
                pk: "174.79",
                pa: "27.2",
                pg: "8.81",
                py: "17.17",
                pe: "153.55",
                ph: "189.06",
                pl: "438.88",
                pt: "223.7",
                qa: "126.52",
                ro: "158.39",
                ru: "1476.91",
                rw: "5.69",
                ws: "0.55",
                st: "0.19",
                sa: "434.44",
                sn: "12.66",
                rs: "38.92",
                sc: "0.92",
                sl: "1.9",
                sg: "217.38",
                sk: "86.26",
                si: "46.44",
                sb: "0.67",
                za: "354.41",
                es: "1374.78",
                lk: "48.24",
                kn: "0.56",
                lc: "1",
                vc: "0.58",
                sd: "65.93",
                sr: "3.3",
                sz: "3.17",
                se: "444.59",
                ch: "522.44",
                sy: "59.63",
                tw: "426.98",
                tj: "5.58",
                tz: "22.43",
                th: "312.61",
                tl: "0.62",
                tg: "3.07",
                to: "0.3",
                tt: "21.2",
                tn: "43.86",
                tr: "729.05",
                tm: 0,
                ug: "17.12",
                ua: "136.56",
                ae: "239.65",
                gb: "2258.57",
                us: "14624.18",
                uy: "40.71",
                uz: "37.72",
                vu: "0.72",
                ve: "285.21",
                vn: "101.99",
                ye: "30.02",
                zm: "15.69",
                zw: "5.57"
            }, $scope.worldMap = {
                map: "world_en",
                backgroundColor: null,
                color: "#ffffff",
                hoverOpacity: 0.7,
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                values: sample_data,
                scaleColors: ["#F1EFF0", "#c1bfc0"],
                normalizeFunction: "polynomial"
            }, $scope.USAMap = {
                map: "usa_en",
                backgroundColor: null,
                color: "#ffffff",
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                selectedRegion: "MO"
            }, $scope.europeMap = {
                map: "europe_en",
                backgroundColor: null,
                color: "#ffffff",
                hoverOpacity: 0.7,
                selectedColor: "#db5031",
                hoverColor: "#db5031",
                enableZoom: !0,
                showTooltip: !0,
                values: sample_data,
                scaleColors: ["#F1EFF0", "#c1bfc0"],
                normalizeFunction: "polynomial"
            };
        }
    ]);
*/
