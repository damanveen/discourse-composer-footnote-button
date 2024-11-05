import { withPluginApi } from 'discourse/lib/plugin-api';
import { ajax } from 'discourse/lib/ajax';

export default {
  name: 'anonymous-mode-button',
  initialize() {
    withPluginApi('0.1', (api) => {
      const currentUser = api.getCurrentUser();
      if (currentUser && currentUser.can_toggle_anonymous) {
        api.addComposerButton(
          'user-secret', // Font Awesome icon
          (composerModel, composerView) => {
            ajax('/u/toggle-anonymous', {
              method: 'POST',
            })
              .then(() => {
                window.location.reload();
              })
              .catch(() => {
                // Handle errors if needed
              });
          },
          {
            title: I18n.t('composer.toggle_anonymous_mode'),
          }
        );
      }
    });
  },
};
