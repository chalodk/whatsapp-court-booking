"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/club", label: "Club" },
  { href: "/mensajes", label: "Mensajes" },
  { href: "/jugadores", label: "Jugadores" },
  { href: "/envios", label: "Envíos" },
  { href: "/agenda", label: "Agenda" },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className={active ? "active" : ""}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
