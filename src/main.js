import './assets/style.css'
import option from '@/components/Option'
import Select from '@/components/Select'
import { State, initialState } from '@/store';
import inter from '@/inter';

/**
 * Setting interface in element
 * @class
 */
class SelectActions {
  /**
   * Set all interactions function.
   */
  async setView(element, options, {
    lang = "enUS",
    stateCallback,
    label,
    selectedLabel,
    selectionsLabel
  }= {}) {
    const app = document.querySelector(element);

    // Cone options to avoid errors
    const optCloned = JSON.parse(JSON.stringify(options))

    let language = await inter(lang);
    // External variable setting labels text
    language =  {
      ...language,
      LABEL: label ?? language.LABEL,
      LABEL_SELECTED: selectedLabel ?? language.LABEL_SELECTED,
      LABEL_SELECTIONS: selectionsLabel ?? language.LABEL_SELECTIONS,
    };
    const store = new State({ initialState: { ...initialState, options: optCloned }, stateCallback });
    const select = new Select(store, app, language);
    select.render();

    return store;
  }
}

export { SelectActions }

