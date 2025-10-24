import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import mixLogo from "@assets/Logo_MIX_horizontal_1750591494976.png";
import { MapPin, Users } from "lucide-react";

export default function Welcome1() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-between p-8 py-16 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="w-full flex justify-center items-center z-10 relative pt-4">
        <img 
          src={mixLogo} 
          alt="MIX" 
          className="h-10 w-auto drop-shadow-lg"
          data-testid="img-logo"
        />
        <button
          onClick={() => setLocation('/login')}
          className="absolute right-0 text-white/90 hover:text-white text-base font-medium"
          data-testid="button-skip"
        >
          Pular
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-sm z-10 px-4">
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/20 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-1.5 bg-white/30 rounded-full"></div>
          
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6">
                <MapPin className="w-14 h-14 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-11 h-11 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Users className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="text-white text-3xl font-bold leading-tight">
              Encontre pessoas perto de você
            </h1>

            <p className="text-white/80 text-base leading-relaxed">
              Descubra solteiros incríveis na sua região e comece a se conectar agora mesmo
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-6 z-10">
        <Button
          onClick={() => setLocation('/welcome-2')}
          className="w-full h-16 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold rounded-full shadow-2xl text-lg"
          data-testid="button-next"
        >
          Continuar
        </Button>

        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
