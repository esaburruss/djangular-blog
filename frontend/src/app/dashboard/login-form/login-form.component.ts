import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  csrftoken: string;
  constructor(private http: Http) { }

  ngOnInit() {
    this.csrftoken = this.getCookie('csrftoken');
    this.login();
  }

  private getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    login() {

      this.http.post(
        'http://127.0.0.1:8000/api/auth/login/',
        JSON.stringify({
          username: 'esaburruss',
          password: 'p@ssword'
        }),
        {headers: new Headers({'Content-Type': 'application/json', 'X-CSRFToken':this.csrftoken})})
        .subscribe((res: Response) => {
          console.log(res);

        });
    }

}
