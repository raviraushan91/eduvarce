// 🔍 Filter/Search Function
document.getElementById("course-search").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const courseCards = document.querySelectorAll(".course-card");
  
    courseCards.forEach(card => {
      const title = card.getAttribute("data-title").toLowerCase();
      card.style.display = title.includes(searchValue) ? "block" : "none";
    });
  });
  
  // 📦 Modal Logic
  const modal = document.getElementById("course-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-description");
  const closeBtn = document.querySelector(".close-modal");
  
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const card = this.closest(".course-card");
      const title = card.getAttribute("data-title");
      const desc = card.getAttribute("data-description");
  
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.style.display = "block";
    });
  });
  
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
  