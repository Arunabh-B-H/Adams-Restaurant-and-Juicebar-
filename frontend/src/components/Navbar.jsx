// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Founder", href: "#founder" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Menu", href: "#menu" },
//   { label: "Reviews", href: "#reviews" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll);
//     const [isAdmin, setIsAdmin] = useState(
//       !!localStorage.getItem("adams_token"),
//     );

//     const handleLogout = () => {
//       localStorage.removeItem("adams_token");
//       setIsAdmin(false);
//       window.location.href = "/"; // Refresh to reset state
//     };
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <nav
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         background: scrolled ? "rgba(14,6,0,0.97)" : "transparent",
//         backdropFilter: scrolled ? "blur(12px)" : "none",
//         borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
//         transition: "all 0.4s ease",
//         padding: "0 2rem",
//       }}
//     >
//       <div
//         style={{
//           maxWidth: "1200px",
//           margin: "0 auto",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           height: "80px",
//         }}
//       >
//         <a href="#home" style={{ textDecoration: "none" }}>
//           <div
//             style={{
//               fontFamily: "var(--font-serif)",
//               color: "var(--gold)",
//               fontSize: "1.4rem",
//               fontWeight: 600,
//               letterSpacing: "0.05em",
//               lineHeight: 1.2,
//             }}
//           >
//             Adam's
//             <br />
//             <span
//               style={{
//                 fontSize: "0.75rem",
//                 fontWeight: 300,
//                 letterSpacing: "0.2em",
//                 textTransform: "uppercase",
//                 color: "var(--gold-light)",
//               }}
//             >
//               Restaurant & JuiceBar
//             </span>
//           </div>
//         </a>

//         {/* Desktop nav */}
//         <ul
//           style={{
//             display: "flex",
//             gap: "2rem",
//             listStyle: "none",
//             margin: 0,
//             padding: 0,
//           }}
//           className="desktop-nav"
//         >
//           {navLinks.map((l) => (
//             <li key={l.label}>
//               <a
//                 href={l.href}
//                 style={{
//                   color: "rgba(253,248,240,0.8)",
//                   textDecoration: "none",
//                   fontFamily: "var(--font-sans)",
//                   fontSize: "0.8rem",
//                   fontWeight: 400,
//                   letterSpacing: "0.12em",
//                   textTransform: "uppercase",
//                   transition: "color 0.3s",
//                 }}
//                 onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
//                 onMouseLeave={(e) =>
//                   (e.target.style.color = "rgba(253,248,240,0.8)")
//                 }
//               >
//                 {l.label}
//               </a>
//             </li>
//           ))}
//           <li>
//             <Link
//               to="/admin/login"
//               style={{
//                 color: "var(--gold)",
//                 border: "1px solid var(--gold)",
//                 padding: "0.4rem 1rem",
//                 textDecoration: "none",
//                 fontFamily: "var(--font-sans)",
//                 fontSize: "0.75rem",
//                 fontWeight: 500,
//                 letterSpacing: "0.12em",
//                 textTransform: "uppercase",
//                 transition: "all 0.3s",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.background = "var(--gold)";
//                 e.target.style.color = "var(--dark)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.background = "transparent";
//                 e.target.style.color = "var(--gold)";
//               }}
//             >
//               Admin
//             </Link>
//           </li>
//         </ul>

//         {/* Hamburger */}
//         <button
//           onClick={() => setOpen(!open)}
//           style={{
//             display: "none",
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//             color: "var(--gold)",
//             fontSize: "1.5rem",
//             flexDirection: "column",
//             gap: "5px",
//           }}
//           className="hamburger"
//         >
//           <span
//             style={{
//               display: "block",
//               width: "24px",
//               height: "2px",
//               background: "var(--gold)",
//               transition: "all 0.3s",
//               transform: open ? "rotate(45deg) translate(5px,5px)" : "none",
//             }}
//           />
//           <span
//             style={{
//               display: "block",
//               width: "24px",
//               height: "2px",
//               background: "var(--gold)",
//               transition: "all 0.3s",
//               opacity: open ? 0 : 1,
//             }}
//           />
//           <span
//             style={{
//               display: "block",
//               width: "24px",
//               height: "2px",
//               background: "var(--gold)",
//               transition: "all 0.3s",
//               transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none",
//             }}
//           />
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {open && (
//         <div
//           style={{
//             background: "rgba(14,6,0,0.98)",
//             borderTop: "1px solid rgba(201,168,76,0.2)",
//             padding: "1rem 2rem 2rem",
//           }}
//           className="mobile-menu"
//         >
//           {navLinks.map((l) => (
//             <a
//               key={l.label}
//               href={l.href}
//               onClick={() => setOpen(false)}
//               style={{
//                 display: "block",
//                 padding: "0.75rem 0",
//                 color: "var(--cream)",
//                 textDecoration: "none",
//                 fontFamily: "var(--font-sans)",
//                 fontSize: "0.9rem",
//                 letterSpacing: "0.1em",
//                 borderBottom: "1px solid rgba(201,168,76,0.1)",
//               }}
//             >
//               {l.label}
//             </a>
//           ))}
//           <Link
//             to="/admin/login"
//             onClick={() => setOpen(false)}
//             style={{
//               display: "block",
//               marginTop: "1rem",
//               color: "var(--gold)",
//               textDecoration: "none",
//               fontFamily: "var(--font-sans)",
//               fontSize: "0.9rem",
//               letterSpacing: "0.1em",
//             }}
//           >
//             Admin Panel
//           </Link>
//         </div>
//       )}

//       <style>{`
//         @media (max-width: 768px) {
//           .desktop-nav { display: none !important; }
//           .hamburger { display: flex !important; }
//         }
//       `}</style>
//     </nav>
//   );
// }

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Founder", href: "#founder" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Check token existence immediately
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem("adams_token"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    try {
      if (isAdmin) {
        await API.post('/auth/logout');
      }
    } catch (err) {
      console.error("Logout error", err);
    }
    localStorage.removeItem("adams_token");
    setIsAdmin(false);
    window.location.reload(); // Ensures the UI updates and routes reset
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(14,6,0,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none",
        transition: "all 0.4s ease",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
        }}
      >
        <a href="#home" style={{ textDecoration: "none" }}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--gold)",
              fontSize: "1.4rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            Adam's
            <br />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
              }}
            >
              Restaurant & JuiceBar
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
          className="desktop-nav"
        >
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  color: "rgba(253,248,240,0.8)",
                  textDecoration: "none",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(253,248,240,0.8)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Admin / Logout Button */}
          {isAdmin && (
            <li>
              <button
                onClick={handleLogout}
                style={{
                  color: "var(--gold)",
                  border: "1px solid var(--gold)",
                  padding: "0.4rem 1rem",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--gold)",
            fontSize: "1.5rem",
            flexDirection: "column",
            gap: "5px",
          }}
          className="hamburger"
        >
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--gold)",
              transition: "all 0.3s",
              transform: open ? "rotate(45deg) translate(5px,5px)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--gold)",
              transition: "all 0.3s",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              display: "block",
              width: "24px",
              height: "2px",
              background: "var(--gold)",
              transition: "all 0.3s",
              transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: "rgba(14,6,0,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            padding: "1rem 2rem 2rem",
          }}
          className="mobile-menu"
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                color: "var(--cream)",
                textDecoration: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              {l.label}
            </a>
          ))}
          {isAdmin && (
            <button
              onClick={handleLogout}
              style={{
                display: "block",
                marginTop: "1rem",
                background: "none",
                border: "none",
                color: "var(--gold)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
