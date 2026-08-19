const products = [
  {name:"Traditional Potey Set", category:"Potey", price:"Rs. 799", icon:"📿", badge:"Bestseller"},
  {name:"Wedding Chura Set", category:"Chura", price:"Rs. 1,299", icon:"💍", badge:"New"},
  {name:"Golden Bangles (Set)", category:"Bangles", price:"Rs. 599", icon:"⭕", badge:"Classic"},
  {name:"Pearl Flower Hair Pin", category:"Hair Pins", price:"Rs. 249", icon:"🌸", badge:"New"},
  {name:"Satin Scrunchies (Set)", category:"Hair Accessories", price:"Rs. 199", icon:"🎀", badge:""},
  {name:"Cute Hair Clips", category:"Hair Accessories", price:"Rs. 149", icon:"🌷", badge:""},
  {name:"Green & Red Potey", category:"Potey", price:"Rs. 699", icon:"📿", badge:""},
  {name:"Bridal Chura Collection", category:"Chura", price:"Rs. 1,499", icon:"💖", badge:"New"}
];

let currentFilter = "All";
const WHATSAPP_NUMBER = "9779841396542"; // Replace with your mom's WhatsApp number, digits only.

function renderProducts(){
  const search = document.getElementById("search").value.toLowerCase().trim();
  const list = products.filter(p =>
    (currentFilter === "All" || p.category === currentFilter) &&
    (!search || `${p.name} ${p.category}`.toLowerCase().includes(search))
  );
  document.getElementById("products").innerHTML = list.map(p => `
    <article class="product">
      <div class="product-image">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <span aria-hidden="true">${p.icon}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <button class="order-btn" onclick="orderProduct('${p.name.replace(/'/g,"\\'")}','${p.price}')">◉ Order on WhatsApp</button>
      </div>
    </article>
  `).join("") || `<p>No products found. Try another search.</p>`;
}

function filterProducts(category){
  currentFilter = category;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b.dataset.filter === category));
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
  renderProducts();
}

function orderProduct(name, price){
  if(WHATSAPP_NUMBER.includes("X")){
    showMessage("Replace the WhatsApp number in script.js first.");
    return;
  }
  const text = `Hello Potey House! I'd like to order: ${name} (${price}). Please tell me about availability and delivery.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,"_blank");
}

function focusSearch(){
  document.getElementById("search").focus();
  document.getElementById("shop").scrollIntoView({behavior:"smooth"});
}

function toggleMenu(){
  document.querySelector(".nav").classList.toggle("open");
}

function showMessage(message){
  const toast=document.getElementById("toast");
  toast.textContent=message; toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2600);
}

document.getElementById("whatsappMain").addEventListener("click", e=>{
  if(WHATSAPP_NUMBER.includes("X")){
    e.preventDefault();
    showMessage("Replace the WhatsApp number in script.js first.");
  }
});

renderProducts();
