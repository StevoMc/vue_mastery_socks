<template>
  <div>
    <form class="review-form" @submit.prevent="submit()">
      <p v-if="errors.length">
        <b>Please fill in all fields</b>
        <ul>
          <li v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
      </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" />
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating" >
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  </div>
</template>

<script lang="ts">
import App from "../App.vue";

export default {
  name: "ProductReview",
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
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    submit() {
      if (this.name && this.review && this.rating) {
        const productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.$emit("review-submitted", productReview);
        this.name: String = null;
        this.review: String = null;
        this.rating: Number = null;
        this.errors: String= [];
      } else {
        if (!this.name) this.errors.push("Name is required");
        if (!this.review) this.errors.push("Review is required");
        if (!this.rating) this.errors.push("Rating is required");
      }
    },
  },
};
</script>