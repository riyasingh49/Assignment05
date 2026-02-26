import { useState } from 'react'
import Button from '../ui/Button'

export default function UserCard({ user, onView, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onView(user.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <img src={user.image} alt={user.firstName} />
        <div>
          <div>{user.firstName} {user.lastName}</div>
          <div>Age {user.age}</div>
        </div>
      </div>

      <div>✉ {user.email}</div>
      <div>☏ {user.phone}</div>

      <div onClick={(e) => e.stopPropagation()}>
        <Button variant="ghost"   size="sm" onClick={() => onView(user.id)}>View</Button>
        <Button variant="warning" size="sm" onClick={() => onEdit(user)}>Edit</Button>
        <Button variant="danger"  size="sm" onClick={() => onDelete(user)}>Delete</Button>
      </div>
    </div>
  )
}