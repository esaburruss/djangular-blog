webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-dark text-white bg-dark fixed-top navbar-expand-lg\">\r\n  <button\r\n    class=\"navbar-toggler navbar-toggler-right\"\r\n    type=\"button\"\r\n    (click)=\"navbarCollapsed = !navbarCollapsed\"\r\n    >\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div\r\n    class=\"navbar-collapse\"\r\n    [ngbCollapse]=\"navbarCollapsed\"\r\n    id=\"navbarContent\"\r\n    >\r\n    <a class=\"navbar-brand\" routerLink=\"/\">{{ navbar.home.title }}</a>\r\n\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" routerLink=\"/blog/\" routerLinkActive=\"active\">\r\n          Blog\r\n        </a>\r\n      </li>\r\n      <li\r\n        *ngFor=\"let navitem of navbar.navitems\"\r\n        [ngSwitch]=\"navitem.pages\"\r\n        class=\"nav-item\" >\r\n\r\n        <ng-template [ngSwitchCase]=\"undefined\">\r\n          <a class=\"nav-link\" routerLink=\"/page/{{navitem.slug}}\" routerLinkActive=\"active\">{{ navitem.title }}</a>\r\n        </ng-template>\r\n\r\n        <ng-template ngSwitchDefault>\r\n          <div class=\"ng-dropdown\" ngbDropdown >\r\n\r\n            <a\r\n              class=\"nav-link dropdown-toggle\"\r\n              id=\"dropdown_{{ navitem.slug }}\"\r\n              ngbDropdownToggle>\r\n              {{ navitem.title }}\r\n            </a>\r\n            <div\r\n              class=\"dropdown-menu\"\r\n              id=\"dropdown_{{ navitem.slug }}\"\r\n              ngbDropdownMenu\r\n              *ngIf=\"navitem.pages\">\r\n              <button\r\n                *ngFor=\"let page of navitem.pages\"\r\n                routerLink=\"/page/{{page.slug}}\"\r\n                routerLinkActive=\"active\"\r\n                class=\"dropdown-item\">\r\n                {{ page.title }}\r\n              </button>\r\n            </div>\r\n          </div>\r\n        </ng-template>\r\n\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".container {\n  padding-top: 75px; }\n", "", {"version":3,"sources":["C:/Users/Edward Burruss/git/djangular-blog/frontend/src/app/C:/Users/Edward Burruss/git/djangular-blog/frontend/src/app/app.component.scss"],"names":[],"mappings":"AAAA;EACE,kBAAgB,EACjB","file":"app.component.scss","sourcesContent":[".container {\r\n  padding-top:75px;\r\n}\r\n"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_navbar_model__ = __webpack_require__("../../../../../src/app/models/navbar.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(navService, router, route, location) {
        this.navService = navService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.blogs = [];
        this.categories = [];
        this.navbarCollapsed = false;
        this.navbar = new __WEBPACK_IMPORTED_MODULE_4__models_navbar_model__["a" /* Navbar */]({});
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.navService.getNav(); })
            .subscribe(function (nav) {
            _this.navbar = nav.navbar;
            _this.blogs = nav.blogs;
            _this.categories = nav.categories;
            _this.navService.initializeLoadedPages();
        });
    };
    AppComponent.prototype.goBack = function () {
        this.location.back();
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common__["f" /* Location */]) === "function" && _d || Object])
    ], AppComponent);
    return AppComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__ = __webpack_require__("../../../../@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__html_content_html_content_component__ = __webpack_require__("../../../../../src/app/html-content/html-content.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__blog_blog_component__ = __webpack_require__("../../../../../src/app/blog/blog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__blog_list_item_blog_list_item_component__ = __webpack_require__("../../../../../src/app/blog-list-item/blog-list-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__blog_list_blog_list_component__ = __webpack_require__("../../../../../src/app/blog-list/blog-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__category_list_category_list_component__ = __webpack_require__("../../../../../src/app/category-list/category-list.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__blog_list_page_blog_list_page_component__ = __webpack_require__("../../../../../src/app/blog-list-page/blog-list-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__page_page_component__ = __webpack_require__("../../../../../src/app/page/page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__mock_http_mock_http_module__ = __webpack_require__("../../../../../src/app/mock-http/mock-http.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    {
        path: '', redirectTo: 'page/', pathMatch: 'full'
    },
    {
        path: 'page', redirectTo: 'page/', pathMatch: 'full'
    },
    {
        path: 'blog',
        component: __WEBPACK_IMPORTED_MODULE_11__blog_list_page_blog_list_page_component__["a" /* BlogListPageComponent */]
    },
    {
        path: 'blog/:slug',
        component: __WEBPACK_IMPORTED_MODULE_7__blog_blog_component__["a" /* BlogComponent */]
    },
    {
        path: 'page/:slug',
        component: __WEBPACK_IMPORTED_MODULE_12__page_page_component__["a" /* PageComponent */]
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__html_content_html_content_component__["a" /* HtmlContentComponent */],
                __WEBPACK_IMPORTED_MODULE_12__page_page_component__["a" /* PageComponent */],
                __WEBPACK_IMPORTED_MODULE_7__blog_blog_component__["a" /* BlogComponent */],
                __WEBPACK_IMPORTED_MODULE_8__blog_list_item_blog_list_item_component__["a" /* BlogListItemComponent */],
                __WEBPACK_IMPORTED_MODULE_11__blog_list_page_blog_list_page_component__["a" /* BlogListPageComponent */],
                __WEBPACK_IMPORTED_MODULE_9__blog_list_blog_list_component__["a" /* BlogListComponent */],
                __WEBPACK_IMPORTED_MODULE_10__category_list_category_list_component__["a" /* CategoryListComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__environments_environment__["a" /* environment */].production ? __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */] : __WEBPACK_IMPORTED_MODULE_14__mock_http_mock_http_module__["a" /* MockHttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forRoot(routes),
                __WEBPACK_IMPORTED_MODULE_4__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_nav_service__["a" /* NavService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/blog-list-item/blog-list-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, ".blog-item {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.blog-item-small {\r\n  padding: 7px;\r\n}\r\n", "", {"version":3,"sources":["C:/Users/Edward Burruss/git/djangular-blog/frontend/src/app/blog-list-item/blog-list-item.component.css"],"names":[],"mappings":"AAAA;EACE,oBAAoB;CACrB;;AAED;EACE,aAAa;CACd","file":"blog-list-item.component.css","sourcesContent":[".blog-item {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.blog-item-small {\r\n  padding: 7px;\r\n}\r\n"],"sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blog-list-item/blog-list-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card border-primary mb-3 blog-item\">\r\n\r\n  <div class=\"card-body\" *ngIf=\"big\">\r\n    <h4 class=\"card-title\">\r\n      <a routerLink=\"/blog/{{blog.slug}}\" routerLinkActive=\"active\">\r\n        {{ blog.title }}\r\n      </a>\r\n    </h4>\r\n    <h6 class=\"card-subtitle mb-2 text-muted\">\r\n      {{ blog.creation_date | date: 'MM/dd/yy' }}\r\n    </h6>\r\n  </div>\r\n\r\n  <div class=\"card-body blog-item-small text-truncate\" *ngIf=\"!big\">\r\n    <a routerLink=\"/blog/{{blog.slug}}\" routerLinkActive=\"active\">\r\n      {{ blog.title }}\r\n    </a> - {{ blog.creation_date | date: 'MM/dd/yy' }}\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/blog-list-item/blog-list-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogListItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_blog_model__ = __webpack_require__("../../../../../src/app/models/blog.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlogListItemComponent = /** @class */ (function () {
    function BlogListItemComponent() {
    }
    BlogListItemComponent.prototype.ngOnInit = function () {
    };
    BlogListItemComponent.prototype.getNiceDate = function () {
        return this.blog.creation_date.getMonth();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */]) === "function" && _a || Object)
    ], BlogListItemComponent.prototype, "blog", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], BlogListItemComponent.prototype, "big", void 0);
    BlogListItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-blog-list-item',
            template: __webpack_require__("../../../../../src/app/blog-list-item/blog-list-item.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blog-list-item/blog-list-item.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BlogListItemComponent);
    return BlogListItemComponent;
    var _a;
}());

//# sourceMappingURL=blog-list-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/blog-list-page/blog-list-page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"blog-list-page.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blog-list-page/blog-list-page.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-lg-8\">\r\n    <app-blog-list [big]=true></app-blog-list>\r\n  </div>\r\n  <div class=\"col-lg-4\">\r\n    <h1>Categories: </h1>\r\n    <app-category-list></app-category-list>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/blog-list-page/blog-list-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogListPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_blog_model__ = __webpack_require__("../../../../../src/app/models/blog.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlogListPageComponent = /** @class */ (function () {
    function BlogListPageComponent() {
    }
    BlogListPageComponent.prototype.ngOnInit = function () {
    };
    BlogListPageComponent.prototype.getNiceDate = function () {
        return this.blog.creation_date.getMonth();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_blog_model__["a" /* Blog */]) === "function" && _a || Object)
    ], BlogListPageComponent.prototype, "blog", void 0);
    BlogListPageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-blog-list-page',
            template: __webpack_require__("../../../../../src/app/blog-list-page/blog-list-page.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blog-list-page/blog-list-page.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], BlogListPageComponent);
    return BlogListPageComponent;
    var _a;
}());

