import axios from 'axios';
// import Component from 'vue-class-component';
// import { Vue, Inject } from 'vue-property-decorator';
// import AccountService from '@/account/account.service';
@Component({
  watch: {
    $route() {
      this.$root.$emit('bv::hide::modal', 'login-page');
    }
  }
})
export default function LoginForm() {
  // @Inject('accountService')
  // private accountService: () => AccountService;
  let authenticationError = null;
  let login = null;
  const password = null;
  const rememberMe = null;

   function doLogin() {
    const data = { username: this.login, password: this.password, rememberMe: this.rememberMe };
    axios
      .post('api/authenticate', data)
      .then(result => {
        const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (this.rememberMe) {
            localStorage.setItem('jhi-authenticationToken', jwt);
          } else {
            sessionStorage.setItem('jhi-authenticationToken', jwt);
          }
        }
        this.authenticationError = false;
        // ----to do -----
        // this.$root.$emit('bv::hide::modal', 'login-page');
        this.accountService().retrieveAccount();
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }
}
