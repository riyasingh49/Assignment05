import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const FIELDS = [
  { key:'firstName', label:'First Name', type:'text',   half: true },
  { key:'lastName',  label:'Last Name',  type:'text',   half: true },
  { key:'email',     label:'Email',      type:'email',  half: false },
  { key:'phone',     label:'Phone',      type:'tel',    half: false },
  { key:'username',  label:'Username',   type:'text',   half: false },
  { key:'age',       label:'Age',        type:'number', half: false },
]

export default function UserForm({ initial = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    firstName: initial.firstName || '',
    lastName:  initial.lastName  || '',
    email:     initial.email     || '',
    phone:     initial.phone     || '',
    username:  initial.username  || '',
    age:       initial.age       || '',
  })

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div>
      <div>
        {FIELDS.filter(f => f.half).map(({ key, label, type }) => (
          <Input key={key} label={label} type={type} value={form[key]} onChange={set(key)} placeholder={label} />
        ))}
      </div>
      <div>
        {FIELDS.filter(f => !f.half).map(({ key, label, type }) => (
          <Input key={key} label={label} type={type} value={form[key]} onChange={set(key)} placeholder={label} />
        ))}
      </div>
      <Button onClick={() => onSubmit(form)} disabled={loading}>
        {loading ? 'Saving…' : 'Save User'}
      </Button>
    </div>
  )
}