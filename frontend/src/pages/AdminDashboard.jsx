import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace("/api", "")
  : "";

const sidebarStyle = {
  width: "260px",
  background: "#060300",
  borderRight: "1px solid rgba(201,168,76,0.12)",
  minHeight: "100vh",
  padding: "0",
  flexShrink: 0,
};
const contentStyle = {
  flex: 1,
  background: "#0e0600",
  minHeight: "100vh",
  overflow: "auto",
};
const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(201,168,76,0.2)",
  color: "#fdf8f0",
  fontFamily: "Jost,sans-serif",
  fontSize: "0.85rem",
  outline: "none",
  marginBottom: "0.75rem",
};
const btnGold = {
  padding: "0.6rem 1.5rem",
  background: "#c9a84c",
  border: "none",
  color: "#0e0600",
  fontFamily: "Jost,sans-serif",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  cursor: "pointer",
};
const btnOutline = {
  padding: "0.6rem 1.5rem",
  background: "transparent",
  border: "1px solid rgba(201,168,76,0.4)",
  color: "#c9a84c",
  fontFamily: "Jost,sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  cursor: "pointer",
};
const card = {
  border: "1px solid rgba(201,168,76,0.12)",
  padding: "1.5rem",
  marginBottom: "1rem",
  background: "rgba(201,168,76,0.02)",
};
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}
// ─── Sidebar ───────────────────────────────────────────
function Sidebar({ admin, onLogout }) {
  const isMobile = useIsMobile();
  const links = [
    { to: "/admin", label: "Overview", icon: "⬡", end: true },
    { to: "/admin/content", label: "Site Content", icon: "✏️" },
    { to: "/admin/gallery", label: "Gallery", icon: "🖼️" },
    { to: "/admin/enquiries", label: "Enquiries", icon: "📬" },
    { to: "/admin/reviews", label: "Reviews", icon: "⭐" },
  ];
  return (
    <div className="admin-sidebar" style={{ 
      width: isMobile ? "100%" : "260px",
      minHeight: isMobile ? "auto" : "100vh",
      background: "#060300",
      borderRight: isMobile ? "none" : "1px solid rgba(201,168,76,0.12)",
      borderBottom: isMobile ? "1px solid rgba(201,168,76,0.12)" : "none",
      padding: isMobile ? "1rem" : "0",
      flexShrink: 0,
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }}>
      <div
        style={{
          padding: isMobile ? "0 0 1rem 0" : "2rem 1.5rem",
          borderBottom: isMobile ? "none" : "1px solid rgba(201,168,76,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "Cormorant Garamond,serif",
              color: "#c9a84c",
              fontSize: "1.3rem",
              fontWeight: 600,
            }}
          >
            Adam's Admin
          </div>
          {!isMobile && (
            <div
              style={{
                fontFamily: "Jost,sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.5)",
                marginTop: "0.25rem",
              }}
            >
              Control Panel
            </div>
          )}
        </div>
        {isMobile && (
          <button
            onClick={onLogout}
            style={{ ...btnOutline, padding: "0.4rem 1rem", fontSize: "0.65rem", width: "auto" }}
          >
            Sign Out
          </button>
        )}
      </div>
      <nav className="admin-nav-links" style={{ padding: isMobile ? "0" : "1rem 0", display: "flex", flexDirection: isMobile ? "row" : "column", overflowX: isMobile ? "auto" : "visible", gap: isMobile ? "0.5rem" : "0" }}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: isMobile ? "0.6rem 1rem" : "0.85rem 1.5rem",
              textDecoration: "none",
              color: isActive ? "#c9a84c" : "rgba(253,248,240,0.5)",
              background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
              borderLeft: !isMobile && isActive ? "2px solid #c9a84c" : !isMobile ? "2px solid transparent" : "none",
              borderBottom: isMobile && isActive ? "2px solid #c9a84c" : isMobile ? "2px solid transparent" : "none",
              fontFamily: "Jost,sans-serif",
              fontSize: "0.82rem",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
              whiteSpace: "nowrap"
            })}
          >
            <span>{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
      {!isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "260px",
            padding: "1.5rem",
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <p
            style={{
              fontFamily: "Jost,sans-serif",
              fontSize: "0.78rem",
              color: "rgba(253,248,240,0.5)",
              marginBottom: "0.5rem",
            }}
          >
            {admin?.name}
          </p>
          <p
            style={{
              fontFamily: "Jost,sans-serif",
              fontSize: "0.68rem",
              color: "rgba(253,248,240,0.3)",
              marginBottom: "1rem",
            }}
          >
            {admin?.email}
          </p>
          <button
            onClick={onLogout}
            style={{ ...btnOutline, width: "100%", fontSize: "0.7rem" }}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Overview ──────────────────────────────────────────
function Overview() {
  const [stats, setStats] = useState({
    reviews: 0,
    enquiries: 0,
    gallery: 0,
    newEnquiries: 0,
  });
  useEffect(() => {
    Promise.all([
      API.get("/reviews/all"),
      API.get("/enquiries"),
      API.get("/gallery"),
    ])
      .then(([r, e, g]) => {
        setStats({
          reviews: r.data.length,
          enquiries: e.data.length,
          gallery: g.data.length,
          newEnquiries: e.data.filter((x) => x.status === "new").length,
        });
      })
      .catch(() => {});
  }, []);
  const S = ({ label, val, sub }) => (
    <div
      style={{
        border: "1px solid rgba(201,168,76,0.15)",
        padding: "2rem",
        background: "rgba(201,168,76,0.03)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "3rem",
          fontWeight: 300,
          color: "#c9a84c",
          lineHeight: 1,
        }}
      >
        {val}
      </div>
      <div
        style={{
          fontFamily: "Jost,sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(253,248,240,0.5)",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontFamily: "Jost,sans-serif",
            fontSize: "0.65rem",
            color: "#c9a84c",
            marginTop: "0.25rem",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
  return (
    <div style={{ padding: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#fdf8f0",
          marginBottom: "0.5rem",
        }}
      >
        Dashboard Overview
      </h2>
      <p
        style={{
          fontFamily: "Jost,sans-serif",
          fontSize: "0.8rem",
          color: "rgba(253,248,240,0.4)",
          marginBottom: "2.5rem",
        }}
      >
        Welcome back to Adam's Restaurant Admin Panel
      </p>
      <div
        className="admin-stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <S label="Total Reviews" val={stats.reviews} />
        <S
          label="Enquiries"
          val={stats.enquiries}
          sub={stats.newEnquiries > 0 ? `${stats.newEnquiries} new` : null}
        />
        <S label="Gallery Items" val={stats.gallery} />
        <S label="Est. Year" val="2018" />
      </div>
      <div
        style={{
          marginTop: "3rem",
          padding: "2rem",
          border: "1px solid rgba(201,168,76,0.1)",
          background: "rgba(201,168,76,0.02)",
        }}
      >
        <h3
          style={{
            fontFamily: "Cormorant Garamond,serif",
            fontSize: "1.3rem",
            color: "#c9a84c",
            marginBottom: "1rem",
          }}
        >
          Quick Actions
        </h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            ["📸 Add Gallery Photo", "/admin/gallery"],
            ["✏️ Edit Site Content", "/admin/content"],
            ["📬 View Enquiries", "/admin/enquiries"],
            ["⭐ Manage Reviews", "/admin/reviews"],
          ].map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              style={{
                ...btnGold,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Content Editor ─────────────────────────────────────
function ContentEditor() {
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    API.get("/content")
      .then((r) => setContent(r.data))
      .catch(() => {});
  }, []);

  const save = async (key, value, type = "object") => {
    setSaving(true);
    try {
      await API.put(`/content/${key}`, { value, type });
      toast.success("Saved!");
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const tabs = ["hero", "about", "founder", "contact"];

  return (
    <div style={{ padding: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#fdf8f0",
          marginBottom: "2rem",
        }}
      >
        Edit Site Content
      </h2>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
          paddingBottom: "0",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: "0.6rem 1.5rem",
              background: "none",
              border: "none",
              borderBottom:
                activeTab === t ? "2px solid #c9a84c" : "2px solid transparent",
              color: activeTab === t ? "#c9a84c" : "rgba(253,248,240,0.4)",
              fontFamily: "Jost,sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "capitalize",
              cursor: "pointer",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "hero" && content.hero && (
        <Section title="Hero Section">
          {["heading", "subheading", "tagline"].map((k) => (
            <div key={k}>
              <label style={labelStyle}>{k}</label>
              <input
                value={content.hero[k] || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, [k]: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
          ))}
          <button
            style={btnGold}
            onClick={() => save("hero", content.hero)}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Hero"}
          </button>
        </Section>
      )}

      {activeTab === "about" && content.about && (
        <Section title="About Section">
          {["title", "body", "vision"].map((k) => (
            <div key={k}>
              <label style={labelStyle}>{k}</label>
              {k === "body" || k === "vision" ? (
                <textarea
                  value={content.about[k] || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, [k]: e.target.value },
                    })
                  }
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              ) : (
                <input
                  value={content.about[k] || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      about: { ...content.about, [k]: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              )}
            </div>
          ))}
          <button
            style={btnGold}
            onClick={() => save("about", content.about)}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save About"}
          </button>
        </Section>
      )}

      {activeTab === "founder" && content.founder && (
        <Section title="Founder Section">
          {["name", "title", "bio", "quote", "imageUrl"].map((k) => (
            <div key={k}>
              <label style={labelStyle}>{k}</label>
              {k === "bio" || k === "quote" ? (
                <textarea
                  value={content.founder[k] || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      founder: { ...content.founder, [k]: e.target.value },
                    })
                  }
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              ) : (
                <input
                  value={content.founder[k] || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      founder: { ...content.founder, [k]: e.target.value },
                    })
                  }
                  style={inputStyle}
                />
              )}
            </div>
          ))}
          <button
            style={btnGold}
            onClick={() => save("founder", content.founder)}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Founder"}
          </button>
        </Section>
      )}

      {activeTab === "contact" && content.contact && (
        <Section title="Contact Information">
          {["address", "phone", "email", "hours"].map((k) => (
            <div key={k}>
              <label style={labelStyle}>{k}</label>
              <input
                value={content.contact[k] || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, [k]: e.target.value },
                  })
                }
                style={inputStyle}
              />
            </div>
          ))}
          <button
            style={btnGold}
            onClick={() => save("contact", content.contact)}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Contact"}
          </button>
        </Section>
      )}
    </div>
  );
}

