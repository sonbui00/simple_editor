var Firepad = require('firepad');

Firepad.ACEAdapter.prototype.setOtherCursor = function(cursor, color, clientId) {
  var clazz, css, cursorRange, end, justCursor, ref, self, start;
  if (this.otherCursors == null) {
    this.otherCursors = {};
  }
  cursorRange = this.otherCursors[clientId];
  if (cursorRange) {
    cursorRange.start.detach();
    cursorRange.end.detach();
    this.aceSession.removeMarker(cursorRange.id);
  }
  start = this.posFromIndex(cursor.position);
  end = this.posFromIndex(cursor.selectionEnd);
  if (cursor.selectionEnd < cursor.position) {
    ref = [end, start], start = ref[0], end = ref[1];
  }
  clazz = "other-client-selection-" + (color.replace('#', ''));
  justCursor = cursor.position === cursor.selectionEnd;
  if (justCursor) {
    clazz = clazz.replace('selection', 'cursor');
  }
  css = "." + clazz + " {\n  position: absolute;\n  background-color: " + (justCursor ? 'transparent' : color) + ";\n  border-left: 2px solid " + color + ";\n}";
  this.addStyleRule(css);
  // Override here
  if (justCursor) {
    var userName = firepad.userList.getUserName(clientId) || clientId;
    css = "\n." + clazz + "::before {\n position:absolute;\n background:rgba(100,100,200,0.5);\n z-index:999;\n top: -100%; content: '" + userName + "';\n left:100%;\n font-family: Arial;\n padding:1px 2px; \n}";
    this.addStyleRule(css);
  }
  this.otherCursors[clientId] = cursorRange = new this.aceRange(start.row, start.column, end.row, end.column);
  self = this;
  cursorRange.clipRows = function() {
    var range;
    range = self.aceRange.prototype.clipRows.apply(this, arguments);
    range.isEmpty = function() {
      return false;
    };
    return range;
  };
  cursorRange.start = this.aceDoc.createAnchor(cursorRange.start);
  cursorRange.end = this.aceDoc.createAnchor(cursorRange.end);
  cursorRange.id = this.aceSession.addMarker(cursorRange, clazz, "text");
  return {
    clear: (function(_this) {
      return function() {
        cursorRange.start.detach();
        cursorRange.end.detach();
        return _this.aceSession.removeMarker(cursorRange.id);
      };
    })(this)
  };
};

module.exports = Firepad;