//# sourceMappingURL=blog-list-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/blog-list/blog-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"blog-list.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blog-list/blog-list.component.html":
/***/ (function(module, exports) {

module.exports = "<app-blog-list-item *ngFor=\"let blog of blogs\" [blog]=\"blog\" [big]=\"big\">\r\n</app-blog-list-item>\r\n"

/***/ }),

/***/ "../../../../../src/app/blog-list/blog-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BlogListComponent = /** @class */ (function () {
    function BlogListComponent(navService) {
        var _this = this;
        this.navService = navService;
        this._navReady = this.navService.isLoaded();
        if (this._navReady) {
            this.loadBlogs();
        }
        navService.loaded$.subscribe(function (_navReady) {
            _this._navReady = _navReady;
            _this.loadBlogs();
        });
    }
    BlogListComponent.prototype.ngOnInit = function () {
    };
    BlogListComponent.prototype.loadBlogs = function () {
        this.blogs = this.navService.getBlogList();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["F" /* Input */])(),
        __metadata("design:type", Boolean)
    ], BlogListComponent.prototype, "big", void 0);
    BlogListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-blog-list',
            template: __webpack_require__("../../../../../src/app/blog-list/blog-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blog-list/blog-list.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */]) === "function" && _a || Object])
    ], BlogListComponent);
    return BlogListComponent;
    var _a;
}());

