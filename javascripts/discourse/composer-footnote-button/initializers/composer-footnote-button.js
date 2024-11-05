import { withPluginApi } from 'discourse/lib/plugin-api';
import { ajax } from 'discourse/lib/ajax';

export default {
  name: 'anonymous-mode-button',
  initialize() {
    withPluginApi('0.1', (api) => {
      const currentUser = api.getCurrentUser();
      if (currentUser && currentUser.can_toggle_anonymous) {

        // Use settings from config/settings.yml
        const icon = settings.anonymous_mode_button_icon || 'user-secret';
        const buttonGroup = settings.anonymous_mode_button_group || 'insertions';
        const addToPopup = settings.put_in_popup_menu;

        api.addComposerButton(
          icon,
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
            group: buttonGroup,
            popup: addToPopup,
          }
        );
      }
    });
  },
};
