"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResultComponent = void 0;
var core_1 = require("@angular/core");
var http_client_service_service_1 = require("../http-client-service.service");
var ResultComponent = /** @class */ (function () {
    function ResultComponent(Http, router) {
        this.Http = Http;
        this.router = router;
        this.isStu = false;
        this.Faculty = new http_client_service_service_1.faculty(null, null, null, null, null);
        this.isDisplay = false;
    }
    ResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.Http.getUser(sessionStorage.getItem('id')).subscribe(function (res) {
            _this.role_id = res.role_id;
            if (_this.role_id == 1) {
                _this.isDisplay = true;
                _this.getStudentToUpdateResult();
            }
            else {
                _this.isStu = true;
                _this.isDisplay = false;
                _this.getres();
            }
        });
    };
    ResultComponent.prototype.getres = function () {
        var _this = this;
        this.Http.getResult(sessionStorage.getItem('id')).subscribe(function (res) {
            _this.Result = res;
            for (var i = 0; i < res.length; i++) {
                res[i].exam_date = res[i].exam_date.slice(0, 2) + "/" + res[i].exam_date.slice(2, 4) + "/" + res[i].exam_date.slice(4, 8);
            }
        });
    };
    ResultComponent.prototype.back = function () {
        this.router.navigate(['userHome']);
    };
    ResultComponent.prototype.getStudentToUpdateResult = function () {
        var _this = this;
        this.Http.getClass(sessionStorage.getItem('id')).subscribe(function (res) {
            _this.Faculty.teaching_class = res.teaching_class;
            _this.Http.StudentList(_this.Faculty.teaching_class).subscribe(function (res) {
                _this.updateResult = res;
                for (var i = 0; i < res.length; i++) {
                    _this.updateResult[i].student_id = res[i].user_id_student;
                }
            });
        });
    };
    ResultComponent.prototype.classResUpdate = function () {
        for (var i = 0; i < this.updateResult.length; i++) {
            this.updateResult[i].exam_date = this.examDate;
            this.updateResult[i].subject = this.examSubject;
            this.updateResult[i].max_marks = this.maxMarks;
        }
        this.Http.updateResult(this.updateResult).subscribe(function (res) {
        });
    };
    ResultComponent = __decorate([
        core_1.Component({
            selector: 'app-result',
            templateUrl: './result.component.html',
            styleUrls: ['./result.component.css']
        })
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;