<script>
import { eventBusService } from "../services/event-bus.service.js";
export default {
  data() {
    return {
      msg: null,
    };
  },
  created() {
    this.removeEvent = eventBusService.on("show-user-msg", (msg) => {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3500);
    });
  },
  unmounted() {
    this.removeEvent();
  },
};
</script>

<template>
  <section v-if="msg" :class="`user-msg ${msg.type}`">
    {{ msg.txt }}
  </section>
</template>
    
<style lang="scss">
.user-msg {
  position: fixed;
  z-index: 20;
  top: -10px;
  left: 50%;
  translate: -50%;
  color: var(--clr-white);
  transition: 0.4s;
  padding-inline: 20px;
  padding-block: 8px;
  border-radius: 0.3em;

  &.success {
    top: 10px;
    background-color: var(--clr-highlight);
  }

  &.error {
    top: 10px;
    background-color: var(--clr-main-red);
  }
}
</style>>
