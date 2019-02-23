import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

export default ({ children }) => {
  let Authority = getAuthority();
  let Authorized = RenderAuthorized(Authority?"admin":"");
  return (
    <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/user/login" />}>
      {children}
    </Authorized>
  )
};
