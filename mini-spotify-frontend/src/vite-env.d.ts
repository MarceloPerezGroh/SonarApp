
// Declaración única para archivos SVG
declare module "*.svg" {
  const svgUrl: string; // 👈 nombre único para evitar duplicados
  export default svgUrl;
}
