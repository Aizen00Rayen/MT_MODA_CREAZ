export default function Logo({ className = 'h-10', linkClass = '' }) {
  return (
    <img
      src="/logo.png"
      alt="MT Moda Creaz"
      className={`object-contain ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
