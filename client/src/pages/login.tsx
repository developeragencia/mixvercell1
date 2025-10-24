import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import mixLogo from "@assets/Logo_MIX_horizontal_1750591494976.png";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '@/config/oauth';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginContent() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'google' | 'phone' | 'email'>('google');
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({ 
          title: "Login realizado!", 
          description: "Bem-vindo ao MIX!" 
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (data.isProfileComplete) {
          window.location.href = '/discover';
        } else {
          window.location.href = '/onboarding-flow';
        }
      } else {
        setError(data.message || "Erro ao fazer login. Tente novamente.");
      }
    } catch (err: any) {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Erro ao autenticar com Google. Tente novamente.");
  };

  const handlePinkButtonClick = () => {
    const googleButton = googleButtonRef.current?.querySelector('div[role="button"]') as HTMLElement;
    if (googleButton) {
      googleButton.click();
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError("Digite um email válido");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email,
          password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Email ou senha incorretos');
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta!",
      });

      // Buscar dados do usuário para verificar se perfil está completo
      const userResponse = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        setTimeout(() => {
          if (userData.isProfileComplete) {
            window.location.href = "/discover";
          } else {
            window.location.href = "/onboarding-flow";
          }
        }, 500);
      } else {
        // Fallback: redirecionar para discover
        setTimeout(() => {
          window.location.href = "/discover";
        }, 500);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Verifique sua conexão.");
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validação de telefone
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setError("Digite um telefone válido: (11) 99999-9999");
      setIsLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      const cleanPhone = phone.replace(/\D/g, '');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: cleanPhone,
          password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Telefone ou senha incorretos');
        setIsLoading(false);
        return;
      }

      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta!",
      });

      // Buscar dados do usuário para verificar se perfil está completo
      const userResponse = await fetch('/api/auth/user', {
        credentials: 'include'
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        
        setTimeout(() => {
          if (userData.isProfileComplete) {
            window.location.href = "/discover";
          } else {
            window.location.href = "/onboarding-flow";
          }
        }, 500);
      } else {
        // Fallback: redirecionar para discover
        setTimeout(() => {
          window.location.href = "/discover";
        }, 500);
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Verifique sua conexão.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-between p-8 py-16 relative overflow-hidden">
      <div className="absolute top-20 right-0 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"></div>

      <div className="w-full h-6"></div>

      <div className="w-full max-w-md flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <img 
            src={mixLogo} 
            alt="MIX" 
            className="h-24 w-auto mx-auto drop-shadow-2xl"
            data-testid="img-logo"
          />
        </div>

        <div className="text-center mb-12">
          <p className="text-white/80 text-lg">Flerte agora, decida depois</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-500/20 border-red-500/30 text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="whitespace-pre-line">{error}</AlertDescription>
          </Alert>
        )}

        {/* Método de Login */}
        <div className="mb-6">
          <div className="flex bg-white/10 rounded-full p-1">
            <button
              onClick={() => setLoginMethod('google')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                loginMethod === 'google' 
                  ? 'bg-pink-600 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Google
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                loginMethod === 'email' 
                  ? 'bg-pink-600 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                loginMethod === 'phone' 
                  ? 'bg-pink-600 text-white' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Celular
            </button>
          </div>
        </div>

        {/* Login com Google */}
        {loginMethod === 'google' && (
          <div className="space-y-4">
            <Button
              onClick={handlePinkButtonClick}
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold rounded-full shadow-lg text-base"
              data-testid="button-google-login"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entre com Google
            </Button>

            <div ref={googleButtonRef} className="hidden">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
              />
            </div>
          </div>
        )}

        {/* Login com Email */}
        {loginMethod === 'email' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-base bg-white/10 border-2 border-white/20 focus:border-pink-500/50 rounded-full text-white placeholder:text-white/50 px-6"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white/90 text-sm font-medium mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-base bg-white/10 border-2 border-white/20 focus:border-pink-500/50 rounded-full text-white placeholder:text-white/50 px-6 pr-14"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg text-base disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        )}

        {/* Login com Celular */}
        {loginMethod === 'phone' && (
          <form onSubmit={handlePhoneLogin} className="space-y-4">
            <div>
              <Label htmlFor="phone" className="text-white/90 text-sm font-medium mb-2 block">
                Número de Celular
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={15}
                className="h-14 text-base bg-white/10 border-2 border-white/20 focus:border-pink-500/50 rounded-full text-white placeholder:text-white/50 px-6"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone-password" className="text-white/90 text-sm font-medium mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="phone-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 text-base bg-white/10 border-2 border-white/20 focus:border-pink-500/50 rounded-full text-white placeholder:text-white/50 px-6 pr-14"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full shadow-lg text-base disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        )}

        <div className="text-center mt-8">
          <p className="text-white/70 text-sm mb-4">
            Não tem uma conta?
          </p>
          <Button
            onClick={() => setLocation('/register')}
            variant="outline"
            className="text-white font-semibold text-lg border-2 border-pink-600 px-8 py-3 rounded-full hover:bg-pink-600/10 transition-colors bg-transparent"
            data-testid="link-register"
          >
            Cadastrar
          </Button>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/50 text-xs">
            Ao continuar, você concorda com nossos{' '}
            <a href="/terms" className="underline">Termos de Uso</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  if (!GOOGLE_CLIENT_ID) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-8">
        <Alert variant="destructive" className="bg-red-500/20 border-red-500/30 text-white">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Configuração do Google OAuth não encontrada. Entre em contato com o suporte.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <LoginContent />
    </GoogleOAuthProvider>
  );
}
