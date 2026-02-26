export default function Skeleton({ width = '100%', height = 16, borderRadius = 6, style = {} }) {
    return (
      <div style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #1e293b 25%, #273449 50%, #1e293b 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        ...style,
      }} />
    )
  }
  
  export function UserCardSkeleton() {
    return (
      <div>
        <div>
          <Skeleton width={44} height={44} borderRadius={22} />
          <div>
            <Skeleton width="60%" height={13} />
            <Skeleton width="40%" height={11} />
          </div>
        </div>
        <Skeleton width="80%" height={11} />
        <Skeleton width="55%" height={11} />
        <div>
          <Skeleton width={52} height={28} borderRadius={7} />
          <Skeleton width={52} height={28} borderRadius={7} />
          <Skeleton width={64} height={28} borderRadius={7} />
        </div>
      </div>
    )
  }
  
  export function UserDetailSkeleton() {
    return (
      <div>
        <Skeleton width={100} height={32} />
        <div>
          <Skeleton width={96} height={96} borderRadius={48} />
          <div>
            <Skeleton width="40%" height={28} />
            <Skeleton width="25%" height={16} />
          </div>
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton width="25%" height={13} />
            <Skeleton width="40%" height={13} />
          </div>
        ))}
      </div>
    )
  }