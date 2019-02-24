import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import { getInforMe } from '@/services/user';
import Redirect from 'umi/redirect';

const axios = require('axios');
const pusherJs = require('pusher-js');

let Authority = getAuthority();
if (Authority) {
  getInforMe(Authority).then(data=> {
    console.log(data);
    const pusher = new pusherJs('bbe0eadeb38f6154df71', { cluster: 'ap1', forceTLS: true});
    pusher.connection.bind('connected', () => {
      axios.defaults.headers.common['X-Socket-Id'] = pusher.connection.socket_id;
      console.log('socketID: ', pusher.connection.socket_id);
    });
    Notification.requestPermission();
    console.log(data);
    if (data && data.username)
      pusher.subscribe(data.username)
        .bind('post_updated', (post)=>{
          console.log(post);
          const notification = new Notification(post.title,
            {
              icon: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png',
              body: post.body,
            });
          notification.onclick = (event) => {
            window.location.href = '/warehouse/approver/detail/' + post.purchaseOrderId;
            event.preventDefault();
            notification.close();
          };
        });
  });
}
export default ({ children }) => {
  let Authorized = RenderAuthorized(Authority?"user":"");
  console.log(children.props.route);
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
      {children}
    </Authorized>
  )
};
