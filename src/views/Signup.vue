
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      msg: "",
      isSignup: false,
      email: "",
    };
  },
  methods: {
    onSignup() {
      const creds = {
        username: this.username,
        password: this.password,
        email: this.email,
      };
      this.$store.dispatch({ type: "signup", creds });
    },
    onLogin() {
      if (!this.username || !this.password) {
        this.msg = "Invalid Username/Password"
        return
      }
      const creds = {
        username: this.username,
        password: this.password,
      };
      this.$store.dispatch({ type: "login", creds });
      this.username = "";
      this.password = "";
    },
    goSignup() {
      this.isSignup = !this.isSignup;
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.user;
    },
  },
  updated() {
  },
};
</script>

<template>
  <section class="signup main-layout">
    <form v-if="!isSignup">
      <span>LOGIN</span>
      <h2>Welcome to Rapid Games please login to enjoy our Services.</h2>
      <div>
        <label for="username"> Username: </label>
        <input v-model="username" id="username" type="text" />
      </div>
      <div>
        <label for="username"> Password: </label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div class="msg" v-if="msg">{{msg}}</div>
      <button @click.prevent="onLogin">Login</button>
      <span @click="goSignup" class="change-form">Not A Member? SIGNUP !</span>
    </form>
    <form v-else>
      <span>SIGNUP</span>
      <div>
        <label for="username"> Username: </label>
        <input v-model="username" id="username" type="text" />
      </div>
      <div>
        <label for="username"> Password: </label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div>
        <label for="email"> Email: </label>
        <input v-model="email" type="email" id="email" />
      </div>
      <button @click.prevent="onSignup">Submit</button>
      <span @click="goSignup" class="change-form"
        >Already A Member? LOGIN !</span
      >
    </form>
  </section>
</template>
    
<style lang="scss">
.signup {
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-align: center;
    max-width: 400px;
    font-size: 25px;
    font-family: monts-thin;
    margin-bottom: 35px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;

    .msg {
      font-size: 13px;
      color: var(--clr-main-red);
    }

    .change-form {
      font-size: 13px;
      color: var(--clr-white);
      border-bottom: 1px solid var(--clr-gray);
      padding-bottom: 3px;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        color: var(--clr-main-red);
      }
    }

    span {
      color: var(--clr-main-red);
      margin-bottom: 20px;
    }

    label {
      display: flex;
      justify-content: flex-end;
    }

    div {
      display: flex;
      align-items: center;
      gap: 15px;
      label {
        display: flex;
        min-width: 100px;
      }

      input {
        padding: 5px;
        background-color: var(--clr-gray);
        color: var(--clr-white);
        border-radius: 0.3em;
        transition: 0.3s;

        &:focus {
          box-shadow: 0px 0px 3px 0px var(--clr-main-red);
        }
      }
    }

    button {
      transition: 0.3s;
      margin-top: 20px;
      &:hover {
        background-color: var(--clr-main-red);
        color: var(--clr-white);
      }
    }
  }
}
</style>