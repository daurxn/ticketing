import Link from 'next/link'
import { User } from '@/lib/types'

interface HeaderProps {
  currentUser: null | User
}

const Header = ({ currentUser }: HeaderProps) => {
  const links = (
    currentUser
      ? [
          { label: 'Sell Tickets', href: '/tickets/new' },
          { label: 'My Orders', href: '/orders' },
          { label: 'Sign Out', href: '/auth/signout' },
        ]
      : [
          { label: 'Sign Up', href: '/auth/signup' },
          { label: 'Sign In', href: '/auth/signin' },
        ]
  ).map(({ label, href }) => (
    <li key={href} className="nav-item">
      <Link href={href} className="nav-link">
        {label}
      </Link>
    </li>
  ))

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        GitTix
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  )
}

export default Header
