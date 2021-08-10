/* eslint-disable */
<template>
  <div>
    <div id="head">
      <h2>{{ shipping }}</h2>
      <div class="header">
        <button
          class="size"
          v-for="(size, index) in sizes"
          :key="size.id"
          @click="setSize(index)"
        >
          <p v-if="sizes[index].size === selected.size" style="color: #ff0000">
            {{ sizes[index].size }}
          </p>
          <p v-else>{{ sizes[index].size }}</p>
        </button>
        <div class="space_between"></div>
      </div>
    </div>
    <div class="cart">
      <h3 v-if="cart.items.length > 0">Cart: [{{ cart.items.length }}]</h3>
      <ul v-if="cart.items.length > 0" style="list-style-type: none">
        <li symbol="+" v-for="item in cart.items" :key="item.id">
          +{{ item.price }} €
        </li>
        <li v-if="!premium">+{{ shipping_cost }} €</li>
        <li v-else>+ free shipping</li>
      </ul>
      <h3 v-if="cart.items.length > 0">Total: {{ cart.total }}€</h3>
      <h3 v-else>Cart is empty</h3>
    </div>
    <div class="products">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product"
      >
        <div class="product-image">
          <a :href="products[index].image">
            <img :src="products[index].image" alt="Product Image" />
          </a>
        </div>
        <div class="product-info">
          <h3>{{ products[index].product }}</h3>
          <h1>{{ products[index].price }} €</h1>
          <div :inventory="products[index].inventory">
            <p style="color: green" v-if="products[index].inventory > 5">
              In Stock [{{ products[index].inventory }}]
            </p>
            <p
              style="color: orange"
              v-else-if="
                products[index].inventory <= 5 && products[index].inventory > 0
              "
            >
              Almost sold out! [{{ products[index].inventory }}]
            </p>
            <p style="text-decoration: line-through; color: red" v-else>
              Out of Stock [{{ products[index].inventory }}]
            </p>
          </div>
          <span v-if="products[index].onSale">On Sale!</span>
          <ul>
            <li v-for="detail in products[index].details" :key="detail.id">
              {{ detail }}
            </li>
          </ul>
          <button
            v-on:click="addToCart(index)"
            :disabled="products[index].inventory <= 0"
            :class="{ disabledButton: products[index].inventory <= 0 }"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <product-tabs></product-tabs>

      <h2>Product Review</h2>
      <p v-if="!reviews.length">There are no reviews available</p>
      <ul>
        <li v-for="review in reviews" :key="review.id">
          {{ review.name }} - Rating: {{ review.rating }} - Review:
          {{ review.review }}
        </li>
      </ul>
      <product-review @review-submitted="addReview"></product-review>
    </div>
  </div>
</template>

<script lang="ts">
import App from "../App.vue";
import blueSocks from "../assets/vmSocks-blue-onWhite.jpg";
import greenSocks from "../assets/vmSocks-green-onWhite.jpg";

export default {
  name: "Product",
  head() {
    return {
      title: "Title",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
      ],
    };
  },
  data() {
    return {
      cart: {
        total: 0,
        items: [],
      },
      reviews: [],
      shipping_cost: 3.99,
      selected: { size: "M", cost_factor: 1 },
      sizes: [
        { size: "XS", cost_factor: 0.9 },
        { size: "S", cost_factor: 0.95 },
        { size: "M", cost_factor: 1.0 },
        { size: "L", cost_factor: 1.05 },
        { size: "XL", cost_factor: 1.1 },
        { size: "XXL", cost_factor: 1.15 },
      ],
      products: [
        {
          product: "Navi Socks",
          price: 16.99,
          image: greenSocks,
          inventory: 23,
          onSale: false,
          details: ["Cotton: 100%", "Plyester: 20%", "Color: Navi"],
        },
        {
          product: "Red Socks",
          price: 11.99,
          image: blueSocks,
          inventory: 6,
          onSale: false,
          details: ["Cotton: 80%", "Plyester: 20%", "Color: Red"],
        },
        {
          product: "Black Socks",
          price: 13.99,
          image: greenSocks,
          inventory: 0,
          onSale: false,
          details: ["Cotton: 80%", "Plyester: 20%", "Color: Black"],
        },
        {
          product: "Blue Socks",
          price: 13.99,
          image: blueSocks,
          inventory: 1,
          onSale: false,
          details: ["Cotton: 80%", "Plyester: 20%", "Color: Blue"],
        },
        {
          product: "Green Socks",
          price: 9.99,
          image: greenSocks,
          inventory: 10,
          onSale: false,
          details: ["Cotton: 30%", "Plyester: 70%", "Color: Green"],
        },
      ],
    };
  },
  methods: {
    addToCart(productIndex: number) {
      const cost =
        Math.round(
          this.products[productIndex].price * this.selected.cost_factor * 100
        ) / 100;
      this.cart.items.push({
        size: this.selected.size,
        product: this.products[productIndex].product,
        price: cost,
      });
      if (this.cart.total <= 0 && !this.premium)
        this.cart.total += this.shipping_cost;
      this.cart.total = this.cart.total + cost;
      this.cart.total = Math.round(this.cart.total * 100) / 100;
      // console.log(`Added ${ this.products[productIndex].product } to cart`);
      // console.log(
      //   this.cart
      // );
      this.products[productIndex].inventory--;
    },
    setSize(index): void {
      this.selected = this.sizes[index];
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    shipping() {
      return this.premium
        ? "Premium Account: Shipping is free!"
        : `Normal Account: Shipping cost: ${this.shipping_cost} €`;
    },
  },
};
</script>
