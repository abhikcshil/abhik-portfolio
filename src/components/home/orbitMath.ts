export function getOrbitAngle(
  initialAngle: number,
  orbitDuration: number,
  elapsedSeconds: number
) {
  return initialAngle + (elapsedSeconds / orbitDuration) * 360;
}

export function getOrbitUnitPosition(angleDegrees: number) {
  const angle = (angleDegrees * Math.PI) / 180;

  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}
