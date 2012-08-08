/**
 * Provides a UI text entry box. When provided with focus this UI entity will
 * capture keyboard input and display it, similar in usage to the HTML input
 * text element.
 */
var IgeUiTextBox = IgeUiEntity.extend({
	/**
	 * @constructor
	 */
	init: function () {
		this._super();

		var self = this;

		this._hasFocus = false;
		this._value = '';

		this._fontEntity = new IgeFontEntity();
		this._fontEntity.width(this.width());
		this._fontEntity.height(this.height());
		this._fontEntity.left(5);
		this._fontEntity.middle(0);
		this._fontEntity.textAlignX(0);
		this._fontEntity.textAlignY(0);
		this._fontEntity.mount(this);

		// Listen for keyboard events to capture text input
		ige.input.on('keyDown', function (event) { self._keyDown(event); });
	},

	/**
	 * Gets / sets the text value of the input box.
	 * @param {String=} val The text value.
	 * @return {*}
	 */
	value: function (val) {
		if (val !== undefined) {
			this._value = val;

			// Set the text of the font entity to the value
			this._fontEntity.text(this._value);
			return this;
		}

		return this._value;
	},

	/**
	 * Gets / sets if this input box should have focus. When the
	 * input box has focus it will respond to keyboard input.
	 * @param val
	 * @return {*}
	 */
	focus: function (val) {
		if (val !== undefined) {
			this._hasFocus = val;
			return this;
		}

		return this._hasFocus;
	},

	/**
	 * Gets / sets the font sheet (texture) that the text box will
	 * use when rendering text inside the box.
	 * @param fontSheet
	 * @return {*}
	 */
	fontSheet: function (fontSheet) {
		if (fontSheet !== undefined) {
			this._fontSheet = fontSheet;

			// Set the font sheet as the texture for our font entity
			this._fontEntity.texture(this._fontSheet);
			return this;
		}

		return this._fontSheet;
	},

	/**
	 * Handles key down events. Will examine the key data and determine
	 * what to do with it for the text box.
	 * @param event
	 * @private
	 */
	_keyDown: function (event) {
		if (this._hasFocus) {
			// We have focus so handle the key input
			event.preventDefault();
			event.stopPropagation();
			event.returnValue = false;

			switch (event.keyCode) {
				case 8: // backspace
					// Remove the last character from the current value
					if (this._value.length > 0) {
						this.value(this._value.substr(0, this._value.length - 1));
					}
					break;

				case 13: // return
					break;

				default:
					this.value(this._value + String.fromCharCode(event.keyCode));
			}

		}
	}
});