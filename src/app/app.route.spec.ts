import { routes } from './app.routes';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RegisterComponent } from './pages/register/register.component';

describe('AppRoutes', () => {
  it('should define the routes correctly', () => {
    expect(routes.length).toBe(4);

    const loginRoute = routes.find((r) => r.path === 'login');
    expect(loginRoute?.component).toBe(LoginComponent);

    const registerRoute = routes.find((r) => r.path === 'register');
    expect(registerRoute?.component).toBe(RegisterComponent);

    const layoutRoute = routes.find((r) => r.path === 'layout');
    expect(layoutRoute?.component).toBe(LayoutComponent);

    const defaultRoute = routes.find((r) => r.path === '');
    expect(defaultRoute?.redirectTo).toBe('login');
    expect(defaultRoute?.pathMatch).toBe('full');
  });
});
