import {getValidSelection} from './../utils';
import L from './../../../i18n/index';
import * as C from './../../../i18n/constants';

export const KEY = 'remove_row';

export default function removeRowItem() {
  return {
    key: KEY,
    name() {
      const selection = this.getSelected();
      const translationConfiguration = {};

      if (Array.isArray(selection)) {
        const [fromRow, , toRow] = selection;

        if (fromRow - toRow !== 0) {
          translationConfiguration.pluralForm = 1;
        }
      }

      return L.getPhrase(this, C.CONTEXTMENU_ITEMS_REMOVE_ROW, translationConfiguration);
    },
    callback(key, selection) {
      let amount = selection.end.row - selection.start.row + 1;

      this.alter('remove_row', selection.start.row, amount, 'ContextMenu.removeRow');
    },
    disabled() {
      const selected = getValidSelection(this);
      const totalRows = this.countRows();

      return !selected || this.selection.selectedHeader.cols || this.selection.selectedHeader.corner || !totalRows;
    },
    hidden() {
      return !this.getSettings().allowRemoveRow;
    }
  };
}