const labelStyle = {
  fontFamily: "Jost,sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "#c9a84c",
  display: "block",
  marginBottom: "0.4rem",
};
const Section = ({ title, children }) => (
  <div
    style={{
      border: "1px solid rgba(201,168,76,0.12)",
      padding: "2rem",
      marginBottom: "2rem",
    }}
  >
    <h3
      style={{
        fontFamily: "Cormorant Garamond,serif",
        fontSize: "1.3rem",
        color: "#e8c97a",
        marginBottom: "1.5rem",
      }}
    >
      {title}
    </h3>
    {children}
  </div>
);

// ─── Gallery Manager ─────────────────────────────────────
// function GalleryManager() {
//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({ title: '', description: '', category: 'food', imageUrl: '', order: 0 });
//   const [editing, setEditing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetch = () => { API.get('/gallery').then(r => setItems(r.data)).finally(() => setLoading(false)); };
//   useEffect(() => { fetch(); }, []);

//   const handleSubmit = async () => {
//     if (!form.title || !form.imageUrl) return toast.error('Title and image URL required');
//     try {
//       if (editing) { await API.put(`/gallery/${editing}`, form); toast.success('Updated!'); setEditing(null); }
//       else { await API.post('/gallery', form); toast.success('Added!'); }
//       setForm({ title: '', description: '', category: 'food', imageUrl: '', order: 0 });
//       fetch();
//     } catch { toast.error('Failed'); }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete?')) return;
//     await API.delete(`/gallery/${id}`);
//     toast.success('Deleted');
//     fetch();
//   };

