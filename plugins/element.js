import Vue from 'vue';
import ElementUI from 'element-ui';
  import {Message,MessageBox} from 'element-ui';
Vue.use(ElementUI);
// Vue.use(Message);
// Vue.use(MessageBox);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
