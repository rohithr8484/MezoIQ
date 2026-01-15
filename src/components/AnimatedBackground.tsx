export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Subtle floating orbs - enterprise appropriate */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-[150px] animate-float" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-accent/8 to-primary/8 rounded-full blur-[150px] animate-float" style={{ animationDelay: '3s', animationDuration: '6s' }} />
      
      {/* Grid pattern overlay - subtle tech feel */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(hsl(173 80% 40%) 1px, transparent 1px), linear-gradient(90deg, hsl(173 80% 40%) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(222_47%_5%)_80%)]" />
    </div>
  );
};
