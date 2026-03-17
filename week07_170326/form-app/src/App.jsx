import { useState } from "react";

const MENU = [
  { id: 1, name: "Margherita Pizza", price: 299, emoji: "🍕" },
  { id: 2, name: "Veg Burger", price: 149, emoji: "🍔" },
  { id: 3, name: "Pasta Arrabbiata", price: 249, emoji: "🍝" },
  { id: 4, name: "Garlic Bread", price: 99, emoji: "🥖" },
];

export default function App() {
  const [cart, setCart] = useState({});
  const [tab, setTab] = useState("menu");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});
  const [ordered, setOrdered] = useState(false);

  const add = (id) => setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const remove = (id) => setCart((p) => {
    const n = { ...p };
    if (n[id] > 1) n[id]--; else delete n[id];
    return n;
  });

  const cartItems = MENU.filter((m) => cart[m.id]);
  const total = cartItems.reduce((s, m) => s + m.price * cart[m.id], 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit number";
    if (!form.address.trim()) e.address = "Required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setOrdered(true);
  };

  // ── Styles ──
  const page = { minHeight: "100vh", background: "#fffbf0", fontFamily: "Segoe UI, sans-serif", paddingBottom: 40 };
  const hero = { background: "linear-gradient(135deg,#ff6b6b,#ffa726)", padding: "32px", textAlign: "center" };
  const card = { background: "#fff", border: "2px solid #ffe0b2", borderRadius: 16, padding: "20px 24px", maxWidth: 680, margin: "20px auto" };
  const row = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px dashed #ffe0b2" };
  const btn = (bg) => ({ background: bg, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 800, cursor: "pointer", fontSize: 14 });
  const qBtn = { background: "#ffe0b2", border: "none", borderRadius: 8, width: 28, height: 28, fontWeight: 900, cursor: "pointer", color: "#ff6b6b", fontSize: 16 };
  const inp = (err) => ({ width: "100%", background: "#fff9f0", border: `2px solid ${err ? "#f87171" : "#ffe0b2"}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "inherit", boxSizing: "border-box", outline: "none", marginBottom: 4 });
  const tabBtn = (t) => ({ ...btn(tab === t ? "#ff6b6b" : "#fff"), color: tab === t ? "#fff" : "#ff6b6b", border: "2px solid #ff6b6b", flex: 1 });

  return (
    <div style={page}>

      {/* HERO */}
      <div style={hero}>
        <h1 style={{ color: "#fff", margin: 0, fontSize: 36, fontWeight: 900 }}>🍕 SliceDash</h1>
        <p style={{ color: "#fff", margin: "6px 0 0" }}>Hot & fresh, delivered fast 😄</p>
        {totalItems > 0 && <span style={{ background: "#fff", color: "#ff6b6b", borderRadius: 999, padding: "4px 14px", fontWeight: 800, fontSize: 13, marginTop: 10, display: "inline-block" }}>🛒 {totalItems} items · ₹{total}</span>}
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: 8, maxWidth: 680, margin: "20px auto 0", padding: "0 24px" }}>
        <button style={tabBtn("menu")} onClick={() => setTab("menu")}>🍽 Menu</button>
        <button style={tabBtn("cart")} onClick={() => setTab("cart")}>🛒 Cart {totalItems > 0 && `(${totalItems})`}</button>
        <button style={tabBtn("checkout")} onClick={() => setTab("checkout")}>📋 Checkout</button>
      </div>

      {/* MENU PAGE */}
      {tab === "menu" && (
        <div style={card}>
          <h2 style={{ color: "#ff6b6b", marginTop: 0 }}>Our Menu</h2>
          {MENU.map((item) => (
            <div key={item.id} style={row}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{item.emoji} {item.name}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#ff6b6b", fontWeight: 800 }}>₹{item.price}</span>
                {!cart[item.id] ? (
                  <button style={btn("#ff6b6b")} onClick={() => add(item.id)}>Add +</button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button style={qBtn} onClick={() => remove(item.id)}>−</button>
                    <span style={{ fontWeight: 800 }}>{cart[item.id]}</span>
                    <button style={qBtn} onClick={() => add(item.id)}>+</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {totalItems > 0 && <button style={{ ...btn("#ff6b6b"), width: "100%", marginTop: 16, padding: 14 }} onClick={() => setTab("cart")}>View Cart →</button>}
        </div>
      )}

      {/* CART PAGE */}
      {tab === "cart" && (
        <div style={card}>
          <h2 style={{ color: "#ff6b6b", marginTop: 0 }}>Your Cart 🛒</h2>
          {cartItems.length === 0 ? <p style={{ color: "#aaa", textAlign: "center" }}>Cart is empty! Go add items 🍕</p> : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} style={row}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700 }}>{item.emoji} {item.name}</p>
                    <p style={{ margin: 0, color: "#aaa", fontSize: 13 }}>₹{item.price} × {cart[item.id]}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button style={qBtn} onClick={() => remove(item.id)}>−</button>
                    <span style={{ fontWeight: 800 }}>{cart[item.id]}</span>
                    <button style={qBtn} onClick={() => add(item.id)}>+</button>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, fontWeight: 900 }}>
                <span>Total</span><span style={{ color: "#ff6b6b", fontSize: 22 }}>₹{total}</span>
              </div>
              <button style={{ ...btn("#ff6b6b"), width: "100%", marginTop: 12, padding: 14 }} onClick={() => setTab("checkout")}>Checkout →</button>
            </>
          )}
        </div>
      )}

      {/* CHECKOUT PAGE */}
      {tab === "checkout" && (
        <div style={card}>
          <h2 style={{ color: "#ff6b6b", marginTop: 0 }}>Checkout 📋</h2>
          {ordered ? (
            <div style={{ textAlign: "center", padding: 20 }}>
              <p style={{ fontSize: 48, margin: 0 }}>🎉</p>
              <h3 style={{ color: "#ff6b6b" }}>Order Placed!</h3>
              <p>Thanks <strong>{form.name}</strong>! Delivering to {form.address} in 30–45 mins 🛵</p>
              <button style={btn("#ff6b6b")} onClick={() => { setCart({}); setForm({ name: "", phone: "", address: "" }); setOrdered(false); setTab("menu"); }}>Order Again 🍕</button>
            </div>
          ) : cartItems.length === 0 ? (
            <p style={{ color: "#aaa", textAlign: "center" }}>Add items first! <button style={{ ...btn("#ff6b6b"), marginLeft: 8 }} onClick={() => setTab("menu")}>Go to Menu</button></p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ background: "#fff9f0", borderRadius: 10, padding: 12, marginBottom: 16, border: "2px dashed #ffe0b2" }}>
                {cartItems.map((i) => <p key={i.id} style={{ margin: "3px 0", fontSize: 13, color: "#555" }}>{i.emoji} {i.name} × {cart[i.id]} — ₹{i.price * cart[i.id]}</p>)}
                <p style={{ margin: "8px 0 0", fontWeight: 900, color: "#ff6b6b" }}>Total: ₹{total}</p>
              </div>
              <p style={{ margin: "0 0 4px", fontSize: 13, color: "#888", fontWeight: 600 }}>👤 Name</p>
              <input style={inp(errors.name)} name="name" value={form.name} onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setErrors((p) => ({ ...p, name: "" })); }} placeholder="Your name" />
              {errors.name && <p style={{ color: "#f87171", fontSize: 12, margin: "0 0 8px" }}>{errors.name}</p>}
              <p style={{ margin: "8px 0 4px", fontSize: 13, color: "#888", fontWeight: 600 }}>📱 Phone</p>
              <input style={inp(errors.phone)} name="phone" value={form.phone} onChange={(e) => { setForm((p) => ({ ...p, phone: e.target.value })); setErrors((p) => ({ ...p, phone: "" })); }} placeholder="10-digit number" maxLength={10} />
              {errors.phone && <p style={{ color: "#f87171", fontSize: 12, margin: "0 0 8px" }}>{errors.phone}</p>}
              <p style={{ margin: "8px 0 4px", fontSize: 13, color: "#888", fontWeight: 600 }}>📍 Address</p>
              <textarea style={{ ...inp(errors.address), height: 70, resize: "none" }} name="address" value={form.address} onChange={(e) => { setForm((p) => ({ ...p, address: e.target.value })); setErrors((p) => ({ ...p, address: "" })); }} placeholder="Delivery address" />
              {errors.address && <p style={{ color: "#f87171", fontSize: 12, margin: "0 0 8px" }}>{errors.address}</p>}
              <button type="submit" style={{ ...btn("#ff6b6b"), width: "100%", padding: 14, marginTop: 8, fontSize: 16 }}>🍕 Place Order · ₹{total}</button>
            </form>
          )}
        </div>
      )}

    </div>
  );
}