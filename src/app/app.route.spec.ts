import { routes } from './app.routes';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

describe('AppRoutes', () => {
  it('should define the routes correctly', () => {
    expect(routes.length).toBe(3);

    const loginRoute = routes.find((r) => r.path === 'login');
    expect(loginRoute?.component).toBe(LoginComponent);

    const layoutRoute = routes.find((r) => r.path === 'layout');
    expect(layoutRoute?.component).toBe(LayoutComponent);

    const defaultRoute = routes.find((r) => r.path === '');
    expect(defaultRoute?.redirectTo).toBe('login');
    expect(defaultRoute?.pathMatch).toBe('full');
  });
});
