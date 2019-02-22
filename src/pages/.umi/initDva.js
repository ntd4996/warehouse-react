import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'emails', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/emails.js').default) });
app.model({ namespace: 'foldersTeam', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/foldersTeam.js').default) });
app.model({ namespace: 'global', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/global.js').default) });
app.model({ namespace: 'login', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/login.js').default) });
app.model({ namespace: 'menu', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/menu.js').default) });
app.model({ namespace: 'menuTeams', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/menuTeams.js').default) });
app.model({ namespace: 'setting', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/Users/datnt/Downloads/warehouse-react/src/models/user.js').default) });
app.model({ namespace: 'register', ...(require('/Users/datnt/Downloads/warehouse-react/src/pages/User/models/register.js').default) });
app.model({ namespace: 'rule', ...(require('/Users/datnt/Downloads/warehouse-react/src/pages/SettingTeam/models/rule.js').default) });
