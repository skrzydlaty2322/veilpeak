export default function MountainSVG() {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none">
      {/* Layer 1 — distant ridgeline */}
      <svg
        viewBox="0 0 1440 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[120px] md:h-[180px]"
      >
        <path
          d="M0,160 L80,120 L160,140 L260,80 L340,110 L440,60 L520,90 L620,40 L700,70 L800,30 L880,60 L980,20 L1060,50 L1160,10 L1240,45 L1340,25 L1440,50 L1440,200 L0,200 Z"
          fill="#0d1f12"
        />
      </svg>

      {/* Layer 2 — mid silhouette */}
      <svg
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[100px] md:h-[150px] -mt-[60px] md:-mt-[100px]"
      >
        <path
          d="M0,120 L100,80 L180,100 L280,50 L360,75 L460,30 L540,55 L640,10 L720,40 L820,0 L900,30 L1000,5 L1080,35 L1180,15 L1260,40 L1360,20 L1440,45 L1440,160 L0,160 Z"
          fill="#091408"
        />
      </svg>

      {/* Layer 3 — foreground fill connects to page bg */}
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-[80px] md:h-[120px] -mt-[50px] md:-mt-[80px]"
      >
        <path
          d="M0,80 L120,45 L200,65 L320,20 L400,45 L520,5 L600,30 L720,0 L800,25 L920,0 L1000,20 L1100,5 L1180,30 L1300,10 L1440,35 L1440,120 L0,120 Z"
          fill="#080c09"
        />
      </svg>
    </div>
  );
}
