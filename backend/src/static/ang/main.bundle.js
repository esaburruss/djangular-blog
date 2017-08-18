webpackJsonp([1,4],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_nav_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_navbar_model__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_page_model__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ContentComponent = (function () {
    function ContentComponent(navService, router, route, location) {
        this.navService = navService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.blogs = [];
        this.navbarCollapsed = false;
        this.navbar = new __WEBPACK_IMPORTED_MODULE_4__models_navbar_model__["a" /* Navbar */](new __WEBPACK_IMPORTED_MODULE_5__models_page_model__["a" /* Page */]());
        /*navService.navbar$.subscribe( nav => {
          this.navbar = nav;
        });
        navService.blogs$.subscribe( blogs => {
          this.blogs = blogs;
        });*/
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.navService.getNavbar(); })
            .subscribe(function (nav) {
            _this.navbar = nav;
            _this.navService.initializeLoadedPages();
        });
        //this.navService.getNavbar();
        //this.navService.getBlogs();
    };
    ContentComponent.prototype.goBack = function () {
        this.location.back();
    };
    return ContentComponent;
}());
ContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-content',
        template: __webpack_require__(251),
        styles: [__webpack_require__(245)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _d || Object])
], ContentComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=content.component.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DashboardComponent = (function () {
    function DashboardComponent() {
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-dashboard',
        template: __webpack_require__(254),
        styles: [__webpack_require__(247)]
    }),
    __metadata("design:paramtypes", [])
], DashboardComponent);

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_model__ = __webpack_require__(187);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Blog; });

var Blog = (function () {
    function Blog(obj) {
        this.title = obj && obj.title || '';
        this.slug = obj && obj.slug || '';
        this.body = obj && obj.body || '';
        this.categories = obj && obj.categories || [];
        this.creation_date = obj && obj.creation_date || new Date();
        this.author = obj && obj.author || new __WEBPACK_IMPORTED_MODULE_0__profile_model__["a" /* Profile */]();
    }
    return Blog;
}());

//# sourceMappingURL=blog.model.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navitem_model__ = __webpack_require__(186);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Content; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Content = (function (_super) {
    __extends(Content, _super);
    function Content(obj) {
        var _this = _super.call(this, obj) || this;
        _this.body = obj && obj.body || '';
        _this.slug = obj && obj.slug || '';
        return _this;
    }
    return Content;
}(__WEBPACK_IMPORTED_MODULE_0__navitem_model__["a" /* NavItem */]));

//# sourceMappingURL=content.model.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_model__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navbar; });

var Navbar = (function () {
    function Navbar(obj) {
        this.home = obj && obj.home || new __WEBPACK_IMPORTED_MODULE_0__page_model__["a" /* Page */]();
        this.navitems = obj && obj.navitems || [];
    }
    return Navbar;
}());

//# sourceMappingURL=navbar.model.js.map

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 168;


/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(188);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__(248),
        styles: [__webpack_require__(244)]
    }),
    __metadata("design:paramtypes", [])
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_content_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__content_content_module__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_module__ = __webpack_require__(185);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    //{ path: '', redirectTo: 'content', pathMatch: 'full' },
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_7__content_content_component__["a" /* ContentComponent */],
        children: __WEBPACK_IMPORTED_MODULE_8__content_content_module__["a" /* routes */]
    },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(routes),
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8__content_content_module__["b" /* ContentModule */],
            __WEBPACK_IMPORTED_MODULE_10__dashboard_dashboard_module__["a" /* DashboardModule */],
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_blog_model__ = __webpack_require__(138);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogListItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlogListItemComponent = (function () {
    function BlogListItemComponent() {
    }
    BlogListItemComponent.prototype.ngOnInit = function () {
    };
    BlogListItemComponent.prototype.getNiceDate = function () {
        return this.blog.creation_date.getMonth();
    };
    return BlogListItemComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */]) === "function" && _a || Object)
], BlogListItemComponent.prototype, "blog", void 0);
BlogListItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-blog-list-item',
        template: __webpack_require__(249),
        styles: [__webpack_require__(241)]
    }),
    __metadata("design:paramtypes", [])
], BlogListItemComponent);

