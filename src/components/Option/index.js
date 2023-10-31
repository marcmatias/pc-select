const option = ({ opt, inter }) => {
  if (!opt) {
    return `<li class="sa-list-li">
      <label class="sa-list-li__label sa-list-li__label--empty" tabindex="0">${inter.NOTHING_FOUND}</label>
    </li>`;
  }

  return `<li class="sa-list-li" data-value="${opt.value}">
    <label class="sa-list-li__label" tabindex="0">
      <input class="sa-list-li__checkbox" type="checkbox" id="${opt.value}" tabindex="-1" ${opt.checked ? 'checked' : '' }>${opt.label}
    </label>
  </li>`;
}

export default option;