//# sourceMappingURL=blog-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/blog/blog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"blog.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/blog/blog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-lg-8\">\r\n    <app-html-content></app-html-content>\r\n  </div>\r\n  <div class=\"col-lg-4\">\r\n    <app-blog-list [big]=false></app-blog-list>\r\n    <app-category-list></app-category-list>\r\n  </div>\r\n"

/***/ }),

/***/ "../../../../../src/app/blog/blog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_blog_model__ = __webpack_require__("../../../../../src/app/models/blog.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BlogComponent = /** @class */ (function () {
    function BlogComponent(navService, route, location) {
        var _this = this;
        this.navService = navService;
        this.route = route;
        this.location = location;
        this.blog = new __WEBPACK_IMPORTED_MODULE_5__models_blog_model__["a" /* Blog */]({ title: 'loading...', body: 'loading...' });
        this._navReady = this.navService.isLoaded();
        route.params.subscribe(function (params) {
            _this.url = params['slug'];
            if (_this._navReady) {
                _this.loadBlog();
            }
        });
        navService.loaded$.subscribe(function (_navReady) {
            _this._navReady = _navReady;
            _this.loadBlog();
        });
    }
    BlogComponent.prototype.ngOnInit = function () {
    };
    BlogComponent.prototype.loadBlog = function () {
        this.navService.getContent('blog', this.url);
    };
    BlogComponent.prototype.goBack = function () {
        this.location.back();
    };
    BlogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
            selector: 'app-blog',
            template: __webpack_require__("../../../../../src/app/blog/blog.component.html"),
            styles: [__webpack_require__("../../../../../src/app/blog/blog.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === "function" && _c || Object])
    ], BlogComponent);
    return BlogComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=blog.component.js.map

/***/ }),

