import { chevronDownIcon } from "@/icons"
import option from "@/components/Option"
import trapFocus from "@/helpers/trapFocus"
import stringToHtml from "@/helpers/stringToHtml"

import Component from '@/components/component';

class Select extends Component {
  constructor(store, element, inter) {
    super(store, element, inter);
  }

  firstRender() {
    const self = this;
    const state = this.store.getState();
    const container = document.createElement("div");
    container.classList = "sa-main-container";
    container.innerHTML = `<div class="sa-container">
      <div class="sa-select" tabindex="0">
        ${chevronDownIcon}
        <span class="sa-selected__span">${self.inter.LABEL}</span>
      </div>
      <div class="sa-dropdown">
        <div class="sa-search">
          <input class="sa-search__input" type="text" placeholder="Pesquisa" name="search" />
        </div>
        <div class="sa-dropdown__buttons">
          <button class="sa-dropdown-button sa-button-all">${self.inter.BUTTON_SELECT_ALL}</button>
          <button class="sa-dropdown-button sa-button-none">${self.inter.BUTTON_SELECT_NONE}</button>
        </div>
        <ul class="sa-dropdown__option-list" tabindex="-1" >
          ${state.options.map(opt => option(opt)).join("")}
        </ul>
      </div>
    </div>`

    // ClickOut close dropdown
    document.addEventListener("click", function(e) {
      let targetEl = e.target; // clicked element
      do {
        if (targetEl == container) {
          return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
      } while (targetEl);
      if (self.store.getState().show) {
        self.store.dispatch({ type: "selectInteraction" });
      }
    });

    // Open dropdown
    container.querySelector(".sa-select").addEventListener("click", (e) => {
      this.store.dispatch({ type: "selectInteraction" });
      container.querySelector(".sa-search__input").focus();
    });

    container.querySelector(".sa-select").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.store.dispatch({ type: "selectInteraction" });
        container.querySelector(".sa-search__input").focus();
      }
    });

    container.querySelector(".sa-search__input").addEventListener("keyup", (e) => {
      if (!["Enter", "Tab", "Escape", "Shift"].includes(e.key)) {
        this.store.dispatch({ type: "search", payload: e.target.value });
      }
    });

    // Select all
    container.querySelector(".sa-button-all").addEventListener("click", (e) => {
      this.store.dispatch({ type: "selectAll" });
    });

    // Select none
    container.querySelector(".sa-button-none").addEventListener("click", (e) => {
      this.store.dispatch({ type: "selectNone" });
    });

    this.element.appendChild(container);

    this.element.querySelector(".sa-dropdown").addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.store.dispatch({ type: "selectInteraction" });
      }
    });

    trapFocus(this.element.querySelector(".sa-dropdown"))

    if (state.options.find(opt => opt.checked)) {
      this.render();
    }
  }

  render() {
    const self = this;
    const select = this.element.querySelector(".sa-select");

    // First render logic
    if (!select) {
      self.firstRender();
      return;
    }

    const state = this.store.getState();
    const dropdown = select.parentNode.querySelector(".sa-dropdown");

    // Set input value with search state value
    select.parentNode.querySelector(".sa-search__input").value = state.search;

    // Reset options
    const optionList = dropdown.querySelector(".sa-dropdown__option-list");
    optionList.innerHTML = "";

    let count = 0;
    // Filter options search field
    if (state.search) {
      let result = state.options.filter((option) => {
        if (option.checked) {
          count++;
        }
        return option.label.toLowerCase().includes(state.search.toLowerCase()) ;
      });
      if (result.length) {
        optionList.innerHTML = result.map(opt => option(opt)).join("");
      } else {
        optionList.innerHTML = option();
      }
    } else {
      // Generate all options elements
      optionList.innerHTML = state.options.map(opt => {
        if (opt.checked) {
          count++;
        }
        return option(opt)
      }).join("");
    }

    // Keyboard actions focus on last selected element
    const lastSelection = state.lastSelection;
    if (lastSelection) {
      optionList.querySelector(`[data-value='${lastSelection}']>label`).focus();
    }

    // Add eventListeners
    optionList.querySelectorAll("label").forEach(
      li => {
        li.addEventListener("click", (e) => {
          e.stopPropagation();
          if (e.target.tagName  === "LABEL") {
            const payload = e.target.closest("li").dataset.value;
            if (payload) {
              self.store.dispatch({ type: "select", payload });
            }
          }
        });
        li.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const payload = e.target.closest("li").dataset.value;
            if (payload) {
              self.store.dispatch({ type: "select", payload });
            }
          }
        })
      }
    );

    // Show or hide dropdown element
    if (state.show) {
      dropdown.style.display = 'block';
      return
    } else {
      dropdown.style.display = 'none';
    }

    // Show or hide dropdown element
    if (count > 0) {
      count = count > 1 ? `${count} ${self.inter.LABEL_SELECTIONS}` : `${count} ${self.inter.LABEL_SELECTED}`;
      let label = select.querySelector(".sa-selected__span");
      if (label) {
        label.remove();
      }

      const counter = select.querySelector(".sa-selected-option.sa-selected-option--counter");
      if (counter) {
        counter.remove();
      }

      select.appendChild(stringToHtml(`<div class="sa-selected-option sa-selected-option--counter">${count}</div>`));
    } else {
      const counter = select.querySelector(".sa-selected-option.sa-selected-option--counter");
      if (counter) {
        counter.remove();
      }
      let label = select.querySelector(".sa-selected__span");
      if (!label) {
        select.appendChild(stringToHtml(`<span class="sa-selected__span">${self.inter.LABEL}</span>`));
      }
    }
  }
}

export default Select;