var _a;
//# sourceMappingURL=blog-list-item.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_nav_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_blog_model__ = __webpack_require__(138);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BlogComponent = (function () {
    function BlogComponent(navService, route, location) {
        this.navService = navService;
        this.route = route;
        this.location = location;
        this.blog = new __WEBPACK_IMPORTED_MODULE_5__models_blog_model__["a" /* Blog */]({ title: 'loading...', body: 'loading...' });
    }
    BlogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.navService.getBlog(params.get('slug')); })
            .subscribe(function (blog) { return _this.blog = blog; });
    };
    BlogComponent.prototype.goBack = function () {
        this.location.back();
    };
    return BlogComponent;
}());
BlogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_0" /* Component */])({
        selector: 'app-blog',
        template: __webpack_require__(250),
        styles: [__webpack_require__(242)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === "function" && _c || Object])
], BlogComponent);

var _a, _b, _c;
//# sourceMappingURL=blog.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__html_content_html_content_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__content_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__blog_blog_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__blog_list_item_blog_list_item_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__page_page_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_nav_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContentModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    {
        path: '', redirectTo: 'page/', pathMatch: 'full'
        //outlet: 'content',
    },
    {
        path: 'page', redirectTo: 'page/', pathMatch: 'full'
    },
    {
        path: 'blog/:slug',
        component: __WEBPACK_IMPORTED_MODULE_8__blog_blog_component__["a" /* BlogComponent */],
    },
    {
        path: 'page/:slug',
        component: __WEBPACK_IMPORTED_MODULE_10__page_page_component__["a" /* PageComponent */],
    }
];
var ContentModule = (function () {
    function ContentModule() {
    }
    return ContentModule;
}());
ContentModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_5__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__content_component__["a" /* ContentComponent */],
            __WEBPACK_IMPORTED_MODULE_6__html_content_html_content_component__["a" /* HtmlContentComponent */],
            __WEBPACK_IMPORTED_MODULE_10__page_page_component__["a" /* PageComponent */],
            __WEBPACK_IMPORTED_MODULE_8__blog_blog_component__["a" /* BlogComponent */],
            __WEBPACK_IMPORTED_MODULE_9__blog_list_item_blog_list_item_component__["a" /* BlogListItemComponent */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__services_nav_service__["a" /* NavService */]
        ],
        bootstrap: [
            __WEBPACK_IMPORTED_MODULE_7__content_component__["a" /* ContentComponent */]
        ],
    })
], ContentModule);

//# sourceMappingURL=content.module.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_nav_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_content_model__ = __webpack_require__(139);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlContentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HtmlContentComponent = (function () {
    function HtmlContentComponent(navService) {
        var _this = this;
        this.navService = navService;
        this.content = new __WEBPACK_IMPORTED_MODULE_2__models_content_model__["a" /* Content */]({});
        navService.content$.subscribe(function (content) {
            _this.content = content;
        });
    }
    HtmlContentComponent.prototype.ngOnInit = function () {
    };
    return HtmlContentComponent;
}());
HtmlContentComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Component */])({
        selector: 'app-html-content',
        template: __webpack_require__(252),
        styles: [__webpack_require__(246)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */]) === "function" && _a || Object])
], HtmlContentComponent);

var _a;
//# sourceMappingURL=html-content.component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_nav_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_page_model__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PageComponent = (function () {
    function PageComponent(navService, route, location) {
        var _this = this;
        this.navService = navService;
        this.route = route;
        this.location = location;
        //const getUrl: Observable<string> = route.params.map(slug => this.url = slug)
        this.page = new __WEBPACK_IMPORTED_MODULE_5__models_page_model__["a" /* Page */]({ 'title': 'unchanged', 'body': '<p>AAA</p>' });
        route.params.subscribe(function (params) {
            _this.url = params['slug'];
            if (_this._navReady) {
                _this.loadPage();
            }
        });
        navService.loaded$.subscribe(function (_navReady) {
            _this._navReady = _navReady;
            _this.loadPage();
        });
    }
    PageComponent.prototype.ngOnInit = function () {
    };
    PageComponent.prototype.loadPage = function () {
        this.navService.getContent('page', this.url);
    };
    PageComponent.prototype.goBack = function () {
        this.location.back();
    };
    return PageComponent;
}());
PageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_0" /* Component */])({
        selector: 'app-page',
        template: __webpack_require__(253),
        styles: [__webpack_require__(243)],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === "function" && _c || Object])
], PageComponent);

var _a, _b, _c;
//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__(137);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* CommonModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */]]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavItem; });
var NavItem = (function () {
    function NavItem(obj) {
        this.title = obj && obj.title || '';
    }
    return NavItem;
}());