/***/ "../../../../../src/app/category-list/category-list.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"category-list.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/category-list/category-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"padding: 3px\" class =\"mw-100 d-inline-block\" *ngFor=\"let category of categories\">\r\n  <button class=\"mw-100 btn btn-light btn-sm text-truncate\">\r\n    <small>{{ category.title }}</small>\r\n  </button>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/category-list/category-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryListComponent = /** @class */ (function () {
    function CategoryListComponent(navService) {
        var _this = this;
        this.navService = navService;
        this._navReady = this.navService.isLoaded();
        if (this._navReady) {
            this.loadCategories();
        }
        navService.loaded$.subscribe(function (_navReady) {
            _this._navReady = _navReady;
            _this.loadCategories();
        });
    }
    CategoryListComponent.prototype.ngOnInit = function () {
    };
    CategoryListComponent.prototype.loadCategories = function () {
        this.categories = this.navService.getCategoryList();
    };
    CategoryListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-category-list',
            template: __webpack_require__("../../../../../src/app/category-list/category-list.component.html"),
            styles: [__webpack_require__("../../../../../src/app/category-list/category-list.component.css")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */]) === "function" && _a || Object])
    ], CategoryListComponent);
    return CategoryListComponent;
    var _a;
}());

//# sourceMappingURL=category-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/html-content/html-content.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content-block\">\r\n  <h3 [innerHTML]=\"content.title\"></h3>\r\n  <div [innerHTML]=\"content.body\"></div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/html-content/html-content.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"html-content.component.scss","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/html-content/html-content.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_htmlcontent_model__ = __webpack_require__("../../../../../src/app/models/htmlcontent.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HtmlContentComponent = /** @class */ (function () {
    function HtmlContentComponent(navService) {
        var _this = this;
        this.navService = navService;
        this.content = new __WEBPACK_IMPORTED_MODULE_2__models_htmlcontent_model__["a" /* HtmlContent */]({ 'title': 'Loading', 'body': 'Loading' }); //navService.getCurrentContent();
        navService.content$.subscribe(function (content) {
            _this.content = content;
        });
    }
    HtmlContentComponent.prototype.ngOnInit = function () {
        this.content = this.navService.getCurrentContent();
    };
    HtmlContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app-html-content',
            template: __webpack_require__("../../../../../src/app/html-content/html-content.component.html"),
            styles: [__webpack_require__("../../../../../src/app/html-content/html-content.component.scss")]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_nav_service__["a" /* NavService */]) === "function" && _a || Object])
    ], HtmlContentComponent);
    return HtmlContentComponent;
    var _a;
}());

//# sourceMappingURL=html-content.component.js.map

/***/ }),

/***/ "../../../../../src/app/mock-http/mock-http.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export REAL_HTTP */
/* unused harmony export mockHttpFactory */
/* unused harmony export realHttpFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MockHttpModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http_testing__ = __webpack_require__("../../../http/@angular/http/testing.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var REAL_HTTP = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* OpaqueToken */]("real http service");
function mockHttpFactory(mockBackend, options) {
    return new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */](mockBackend, options);
}
function realHttpFactory(xhrBackend, options) {
    return new __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */](xhrBackend, options);
}
var MockHttpModule = /** @class */ (function () {
    function MockHttpModule(mockBackend, realHttp) {
        var _this = this;
        mockBackend.connections
            .delay(500)
            .flatMap(function (connection) {
            return _this.serveRequestFromAssetsFolder(connection, realHttp);
        }).subscribe();
    }
    MockHttpModule.prototype.serveRequestFromAssetsFolder = function (connection, realHttp) {
        var url = connection.request.url;
        if (!!url) {
            if (url.startsWith("http://127.0.0.1:8000/api/")) {
                url = "/assets/mock/" + url.substring("http://127.0.0.1:8000/api/".length);
                var methodname = __WEBPACK_IMPORTED_MODULE_3__angular_http__["f" /* RequestMethod */][connection.request.method];
                url += methodname + ".json";
            }
        }
        var response$ = realHttp.get(url).map(function (response) {
            connection.mockRespond(response);
        });
        return response$;
    };
    MockHttpModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */]],
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */],
                    useFactory: mockHttpFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_2__angular_http_testing__["a" /* MockBackend */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* BaseRequestOptions */]]
                },
                {
                    provide: REAL_HTTP,
                    useFactory: realHttpFactory,
                    deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["g" /* XHRBackend */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* BaseRequestOptions */]]
                },
                __WEBPACK_IMPORTED_MODULE_2__angular_http_testing__["a" /* MockBackend */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["g" /* XHRBackend */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* BaseRequestOptions */]
            ]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(REAL_HTTP)),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http_testing__["a" /* MockBackend */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http_testing__["a" /* MockBackend */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* Http */]) === "function" && _b || Object])
    ], MockHttpModule);
    return MockHttpModule;
    var _a, _b;
}());

