/* ===========================================
   旅游线路页入口：线路 + 评论 + 预订
   =========================================== */
import { initRoutes } from "./routes.js";
import { initComments, updateCommentLoginUI } from "./comments.js";
import { initBooking } from "./booking.js";

function initTravelPage() {
  initRoutes();
  initComments();
  initBooking();
  updateCommentLoginUI();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTravelPage);
} else {
  initTravelPage();
}
