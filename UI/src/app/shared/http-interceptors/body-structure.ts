import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";

@Injectable()
export class BodyStructureInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.body) {
      req.body.login = req.body.email;
      delete req.body.email;
    }
    return next.handle(req);
  }
}