//# sourceMappingURL=mock-http.module.js.map

/***/ }),

/***/ "../../../../../src/app/models/blog.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Blog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__htmlcontent_model__ = __webpack_require__("../../../../../src/app/models/htmlcontent.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_model__ = __webpack_require__("../../../../../src/app/models/profile.model.ts");
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


var Blog = /** @class */ (function (_super) {
    __extends(Blog, _super);
    function Blog(obj) {
        var _this = _super.call(this, obj) || this;
        _this.categories = obj && obj.categories || [];
        _this.creation_date = obj && obj.creation_date || new Date();
        _this.author = obj && obj.author || new __WEBPACK_IMPORTED_MODULE_1__profile_model__["a" /* Profile */]();
        return _this;
    }
    return Blog;
}(__WEBPACK_IMPORTED_MODULE_0__htmlcontent_model__["a" /* HtmlContent */]));

//# sourceMappingURL=blog.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/content.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Content; });
var Content = /** @class */ (function () {
    function Content(obj) {
        this.title = obj && obj.title || '';
        this.slug = obj && obj.slug || '';
    }
    return Content;
}());

//# sourceMappingURL=content.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/htmlcontent.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HtmlContent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__content_model__ = __webpack_require__("../../../../../src/app/models/content.model.ts");
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

var HtmlContent = /** @class */ (function (_super) {
    __extends(HtmlContent, _super);
    function HtmlContent(obj) {
        var _this = _super.call(this, obj) || this;
        _this.body = obj && obj.body || '';
        _this.images = obj && obj.images || '';
        return _this;
    }
    return HtmlContent;
}(__WEBPACK_IMPORTED_MODULE_0__content_model__["a" /* Content */]));

//# sourceMappingURL=htmlcontent.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/nav.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Nav; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navbar_model__ = __webpack_require__("../../../../../src/app/models/navbar.model.ts");

var Nav = /** @class */ (function () {
    function Nav(obj) {
        this.navbar = obj && obj.navbar || new __WEBPACK_IMPORTED_MODULE_0__navbar_model__["a" /* Navbar */]({});
        this.blogs = obj && obj.blogs || [];
        this.categories = obj && obj.categories || [];
    }
    return Nav;
}());

//# sourceMappingURL=nav.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/navbar.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navbar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page_model__ = __webpack_require__("../../../../../src/app/models/page.model.ts");

var Navbar = /** @class */ (function () {
    function Navbar(obj) {
        this.home = obj && obj.home || new __WEBPACK_IMPORTED_MODULE_0__page_model__["a" /* Page */]();
        this.navitems = obj && obj.navitems || [];
    }
    return Navbar;
}());

//# sourceMappingURL=navbar.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/page.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__htmlcontent_model__ = __webpack_require__("../../../../../src/app/models/htmlcontent.model.ts");
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

var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page(obj) {
        return _super.call(this, obj) || this;
    }
    return Page;
}(__WEBPACK_IMPORTED_MODULE_0__htmlcontent_model__["a" /* HtmlContent */]));

//# sourceMappingURL=page.model.js.map

/***/ }),

/***/ "../../../../../src/app/models/profile.model.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
var Profile = /** @class */ (function () {
    function Profile(obj) {
        this.username = obj && obj.username || null;
        this.first_name = obj && obj.first_name || null;
        this.last_name = obj && obj.last_name || null;
        this.email = obj && obj.email || null;
        this.facebook = obj && obj.facebook || null;
        this.twitter = obj && obj.twitter || null;
        this.instagram = obj && obj.instagram || null;
        this.pinterest = obj && obj.pinterest || null;
        this.github = obj && obj.github || null;
        this.stackoveflow = obj && obj.stackoverflow || null;
        this.picture = obj && obj.picture || null;
    }
    return Profile;
}());