//   const imgSrc = (url) => url?.startsWith('/uploads') ? `${BASE_URL}${url}` : url;

//   return (
//     <div style={{ padding: '2.5rem' }}>
//       <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '2rem', fontWeight: 300, color: '#fdf8f0', marginBottom: '2rem' }}>Gallery Manager</h2>

//       <div style={{ border: '1px solid rgba(201,168,76,0.15)', padding: '2rem', marginBottom: '2.5rem' }}>
//         <h3 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1.3rem', color: '#e8c97a', marginBottom: '1.5rem' }}>{editing ? 'Edit Item' : 'Add New Photo'}</h3>
//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
//           <div><label style={labelStyle}>Title *</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} /></div>
//           <div><label style={labelStyle}>Category</label>
//             <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={{ ...inputStyle, cursor: 'pointer' }}>
//               {['food','drinks','ambience','events'].map(c => <option key={c} value={c} style={{ background: '#1a0e04' }}>{c}</option>)}
//             </select>
//           </div>
//         </div>
//         <div><label style={labelStyle}>Image URL *</label><input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://... or /uploads/filename" style={inputStyle} /></div>
//         <div><label style={labelStyle}>Description</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={inputStyle} /></div>
//         <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//           <button style={btnGold} onClick={handleSubmit}>{editing ? 'Update' : 'Add Photo'}</button>
//           {editing && <button style={btnOutline} onClick={() => { setEditing(null); setForm({ title:'',description:'',category:'food',imageUrl:'',order:0 }); }}>Cancel</button>}
//         </div>
//       </div>

