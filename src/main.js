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
    label
  } = {}) {
    const app = document.querySelector(element);

    // Cone options to avoid errors
    const optCloned = JSON.parse(JSON.stringify(options))

    let language = await inter(lang);
    // External variable setting label text
    if (label){
     language =  {...language, 'LABEL': label };
    }
    const store = new State({ initialState: { ...initialState, options: optCloned }, stateCallback });
    const select = new Select(store, app, language);
    select.render();

    return store;
  }
}

export { SelectActions }

