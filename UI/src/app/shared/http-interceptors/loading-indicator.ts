import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { LoadingBlockService } from "src/app/shared/services/loading-block.service";
import { tap } from "rxjs/operators";

@Injectable()
export class LoadingIndicatorInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingBlockService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.registerLoading(req);
    return next.handle(req).pipe(
      tap(event => {
        this.loadingService.registerLoadingCompleted(req, event);
      })
    );
  }
}
