function is_on_screen() {
  if (!window.frameElement) return true;
  var rect = window.frameElement.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.parent.innerHeight || parent.document.documentElement.clientHeight)// &&
      /*rect.right <= (window.parent.innerWidth || parent.document.documentElement.clientWidth) &&*/
      /*(window.parent.document.hasFocus() || parent.document.hasFocus())*/
  );
}