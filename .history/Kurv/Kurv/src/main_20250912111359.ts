import type { model } from "./model";
import { updateViewProductDetailPage } from "./Views/productDetailViewt";
function updateView() {
  if (model.app.currentPage === "products") {
    updateViewProductsPage();
  } else if (model.app.currentPage === "product-detail") {
    updateViewProductDetailPage();
  } else if (model.app.currentPage === "cart") {
    updateViewCartPage();
  }
}
updateView();
