import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CryptoControllerService } from "~app/components-services/crypto/crypto-controller.service";

@Injectable()
export class DetailsResolver implements Resolve<any> {

  constructor(private service: CryptoControllerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const idString = route.params.id;
    return this.service.getCryptoDetails(idString);
  }
}