//# sourceMappingURL=navitem.model.js.map

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
var Profile = (function () {
    function Profile(obj) {
        this.username = obj && obj.username || null;
        this.first_name = obj && obj.first_name || null;
        this.last_name = obj && obj.last_name || null;
        this.email = obj && obj.email || null;
        this.picture = obj && obj.picture || null;
        this.facebook = obj && obj.facebook || null;
        this.twitter = obj && obj.twitter || null;
        this.instagram = obj && obj.instagram || null;
        this.pinterest = obj && obj.pinterest || null;
        this.github = obj && obj.github || null;
        this.stackoveflow = obj && obj.stackoverflow || null;
    }
    return Profile;
}());

//# sourceMappingURL=profile.model.js.map

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, ".blog-item-small {\n  margin-bottom: 10px;\n}\n", "", {"version":3,"sources":["/Users/esaburruss/git/djangular-blog/frontend/src/app/blog-list-item/blog-list-item.component.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB","file":"blog-list-item.component.css","sourcesContent":[".blog-item-small {\n  margin-bottom: 10px;\n}\n"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"blog.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"page.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, ".container {\n  padding-top: 75px; }\n", "", {"version":3,"sources":["/Users/esaburruss/git/djangular-blog/frontend/src/app/app.component.scss"],"names":[],"mappings":"AAAA;EACE,kBAAgB,EACjB","file":"app.component.scss","sourcesContent":[".container {\n  padding-top:75px;\n}\n"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, ".container {\n  margin-top: 75px; }\n", "", {"version":3,"sources":["/Users/esaburruss/git/djangular-blog/frontend/src/app/content/content.component.scss"],"names":[],"mappings":"AAAA;EACE,iBAAgB,EACjB","file":"content.component.scss","sourcesContent":[".container {\n  margin-top: 75px;\n}\n"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"html-content.component.scss","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"dashboard.component.scss","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 248:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ 249:
/***/ (function(module, exports) {

module.exports = "<div class=\"card blog-item-small\">\n  <div class=\"card-body\">\n    <h4 class=\"card-title\">\n      <a routerLink=\"/blog/{{blog.slug}}\" routerLinkActive=\"active\">\n        {{ blog.title }}\n      </a>\n    </h4>\n    <h6 class=\"card-subtitle mb-2 text-muted\">\n      {{ blog.author.last_name }}, {{ blog.author.first_name }} - {{ blog.creation_date | date: 'MM/dd/yy' }}\n    </h6>\n  </div>\n</div>\n"

/***/ }),

/***/ 250:
/***/ (function(module, exports) {

module.exports = "<div class=\"content-block\">\n  <h3 [innerHTML]=\"blog.title\"></h3>\n  <div [innerHTML]=\"blog.body\"></div>\n</div>\n"

/***/ }),

/***/ 251:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark text-white bg-dark fixed-top navbar-expand-lg\">\n  <button\n    class=\"navbar-toggler navbar-toggler-right\"\n    type=\"button\"\n    (click)=\"navbarCollapsed = !navbarCollapsed\"\n    >\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div\n    class=\"navbar-collapse\"\n    [ngbCollapse]=\"navbarCollapsed\"\n    id=\"navbarContent\"\n    >\n    <a class=\"navbar-brand\" routerLink=\"/\">{{ navbar.home.title }}</a>\n\n    <ul class=\"navbar-nav mr-auto\">\n      <li\n        *ngFor=\"let navitem of navbar.navitems\"\n        [ngSwitch]=\"navitem.pages\"\n        class=\"nav-item\" >\n\n        <ng-template [ngSwitchCase]=\"undefined\">\n          <a class=\"nav-link\" routerLink=\"/page/{{navitem.slug}}\" routerLinkActive=\"active\">{{ navitem.title }}</a>\n        </ng-template>\n\n        <ng-template ngSwitchDefault>\n          <div class=\"ng-dropdown\" ngbDropdown >\n\n            <a\n              class=\"nav-link dropdown-toggle\"\n              id=\"dropdown_{{ navitem.slug }}\"\n              ngbDropdownToggle>\n              {{ navitem.title }}\n            </a>\n            <div\n              class=\"dropdown-menu\"\n              id=\"dropdown_{{ navitem.slug }}\"\n              ngbDropdownMenu\n              *ngIf=\"navitem.pages\">\n              <button\n                *ngFor=\"let page of navitem.pages\"\n                routerLink=\"/page/{{page.slug}}\"\n                routerLinkActive=\"active\"\n                class=\"dropdown-item\">\n                {{ page.title }}\n              </button>\n            </div>\n          </div>\n        </ng-template>\n\n      </li>\n    </ul>\n  </div>\n</nav>\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-lg-9\">\n      <router-outlet></router-outlet>\n    </div>\n    <div class=\"col\">\n      <app-blog-list-item *ngFor=\"let blog of blogs\" [blog]=\"blog\">\n      </app-blog-list-item>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 252:
/***/ (function(module, exports) {

module.exports = "<br />\n<br />\n<br />\n<br /><br />\n<br />\n{{ content.title }}\n<br />\n{{ content.body }}\n"

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

module.exports = "<app-html-content></app-html-content>\n"

/***/ }),

/***/ 254:
/***/ (function(module, exports) {

module.exports = "<p>\n  dashboard works!\n</p>\n"

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(169);


/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_model__ = __webpack_require__(139);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Page = (function (_super) {
    __extends(Page, _super);
    function Page(obj) {
        return _super.call(this, obj) || this;
    }
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0__content_model__["a" /* Content */]));

//# sourceMappingURL=page.model.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_navbar_model__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_page_model__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavService = (function () {
    function NavService(http) {
        this.http = http;
        this.contentSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.content$ = this.contentSource.asObservable();
        this._loadedSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.loaded$ = this._loadedSource.asObservable();
        this.blogsSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.blogs$ = this.blogsSource.asObservable();
        this.base_url = 'http://127.0.0.1:8000/api/content/';
        this._loadedContent = {};
    }
    NavService.prototype.getNavbar = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.base_url + 'navbar/')
                .toPromise()
                .then(function (res) {
                _this._navbar = new __WEBPACK_IMPORTED_MODULE_3__models_navbar_model__["a" /* Navbar */](res.json());
                resolve(_this._navbar);
            });
        });
        return promise;
    };
    NavService.prototype.initializeLoadedPages = function () {
        this._loadedContent['/'] = this._navbar.home;
        for (var _i = 0, _a = this._navbar.navitems; _i < _a.length; _i++) {
            var navitem = _a[_i];
            if (navitem.pages) {
                for (var _b = 0, _c = navitem.pages; _b < _c.length; _b++) {
                    var page = _c[_b];
                    this._loadedContent['page/' + page.slug] = page;
                }
            }
            else {
                this._loadedContent['page/' + navitem.slug] = navitem;
            }
        }
        this._loadedSource.next(true);
    };
    NavService.prototype.getContent = function (type, slug) {
        var _this = this;
        var url = '/';
        console.log(slug);
        if (slug) {
            url = type + '/' + slug;
        }
        console.log(this._loadedContent[url].body);
        if (this._loadedContent[url].body) {
            console.log('Did not do HTTP');
            this.contentSource.next(this._loadedContent[url]);
        }
        else {
            var apiUrl = this.base_url + url + '/';
            this.http.get(apiUrl)
                .subscribe(function (res) {
                _this._loadedContent[url].body = res.json().body;
                _this.contentSource.next(_this._loadedContent[url]);
            });
        }
    };
    NavService.prototype.getHomePage = function () {
        this.http.get(this.base_url + 'home/')
            .subscribe(function (res) {
            console.log(res.json());
            //this.navSource.next(new Navbar(res.json()));
        });
    };
    NavService.prototype.getPage = function (slug) {
        var _this = this;
        if (!slug)
            slug = 'home';
        console.log("URL Clicked: " + slug);
        var apiUrl = this.base_url + 'page/' + slug + '/';
        console.log(apiUrl);
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(apiUrl)
                .toPromise()
                .then(function (res) {
                console.log(res.json());
                var page = new __WEBPACK_IMPORTED_MODULE_4__models_page_model__["a" /* Page */](res.json());
                resolve(page);
            });
        });
        return promise;
    };
    NavService.prototype.getBlog = function (slug) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var apiUrl = _this.base_url + 'blog/' + slug + '/';
            _this.http.get(apiUrl)
                .toPromise()
                .then(function (res) {
                console.log(res.json());
                resolve(res.json());
            });
        });
        return promise;
    };
    NavService.prototype.getBlogs = function () {
        var _this = this;
        var apiUrl = this.base_url + 'blog/';
        this.http.get(apiUrl)
            .subscribe(function (res) {
            console.log(res.json());
            _this.blogsSource.next(res.json().results);
        });
    };
    return NavService;
}());
NavService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["e" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object])
], NavService);

var _a;
//# sourceMappingURL=nav.service.js.map

/***/ })

},[287]);
//# sourceMappingURL=main.bundle.js.map