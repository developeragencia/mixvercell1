import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import mixLogo from "@assets/Logo_MIX_horizontal_1750591494976.png";
import { MessageCircle, Send } from "lucide-react";

export default function Welcome6() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex flex-col items-center justify-between p-8 py-16">
      <div className="w-full flex justify-center items-center pt-4">
        <img 
          src={mixLogo} 
          alt="MIX" 
          className="h-10 w-auto drop-shadow-lg"
          data-testid="img-logo"
        />
        <button
          onClick={() => setLocation('/login')}
          className="absolute right-8 text-white/90 hover:text-white text-base font-medium"
          data-testid="button-skip"
        >
          Pular
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full max-w-sm px-4">
        <div className="w-full bg-white/10 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <MessageCircle className="w-14 h-14 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -top-2 -right-2 w-11 h-11 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl transform -rotate-12">
                <Send className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            
            <h1 className="text-white text-3xl font-bold leading-tight">
              Converse com pessoas verificadas
            </h1>

            <p className="text-white/80 text-base leading-relaxed">
              Envie mensagens, compartilhe momentos e construa conexões verdadeiras
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md space-y-6">
        <Button
          onClick={() => setLocation('/terms')}
          className="w-full h-16 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-bold rounded-full shadow-2xl text-lg"
          data-testid="button-start"
        >
          Continuar
        </Button>

        <div className="flex justify-center gap-2">
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
