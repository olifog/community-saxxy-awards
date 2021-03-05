import Link from 'next/link';

export default function NavLink({ link, text, disabled }) {
  return (
    <Link href={link}>
      <a className={"text-lg font-medium " + (disabled ? "text-gray-600 pointer-events-none" : "text-white hover:text-gray-400")}>
        {text}
      </a>
    </Link>
  );
}