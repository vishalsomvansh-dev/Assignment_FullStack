const list = document.querySelector("#products");
const message = document.querySelector("#message");
async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  list.innerHTML = products.map(p => `<article class="card"><h3>${escapeHtml(p.name)}</h3><p>Price: ₹${p.price}</p><p>Rating: ${p.rating}/5</p><small>ID: ${p.id}</small></article>`).join("");
}
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
document.querySelector("#form").onsubmit = async e => {
  e.preventDefault();
  const body = { name: document.querySelector("#name").value, price: document.querySelector("#price").value, rating: document.querySelector("#rating").value };
  const response = await fetch("/api/products", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body) });
  const result = await response.json();
  message.textContent = response.ok ? "Product added!" : result.message;
  if (response.ok) { e.target.reset(); loadProducts(); }
};
loadProducts();