<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="publishableKey"
      @token="tokenCreated"
    />
    <button @click="submit">Generate token</button>
  </div>
</template>

<script>
import { StripeElementCard } from "@vue-stripe/vue-stripe";
export default {
  components: {
    StripeElementCard,
  },
  data() {
    this.publishableKey =
      "pk_test_51KatZzCYRyLJqK9cU8CpFl7ok24I253kBHikDszTAIcHfySHM1JCr5RDNyqqPCjCnyWdMWuYQkBDLKIR52fyYnD500DBgo71Lv";
    return {
      token: null,
    };
  },
  methods: {
    submit() {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    tokenCreated(token) {
      console.log(token);
      // handle the token
      // send it to your server
    },
  },
};
</script>

<style scoped></style>