//# sourceMappingURL=profile.model.js.map

/***/ }),

/***/ "../../../../../src/app/page/page.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"page.component.css","sourceRoot":""}]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/page/page.component.html":
/***/ (function(module, exports) {

module.exports = "<app-html-content></app-html-content>\r\n"

/***/ }),

/***/ "../../../../../src/app/page/page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_switchMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_nav_service__ = __webpack_require__("../../../../../src/app/services/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_page_model__ = __webpack_require__("../../../../../src/app/models/page.model.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PageComponent = /** @class */ (function () {
    function PageComponent(navService, route, location) {
        var _this = this;
        this.navService = navService;
        this.route = route;
        this.location = location;
        this.page = new __WEBPACK_IMPORTED_MODULE_5__models_page_model__["a" /* Page */]({ 'title': 'unchanged', 'body': '<p>AAA</p>' });
        this._navReady = this.navService.isLoaded();
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
    PageComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["o" /* Component */])({
            selector: 'app-page',
            template: __webpack_require__("../../../../../src/app/page/page.component.html"),
            styles: [__webpack_require__("../../../../../src/app/page/page.component.css")],
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === "function" && _c || Object])
    ], PageComponent);
    return PageComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=page.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/nav.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_nav_model__ = __webpack_require__("../../../../../src/app/models/nav.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_htmlcontent_model__ = __webpack_require__("../../../../../src/app/models/htmlcontent.model.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavService = /** @class */ (function () {
    function NavService(http) {
        this.http = http;
        this.contentSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.content$ = this.contentSource.asObservable();
        this._loadedSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
        this.loaded$ = this._loadedSource.asObservable();
        this.base_url = 'http://127.0.0.1:8000/api/content/';
        this._loadedContent = {};
        this._content = new __WEBPACK_IMPORTED_MODULE_4__models_htmlcontent_model__["a" /* HtmlContent */]({});
        this._loaded = false;
        this._nav = new __WEBPACK_IMPORTED_MODULE_3__models_nav_model__["a" /* Nav */]({});
    }
    NavService.prototype.getNav = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.http.get(_this.base_url + 'nav/')
                .toPromise()
                .then(function (res) {
                _this._nav = new __WEBPACK_IMPORTED_MODULE_3__models_nav_model__["a" /* Nav */](res.json());
                resolve(_this._nav);
            });
        });
        return promise;
    };
    NavService.prototype.initializeLoadedPages = function () {
        this._loadedContent['/'] = this._nav.navbar.home;
        for (var _i = 0, _a = this._nav.navbar.navitems; _i < _a.length; _i++) {
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
        for (var _d = 0, _e = this._nav.blogs; _d < _e.length; _d++) {
            var blog = _e[_d];
            this._loadedContent['blog/' + blog.slug] = blog;
        }
        this._loadedSource.next(true);
        this._loaded = true;
    };
    NavService.prototype.getContent = function (type, slug) {
        var _this = this;
        var url = '/';
        if (slug) {
            url = type + '/' + slug;
        }
        if (this._loadedContent[url].body) {
            this.contentSource.next(this._loadedContent[url]);
            this._content = this._loadedContent[url];
        }
        else {
            var apiUrl = this.base_url + url + '/';
            this.http.get(apiUrl)
                .subscribe(function (res) {
                _this._loadedContent[url].body = res.json().body;
                _this._content = _this._loadedContent[url];
                _this.contentSource.next(_this._loadedContent[url]);
            });
        }
    };
    NavService.prototype.isLoaded = function () {
        return this._loaded;
    };
    NavService.prototype.getCurrentContent = function () {
        return this._content;
    };
    NavService.prototype.getBlogList = function () {
        return this._nav.blogs;
    };
    NavService.prototype.getCategoryList = function () {
        return this._nav.categories;
    };
    NavService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]) === "function" && _a || Object])
    ], NavService);
    return NavService;
    var _a;
}());

//# sourceMappingURL=nav.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_24" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map