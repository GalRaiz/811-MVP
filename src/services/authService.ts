import { IUser, mockUsers } from '../data/usersData';

export interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  private static instance: AuthService;
  private users: IUser[] = mockUsers;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<IUser> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.find(
      u => u.email.toLowerCase() === credentials.email.toLowerCase() && 
           u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Return user without password for security
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as IUser;
  }

  public async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  public isAuthenticated(): boolean {
    // In a real app, this would check for valid JWT token
    return false;
  }
}

export default AuthService.getInstance();
