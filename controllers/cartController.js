const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const mongoose = require("mongoose");

// Function to calculate the total price
const calculateTotalPrice = async (products) => {
  let total = 0;
  for (let item of products) {
    const product = await Product.findById(item.productID);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};

// Add product to cart function
const addProduct = async (req, res) => {
  const { productId } = req.params;
  const quantity = 1;
  const clientId = req.params.clientId;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let cart = await Cart.findOne({ clientID: clientId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({
        clientID: clientId,
        products: [{ productID: productId, quantity }],
        totalPrice: product.price * quantity,
      });
    } else {
      // If the cart exists, update the products
      const productIndex = cart.products.findIndex(
        (p) => p.productID === productId
      );

      if (productIndex > -1) {
        // Product exists in the cart, update its quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // Product does not exist in the cart, add it
        cart.products.push({ productID: productId, quantity });
      }

      // Recalculate the total price
      cart.totalPrice = await calculateTotalPrice(cart.products);
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cart for a specific client
const getCart = async (req, res) => {
  const { clientId } = req.params;

  try {
    const cart = await Cart.findOne({ clientID: clientId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// clear the cart
const clearCart = async (req, res) => {
  const { clientId } = req.params; // Getting clientId from the request params

  try {
    // Find the cart for the client
    let cart = await Cart.findOne({ clientID: clientId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear the cart by setting products to an empty array and total price to 0
    cart.products = [];
    cart.totalPrice = 0;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res
      .status(500)
      .json({ message: "An error occurred while clearing the cart" });
  }
};

module.exports = { addProduct, getCart, clearCart };
