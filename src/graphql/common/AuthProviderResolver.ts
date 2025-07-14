import { AuthProvider } from 'src/enums/AuthProvider';
import { AUTH_PROVIDER } from '../graphql';

export const AuthProviderResolver: Record<keyof typeof AUTH_PROVIDER, number> =
  {
    GOOGLE: AuthProvider.Google,
  };
