/* ===========================================
   旅游线路页模块：预订模态框
   =========================================== */

let bookingRouteId = null;

export function initBooking() {
  const closeBtn = document.getElementById("modalCloseBtn");
  const cancelBtn = document.getElementById("modalCancelBtn");
  const submitBtn = document.getElementById("modalSubmitBtn");
  if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeBookingModal);
  if (submitBtn) submitBtn.addEventListener("click", submitBooking);

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".book-btn");
    if (!btn) return;
    const id = btn.getAttribute("data-id");
    const card = btn.closest(".route-card");
    const title = card ? card.querySelector("h3").textContent : "线路详情";
    openBookingModal(id, title);
  });
}

function openBookingModal(routeId, routeName) {
  bookingRouteId = routeId;
  document.getElementById("modalRouteName").textContent = routeName;
  const savedUser = localStorage.getItem("username");
  document.getElementById("modalName").value = savedUser || "";
  document.getElementById("modalPhone").value = "";
  document.getElementById("modalPeople").value = "1";
  document.getElementById("modalRemark").value = "";
  document.getElementById("modalError").textContent = "";
  document.getElementById("modalSubmitBtn").disabled = false;
  document.getElementById("modalSubmitBtn").textContent = "确认预订";
  document.getElementById("bookingModal").classList.add("active");
}

function closeBookingModal() {
  document.getElementById("bookingModal").classList.remove("active");
  bookingRouteId = null;
}

function submitBooking() {
  const name = document.getElementById("modalName").value.trim();
  const phone = document.getElementById("modalPhone").value.trim();
  const people = parseInt(document.getElementById("modalPeople").value, 10) || 1;
  const remark = document.getElementById("modalRemark").value.trim();
  const errEl = document.getElementById("modalError");
  const btn = document.getElementById("modalSubmitBtn");

  if (!name) {
    errEl.textContent = "请输入姓名";
    return;
  }
  if (!phone) {
    errEl.textContent = "请输入电话";
    return;
  }
  if (!/^1\d{10}$/.test(phone) && !/^\d{3,4}-?\d{7,8}$/.test(phone)) {
    errEl.textContent = "请输入有效的手机或固话号码";
    return;
  }

  errEl.textContent = "";
  btn.disabled = true;
  btn.textContent = "提交中...";

  fetch("/api/routes/" + bookingRouteId + "/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + (localStorage.getItem("token") || ""),
    },
    body: JSON.stringify({ name: name, phone: phone, people: people, remark: remark }),
  })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (data.ok) {
        alert(data.msg || "预订成功！");
        closeBookingModal();
      } else {
        errEl.textContent = data.msg || "预订失败";
        btn.disabled = false;
        btn.textContent = "确认预订";
      }
    })
    .catch(function () {
      errEl.textContent = "预订失败，请确认服务已启动";
      btn.disabled = false;
      btn.textContent = "确认预订";
    });
}
