const variants = {
    primary: { background:'#6366f1', color:'#fff', border:'none' },
    danger:  { background:'#ef444422', color:'#f87171', border:'1px solid #ef444433' },
    warning: { background:'#f59e0b22', color:'#fbbf24', border:'1px solid #f59e0b33' },
    ghost:   { background:'transparent', color:'#94a3b8', border:'1px solid #1e293b' },
  }
  
  export default function Button({ children, onClick, variant = 'primary', size = 'md', disabled = false, ...props }) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }