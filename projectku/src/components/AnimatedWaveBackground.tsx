export default function AnimatedWaveBackground() {
  return (
    <div className="animatedWaveBackground" aria-hidden="true">
      <span className="waveAmbient waveAmbientA" />
      <span className="waveAmbient waveAmbientB" />
      <span className="waveLayer waveLayerA" />
      <span className="waveLayer waveLayerB" />
      <span className="waveLayer waveLayerC" />
      <span className="waveSheen" />
    </div>
  );
}
