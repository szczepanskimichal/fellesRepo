import { model } from "./model";
import { updateViewProductDetailPage } from "../src/Views/productDetailView";
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
