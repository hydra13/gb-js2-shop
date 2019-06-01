let add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
  let index = cart.contents.findIndex(el => el.id_product === +req.params.id);
  if (index !== -1) {
    cart.contents[index].quantity += req.body.quantity;
    if (cart.contents[index].quantity < 1) {
      cart.contents.splice(index, 1);
    }
  }
  return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
  let index = cart.contents.findIndex(el => el.id_product === +req.params.id);
  if (index !== -1) {
    cart.contents.splice(index, 1);
  }
  return JSON.stringify(cart, null, 4);
}
module.exports = {
  add,
  change,
  remove
};