export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs with dramatic glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-[120px] animate-float" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-secondary/30 to-primary/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s', animationDuration: '5s' }} />
      <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Particle grid effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-8 h-full">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="w-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Scanning lines effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-32 animate-[slide-up_3s_ease-in-out_infinite]" />
      </div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />
    </div>
  );
};