//       {loading ? <p style={{ color: '#c9a84c', fontFamily: 'Cormorant Garamond,serif', fontSize: '1.3rem' }}>Loading…</p> : (
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
//           {items.map(item => (
//             <div key={item._id} style={{ border: '1px solid rgba(201,168,76,0.12)', overflow: 'hidden' }}>
//               <img src={imgSrc(item.imageUrl)} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} onError={e => e.target.src = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'} />
//               <div style={{ padding: '1rem' }}>
//                 <p style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '1rem', color: '#fdf8f0', marginBottom: '0.25rem' }}>{item.title}</p>
//                 <p style={{ fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a84c', marginBottom: '0.75rem' }}>{item.category}</p>
//                 <div style={{ display: 'flex', gap: '0.5rem' }}>
//                   <button style={{ ...btnOutline, padding: '0.4rem 0.75rem', fontSize: '0.65rem' }} onClick={() => { setEditing(item._id); setForm({ title: item.title, description: item.description || '', category: item.category, imageUrl: item.imageUrl, order: item.order || 0 }); }}>Edit</button>
//                   <button style={{ padding: '0.4rem 0.75rem', background: 'transparent', border: '1px solid rgba(255,100,100,0.3)', color: 'rgba(255,120,120,0.8)', fontFamily: 'Jost,sans-serif', fontSize: '0.65rem', cursor: 'pointer' }} onClick={() => handleDelete(item._id)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
function GalleryManager() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "food",
    order: 0,
  });
  const [file, setFile] = useState(null); // New state for the file object
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    API.get("/gallery")
      .then((r) => setItems(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = async () => {
    // Check for title and EITHER a new file OR an existing imageUrl (if editing)
    if (!form.title || (!file && !editing))
      return toast.error("Title and image are required");

    try {
      // Use FormData for multipart/form-data (file upload)
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);
      data.append("order", form.order);

      if (file) {
        data.append("image", file); // 'image' must match upload.single('image') in backend
      }

      if (editing) {
        await API.put(`/gallery/${editing}`, data);
        toast.success("Updated!");
        setEditing(null);
      } else {
        await API.post("/gallery", data);
        toast.success("Added!");
      }

      // Reset form and file
      setForm({ title: "", description: "", category: "food", order: 0 });
      setFile(null);
      fetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`/gallery/${id}`);
    toast.success("Deleted");
    fetch();
  };

  const imgSrc = (url) =>
    url?.startsWith("/uploads") ? `${BASE_URL}${url}` : url;

  return (
    <div style={{ padding: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#fdf8f0",
          marginBottom: "2rem",
        }}
      >
        Gallery Manager
      </h2>

      <div
        style={{
          border: "1px solid rgba(201,168,76,0.15)",
          padding: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "Cormorant Garamond,serif",
            fontSize: "1.3rem",
            color: "#e8c97a",
            marginBottom: "1.5rem",
          }}
        >
          {editing ? "Edit Item" : "Add New Photo"}
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 1rem",
          }}
        >
          <div>
            <label style={labelStyle}>Title *</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {["food", "drinks", "ambience", "events"].map((c) => (
                <option key={c} value={c} style={{ background: "#1a0e04" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- DEVICE GALLERY UPLOAD SECTION --- */}
        <div>
          <label style={labelStyle}>Select Image from Device *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ ...inputStyle, padding: "0.5rem" }}
          />
          {file && (
            <p style={{ fontSize: "0.7rem", color: "#c9a84c" }}>
              Selected: {file.name}
            </p>
          )}
        </div>
        {/* ------------------------------------- */}

        <div>
          <label style={labelStyle}>Description</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button style={btnGold} onClick={handleSubmit}>
            {editing ? "Update" : "Add Photo"}
          </button>
          {editing && (
            <button
              style={btnOutline}
              onClick={() => {
                setEditing(null);
                setForm({
                  title: "",
                  description: "",
                  category: "food",
                  order: 0,
                });
                setFile(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Grid rendering logic remains the same... */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid rgba(201,168,76,0.12)",
                overflow: "hidden",
              }}
            >
              <img
                src={imgSrc(item.imageUrl)}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{ padding: "1rem" }}>
                <p style={{ color: "#fdf8f0" }}>{item.title}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    style={btnOutline}
                    onClick={() => {
                      setEditing(item._id);
                      setForm({
                        title: item.title,
                        description: item.description || "",
                        category: item.category,
                        order: item.order || 0,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Enquiries ──────────────────────────────────────────
function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetch = () => {
    API.get("/enquiries")
      .then((r) => setEnquiries(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/enquiries/${id}/status`, { status });
    fetch();
  };
  const deleteEnq = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`/enquiries/${id}`);
    setSelected(null);
    fetch();
  };

  const statusColor = {
    new: "#c9a84c",
    read: "rgba(253,248,240,0.5)",
    responded: "#5cb85c",
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#fdf8f0",
          marginBottom: "2rem",
        }}
      >
        Enquiries
      </h2>
      {loading ? (
        <p
          style={{
            color: "#c9a84c",
            fontFamily: "Cormorant Garamond,serif",
            fontSize: "1.3rem",
          }}
        >
          Loading…
        </p>
      ) : enquiries.length === 0 ? (
        <p
          style={{
            color: "rgba(253,248,240,0.4)",
            fontFamily: "Jost,sans-serif",
          }}
        >
          No enquiries yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            {enquiries.map((e) => (
              <div
                key={e._id}
                onClick={() => {
                  setSelected(e);
                  updateStatus(e._id, e.status === "new" ? "read" : e.status);
                }}
                style={{
                  ...card,
                  cursor: "pointer",
                  borderColor:
                    selected?._id === e._id
                      ? "rgba(201,168,76,0.4)"
                      : "rgba(201,168,76,0.12)",
                  background:
                    selected?._id === e._id
                      ? "rgba(201,168,76,0.06)"
                      : "rgba(201,168,76,0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond,serif",
                      fontSize: "1.1rem",
                      color: "#fdf8f0",
                    }}
                  >
                    {e.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "Jost,sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: statusColor[e.status],
                    }}
                  >
                    {e.status}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(253,248,240,0.5)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {e.subject}
                </p>
                <p
                  style={{
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.7rem",
                    color: "rgba(253,248,240,0.3)",
                  }}
                >
                  {new Date(e.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          {selected && (
            <div
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                padding: "2rem",
                background: "rgba(201,168,76,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond,serif",
                    fontSize: "1.4rem",
                    color: "#fdf8f0",
                  }}
                >
                  {selected.name}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(253,248,240,0.4)",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>
              {[
                ["Email", selected.email],
                ["Phone", selected.phone || "—"],
                ["Subject", selected.subject],
                ["Date", new Date(selected.createdAt).toLocaleString()],
              ].map(([l, v]) => (
                <div key={l} style={{ marginBottom: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "Jost,sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#c9a84c",
                    }}
                  >
                    {l}:{" "}
                  </span>
                  <span
                    style={{
                      fontFamily: "Jost,sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(253,248,240,0.7)",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
              <div
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "rgba(0,0,0,0.2)",
                  borderLeft: "2px solid rgba(201,168,76,0.3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(253,248,240,0.7)",
                    lineHeight: 1.7,
                  }}
                >
                  {selected.message}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginTop: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={btnGold}
                  onClick={() => updateStatus(selected._id, "responded")}
                >
                  Mark Responded
                </button>
                <button
                  style={btnOutline}
                  onClick={() => updateStatus(selected._id, "new")}
                >
                  Mark New
                </button>
                <button
                  style={{
                    ...btnOutline,
                    borderColor: "rgba(255,100,100,0.3)",
                    color: "rgba(255,120,120,0.8)",
                  }}
                  onClick={() => deleteEnq(selected._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Reviews Manager ────────────────────────────────────
function ReviewsManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyId, setReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetch = () => {
    API.get("/reviews/all")
      .then((r) => setReviews(r.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetch();
  }, []);

  const toggleApprove = async (id) => {
    await API.put(`/reviews/${id}/approve`);
    fetch();
  };
  const deleteRev = async (id) => {
    if (!window.confirm("Delete?")) return;
    await API.delete(`/reviews/${id}`);
    fetch();
  };
  const sendReply = async (id) => {
    if (!replyText.trim()) return;
    await API.post(`/reviews/${id}/reply`, { reply: replyText });
    toast.success("Reply sent!");
    setReplyId(null);
    setReplyText("");
    fetch();
  };

  return (
    <div style={{ padding: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "Cormorant Garamond,serif",
          fontSize: "2rem",
          fontWeight: 300,
          color: "#fdf8f0",
          marginBottom: "2rem",
        }}
      >
        Reviews Manager
      </h2>
      {loading ? (
        <p
          style={{
            color: "#c9a84c",
            fontFamily: "Cormorant Garamond,serif",
            fontSize: "1.3rem",
          }}
        >
          Loading…
        </p>
      ) : reviews.length === 0 ? (
        <p
          style={{
            color: "rgba(253,248,240,0.4)",
            fontFamily: "Jost,sans-serif",
          }}
        >
          No reviews yet.
        </p>
      ) : (
        reviews.map((r) => (
          <div
            key={r._id}
            style={{
              ...card,
              borderColor: r.approved
                ? "rgba(201,168,76,0.12)"
                : "rgba(255,100,100,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "0.75rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "Cormorant Garamond,serif",
                    fontSize: "1.1rem",
                    color: "#fdf8f0",
                    marginRight: "0.75rem",
                  }}
                >
                  {r.name}
                </span>
                <span style={{ color: "#c9a84c" }}>
                  {"★".repeat(r.rating)}
                  {"☆".repeat(5 - r.rating)}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: r.approved ? "#5cb85c" : "rgba(255,120,120,0.7)",
                    border: `1px solid ${r.approved ? "rgba(92,184,92,0.3)" : "rgba(255,100,100,0.3)"}`,
                    padding: "0.2rem 0.6rem",
                  }}
                >
                  {r.approved ? "Visible" : "Hidden"}
                </span>
                <button
                  style={{
                    ...btnOutline,
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.65rem",
                  }}
                  onClick={() => toggleApprove(r._id)}
                >
                  {r.approved ? "Hide" : "Show"}
                </button>
                <button
                  style={{
                    ...btnGold,
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.65rem",
                  }}
                  onClick={() => {
                    setReplyId(replyId === r._id ? null : r._id);
                    setReplyText(r.adminReply || "");
                  }}
                >
                  Reply
                </button>
                <button
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: "transparent",
                    border: "1px solid rgba(255,100,100,0.3)",
                    color: "rgba(255,120,120,0.8)",
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.65rem",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteRev(r._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <p
              style={{
                fontFamily: "Jost,sans-serif",
                fontSize: "0.85rem",
                color: "rgba(253,248,240,0.6)",
                lineHeight: 1.6,
                marginBottom: "0.5rem",
              }}
            >
              {r.comment}
            </p>
            <p
              style={{
                fontFamily: "Jost,sans-serif",
                fontSize: "0.7rem",
                color: "rgba(253,248,240,0.3)",
              }}
            >
              {r.email} · {new Date(r.createdAt).toLocaleDateString()}
            </p>
            {r.adminReply && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  borderLeft: "2px solid #c9a84c",
                  background: "rgba(201,168,76,0.05)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Jost,sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.2em",
                    color: "#c9a84c",
                    marginBottom: "0.4rem",
                  }}
                >
                  YOUR REPLY
                </p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond,serif",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    color: "rgba(253,248,240,0.6)",
                  }}
                >
                  {r.adminReply}
                </p>
              </div>
            )}
            {replyId === r._id && (
              <div style={{ marginTop: "1rem" }}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={3}
                  placeholder="Write your reply…"
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    marginBottom: "0.75rem",
                  }}
                />
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button style={btnGold} onClick={() => sendReply(r._id)}>
                    Send Reply
                  </button>
                  <button style={btnOutline} onClick={() => setReplyId(null)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────
export default function AdminDashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div
      className="admin-layout"
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        fontFamily: "Jost,sans-serif",
        position: "relative",
      }}
    >
      <Sidebar admin={admin} onLogout={handleLogout} />
      <div style={{ flex: 1, background: "#0e0600", minHeight: isMobile ? "auto" : "100vh", overflow: "auto" }}>
        <Routes>
          <Route index element={<Overview />} />
          <Route path="content" element={<ContentEditor />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="reviews" element={<ReviewsManager />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </div>
  );
}
