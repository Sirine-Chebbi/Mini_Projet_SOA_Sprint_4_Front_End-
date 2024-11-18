import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url
      });
      return false; // Empêche la navigation avant la connexion
    }

    // Récupérer les rôles requis pour la route
    const requiredRoles = route.data['roles'];

    // Si aucun rôle n'est requis, on permet l'accès
    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    // Vérifier si l'utilisateur a tous les rôles requis
    const hasRequiredRoles = requiredRoles.every((role) => this.roles.includes(role));
    if (!hasRequiredRoles) {
      // Si les rôles ne correspondent pas, rediriger l'utilisateur ou afficher une erreur
      this.router.navigate(['/forbidden']);
    }

    return hasRequiredRoles;
  }
}
